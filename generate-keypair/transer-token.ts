import "dotenv/config";
import {
    getExplorerLink,
    getKeypairFromEnvironment,
} from "@solana-developers/helpers";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";

const connection = new Connection(clusterApiUrl("devnet"));

const sender = getKeypairFromEnvironment("SECRET_KEY");

console.log(
    `🔑 Loaded our keypair securely, using an env file! Our public key is: ${sender.publicKey.toBase58()}`
  );

const recipient = new PublicKey(`${process.env.SECOND_PUB_KEY}`);

const tokenMintAccount = new PublicKey(`${process.env.MINT_ADDRESS}`);

const MINOR_UNITS_PER_MAJOR_UNITS = Math.pow(10, 2);

console.log(`💸 Attempting to send 1 token to ${recipient.toBase58()}...`);

const sourceTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection, 
    sender,
    tokenMintAccount,
    sender.publicKey
);

const destinationTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection, 
    sender,
    tokenMintAccount,
    recipient,
)

const signature = await transfer(
    connection,
    sender,
    sourceTokenAccount.address,
    destinationTokenAccount.address,
    sender,
    2 * MINOR_UNITS_PER_MAJOR_UNITS
);

const explorerLink = getExplorerLink("transaction", signature, "devnet");

console.log(`✅ Transaction confirmed, explorer link is: ${explorerLink}!`);
