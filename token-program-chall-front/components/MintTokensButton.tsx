import { FC, useState } from 'react'
import styles from '../styles/PingButton.module.css'
import { useWallet, useConnection } from '@solana/wallet-adapter-react'
import * as spl from '@solana/spl-token'
import { PublicKey, Transaction } from '@solana/web3.js'
import { useFormContext } from './FormContext';

export const MintTokensButton: FC = () => {
    const { tokenMint, associatedAccountOwner, recipient, tokenAmount } = useFormContext();
    
    const handleClick = () => {
        console.log(`TokenMint: ${tokenMint} \n AssociatedAccount: ${associatedAccountOwner} \n recipient: ${recipient} \n tokenAmount: ${tokenAmount}`);
    }

	return (
		<div className={styles.buttonContainer} onClick={handleClick}>
			<button className={styles.button}>Mint Tokens - wire me!</button>
		</div>
	)
}

