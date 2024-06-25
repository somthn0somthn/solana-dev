import { Keypair } from "@solana/web3.js";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import "dotenv/config"

const connection = new Connection(clusterApiUrl("devnet"));
const address =  new PublicKey(`${process.env.SECOND_PUB_KEY}`);
const balance = await connection.getBalance(address);

console.log(`The balance of the account at ${address} is ${balance} lamports`); 
console.log(`✅ Finished!`)
