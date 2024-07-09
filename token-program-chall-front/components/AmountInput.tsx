import { ChangeEvent, FC, useState } from 'react'
import styles from '../styles/Home.module.css'
import { useFormContext } from './FormContext';


export const AmountInput: FC = () => {
    const { tokenAmount, setTokenAmount } = useFormContext();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        const numericValue = inputValue === '' ? 0 : parseInt(inputValue, 10);
        setTokenAmount(numericValue);
    }
    
	return (
		<div className={styles.form}>
            <label className={styles.formField}>
                Amount Tokens to Mint
                <input 
                    type="number"
                    value={tokenAmount}
                    onChange={handleChange}
                    placeholder="Enter Recipient PubKey"
                    className={styles.input}
                /> 
            </label>
        </div>
	);
};

