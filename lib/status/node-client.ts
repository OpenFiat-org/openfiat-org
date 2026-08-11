/**
 * Client for the public OpenFiat node's status surface.
 *
 * There is no indexer or status service to read from — the status page
 * talks straight to a node's own RPC, the same way any other client would.
 * `NODE_URL` is overridable via env so a fork or a future multi-node status
 * page isn't hardcoded to one operator's box; it defaults to the node
 * AllenHark publishes as a bootstrap host (see `lib/hosting.ts`).
 *
 * Devnet only — see `SALE.cluster` in `lib/sale/config.ts` for the same
 * caveat on the sale side.
 */

export const NODE_URL =
  process.env.NEXT_PUBLIC_OPENFIAT_NODE_URL ??
  "https://openfiat.allenhark.network";

export type ChainStatus = {
  slot: number;
  mode: string;
  blockhash: string;
  ageMs: number;
};

export type NetworkStatus =
  | { online: true; status: ChainStatus; checkedAt: number }
  | { online: false; checkedAt: number };

async function checkHealth(signal: AbortSignal): Promise<boolean> {
  try {
    const res = await fetch(`${NODE_URL}/health`, {
      signal,
      cache: "no-store",
    });
    if (!res.ok) return false;
    const text = (await res.text()).trim().toLowerCase();
    return text === "ok" || text === '"ok"';
  } catch {
    return false;
  }
}

async function fetchChainStatus(
  signal: AbortSignal,
): Promise<ChainStatus | null> {
  try {
    const res = await fetch(`${NODE_URL}/rpc`, {
      method: "POST",
      signal,
      cache: "no-store",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "getChainStatus",
        params: {},
      }),
    });
    if (!res.ok) return null;
    const body = await res.json();
    const result = body?.result;
    if (!result || typeof result.slot !== "number") return null;
    return {
      slot: result.slot,
      mode: typeof result.mode === "string" ? result.mode : "unknown",
      blockhash: typeof result.blockhash === "string" ? result.blockhash : "",
      ageMs: typeof result.age_ms === "number" ? result.age_ms : 0,
    };
  } catch {
    return null;
  }
}

/**
 * Reads live status from `NODE_URL`.
 *
 * "Online" requires both the health probe and the RPC call to succeed — a
 * node answering one but not the other is unreachable enough to report as
 * offline rather than risk showing a stale or partial reading as current.
 * Never throws: every failure mode (network error, timeout, bad JSON,
 * non-200) resolves to `{ online: false }` so the caller can always render
 * something instead of crashing.
 */
export async function fetchNetworkStatus(
  signal: AbortSignal,
): Promise<NetworkStatus> {
  const [health, status] = await Promise.all([
    checkHealth(signal),
    fetchChainStatus(signal),
  ]);
  const checkedAt = Date.now();
  if (health && status) return { online: true, status, checkedAt };
  return { online: false, checkedAt };
}
