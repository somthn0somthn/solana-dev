import { FC, useState } from 'react'
import styles from '../styles/PingButton.module.css'

interface TokenAccountButtonProps {
    mintValue: string;
    accountOwnerValue: string;
}

export const TokenAccountButton: FC<TokenAccountButtonProps> = ({ mintValue, accountOwnerValue }) => {
    const handleClick = () => {
        console.log(`Mint: ${mintValue}, Account Owner: ${accountOwnerValue}`)
    }

	return (
		<div className={styles.buttonContainer} onClick={handleClick}>
			<button className={styles.button}>Create Token Account - wire me!</button>
		</div>
	)
}

