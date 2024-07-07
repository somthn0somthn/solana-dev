import { FC, useState } from 'react'
import styles from '../styles/PingButton.module.css'

interface TokenAccountButtonProps {
    mintValue: string;
    recipientValue: string;
    amountValue: number;
}

export const MintTokensButton: FC<TokenAccountButtonProps> = ( { mintValue, recipientValue, amountValue }) => {
    const handleClick = () => {
        console.log(`Token Mint: ${mintValue}, Recipient: ${recipientValue}, Token Amount: ${amountValue}`)
    }

	return (
		<div className={styles.buttonContainer} onClick={handleClick}>
			<button className={styles.button}>Mint Tokens - wire me!</button>
		</div>
	)
}

