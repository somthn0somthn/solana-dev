import "dotenv/config"
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import { Connection, LAMPORTS_PER_SOL, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { getDomainKey, getDomainKeySync, NameRegistryState } from '@bonfida/spl-name-service';

const invalidPublicKey = "InvalidPublicKey1234567890";

const keypair = getKeypairFromEnvironment("SECRET_KEY");

const publicKey = keypair.publicKey;

const address = publicKey.toBase58()

console.log(`addrss is ${address}`)

const connection = new Connection("https://api.devnet.solana.com", "confirmed");

function validateSolAddress(address: string): string | null {
    try {
        let pubkey = new PublicKey(address)
        let isSolana = PublicKey.isOnCurve(pubkey.toBuffer())
        return isSolana ? null : 'Address is not on curve'
    } catch (error) {
        return error.message
    }
}

async function checkBalance() {
    const validationError = validateSolAddress(publicKey.toBase58());
    if (validationError === null) {
        const balanceInLamports = await connection.getBalance(publicKey);
        const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;
        console.log(
            `💰 Finished! The balance for the wallet at address ${publicKey} is ${balanceInSOL}!`
        );
    } else {
        console.log(`ERROR: the public key ${invalidPublicKey} is invalid. ${validationError}`);
    }
}

checkBalance()

const domain = "mccann.sol"
const connection2 = new Connection(clusterApiUrl("mainnet-beta"));
const { pubkey } = await getDomainKeySync(domain);
const realBalanceInLamports = await connection.getBalance(pubkey);
const realBalanceInSol = realBalanceInLamports / LAMPORTS_PER_SOL ;

console.log(
    `On mainnet, ${domain} has a balance of ${realBalanceInSol}!`
);