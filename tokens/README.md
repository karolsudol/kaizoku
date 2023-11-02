# Mint NFT

[PAYER-ACC](https://explorer.solana.com/address/Dqursd1QsFnQUt7Jo3ajYPH7Ldsyqrqn22nbkheiatdi/tokens?cluster=devnet)
[TOKEN-1](https://explorer.solana.com/address/3Y5cjnnRFwwBVAAyMKuSZJSkCft597geeFnovsu5v9bT?cluster=devnet)
[TOKEN-2](https://explorer.solana.com/address/H4NwmnhvJw6qeSj1sn4DAva5Tz4ZdLyAY22LgV1D3NpQ?cluster=devnet)
[NFT](https://explorer.solana.com/address/BHLHPzzkvMqAjEMBXxM2o9wLuEbU2AQu4GykpcG9fUQ3?cluster=devnet)




## Setup locally

1. Clone this repo to your local system
2. Install the packages via `yarn install`
3. Copy rename the `example.env` file to be named `.env`
4. Update the `RPC_URL` variable to be the cluster URL of a supporting RPC provider

If you have the Solana CLI installed locally: update the `LOCAL_PAYER_JSON_ABSPATH` environment
variable to be the **_absolute path_** of your local testing wallet keypair JSON file.

## Scripts

- [`1.simpleTransaction.ts`](./scripts/extended/1.simpleTransaction.ts)
- [`2.complexTransaction.ts`](./scripts/extended/2.complexTransaction.ts)
- [`3.createTokenWithMetadata.ts`](./scripts/extended/3.createTokenWithMetadata.ts)
- [`4.mintTokens.ts`](./scripts/extended/4.mintTokens.ts)
- [`5.updateMetadata.ts`](./scripts/extended/5.updateMetadata.ts)
- [`6.createNFTs.ts`](./scripts/extended/6.createNFTs.ts)


> **Note:** Running each of these scripts may save some various bits of data to a `.local_keys`
> folder within this repo for use by the other scripts later in this ordered list. Therefore,
> running them in a different order may result in them not working as written/desired. You have been
> warned :)

### Running the included Scripts

Once setup locally, you will be able to run the scripts included within this repo:

```
yarn demo ./scripts/<script>
```

#### `1.simpleTransaction.ts`

A brief introduction to the Solana web3.js package. Demonstrating how to build and send simple
transactions to the blockchain

#### `2.complexTransaction.ts`

An introduction to more complex transactions using Solana web3.js Demonstrates how to build a more
complex transaction, with multiple instructions.

#### `3.createTokenWithMetadata.ts`

Demonstrates how to create a SPL token and store it's metadata on chain (using the Metaplex MetaData
program)

#### `4.mintTokens.ts`

Demonstrates how to create new SPL tokens (aka "minting tokens") into an existing SPL Token Mint

#### `5.updateMetadata.ts`

Demonstrates how to update the metadata for an SPL token, using the Metaplex MetadataProgram

#### `6.createNFTs.ts`

Demonstrates how to mint NFTs and store their metadata on chain using the Metaplex MetadataProgram