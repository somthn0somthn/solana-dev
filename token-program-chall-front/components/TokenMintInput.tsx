import { ChangeEvent, FC, useState } from 'react'
import styles from '../styles/Home.module.css'


/* REDUNDANT YOU CAN PROBABLY DELETE THIS
 */


interface TokenMintInputProps {
    value: string;
    setValue: (value: string) => void;
}

export const TokenMintInput: FC<TokenMintInputProps> = ({ value, setValue }) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
    }
    
	return (
		<div className={styles.form}>
            <label className={styles.formField}>
                Token Mint - wire me!
                <input 
                    type="text"
                    value={value}
                    onChange={handleChange}
                    placeholder="Enter Token Mint"
                    className={styles.input}
                /> 
            </label>
        </div>
	);
};

