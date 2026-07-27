/**
 * AllenHark's hosting offer for OpenFiat node operators.
 *
 * AllenHark leads initial development of the protocol (Chapter 3), runs
 * infrastructure the network already depends on — `openfiat.allenhark.com` is
 * a published bootstrap host, see BOOTSTRAP_HOSTS — and sells the two things
 * a node operator needs: a server and Solana RPC access.
 *
 * Deliberately no prices and no plan names here. AllenHark's catalogue is
 * served from its own API and changes without notice, so any figure copied
 * into this repo starts drifting the day it lands. The links point at the
 * live pricing pages, which are always right; this module only holds URLs and
 * the claim route.
 *
 * Deliberately no discount code either. There is no self-serve OpenFiat
 * coupon — the offer is claimed by asking, on Discord or in the chat on
 * allenhark.com. Publishing a code that does not exist yet would send node
 * operators to a checkout that rejects it.
 */

export const HOSTING = {
  partner: "AllenHark",
  /** Discount on both products for OpenFiat node operators. */
  discountPct: 50,
  vpsUrl: "https://allenhark.com/co-location",
  rpcUrl: "https://allenhark.com/infrastructure/rpc",
  /** Where the offer is claimed. */
  discordUrl: "https://discord.gg/JpzS72MAKG",
  chatUrl: "https://allenhark.com/contact",
} as const;

export type HostingOfferId = "vps" | "rpc";

/** Which link each offer row points at, in display order. */
export const HOSTING_OFFERS: { id: HostingOfferId; href: string }[] = [
  { id: "vps", href: HOSTING.vpsUrl },
  { id: "rpc", href: HOSTING.rpcUrl },
];
