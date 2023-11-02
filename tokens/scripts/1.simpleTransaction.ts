
import { explorerURL, printConsoleSeparator } from "@/lib/helpers";
import { connection, payer } from "@/lib/vars";

import {
    Keypair,
    LAMPORTS_PER_SOL,
    SystemProgram,
    TransactionMessage,
    VersionedTransaction,
} from "@solana/web3.js";

(async () => {

    console.log("Payer address:", payer.publicKey.toBase58());
    const currentBalance = await connection.getBalance(payer.publicKey);
    console.log("Current balance of 'payer' (in lamports):", currentBalance);
    console.log("Current balance of 'payer' (in SOL):", currentBalance / LAMPORTS_PER_SOL);

    const keypair = Keypair.generate();
    console.log("New keypair generated:", keypair.publicKey.toBase58());

    const space = 0;
    const lamports = await connection.getMinimumBalanceForRentExemption(space);
    console.log("Total lamports:", lamports);











})();