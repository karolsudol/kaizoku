
import { explorerURL, loadPublicKeysFromFile, printConsoleSeparator } from "@/lib/helpers";
import { connection, payer } from "@/lib/vars";

import { Metaplex, bundlrStorage, keypairIdentity } from "@metaplex-foundation/js";
import { PublicKey } from "@solana/web3.js";

(async () => {

    console.log("Payer address:", payer.publicKey.toBase58());

    let localKeys = loadPublicKeysFromFile();

    if (!localKeys?.tokenMint)
        return console.warn("No local keys were found. Please run '3.createTokenWithMetadata.ts'");

    const tokenMint: PublicKey = localKeys.tokenMint;

    console.log("==== Local PublicKeys loaded ====");
    console.log("Token's mint address:", tokenMint.toBase58());
    console.log(explorerURL({ address: tokenMint.toBase58() }));

    const metadata = {
        name: "Kaizoku",
        symbol: "KAI",
        description:
            "Sayonara Mofos",
        image:
            "https://bafybeic75qqhfytc6xxoze2lo5af2lfhmo2kh4mhirelni2wota633dgqu.ipfs.nftstorage.link/",
    };

    const metaplex = Metaplex.make(connection)
        .use(keypairIdentity(payer))
        .use(
            bundlrStorage({
                address: "https://devnet.bundlr.network",
                providerUrl: "https://api.devnet.solana.com",
                timeout: 60000,
            }),
        );

    console.log("Uploading metadata...");

    const { uri } = await metaplex.nfts().uploadMetadata(metadata);

    console.log("Metadata uploaded:", uri);

    printConsoleSeparator("NFT details");

    console.log("Creating NFT using Metaplex...");

    const { nft, response } = await metaplex.nfts().create({
        uri,
        name: metadata.name,
        symbol: metadata.symbol,
        sellerFeeBasisPoints: 500, // Represents 5.00%.

        //
        isMutable: true,
    });

    console.log(nft);

    printConsoleSeparator("NFT created:");
    console.log(explorerURL({ txSignature: response.signature }));

    return;

    printConsoleSeparator("Find by mint:");

    const mintInfo = await metaplex.nfts().findByMint({
        mintAddress: tokenMint,
    });
    console.log(mintInfo);

})();