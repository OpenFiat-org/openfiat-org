/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/presale.json`.
 */
export type Presale = {
  address: "75rJ9MRAaSnAc8tg4AfeTFVDCVrN6jdD5CqeyE4UoUw7";
  metadata: {
    name: "presale";
    version: "0.1.0";
    spec: "0.1.0";
    description: "The OPEN token presale program (OFS-4200 §3).";
    repository: "https://github.com/OpenFiat-org/openfiat-core";
  };
  docs: [
    "`openfiat-presale` — the OPEN token presale program (OFS-4200 §3,",
    "OFS-4100 §3). Phase 3: full sale lifecycle — initialize, contribute",
    "(direct USDC or SOL/stablecoin via atomic Jupiter CPI swap), finalize,",
    "claim, refund.",
  ];
  instructions: [
    {
      name: "claim";
      discriminator: [62, 198, 214, 193, 213, 159, 108, 210];
      accounts: [
        {
          name: "buyer";
          signer: true;
          relations: ["contribution"];
        },
        {
          name: "saleConfig";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [115, 97, 108, 101, 95, 99, 111, 110, 102, 105, 103];
              },
              {
                kind: "arg";
                path: "saleNonce";
              },
            ];
          };
        },
        {
          name: "openMint";
        },
        {
          name: "presaleVaultAuthority";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  112,
                  114,
                  101,
                  115,
                  97,
                  108,
                  101,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116,
                ];
              },
            ];
          };
        },
        {
          name: "presaleVault";
          writable: true;
        },
        {
          name: "contribution";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  99,
                  111,
                  110,
                  116,
                  114,
                  105,
                  98,
                  117,
                  116,
                  105,
                  111,
                  110,
                ];
              },
              {
                kind: "account";
                path: "saleConfig";
              },
              {
                kind: "account";
                path: "buyer";
              },
            ];
          };
        },
        {
          name: "buyerOpen";
          writable: true;
        },
        {
          name: "tokenProgram";
          address: "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb";
        },
      ];
      args: [
        {
          name: "saleNonce";
          type: "u64";
        },
      ];
    },
    {
      name: "contributeUsdc";
      discriminator: [164, 188, 213, 177, 79, 222, 120, 27];
      accounts: [
        {
          name: "buyer";
          writable: true;
          signer: true;
        },
        {
          name: "saleConfig";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [115, 97, 108, 101, 95, 99, 111, 110, 102, 105, 103];
              },
              {
                kind: "arg";
                path: "saleNonce";
              },
            ];
          };
        },
        {
          name: "buyerUsdc";
          writable: true;
        },
        {
          name: "usdcVault";
          writable: true;
        },
        {
          name: "usdcMint";
        },
        {
          name: "contribution";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  99,
                  111,
                  110,
                  116,
                  114,
                  105,
                  98,
                  117,
                  116,
                  105,
                  111,
                  110,
                ];
              },
              {
                kind: "account";
                path: "saleConfig";
              },
              {
                kind: "account";
                path: "buyer";
              },
            ];
          };
        },
        {
          name: "tokenProgram";
          address: "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb";
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
      ];
      args: [
        {
          name: "saleNonce";
          type: "u64";
        },
        {
          name: "amount";
          type: "u64";
        },
      ];
    },
    {
      name: "contributeWithSwap";
      discriminator: [1, 140, 13, 39, 224, 128, 233, 135];
      accounts: [
        {
          name: "buyer";
          writable: true;
          signer: true;
        },
        {
          name: "saleConfig";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [115, 97, 108, 101, 95, 99, 111, 110, 102, 105, 103];
              },
              {
                kind: "arg";
                path: "saleNonce";
              },
            ];
          };
        },
        {
          name: "sourceMint";
          docs: [
            "The asset being contributed — must be wSOL or on the stablecoin",
            "whitelist, and must not be USDC (use `contribute_usdc` for that).",
          ];
        },
        {
          name: "usdcVault";
          writable: true;
        },
        {
          name: "contribution";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  99,
                  111,
                  110,
                  116,
                  114,
                  105,
                  98,
                  117,
                  116,
                  105,
                  111,
                  110,
                ];
              },
              {
                kind: "account";
                path: "saleConfig";
              },
              {
                kind: "account";
                path: "buyer";
              },
            ];
          };
        },
        {
          name: "swapProgram";
          docs: ["below. The actual swap accounts are `remaining_accounts`."];
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
      ];
      args: [
        {
          name: "saleNonce";
          type: "u64";
        },
        {
          name: "expectedUsdcOut";
          type: "u64";
        },
        {
          name: "swapInstructionData";
          type: "bytes";
        },
      ];
    },
    {
      name: "finalizeSale";
      discriminator: [62, 138, 254, 160, 192, 113, 177, 58];
      accounts: [
        {
          name: "admin";
          signer: true;
          relations: ["saleConfig"];
        },
        {
          name: "saleConfig";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [115, 97, 108, 101, 95, 99, 111, 110, 102, 105, 103];
              },
              {
                kind: "arg";
                path: "saleNonce";
              },
            ];
          };
        },
        {
          name: "usdcVault";
          writable: true;
        },
        {
          name: "treasury";
          writable: true;
        },
        {
          name: "usdcMint";
        },
        {
          name: "tokenProgram";
          address: "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb";
        },
      ];
      args: [
        {
          name: "saleNonce";
          type: "u64";
        },
      ];
    },
    {
      name: "initializeSale";
      discriminator: [208, 103, 34, 154, 179, 6, 125, 208];
      accounts: [
        {
          name: "admin";
          writable: true;
          signer: true;
        },
        {
          name: "saleConfig";
          docs: [
            "`sale_nonce` namespaces this sale's PDAs so a new round can be",
            "initialized without redeploying (v1 production usage is a single",
            "sale at nonce 0; the nonce exists so this doesn't have to be a hard",
            "global singleton).",
          ];
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [115, 97, 108, 101, 95, 99, 111, 110, 102, 105, 103];
              },
              {
                kind: "arg";
                path: "saleNonce";
              },
            ];
          };
        },
        {
          name: "openMint";
        },
        {
          name: "usdcMint";
        },
        {
          name: "presaleVaultAuthority";
          docs: [
            "used only as the expected owner of `presale_vault`. It signs",
            "`claim`'s OPEN transfer later; never read/written here.",
          ];
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  112,
                  114,
                  101,
                  115,
                  97,
                  108,
                  101,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116,
                ];
              },
            ];
          };
        },
        {
          name: "presaleVault";
          docs: [
            "The Community Presale allocation bucket, already funded at genesis",
            "(Phase 2) — verified here, not created here.",
          ];
        },
        {
          name: "usdcVault";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  115,
                  97,
                  108,
                  101,
                  95,
                  117,
                  115,
                  100,
                  99,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116,
                ];
              },
              {
                kind: "arg";
                path: "saleNonce";
              },
            ];
          };
        },
        {
          name: "treasury";
          docs: [
            "Destination for collected USDC once finalized (e.g. a treasury",
            "multisig's ATA). Not created or owned by this program.",
          ];
        },
        {
          name: "swapProgram";
          docs: [
            "`sale_config.swap_program` — see `contribute_with_swap` for why this",
            "program isn't invoked or validated further here. Production",
            "devnet/mainnet deployments must pass Jupiter's real, independently",
            "verified aggregator program id; test/CI deployments may pass a",
            "deterministic mock instead.",
          ];
        },
        {
          name: "tokenProgram";
          address: "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb";
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
        {
          name: "rent";
          address: "SysvarRent111111111111111111111111111111111";
        },
      ];
      args: [
        {
          name: "saleNonce";
          type: "u64";
        },
        {
          name: "params";
          type: {
            defined: {
              name: "initializeSaleParams";
            };
          };
        },
      ];
    },
    {
      name: "refund";
      discriminator: [2, 96, 183, 251, 63, 208, 46, 46];
      accounts: [
        {
          name: "buyer";
          signer: true;
          relations: ["contribution"];
        },
        {
          name: "saleConfig";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [115, 97, 108, 101, 95, 99, 111, 110, 102, 105, 103];
              },
              {
                kind: "arg";
                path: "saleNonce";
              },
            ];
          };
        },
        {
          name: "usdcVault";
          writable: true;
        },
        {
          name: "usdcMint";
        },
        {
          name: "contribution";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  99,
                  111,
                  110,
                  116,
                  114,
                  105,
                  98,
                  117,
                  116,
                  105,
                  111,
                  110,
                ];
              },
              {
                kind: "account";
                path: "saleConfig";
              },
              {
                kind: "account";
                path: "buyer";
              },
            ];
          };
        },
        {
          name: "buyerUsdc";
          writable: true;
        },
        {
          name: "tokenProgram";
          address: "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb";
        },
      ];
      args: [
        {
          name: "saleNonce";
          type: "u64";
        },
      ];
    },
    {
      name: "updateSaleParams";
      discriminator: [86, 207, 77, 222, 26, 93, 187, 111];
      accounts: [
        {
          name: "admin";
          signer: true;
          relations: ["saleConfig"];
        },
        {
          name: "saleConfig";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [115, 97, 108, 101, 95, 99, 111, 110, 102, 105, 103];
              },
              {
                kind: "arg";
                path: "saleNonce";
              },
            ];
          };
        },
      ];
      args: [
        {
          name: "saleNonce";
          type: "u64";
        },
        {
          name: "params";
          type: {
            defined: {
              name: "updateSaleParamsArgs";
            };
          };
        },
      ];
    },
  ];
  accounts: [
    {
      name: "contribution";
      discriminator: [182, 187, 14, 111, 72, 167, 242, 212];
    },
    {
      name: "saleConfig";
      discriminator: [86, 47, 71, 156, 87, 152, 149, 246];
    },
  ];
  errors: [
    {
      code: 6000;
      name: "unauthorized";
      msg: "Only the sale admin may perform this action";
    },
    {
      code: 6001;
      name: "whitelistTooLong";
      msg: "Stablecoin whitelist may not exceed MAX_STABLECOINS entries";
    },
    {
      code: 6002;
      name: "hardCapNotGreaterThanSoftCap";
      msg: "hard_cap must be greater than soft_cap";
    },
    {
      code: 6003;
      name: "invalidContributionBounds";
      msg: "min_contribution must be greater than zero and at most max_contribution";
    },
    {
      code: 6004;
      name: "invalidSaleWindow";
      msg: "end_time must be after start_time";
    },
    {
      code: 6005;
      name: "invalidSlippageBps";
      msg: "max_slippage_bps must be between 1 and 10_000";
    },
    {
      code: 6006;
      name: "saleNotStarted";
      msg: "The sale has not started yet";
    },
    {
      code: 6007;
      name: "saleEnded";
      msg: "The sale has already ended";
    },
    {
      code: 6008;
      name: "saleNotActive";
      msg: "The sale is not in the Active state";
    },
    {
      code: 6009;
      name: "assetNotWhitelisted";
      msg: "This asset is not on the presale's accepted-stablecoin whitelist";
    },
    {
      code: 6010;
      name: "useDirectUsdcPath";
      msg: "Use contribute_usdc for direct USDC contributions instead";
    },
    {
      code: 6011;
      name: "belowMinimumContribution";
      msg: "This contribution would be below the minimum required for a wallet's first contribution";
    },
    {
      code: 6012;
      name: "aboveMaximumContribution";
      msg: "This contribution would exceed the maximum allowed per wallet";
    },
    {
      code: 6013;
      name: "hardCapExceeded";
      msg: "This contribution would exceed the sale's hard cap";
    },
    {
      code: 6014;
      name: "swapProgramMismatch";
      msg: "The swap program account does not match sale_config.swap_program";
    },
    {
      code: 6015;
      name: "slippageExceeded";
      msg: "The swap's actual USDC output was below the required minimum (slippage exceeded)";
    },
    {
      code: 6016;
      name: "saleNotEnded";
      msg: "The sale has not ended yet";
    },
    {
      code: 6017;
      name: "saleAlreadyResolved";
      msg: "The sale has already been finalized or resolved";
    },
    {
      code: 6018;
      name: "saleNotFinalized";
      msg: "Claims are only allowed after the sale has been finalized";
    },
    {
      code: 6019;
      name: "alreadyClaimed";
      msg: "This contribution has already been claimed";
    },
    {
      code: 6020;
      name: "saleNotRefundable";
      msg: "Refunds are only allowed when the sale's soft cap was missed";
    },
    {
      code: 6021;
      name: "alreadyRefunded";
      msg: "This contribution has already been refunded";
    },
    {
      code: 6022;
      name: "overflow";
      msg: "Arithmetic overflow";
    },
  ];
  types: [
    {
      name: "contribution";
      docs: [
        "Per-buyer contribution record: PDA seeds `[CONTRIBUTION_SEED, sale_config, buyer]`.",
      ];
      type: {
        kind: "struct";
        fields: [
          {
            name: "buyer";
            type: "pubkey";
          },
          {
            name: "amountUsdc";
            docs: [
              "Cumulative USDC-equivalent contributed by this wallet, base units.",
            ];
            type: "u64";
          },
          {
            name: "openEntitlement";
            docs: [
              "OPEN base units this wallet is entitled to claim (1:1 with amount_usdc",
              "at the mint's decimals — OFS-4100 §3 confirms no presale vesting).",
            ];
            type: "u64";
          },
          {
            name: "claimed";
            type: "bool";
          },
          {
            name: "refunded";
            type: "bool";
          },
          {
            name: "bump";
            type: "u8";
          },
        ];
      };
    },
    {
      name: "initializeSaleParams";
      docs: [
        "Bundled instead of flattened so the generated `#[program]` dispatch entry",
        "point stays under clippy's too-many-arguments threshold, and so a future",
        "added field doesn't ripple through every caller's positional arg list.",
      ];
      type: {
        kind: "struct";
        fields: [
          {
            name: "hardCap";
            type: "u64";
          },
          {
            name: "softCap";
            type: "u64";
          },
          {
            name: "minContribution";
            type: "u64";
          },
          {
            name: "maxContribution";
            type: "u64";
          },
          {
            name: "maxSlippageBps";
            type: "u16";
          },
          {
            name: "startTime";
            type: "i64";
          },
          {
            name: "endTime";
            type: "i64";
          },
          {
            name: "stablecoinWhitelist";
            type: {
              vec: "pubkey";
            };
          },
        ];
      };
    },
    {
      name: "saleConfig";
      docs: [
        "Singleton sale configuration + running state (OFS-4200 §3, OFS-4100 §3).",
        "",
        "All economic parameters below are set once at `initialize_sale` from",
        "OFS-4100 §3's PROPOSED figures — they are instruction arguments, not",
        "compile-time constants, specifically so a later tokenomics sign-off",
        "(or a devnet-vs-mainnet difference) never requires a code change, only a",
        "different `initialize_sale` call.",
      ];
      type: {
        kind: "struct";
        fields: [
          {
            name: "admin";
            type: "pubkey";
          },
          {
            name: "openMint";
            docs: [
              "The OPEN token mint (fixed supply, genesis-minted — see Phase 2).",
            ];
            type: "pubkey";
          },
          {
            name: "usdcMint";
            docs: [
              "The USDC mint contributions are ultimately valued/held in.",
            ];
            type: "pubkey";
          },
          {
            name: "presaleVault";
            docs: [
              "Community Presale allocation bucket (OFS-4100 §2), owned by the",
              "`presale_vault` PDA — `claim` transfers out of this account.",
            ];
            type: "pubkey";
          },
          {
            name: "usdcVault";
            docs: [
              "USDC escrow token account (owned by this `SaleConfig` PDA itself)",
              "that holds contributions until `finalize_sale` sweeps them to",
              "`treasury`, or `refund` returns them if the soft cap is missed.",
            ];
            type: "pubkey";
          },
          {
            name: "treasury";
            docs: [
              "Destination for collected USDC once the sale finalizes successfully.",
            ];
            type: "pubkey";
          },
          {
            name: "swapProgram";
            docs: [
              "The trusted swap-aggregator program CPI'd into by `contribute_with_swap`.",
              "Production devnet/mainnet deployments must set this to Jupiter's real,",
              "verified aggregator program id; test/CI deployments may point it at a",
              "deterministic mock so the swap-forwarding logic is testable without a",
              "live, flaky mainnet-state clone. See `contribute_with_swap` for why",
              "this is safe regardless of which program is configured here: the",
              "*result* (a verified balance increase in `usdc_vault`) is what's",
              "trusted, not any account layout internal to this program.",
            ];
            type: "pubkey";
          },
          {
            name: "hardCap";
            docs: [
              "USDC base units (6 decimals). OFS-4100 §3 proposes 30_000_000_000_000.",
            ];
            type: "u64";
          },
          {
            name: "softCap";
            docs: ["USDC base units. OFS-4100 §3 proposes 5_000_000_000_000."];
            type: "u64";
          },
          {
            name: "minContribution";
            docs: [
              "USDC base units, applies to a wallet's first contribution only.",
            ];
            type: "u64";
          },
          {
            name: "maxContribution";
            docs: [
              "USDC base units, applies to a wallet's cumulative contributions.",
            ];
            type: "u64";
          },
          {
            name: "maxSlippageBps";
            docs: [
              "Basis points; a swap whose realized output falls below",
              "`expected_out * (10_000 - max_slippage_bps) / 10_000` is rejected.",
            ];
            type: "u16";
          },
          {
            name: "openDecimals";
            docs: [
              "Cached from `open_mint`/`usdc_mint` at `initialize_sale` so later",
              "instructions don't need to pass the mint accounts just to read",
              "decimals. `initialize_sale` requires open_decimals >= usdc_decimals",
              "so the USDC->OPEN scale-up below never underflows.",
            ];
            type: "u8";
          },
          {
            name: "usdcDecimals";
            type: "u8";
          },
          {
            name: "startTime";
            type: "i64";
          },
          {
            name: "endTime";
            type: "i64";
          },
          {
            name: "stablecoinWhitelist";
            type: {
              vec: "pubkey";
            };
          },
          {
            name: "totalRaised";
            docs: [
              "Running total of USDC-equivalent raised, in USDC base units.",
            ];
            type: "u64";
          },
          {
            name: "state";
            type: {
              defined: {
                name: "saleState";
              };
            };
          },
          {
            name: "bump";
            type: "u8";
          },
          {
            name: "usdcVaultBump";
            type: "u8";
          },
        ];
      };
    },
    {
      name: "saleState";
      docs: [
        "Lifecycle state of the presale (OFS-4200 §3).",
        "",
        "`Active -> Finalized` (hard cap reached, or end_time passed with soft cap",
        "met) or `Active -> SoftCapMissed` (end_time passed, soft cap unmet) are",
        "the only two transitions out of `Active`; both are terminal.",
      ];
      type: {
        kind: "enum";
        variants: [
          {
            name: "active";
          },
          {
            name: "finalized";
          },
          {
            name: "softCapMissed";
          },
        ];
      };
    },
    {
      name: "updateSaleParamsArgs";
      type: {
        kind: "struct";
        fields: [
          {
            name: "hardCap";
            type: "u64";
          },
          {
            name: "softCap";
            type: "u64";
          },
          {
            name: "minContribution";
            type: "u64";
          },
          {
            name: "maxContribution";
            type: "u64";
          },
          {
            name: "maxSlippageBps";
            type: "u16";
          },
          {
            name: "endTime";
            type: "i64";
          },
        ];
      };
    },
  ];
  constants: [
    {
      name: "bpsDenominator";
      docs: ["Basis-points denominator (10_000 = 100%)."];
      type: "u64";
      value: "10000";
    },
    {
      name: "contributionSeed";
      docs: [
        "PDA seed for a per-buyer `Contribution` record: [SEED, sale_config, buyer].",
      ];
      type: "bytes";
      value: "[99, 111, 110, 116, 114, 105, 98, 117, 116, 105, 111, 110]";
    },
    {
      name: "presaleVaultSeed";
      docs: [
        "PDA seed for the OPEN token vault holding the Community Presale",
        "allocation bucket (owner set at genesis — see ../scripts/genesis.ts).",
      ];
      type: "bytes";
      value: "[112, 114, 101, 115, 97, 108, 101, 95, 118, 97, 117, 108, 116]";
    },
    {
      name: "saleConfigSeed";
      docs: ["PDA seed for the singleton `SaleConfig` account (OFS-4200 §3)."];
      type: "bytes";
      value: "[115, 97, 108, 101, 95, 99, 111, 110, 102, 105, 103]";
    },
    {
      name: "saleUsdcVaultSeed";
      docs: [
        "PDA seed for the USDC escrow vault that holds contributions until",
        "`finalize_sale` sweeps them to the treasury (or `refund` returns them).",
      ];
      type: "bytes";
      value: "[115, 97, 108, 101, 95, 117, 115, 100, 99, 95, 118, 97, 117, 108, 116]";
    },
  ];
};
