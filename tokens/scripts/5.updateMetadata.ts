import { payer, connection } from "@/lib/vars";
import {
    buildTransaction,
    explorerURL,
    extractSignatureFromFailedTransaction,
    loadPublicKeysFromFile,
    printConsoleSeparator,
} from "@/lib/helpers";

import { PublicKey } from "@solana/web3.js";
import {
    PROGRAM_ID as METADATA_PROGRAM_ID,
    createUpdateMetadataAccountV2Instruction,
} from "@metaplex-foundation/mpl-token-metadata";

(async () => {
    console.log("Payer address:", payer.publicKey.toBase58());

    let localKeys = loadPublicKeysFromFile();
    if (!localKeys?.tokenMint)
        return console.warn("No local keys were found. Please run '3.createTokenWithMetadata.ts'");

    const tokenMint: PublicKey = localKeys.tokenMint;

    console.log("==== Local PublicKeys loaded ====");
    console.log("Token's mint address:", tokenMint.toBase58());
    console.log(explorerURL({ address: tokenMint.toBase58() }));

    const tokenConfig = {
        name: "NewKaizoku",
        symbol: "nKAI",
        uri: "https://thisisnot.arealurl/new.json",
    };

    const metadataAccount = PublicKey.findProgramAddressSync(
        [Buffer.from("metadata"), METADATA_PROGRAM_ID.toBuffer(), tokenMint.toBuffer()],
        METADATA_PROGRAM_ID,
    )[0];

    console.log("Metadata address:", metadataAccount.toBase58());

    const updateMetadataInstruction = createUpdateMetadataAccountV2Instruction(
        {
            metadata: metadataAccount,
            updateAuthority: payer.publicKey,
        },
        {
            updateMetadataAccountArgsV2: {
                data: {
                    creators: null,
                    name: tokenConfig.name,
                    symbol: tokenConfig.symbol,
                    uri: tokenConfig.uri,
                    sellerFeeBasisPoints: 0,
                    collection: null,
                    uses: null,
                },
                isMutable: true,
                primarySaleHappened: null,
                updateAuthority: payer.publicKey,
            },
        },
    );




})();
