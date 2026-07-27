/**
 * Concrete deployment details for running a node.
 *
 * The whitepaper pins the stack — libp2p over QUIC with Noise and Yamux,
 * RocksDB for local state, a Rust node binary, the bootstrap hosts, the
 * lifecycle order, snapshot verification, health and metrics surfaces — but
 * not the literal names. The names below are the reference deployment:
 * `openfiat-node` and `openfiat` come from the repository layout in Chapter
 * 25, and the paths and ports follow ordinary Linux service convention.
 *
 * Commands live here rather than in the locale dictionaries because they are
 * not language-dependent; only the prose around them is translated.
 */

export const NODE_BINARY = "openfiat-node";
export const NODE_CLI = "openfiat";
export const CONFIG_PATH = "/etc/openfiat/node.toml";
export const DATA_DIR = "/var/lib/openfiat";
export const SERVICE = "openfiat-node";

/** Bootstrap hosts named in Chapter 22 and OFS-1100. */
export const BOOTSTRAP_HOSTS = [
  "entry01.openfiat.network",
  "entry02.openfiat.network",
  "entry03.openfiat.network",
  "openfiat.allenhark.com",
];

export type PortRow = {
  port: number;
  protocol: string;
  /** Key into the translated port descriptions. */
  key: "p2pQuic" | "p2pTcp" | "api" | "metrics";
  public: boolean;
};

export const PORTS: PortRow[] = [
  { port: 7400, protocol: "UDP", key: "p2pQuic", public: true },
  { port: 7400, protocol: "TCP", key: "p2pTcp", public: true },
  { port: 8400, protocol: "TCP", key: "api", public: true },
  { port: 9400, protocol: "TCP", key: "metrics", public: false },
];

export const CODE = {
  prereqs: `# Debian 12 / Ubuntu 24.04, as root
apt update && apt install -y ca-certificates curl gnupg ufw chrony

# Clock drift breaks signature and expiry checks — keep NTP running.
systemctl enable --now chrony`,

  dockerCompose: `# /opt/openfiat/compose.yaml
services:
  node:
    image: ghcr.io/openfiat-org/openfiat-core:1
    restart: unless-stopped
    # QUIC needs UDP; the TCP port is the fallback transport.
    ports:
      - "7400:7400/udp"
      - "7400:7400/tcp"
      - "8400:8400/tcp"
      - "127.0.0.1:9400:9400/tcp"
    volumes:
      - /etc/openfiat:/etc/openfiat:ro
      - /var/lib/openfiat:/var/lib/openfiat
    command: ["--config", "/etc/openfiat/node.toml"]
    stop_grace_period: 60s
    ulimits:
      nofile: 65536`,

  dockerUp: `install -d -m 0750 /etc/openfiat /var/lib/openfiat
docker compose -f /opt/openfiat/compose.yaml up -d
docker compose -f /opt/openfiat/compose.yaml logs -f node`,

  fromSource: `# Rust toolchain, then build the node and the CLI
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
source "$HOME/.cargo/env"
apt install -y build-essential pkg-config libssl-dev clang cmake

git clone https://github.com/OpenFiat-org/openfiat-core.git
cd openfiat-core
cargo build --release --locked

install -m 0755 target/release/openfiat-node /usr/local/bin/
install -m 0755 target/release/openfiat /usr/local/bin/`,

  identity: `# Generate the node identity. The peer id is derived from this key and
# must stay stable across restarts, so back the file up before going live.
openfiat identity generate --out /etc/openfiat/node.key
chmod 600 /etc/openfiat/node.key

openfiat identity show --key /etc/openfiat/node.key
# peer id: 12D3KooW...`,

  config: `# /etc/openfiat/node.toml

[node]
data_dir = "/var/lib/openfiat"
identity  = "/etc/openfiat/node.key"
# Optional, advertised to peers and shown in the service registry.
region = "eu-west"

[network]
# Announce the address peers should dial, not the bind address, when the
# node sits behind NAT or a load balancer.
listen    = ["/ip4/0.0.0.0/udp/7400/quic-v1", "/ip4/0.0.0.0/tcp/7400"]
announce  = ["/dns4/node.example.org/udp/7400/quic-v1"]
bootstrap = [
  "/dns4/entry01.openfiat.network/udp/7400/quic-v1",
  "/dns4/entry02.openfiat.network/udp/7400/quic-v1",
  "/dns4/entry03.openfiat.network/udp/7400/quic-v1",
]
max_peers = 128

[storage]
# RocksDB lives under data_dir. Give it a real NVMe volume.
engine = "rocksdb"

[snapshot]
# Sync from a snapshot instead of replaying all history on first start.
sync_on_first_start = true
# Serve snapshots to other nodes. Optional, and rewarded separately.
provide = false

[api]
listen = "0.0.0.0:8400"

[metrics]
# Keep metrics on loopback and scrape it locally.
listen = "127.0.0.1:9400"

[wallet]
# Used only to register the node and, if you choose to, to stake.
# Never the wallet that holds significant funds.
keypair = "/etc/openfiat/wallet.json"
cluster = "mainnet-beta"`,

  firewall: `ufw default deny incoming
ufw allow 22/tcp                 # keep your own access
ufw allow 7400/udp               # libp2p, QUIC
ufw allow 7400/tcp               # libp2p, TCP fallback
ufw allow 8400/tcp               # node API for clients
# 9400 stays closed; scrape metrics over loopback or a private network.
ufw enable && ufw status verbose`,

  systemd: `# /etc/systemd/system/openfiat-node.service
[Unit]
Description=OpenFiat node
After=network-online.target chrony.service
Wants=network-online.target

[Service]
User=openfiat
Group=openfiat
ExecStart=/usr/local/bin/openfiat-node --config /etc/openfiat/node.toml
Restart=on-failure
RestartSec=5s
# Give RocksDB time to flush on shutdown rather than being killed mid-write.
KillSignal=SIGTERM
TimeoutStopSec=60
LimitNOFILE=65536
NoNewPrivileges=true
ProtectSystem=strict
ProtectHome=true
PrivateTmp=true
ReadWritePaths=/var/lib/openfiat

[Install]
WantedBy=multi-user.target`,

  serviceUp: `useradd --system --home /var/lib/openfiat --shell /usr/sbin/nologin openfiat
chown -R openfiat:openfiat /var/lib/openfiat /etc/openfiat

systemctl daemon-reload
systemctl enable --now openfiat-node
journalctl -u openfiat-node -f`,

  register: `# Announce the node to the network. Metadata is gossiped, not approved.
openfiat node register \\
  --config /etc/openfiat/node.toml \\
  --endpoint /dns4/node.example.org/udp/7400/quic-v1 \\
  --services api,gossip

# Stake to become an active participant. This also sets reward eligibility
# and quality-of-service priority.
openfiat stake deposit --role node --amount 25000`,

  verify: `# Is it synchronized and connected?
curl -s http://localhost:8400/health | jq
# {
#   "status": "ok",
#   "synchronized": true,
#   "peers": 37,
#   "snapshot_height": 4217,
#   "snapshot_age_seconds": 48,
#   "protocol_version": "1.0.0",
#   "rocksdb": "healthy"
# }

openfiat node status
openfiat peers list --limit 10`,

  snapshotManual: `# Only needed if you skipped snapshot sync or are recovering.
openfiat snapshot providers                     # discover via the registry
openfiat snapshot fetch --height latest --out /var/lib/openfiat/snapshots
# Verification is mandatory: signature, protocol version, compression and
# state root must all match before import.
openfiat snapshot verify /var/lib/openfiat/snapshots/latest.ofs
openfiat snapshot import /var/lib/openfiat/snapshots/latest.ofs`,

  prometheus: `# /etc/prometheus/prometheus.yml
scrape_configs:
  - job_name: openfiat-node
    static_configs:
      - targets: ["127.0.0.1:9400"]

# Alerts worth having from the start:
#   openfiat_peers_connected < 8         for 10m
#   openfiat_snapshot_age_seconds > 900
#   openfiat_synchronized == 0           for 5m
#   rate(openfiat_gossip_dropped_total[5m]) > 0`,

  upgrade: `# Patch and minor releases are compatible; majors may need a coordinated,
# governance-approved upgrade. Always verify the release signature.
openfiat release verify --version 1.2.3

systemctl stop openfiat-node        # SIGTERM, lets RocksDB flush
# docker: docker compose pull node && docker compose up -d node
install -m 0755 ./openfiat-node /usr/local/bin/
systemctl start openfiat-node

# Missed gossip replays automatically on start.
openfiat node status --wait-synchronized`,

  backup: `# Back up what cannot be re-derived. Marketplace state can always be
# re-synced from a snapshot; keys cannot be regenerated.
tar czf openfiat-keys-$(date +%F).tar.gz \\
  /etc/openfiat/node.key \\
  /etc/openfiat/wallet.json \\
  /etc/openfiat/node.toml

# Authoritative financial state lives on Solana, not on the node.`,
} as const;

export type TroubleshootKey =
  | "noPeers"
  | "stuckSync"
  | "snapshotMismatch"
  | "highDisk"
  | "clockSkew";

export const TROUBLESHOOTING: { key: TroubleshootKey; command: string }[] = [
  {
    key: "noPeers",
    command: "openfiat peers list && ss -lunp | grep 7400",
  },
  {
    key: "stuckSync",
    command:
      "openfiat node status --verbose && journalctl -u openfiat-node -n 200",
  },
  {
    key: "snapshotMismatch",
    command:
      "openfiat snapshot verify --strict && openfiat snapshot fetch --height latest",
  },
  {
    key: "highDisk",
    command: "openfiat db compact && du -sh /var/lib/openfiat/*",
  },
  { key: "clockSkew", command: "chronyc tracking" },
];
