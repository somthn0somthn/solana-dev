import { ChangeEvent, FC, useState } from 'react'
import styles from '../styles/Home.module.css'
import { useFormContext } from './FormContext';

export const RecipientInput: FC = () => {
    const { recipient, setRecipient } = useFormContext();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setRecipient(event.target.value)
    }
    
	return (
		<div className={styles.form}>
            <label className={styles.formField}>
                Recipient
                <input 
                    type="text"
                    value={recipient}
                    onChange={handleChange}
                    placeholder="Enter Recipient PubKey"
                    className={styles.input}
                /> 
            </label>
        </div>
	);
};

