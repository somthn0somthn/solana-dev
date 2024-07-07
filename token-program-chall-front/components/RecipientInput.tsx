import { ChangeEvent, FC, useState } from 'react'
import styles from '../styles/Home.module.css'

interface RecipientInputProps {
    value: string;
    setValue: (value: string) => void;
}

export const RecipientInput: FC<RecipientInputProps> = ({ value, setValue }) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
    }
    
	return (
		<div className={styles.form}>
            <label className={styles.formField}>
                Recipient - wire me!
                <input 
                    type="text"
                    value={value}
                    onChange={handleChange}
                    placeholder="Enter Recipient PubKey"
                    className={styles.input}
                /> 
            </label>
        </div>
	);
};

