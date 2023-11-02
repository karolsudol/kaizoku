import { connection, payer, testWallet } from "@/lib/vars";

import {
    buildTransaction,
    explorerURL,
    extractSignatureFromFailedTransaction,
    printConsoleSeparator,
    savePublicKeyToFile,
} from "@/lib/helpers";

import { MINT_SIZE, TOKEN_PROGRAM_ID, createInitializeMint2Instruction } from "@solana/spl-token";
import { Keypair, PublicKey, SystemProgram } from "@solana/web3.js";

import {
    PROGRAM_ID as METADATA_PROGRAM_ID,
    createCreateMetadataAccountV3Instruction,
} from "@metaplex-foundation/mpl-token-metadata";


(async () => {

    console.log("Payer address:", payer.publicKey.toBase58());
    console.log("Test wallet address:", testWallet.publicKey.toBase58());

    const mintKeypair = Keypair.generate();
    console.log("Mint address:", mintKeypair.publicKey.toBase58());

    const tokenConfig = {
        decimals: 2,
        name: "Kaizoku",
        symbol: "KAI",
        uri: "https://thisisnot.arealurl/info.json",
    };

    const createMintAccountInstruction = SystemProgram.createAccount({
        fromPubkey: payer.publicKey,
        newAccountPubkey: mintKeypair.publicKey,
        space: MINT_SIZE,
        lamports: await connection.getMinimumBalanceForRentExemption(MINT_SIZE),
        programId: TOKEN_PROGRAM_ID,
    });

    const initializeMintInstruction = createInitializeMint2Instruction(
        mintKeypair.publicKey,
        tokenConfig.decimals,
        payer.publicKey,
        payer.publicKey,
    );

    const metadataAccount = PublicKey.findProgramAddressSync(
        [Buffer.from("metadata"), METADATA_PROGRAM_ID.toBuffer(), mintKeypair.publicKey.toBuffer()],
        METADATA_PROGRAM_ID,
    )[0];

    console.log("Metadata address:", metadataAccount.toBase58());

    // Create the Metadata account for the Mint
    const createMetadataInstruction = createCreateMetadataAccountV3Instruction(
        {
            metadata: metadataAccount,
            mint: mintKeypair.publicKey,
            mintAuthority: payer.publicKey,
            payer: payer.publicKey,
            updateAuthority: payer.publicKey,
        },
        {
            createMetadataAccountArgsV3: {
                data: {
                    creators: null,
                    name: tokenConfig.name,
                    symbol: tokenConfig.symbol,
                    uri: tokenConfig.uri,
                    sellerFeeBasisPoints: 0,
                    collection: null,
                    uses: null,
                },
                // `collectionDetails` - for non-nft type tokens, normally set to `null` to not have a value set
                collectionDetails: null,
                // should the metadata be updatable?
                isMutable: true,
            },
        },
    );

    /**
     * Build the transaction to send to the blockchain
     */

    const tx = await buildTransaction({
        connection,
        payer: payer.publicKey,
        signers: [payer, mintKeypair],
        instructions: [
            createMintAccountInstruction,
            initializeMintInstruction,
            createMetadataInstruction,
        ],
    });

    printConsoleSeparator();

    try {

        const sig = await connection.sendTransaction(tx);


        console.log("Transaction completed.");
        console.log(explorerURL({ txSignature: sig }));

        // locally save our addresses for the demo
        savePublicKeyToFile("tokenMint", mintKeypair.publicKey);
    } catch (err) {
        console.error("Failed to send transaction:");
        console.log(tx);

        const failedSig = await extractSignatureFromFailedTransaction(connection, err);
        if (failedSig) console.log("Failed signature:", explorerURL({ txSignature: failedSig }));

        throw err;
    }

})();
