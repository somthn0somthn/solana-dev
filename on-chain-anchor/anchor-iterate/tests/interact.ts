import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { AnchorIterate } from "../target/types/anchor_iterate";
import { Connection, clusterApiUrl } from "@solana/web3.js"

const connection = new Connection(clusterApiUrl("devnet"));
console.log(`✅ Connected!`)