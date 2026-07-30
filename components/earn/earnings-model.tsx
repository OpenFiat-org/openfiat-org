"use client";

import { useId, useMemo, useState } from "react";
import type { Dictionary } from "@/lib/i18n";
import {
  AVAILABILITY_BUCKETS,
  availabilityBps,
  type Connectivity,
  computeEpoch,
  connectivityBps,
  formatBpsPercent,
  formatMultiplier,
  formatOpen,
  MIN_STAKE_OPEN,
  type NodeProfile,
  PER_EPOCH_EMISSION,
  type Pinning,
  pinningBps,
  shareBps,
} from "@/lib/rewards";
import { cn } from "@/lib/utils";

/**
 * The earnings model, made adjustable.
 *
 * # The one design constraint everything here follows
 *
 * A node's reward has two halves and they are not equally knowable. The
 * quality multiplier is a pure function of what one operator does, so this
 * component can compute it exactly and stand behind it. The *share* is that
 * node's weight over every eligible node's weight, and no rearrangement of
 * the arithmetic makes that computable from one operator's inputs — it needs
 * a total this page does not have and cannot honestly guess.
 *
 * So the two halves are separated in the layout, not merged into one
 * impressive figure. What the inputs determine is stated plainly at full
 * contrast. What depends on the network is boxed together *with the
 * assumption it rests on*, so the reader adjusts the assumption and watches
 * the figure move, and never sees a number without the guess that produced
 * it in the same frame.
 *
 * # What this deliberately cannot show
 *
 * There is no fiat conversion and no annualised return, and neither is an
 * omission to be fixed later. OPEN has no market and therefore no price; any
 * currency figure here would be a number this project invented about its own
 * token. A yield percentage is worse, because it reads as a promise, and the
 * emission it would be computed from is a finite bucket that empties. The
 * page says this in words rather than leaving the reader to notice.
 */

const MAX_STAKE = 50_000;
const STAKE_STEP = 250;
const MAX_PEERS = 2_000;
const MAX_PEER_STAKE = 50_000;

/** A visible default that is obviously a guess, not a measurement. */
const DEFAULT_PEERS = 250;
const DEFAULT_PEER_STAKE = 5_000;

/**
 * The quality assumed for every other node: 0.70, an RPC-connected node at
 * full availability that pins nothing.
 *
 * Fixed rather than a fourth slider, because it is the one assumption a
 * reader cannot sanity-check from experience and a slider would invite
 * tuning it until the answer looked good. 0.70 is the middle of the four
 * outcomes in the matrix above, so it neither flatters nor punishes.
 */
const PEER_QUALITY_BPS = 7_000n;

/** Only the `earn` slice is accepted: the full dictionary holds functions
 *  (pluralisers), which cannot cross the server/client boundary. */
export function EarningsModel({ t }: { t: Dictionary["earn"] }) {
  const [stakeOpen, setStakeOpen] = useState(10_000);
  const [slicesLive, setSlicesLive] = useState(24);
  const [connectivity, setConnectivity] = useState<Connectivity>("rpc");
  const [pinning, setPinning] = useState<Pinning>("serving");
  const [peerCount, setPeerCount] = useState(DEFAULT_PEERS);
  const [peerStakeOpen, setPeerStakeOpen] = useState(DEFAULT_PEER_STAKE);

  /* The profile is assembled inside the memo rather than outside it. Built in
     the render body it would be a fresh object every keystroke of the slider,
     which makes it useless as a dependency and would recompute regardless. */
  const outcome = useMemo(() => {
    const profile: NodeProfile = {
      stakeOpen,
      connectivity,
      slicesLive,
      pinning,
    };
    return computeEpoch(profile, {
      peerCount,
      peerStakeOpen,
      peerQualityBps: PEER_QUALITY_BPS,
    });
  }, [stakeOpen, connectivity, slicesLive, pinning, peerCount, peerStakeOpen]);

  const belowFloor = BigInt(stakeOpen) < MIN_STAKE_OPEN;
  const offline = slicesLive === 0;

  return (
    <div className="grid gap-x-14 gap-y-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
      {/* ---- Inputs: what an operator controls ------------------------- */}
      {/* Sticky on wide viewports. The results column is the taller of the
          two, and a reader who has scrolled to the second panel has scrolled
          the controls off screen — which breaks the one thing this section is
          for, watching a figure move as a control is dragged. */}
      <div className="lg:sticky lg:top-24 lg:self-start">
        <h3 className="stat-label text-faint">{t.yourNode}</h3>

        <div className="mt-7 space-y-9">
          <Slider
            label={t.stakeLabel}
            hint={t.stakeHint}
            value={stakeOpen}
            min={0}
            max={MAX_STAKE}
            step={STAKE_STEP}
            onChange={setStakeOpen}
            display={`${stakeOpen.toLocaleString("en-US")} OPEN`}
            warn={belowFloor}
          />

          <Slider
            label={t.availabilityLabel}
            hint={t.availabilityHint}
            value={slicesLive}
            min={0}
            max={Number(AVAILABILITY_BUCKETS)}
            step={1}
            onChange={setSlicesLive}
            display={`${slicesLive} / ${AVAILABILITY_BUCKETS}`}
            warn={offline}
          />

          <Choice
            label={t.connectivityLabel}
            value={connectivity}
            onChange={setConnectivity}
            options={[
              {
                value: "rpc",
                label: t.connectivityRpc,
                note: formatMultiplier(connectivityBps("rpc")),
              },
              {
                value: "gossip",
                label: t.connectivityGossip,
                note: formatMultiplier(connectivityBps("gossip")),
              },
            ]}
          />

          <Choice
            label={t.pinningLabel}
            value={pinning}
            onChange={setPinning}
            options={[
              {
                value: "serving",
                label: t.pinningServing,
                note: formatMultiplier(pinningBps("serving")),
              },
              {
                value: "absent",
                label: t.pinningAbsent,
                note: formatMultiplier(pinningBps("absent")),
              },
            ]}
          />
        </div>
      </div>

      {/* ---- Outputs, split by how far they can be trusted ------------- */}
      <div className="space-y-8">
        {/* Determined entirely by the inputs on the left. */}
        <div className="rounded-card border border-line-strong bg-surface p-7 md:p-8">
          <h3 className="stat-label text-accent-mid">{t.determinedTitle}</h3>

          <p className="mt-6 font-mono text-[3.25rem] leading-none font-semibold tracking-[-0.03em] tabular-nums text-ink">
            {formatMultiplier(outcome.qualityBps)}
            <span className="ml-3 align-middle font-sans text-sm font-medium tracking-normal text-faint">
              {t.qualityCeiling}
            </span>
          </p>
          <p className="mt-3 text-body-sm text-muted">{t.qualityLabel}</p>

          {/* The multiplier written out, so the figure above is checkable
              rather than asserted. */}
          <dl className="mt-7 border-t border-line pt-6 font-mono text-sm tabular-nums">
            <Factor
              label={t.factorConnectivity}
              value={formatMultiplier(connectivityBps(connectivity))}
            />
            <Factor
              label={t.factorAvailability}
              value={formatMultiplier(availabilityBps(slicesLive))}
            />
            <Factor
              label={t.factorPinning}
              value={formatMultiplier(pinningBps(pinning))}
            />
            <div className="mt-2 flex items-baseline justify-between gap-4 border-t border-line pt-3">
              <dt className="text-body-sm text-ink">{t.factorProduct}</dt>
              <dd className="font-semibold text-ink">
                {formatMultiplier(outcome.qualityBps)}
              </dd>
            </div>
          </dl>

          {(belowFloor || offline) && (
            <p className="mt-6 rounded-sm border border-accent/40 bg-accent-soft px-4 py-3 text-body-sm text-accent-light">
              {belowFloor
                ? t.ineligibleBelowFloor.replace(
                    "{min}",
                    MIN_STAKE_OPEN.toLocaleString("en-US"),
                  )
                : t.ineligibleOffline}
            </p>
          )}
        </div>

        {/*
         * Everything below rests on a guess, so the guess is inside the same
         * box as the figures it produces. Dimmer surface and a dashed rule:
         * this panel should not look as solid as the one above it, because
         * it is not.
         */}
        <div className="rounded-card border border-dashed border-line-strong bg-surface-alt p-7 md:p-8">
          <h3 className="stat-label text-faint">{t.assumedTitle}</h3>
          <p className="mt-4 text-body-sm text-body">{t.assumedNote}</p>

          <div className="mt-7 space-y-7">
            <Slider
              label={t.peersLabel}
              value={peerCount}
              min={0}
              max={MAX_PEERS}
              step={10}
              onChange={setPeerCount}
              display={peerCount.toLocaleString("en-US")}
              quiet
            />
            <Slider
              label={t.peerStakeLabel}
              value={peerStakeOpen}
              min={0}
              max={MAX_PEER_STAKE}
              step={500}
              onChange={setPeerStakeOpen}
              display={`${peerStakeOpen.toLocaleString("en-US")} OPEN`}
              quiet
            />
          </div>

          <dl className="mt-8 grid grid-cols-1 gap-6 border-t border-line pt-7 sm:grid-cols-2">
            <div>
              <dd className="font-mono text-2xl font-semibold tabular-nums text-body">
                {outcome.eligible ? formatBpsPercent(shareBps(outcome)) : "—"}
              </dd>
              <dt className="mt-2 text-body-sm text-muted">{t.shareLabel}</dt>
            </div>
            <div>
              <dd className="font-mono text-2xl font-semibold tabular-nums text-body">
                {outcome.eligible ? formatOpen(outcome.amount) : "0.00"}
              </dd>
              <dt className="mt-2 text-body-sm text-muted">
                {t.perEpochLabel}
              </dt>
            </div>
          </dl>

          <p className="mt-7 text-body-sm text-faint">
            {t.poolReminder.replace(
              "{pool}",
              formatOpen(PER_EPOCH_EMISSION, 0),
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

function Factor({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-1.5">
      <dt className="text-body-sm text-muted">{label}</dt>
      <dd className="text-body">{value}</dd>
    </div>
  );
}

function Slider({
  label,
  hint,
  value,
  min,
  max,
  step,
  onChange,
  display,
  warn,
  quiet,
}: {
  label: string;
  hint?: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (next: number) => void;
  display: string;
  /** Marks a value that produces no reward at all. */
  warn?: boolean;
  /** Demotes the control, for inputs that are assumptions rather than facts. */
  quiet?: boolean;
}) {
  const id = useId();
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label
          htmlFor={id}
          className={cn(
            "text-body-sm font-medium",
            quiet ? "text-muted" : "text-ink",
          )}
        >
          {label}
        </label>
        <output
          htmlFor={id}
          className={cn(
            "font-mono text-sm tabular-nums",
            warn
              ? "text-accent-light"
              : quiet
                ? "text-muted"
                : "text-accent-mid",
          )}
        >
          {display}
        </output>
      </div>
      <input
        id={id}
        type="range"
        className="range mt-3.5"
        value={value}
        min={min}
        max={max}
        step={step}
        /* The filled portion of the track. A range input has no native way to
           style it, so the fraction is handed to CSS as a custom property and
           the track paints a hard-stop gradient at that point. */
        style={
          {
            "--fill": `${((value - min) / (max - min)) * 100}%`,
          } as React.CSSProperties
        }
        onChange={(event) => onChange(Number(event.target.value))}
      />
      {hint && <p className="mt-2.5 text-body-sm text-faint">{hint}</p>}
    </div>
  );
}

function Choice<T extends string>({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: T;
  onChange: (next: T) => void;
  options: { value: T; label: string; note: string }[];
}) {
  const name = useId();
  return (
    <fieldset>
      <legend className="text-body-sm font-medium text-ink">{label}</legend>
      {/*
       * Radios rather than buttons: these are one exclusive choice, and the
       * native control brings arrow-key traversal and screen-reader grouping
       * that a set of `aria-pressed` buttons would have to reimplement.
       */}
      <div className="mt-3.5 grid grid-cols-2 gap-2">
        {options.map((option) => {
          const selected = option.value === value;
          return (
            <label
              key={option.value}
              className={cn(
                "flex cursor-pointer flex-col gap-1 rounded-sm border px-4 py-3 transition-colors",
                "focus-within:ring-[3px] focus-within:ring-[color:var(--accent-ring)]",
                selected
                  ? "border-accent/60 bg-accent-soft text-ink"
                  : "border-line bg-surface-alt text-muted hover:border-line-strong",
              )}
            >
              <input
                type="radio"
                name={name}
                className="sr-only"
                checked={selected}
                value={option.value}
                onChange={() => onChange(option.value)}
              />
              <span className="text-body-sm font-medium">{option.label}</span>
              <span
                className={cn(
                  "font-mono text-xs tabular-nums",
                  selected ? "text-accent-mid" : "text-faint",
                )}
              >
                × {option.note}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
