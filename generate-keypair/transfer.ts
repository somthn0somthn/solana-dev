import {
    Connection,
    Transaction,
    SystemProgram,
    sendAndConfirmTransaction,
    PublicKey,
} from "@solana/web3.js";
import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers"

const suppliedToPubkey = process.argv[2] || null;

if (!suppliedToPubkey) {
    console.log(`Please provide a public key to send to`);
    process.exit(1);
}

const senderKeypair = getKeypairFromEnvironment("SECRET_KEY");

console.log(`suppliedToPubkey: ${suppliedToPubkey}`);

const toPubkey = new PublicKey(suppliedToPubkey);

const connection = new Connection("https://api.devnet.solana.com", "confirmed");


console.log(
    `✅ Loaded our own keypair, the destination public key, and connected to Solana`
  );

const transaction = new Transaction();

const LAMPORTS_TO_SEND = 5000000;

const sendSolInstruction = SystemProgram.transfer({
    fromPubkey: senderKeypair.publicKey,
    toPubkey,
    lamports: LAMPORTS_TO_SEND,
});

transaction.add(sendSolInstruction);

const signature = await sendAndConfirmTransaction(connection, transaction, [
    senderKeypair,
]);

console.log(
    `💸 Finished! Sent ${LAMPORTS_TO_SEND} to the address ${toPubkey}. `
  );
  console.log(`Transaction signature is ${signature}!`);

/**CHALLENGE QUESTIONS */

/**Transfer cost ◎0.000005 Sol or  0.00067 USD*/

/** https://explorer.solana.com/tx/2qREHUBoWf2LEY5pJUufwGm8aTZFQDH6sM6fheNzUokgUFKxA3NAitEUW9rL6RhY7RmXdqiveeYfBcH8NwXpxcpf?cluster=devnet*/

/** Near instantaneous */

/**I don't see CONFIRMED anywhere but I'm assuming it means a validator has processed 
 * and approved the transaction and incorporated it into a block which has been spread
 */

