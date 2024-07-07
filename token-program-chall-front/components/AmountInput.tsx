import { ChangeEvent, FC, useState } from 'react'
import styles from '../styles/Home.module.css'

interface AmountInputProps {
    value: number;
    setValue: (value: number) => void;
}

export const AmountInput: FC<AmountInputProps> = ({ value, setValue }) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        const numericValue = inputValue === '' ? 0 : parseInt(inputValue, 10);
        setValue(numericValue)
    }
    
	return (
		<div className={styles.form}>
            <label className={styles.formField}>
                Amount Tokens to Mint - wire me!
                <input 
                    type="number"
                    value={value}
                    onChange={handleChange}
                    placeholder="Enter Recipient PubKey"
                    className={styles.input}
                /> 
            </label>
        </div>
	);
};

