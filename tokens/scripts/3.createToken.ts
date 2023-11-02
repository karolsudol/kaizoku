import { payer, testWallet, connection } from "@/lib/vars";

import {
    buildTransaction,
    explorerURL,
    extractSignatureFromFailedTransaction,
    printConsoleSeparator,
    savePublicKeyToFile,
} from "@/lib/helpers";

import { Keypair, PublicKey, SystemProgram } from "@solana/web3.js";
import { MINT_SIZE, TOKEN_PROGRAM_ID, createInitializeMint2Instruction } from "@solana/spl-token";

import {
    PROGRAM_ID as METADATA_PROGRAM_ID,
    createCreateMetadataAccountV3Instruction,
} from "@metaplex-foundation/mpl-token-metadata";

(async () => {


})();
