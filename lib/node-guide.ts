/**
 * Concrete deployment details for running a node — kept in sync with the
 * real `openfiat-node` binary (`openfiat-core/crates/cli`), not an
 * imagined future CLI. There is exactly one binary and no subcommands:
 * `openfiat-node` reads its entire configuration from environment
 * variables at startup (see `crates/cli/src/main.rs`) — no config file,
 * no `openfiat identity`/`openfiat stake`/`openfiat snapshot` command
 * surface. Staking, joining disputes, and casting governance votes are
 * wallet actions a client performs against a *running* node's JSON-RPC
 * surface (via `openfiat-sdk` or the web app) — they are not part of
 * running the node itself, and are covered by their own guides
 * (`/participate/*`), not this one.
 *
 * Bootstrap peers are addressed by static multiaddr/IP, not hostname —
 * this workspace deliberately doesn't enable libp2p's `dns` feature (two
 * unresolved `hickory-proto` CVEs; see
 * `openfiat-core/docs/architecture.md`), so a `/dns4/...` bootstrap
 * address, however natural it looks, will not resolve against a real
 * node.
 *
 * DEVNET ONLY. Every program id and cluster reference here is a devnet
 * artifact — this workspace's own CI fails if `mainnet-beta` appears
 * anywhere in the on-chain program repo, and there is no mainnet
 * deployment to point a node at yet.
 *
 * Commands live here rather than in the locale dictionaries because they
 * are not language-dependent; only the prose around them is translated.
 */

export const NODE_BINARY = "openfiat-node";
export const DATA_DIR = "/var/lib/openfiat";
export const SERVICE = "openfiat-node";

/** This workspace's real devnet program ids (`programs/devnet-addresses.json`
 *  in openfiat-core) — needed to set `CLI_STAKING_PROGRAM_ID` below. */
export const DEVNET_PROGRAM_IDS = {
  escrow: "HaPpM1QYM3dKp3sX7zhEdft9hB6ncu6xfALAbkyQChQP",
  staking: "HYEXk8XQukBkZbiYB33JyVefQDxqyCpPudad3wBCyYmx",
  governance: "AVJfKUjHsizkGGUy8sdz4Xma2hVgmgvgg8GmUMs8E4eE",
};

export type PortRow = {
  port: number;
  protocol: string;
  /** Key into the translated port descriptions. */
  key: "p2pQuic" | "api" | "metrics";
  public: boolean;
};

/** One real HTTP port serves JSON-RPC, WebSocket, REST, health, and
 *  metrics together — there is no separate metrics port (`crates/rpc`'s
 *  and `crates/api`'s routers are merged into one axum app in
 *  `crates/cli/src/main.rs`). */
export const PORTS: PortRow[] = [
  { port: 4001, protocol: "UDP", key: "p2pQuic", public: true },
  { port: 8080, protocol: "TCP", key: "api", public: true },
  { port: 8080, protocol: "TCP", key: "metrics", public: false },
];

export const CODE = {
  prereqs: `# Debian 12 / Ubuntu 24.04, as root
apt update && apt install -y ca-certificates curl gnupg ufw chrony

# Clock drift breaks signature and expiry checks — keep NTP running.
systemctl enable --now chrony`,

  dockerCompose: `# /opt/openfiat/compose.yaml
services:
  node:
    image: ghcr.io/openfiat-org/openfiat-node:latest
    restart: unless-stopped
    # QUIC needs UDP; the same TCP port serves JSON-RPC, WebSocket, REST,
    # health, and metrics together — there is no separate metrics port.
    ports:
      - "4001:4001/udp"
      - "8080:8080/tcp"
    volumes:
      - /var/lib/openfiat:/data
      - /etc/openfiat/wallet.json:/data/wallet.json:ro
    environment:
      CLI_DATA_DIR: /data
      CLI_WALLET_PATH: /data/wallet.json
      CLI_HTTP_ADDR: 0.0.0.0:8080
      CLI_LISTEN_ADDR: /ip4/0.0.0.0/udp/4001/quic-v1
      # Comma-separated static multiaddrs — DNS bootstrap does not
      # resolve (see this file's own top comment).
      CLI_BOOTSTRAP_PEERS: ""
      # Unset stays GossipOnly, the safe default — set this to opt into
      # real Solana devnet connectivity (OFS-4300 §4).
      CLI_SOLANA_RPC_URLS: ""
    stop_grace_period: 60s
    ulimits:
      nofile: 65536`,

  dockerUp: `install -d -m 0750 /var/lib/openfiat
docker compose -f /opt/openfiat/compose.yaml up -d
docker compose -f /opt/openfiat/compose.yaml logs -f node`,

  fromSource: `# Rust toolchain, then build the node binary
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
source "$HOME/.cargo/env"
apt install -y build-essential pkg-config libssl-dev clang cmake

git clone https://github.com/OpenFiat-org/openfiat-core.git
cd openfiat-core
cargo build --release --bin openfiat-node

install -m 0755 target/release/openfiat-node /usr/local/bin/`,

  identity: `# The node's identity IS a Solana CLI-format wallet.json — the same
# file "solana-keygen new" produces (its own seed is reused for the
# node's gossip/P2P keypair too, see crates/cli's load_or_generate_wallet).
# There is no separate "node identity" format or command.
solana-keygen new --outfile /etc/openfiat/wallet.json
chmod 600 /etc/openfiat/wallet.json
solana-keygen pubkey /etc/openfiat/wallet.json`,

  config: `# /etc/openfiat/node.env — read via systemd's EnvironmentFile (see the
# systemd unit below). openfiat-node has no config file of its own;
# every setting below is a real environment variable it reads directly.

CLI_DATA_DIR=/var/lib/openfiat
CLI_WALLET_PATH=/etc/openfiat/wallet.json
CLI_HTTP_ADDR=0.0.0.0:8080
CLI_LISTEN_ADDR=/ip4/0.0.0.0/udp/4001/quic-v1

# Comma-separated multiaddrs of peers to dial on startup — static
# IP/multiaddr only, DNS bootstrap does not resolve (see this file's own
# top comment). Leave unset for a standalone bootstrap node.
#CLI_BOOTSTRAP_PEERS=/ip4/203.0.113.10/udp/4001/quic-v1

# Comma-separated Solana RPC endpoint(s) — set to become RpcConnected
# (OFS-4300 §4). Leave unset to stay GossipOnly, the safe default. Never
# commit a real endpoint/API key to version control — this file should
# live only at /etc/openfiat/node.env on the server, mode 640.
#CLI_SOLANA_RPC_URLS=https://api.devnet.solana.com

# Needed for this node to independently verify a governance vote's real
# on-chain stake weight (OFS-4000) — without it, votes are queued but
# never trusted.
#CLI_STAKING_PROGRAM_ID=${DEVNET_PROGRAM_IDS.staking}`,

  firewall: `ufw default deny incoming
ufw allow 22/tcp                 # keep your own access
ufw allow 4001/udp               # libp2p, QUIC — the port people most often forget
ufw allow 8080/tcp               # JSON-RPC/WebSocket/REST/health/metrics — all one port
ufw enable && ufw status verbose`,

  systemd: `# /etc/systemd/system/openfiat-node.service
[Unit]
Description=OpenFiat node
Documentation=https://docs.openfiat.network
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
User=openfiat
Group=openfiat
ExecStart=/usr/local/bin/openfiat-node
WorkingDirectory=/var/lib/openfiat
EnvironmentFile=-/etc/openfiat/node.env
Restart=on-failure
RestartSec=5s

# openfiat-node handles SIGTERM itself (graceful shutdown) rather than
# needing systemd to force-kill it; this gives that shutdown path a
# reasonable window before systemd escalates to SIGKILL.
TimeoutStopSec=30s

NoNewPrivileges=true
ProtectSystem=strict
ProtectHome=true
ReadWritePaths=/var/lib/openfiat
PrivateTmp=true

[Install]
WantedBy=multi-user.target`,

  serviceUp: `useradd --system --create-home --home-dir /var/lib/openfiat --shell /usr/sbin/nologin openfiat
install -m 755 openfiat-node /usr/local/bin/openfiat-node
mkdir -p /etc/openfiat
install -m 640 -o openfiat -g openfiat node.env /etc/openfiat/node.env
chown -R openfiat:openfiat /var/lib/openfiat

systemctl daemon-reload
systemctl enable --now openfiat-node
journalctl -u openfiat-node -f`,

  verify: `# Is it up, and which mode is it in?
curl -s http://localhost:8080/health
# ok

curl -s -X POST http://localhost:8080/rpc -H 'content-type: application/json' \\
  -d '{"jsonrpc":"2.0","id":1,"method":"getChainStatus","params":{}}'
# {"jsonrpc":"2.0","id":1,"result":{"mode":"GossipOnly","blockhash":null,"slot":null,"age_ms":null}}
# ("RpcConnected" with a real blockhash once CLI_SOLANA_RPC_URLS is set)`,

  snapshotManual: `# Snapshot sync (OFS-1300) is real JSON-RPC, not a separate CLI —
# a new node discovers and imports a peer-announced snapshot instead of
# replaying all history:
curl -s -X POST http://localhost:8080/rpc -H 'content-type: application/json' \\
  -d '{"jsonrpc":"2.0","id":1,"method":"getLatestSnapshot","params":{}}'
curl -s -X POST http://localhost:8080/rpc -H 'content-type: application/json' \\
  -d '{"jsonrpc":"2.0","id":1,"method":"getCheckpointHeight","params":{}}'`,

  prometheus: `# /etc/prometheus/prometheus.yml — same port as everything else,
# no separate metrics listener to configure on the node's own side.
scrape_configs:
  - job_name: openfiat-node
    static_configs:
      - targets: ["127.0.0.1:8080"]`,

  upgrade: `systemctl stop openfiat-node        # SIGTERM, lets RocksDB flush
# docker: docker compose pull node && docker compose up -d node
install -m 0755 ./openfiat-node /usr/local/bin/
systemctl start openfiat-node

# Missed gossip events replay automatically on start.
journalctl -u openfiat-node -f`,

  backup: `# Back up what cannot be re-derived. Marketplace state can always be
# re-synced from a snapshot; the wallet cannot be regenerated.
tar czf openfiat-wallet-$(date +%F).tar.gz /etc/openfiat/wallet.json

# Authoritative financial state lives on Solana, not on the node's own
# RocksDB volume.`,
} as const;

export type TroubleshootKey =
  | "noPeers"
  | "stuckSync"
  | "highDisk"
  | "clockSkew";

export const TROUBLESHOOTING: { key: TroubleshootKey; command: string }[] = [
  {
    key: "noPeers",
    command: "ss -lunp | grep 4001 && journalctl -u openfiat-node -n 100",
  },
  {
    key: "stuckSync",
    command: "journalctl -u openfiat-node -n 200 --no-pager | grep -i snapshot",
  },
  {
    key: "highDisk",
    command: "du -sh /var/lib/openfiat/*",
  },
  { key: "clockSkew", command: "chronyc tracking" },
];
