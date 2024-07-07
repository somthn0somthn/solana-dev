import { ChangeEvent, FC, useState } from 'react'
import styles from '../styles/Home.module.css'

interface AccountOwnerInputProps {
    value: string;
    setValue: (value: string) => void;
}

export const AccountOwnerInput: FC<AccountOwnerInputProps> = ({ value, setValue }) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
    }
    
	return (
		<div className={styles.form}>
            <label className={styles.formField}>
                Token Account Owner - wire me!
                <input 
                    type="text"
                    value={value}
                    onChange={handleChange}
                    placeholder="Enter Token Account Owner PublicKey"
                    className={styles.input}
                /> 
            </label>
        </div>
	);
};

