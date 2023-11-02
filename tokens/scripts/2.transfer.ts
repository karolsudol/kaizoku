
import { payer, testWallet, connection, STATIC_PUBLICKEY } from "@/lib/vars";
import { explorerURL, printConsoleSeparator } from "@/lib/helpers";

import { SystemProgram, TransactionMessage, VersionedTransaction } from "@solana/web3.js";

(async () => {

    console.log("Payer address:", payer.publicKey.toBase58());
    console.log("Test wallet address:", testWallet.publicKey.toBase58());

    const space = 0;
    const balanceForRentExemption = await connection.getMinimumBalanceForRentExemption(space);

    const createAccountIx = SystemProgram.createAccount({
        fromPubkey: payer.publicKey,
        newAccountPubkey: testWallet.publicKey,
        lamports: balanceForRentExemption + 2_000_000,
        space,
        programId: SystemProgram.programId,
    });

    const transferToTestWalletIx = SystemProgram.transfer({
        lamports: balanceForRentExemption + 100_000,
        fromPubkey: payer.publicKey,
        toPubkey: testWallet.publicKey,
        programId: SystemProgram.programId,
    });





})();