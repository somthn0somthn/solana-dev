import { FC } from 'react'
import styles from '../styles/PingButton.module.css'
import { useWallet, useConnection } from '@solana/wallet-adapter-react'
import * as spl from '@solana/spl-token'
import { Keypair, SystemProgram, Transaction } from '@solana/web3.js';

export const CreateMintButton: FC = () => {
	const { publicKey, sendTransaction } = useWallet();
	const { connection } = useConnection();

    const onClick = async () => {
		if (!publicKey || !connection) {
			alert("Your wallet isn't connected -  so cant create mint");
			return
		}
        
		try {
			
			const mintKeypair = Keypair.generate();

			console.log(`Generated mint address is ${mintKeypair.publicKey}`);

			const lamports = await spl.getMinimumBalanceForRentExemptMint(connection);

			const transaction = new Transaction().add(
				SystemProgram.createAccount({
					fromPubkey: publicKey,
					newAccountPubkey: mintKeypair.publicKey,
					space: spl.MINT_SIZE,
					lamports,
					programId: spl.TOKEN_PROGRAM_ID,
				}),
				spl.createInitializeMintInstruction(
					mintKeypair.publicKey,
					2,
					publicKey,
					publicKey,
					spl.TOKEN_PROGRAM_ID
				)
			);

			const signature = await sendTransaction(transaction, connection, {
				signers: [mintKeypair],
			});

			console.log(`Transaction sent with signature: ${signature}`);

			const link = `https://explorer.solana.com/tx/${signature}?cluster=devnet`;
			console.log(`✅ Finished! Created token mint: ${link}`);
		} catch (error) {
			console.error('Transaction failed: ', error);
			alert('Transaction failed. Please check the console for more details.')
		}
    }
    
	return (
		<div className={styles.buttonContainer} onClick={onClick}>
			<button className={styles.button}>Create Mint</button>
		</div>
	)
}

