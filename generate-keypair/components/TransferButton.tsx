import { FC } from 'react'
import styles from '../styles/PingButton.module.css'
import { SystemProgram, PublicKey, Transaction } from "@solana/web3.js";
import "dotenv/config";
import { useWallet, useConnection } from '@solana/wallet-adapter-react';

interface TransferButtonInputProps {
	integerValue: number;
	addressValue: string;
}

export const TransferButton: FC<TransferButtonInputProps> = ({ integerValue, addressValue }) => {
	const { connection } = useConnection();
	const { publicKey, sendTransaction } = useWallet();

	const onClick = async () => {
		if (addressValue === '') {
			alert('Recipient address not specified. Cannot be empty.');
			return;
		}

		if (integerValue === 0) {
			alert('Sorry, you cant send 0 lamports. Whats the point?')
			return;
		}

		const recipientPubKey = new PublicKey(addressValue);
		const transaction = new Transaction()

		const sendSolInstruction = SystemProgram.transfer({
			fromPubkey: publicKey,
			toPubkey: recipientPubKey,
			lamports: integerValue
		})

		transaction.add(sendSolInstruction)

		try {
			const signature = await sendTransaction(transaction, connection);
			console.log(`Transaction sent with signature: ${signature}`);

			console.log(
				`💸 Finished! Sent ${integerValue} to the address ${recipientPubKey}. `
			  );
		} catch (error) {
			console.error('Transaction failed:', error);
			alert('Transaction failed. Please check the console for more details.');
		}
	}

	return (
		<div className={styles.buttonContainer} onClick={onClick}>
			<button className={styles.button}>Transfer SOL</button>
		</div>
	)
}