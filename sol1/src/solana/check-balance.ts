

import { Connection, LAMPORTS_PER_SOL, PublicKey, clusterApiUrl } from "@solana/web3.js";

const publicKey = new PublicKey("BFm2SLA8xcjWZP7tbLMFWyXaTi8ZvvYthfXoNMxY3sGC");
const connection = new Connection(clusterApiUrl("devnet"));

// const connection = new Connection("https://api.devnet.solana.com", "confirmed");

const balanceInLamports = await connection.getBalance(publicKey);

const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;

console.log(
    `💰 Finished! The balance for the wallet at address ${publicKey} is ${balanceInSOL}!`
);

const suppliedPublicKey = process.argv[2];
if (!suppliedPublicKey) {
    throw new Error("Provide a public key to check the balance of!");
}

const balanceInSOLKe2 = balanceInLamports / LAMPORTS_PER_SOL;

console.log(
    `💰 Finished! The balance for the wallet at address ${suppliedPublicKey} is ${balanceInSOLKe2}!`
)
