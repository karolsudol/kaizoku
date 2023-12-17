import { Connection, LAMPORTS_PER_SOL, PublicKey, PublicKeyInitData, clusterApiUrl } from "@solana/web3.js";

export async function checkBalance(pubKeyString: PublicKeyInitData) {
    const publicKey = new PublicKey(pubKeyString);
    const connection = new Connection(clusterApiUrl("devnet"));
    const balanceInLamports = await connection.getBalance(publicKey);
    return balanceInLamports / LAMPORTS_PER_SOL;
}
