import { FC } from 'react'
import styles from '../styles/PingButton.module.css'
import { useWallet, useConnection } from '@solana/wallet-adapter-react'
import * as spl from '@solana/spl-token'
import { PublicKey, Transaction } from '@solana/web3.js'
import { useFormContext } from './FormContext';

export const MintTokensButton: FC = () => {
    const { tokenMint, associatedAccountOwner, recipient, tokenAmount } = useFormContext();
    const { publicKey, sendTransaction } = useWallet();
	const { connection } = useConnection();

    const handleClick = async () => {
		if (!publicKey || !connection) {
			alert("Your wallet isn't connected - so can't mint and transfer tokens");
			return;
		}

		if (!tokenMint || !recipient || !tokenAmount) {
			alert("Missing required fields: tokenMint, recipient, or tokenAmount.");
			return;
		}
		
		try {

			const tokenMintPubKey = new PublicKey(tokenMint);
			const recipientPubKey = new PublicKey(recipient);

			const associatedTokenAccount = await spl.getAssociatedTokenAddress(
				tokenMintPubKey,
				recipientPubKey
			);

			const accountInfo = await connection.getAccountInfo(associatedTokenAccount);

			const transaction = new Transaction();

			if (!accountInfo) {
				const createAssociatedTokenAccountInstruction = spl.createAssociatedTokenAccountInstruction(
					publicKey, 
					associatedTokenAccount,
					recipientPubKey,
					tokenMintPubKey,
				);
				transaction.add(createAssociatedTokenAccountInstruction);
			}

			const mintInstruction = spl.createMintToInstruction(
				tokenMintPubKey,
				associatedTokenAccount,
				publicKey,
				tokenAmount * 10 ** 2
			)

			transaction.add(mintInstruction);

			const signature = await sendTransaction(transaction, connection);
			console.log(`Transaction sent with signature: ${signature}`);

			const link = `https://explorer.solana.com/tx/${signature}?cluster=devnet`;
			console.log(`✅ Finished! Minted and transferred tokens: ${link}`);

		} catch (error) {
			console.log('Transaction failed: ', error);
			alert("Transaction failed - see console for details.S")
		}
	}

	return (
		<div className={styles.buttonContainer} onClick={handleClick}>
			<button className={styles.button}>Mint Tokens</button>
		</div>
	)
}

