import Image from "next/image";
import { paymentAsset } from "@/lib/sale/assets";
import { cn } from "@/lib/utils";

/**
 * Issuer mark for a payment asset.
 *
 * Falls back to a monogram badge when we have no logo for the symbol — an
 * asset added to the on-chain whitelist before its mark is added here should
 * still be selectable rather than rendering a broken image.
 */
export function TokenLogo({
  symbol,
  size = 20,
  className,
}: {
  symbol: string;
  size?: number;
  className?: string;
}) {
  const asset = paymentAsset(symbol);

  if (!asset) {
    return (
      <span
        aria-hidden
        style={{ width: size, height: size, fontSize: size * 0.5 }}
        className={cn(
          "flex shrink-0 items-center justify-center rounded-full bg-line font-mono font-bold text-faint",
          className,
        )}
      >
        {symbol.slice(0, 1)}
      </span>
    );
  }

  return (
    <Image
      src={asset.logo}
      alt=""
      width={size}
      height={size}
      className={cn("shrink-0 rounded-full", className)}
    />
  );
}
