#!/usr/bin/env bash
# Stale-literal guard for the 2026-08-09/10 OPEN tokenomics re-baseline
# (OFS-4100 §1-4: 100,000,000,000 OPEN supply at 6 decimals, presale
# 1 USDC = 100 OPEN, public-sale phase-2 1 USDC = 80 OPEN).
#
# Repo-local adaptation of openfiat-app/scripts/check-stale-tokenomics-literals.sh
# (same pattern set) and openfiat-core/scripts/check-stale-tokenomics-literals.sh,
# for this marketing site's own tree.
#
# User-facing copy and code comments must not ASSERT a pre-rebaseline figure
# (1B total supply, 200,000,000 OPEN presale bucket, "1 OPEN = 1 USDC" / 1:1
# price, 1 OPEN = 1.25 USDC public-sale rate, OPEN at nine decimals) as
# current. A match is allowed only if its file is listed in ALLOWLIST below,
# with a reason. Everything else is a regression this guard fails on.
#
# Usage: scripts/check-stale-tokenomics-literals.sh
set -euo pipefail
cd "$(dirname "$0")/.."

ALLOWLIST=(
  # Staking/arbitration/merchant how-to guides, not the presale/tokenomics
  # surface this pass covers. They walk a reader through the OLD devnet OPEN
  # mint (29w8TroBTYoaqrXBDcpv5L54VZRA8Kf7kU5U1cakvFdj, 9 decimals, 1B
  # supply) with real spl-token/SDK commands and example amounts against
  # that mint. The re-baseline (Task 4) re-genesised OPEN at a new mint
  # address (GwieDVo2mWeWpqAErbH9TQ94Pd2GusrfWQscJeJ4p532, 6 decimals, 100B
  # supply), so these guides are now themselves stale and need their own
  # pass — tracked separately, out of scope for the presale/tokenomics
  # wiring fix this guard was added for.
  "lib/guides/stake-open.ts"
  "lib/guides/become-a-merchant.ts"
  "lib/arbitrator-guide.ts"
)

# Old-figure signatures. Each names OPEN or USDC explicitly so it can't
# false-positive on an unrelated ratio or an SVG path's coordinates elsewhere
# in the site.
PATTERNS=(
  '1,000,000,000 OPEN'
  '1,000,000,000 · '
  '1\.000\.000\.000 · '
  '1 000 000 000 · '
  '200,000,000 OPEN'
  '1 OPEN = 1 USDC'
  '1 OPEN = 1,? ?USDC'
  '1 OPEN = 1[.,]25 USDC'
  'OPEN.{0,20}1:1'
  '1:1.{0,20}OPEN'
  'minted 1:1'
  'OPEN has 9 decimals'
  'OPEN.{0,40}(nine|9) decimal'
  '(nine|9) decimal.{0,40}OPEN'
)

is_allowed() {
  local file="$1"
  for a in "${ALLOWLIST[@]}"; do
    [ "$file" = "$a" ] && return 0
  done
  return 1
}

fail=0
for pattern in "${PATTERNS[@]}"; do
  while IFS= read -r line; do
    [ -z "$line" ] && continue
    file="${line%%:*}"
    file="${file#./}"
    if ! is_allowed "$file"; then
      echo "STALE TOKENOMICS LITERAL: $line"
      fail=1
    fi
  done < <(grep -rnE \
    --include='*.md' --include='*.mdx' --include='*.ts' --include='*.tsx' --include='*.json' \
    --exclude-dir=node_modules --exclude-dir=.next --exclude-dir=.git \
    --exclude-dir=.generated --exclude-dir=.content-cache \
    -- "$pattern" . 2>/dev/null || true)
done

if [ "$fail" -ne 0 ]; then
  cat >&2 <<'EOF'

One or more files assert a pre-2026-08-09/10-rebaseline OPEN tokenomics
figure (1B supply, 200,000,000 OPEN presale bucket, 1:1 price, 1.25 public-
sale rate, 9 decimals) as current. Either update it to the re-baselined
figure (100,000,000,000 supply, 100:1 presale rate / 80:1 phase-2, 6
decimals) or, if it is a genuinely still-out-of-scope-for-this-pass
reference, add it to ALLOWLIST in this script with a reason.
EOF
  exit 1
fi

echo "OK: no stale pre-rebaseline tokenomics literals found outside the allowlist."
