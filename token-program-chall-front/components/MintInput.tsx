import { ChangeEvent, FC, useState } from 'react'
import styles from '../styles/Home.module.css'

interface MintInputProps {
    value: string;
    setValue: (value: string) => void;
}

export const MintInput: FC<MintInputProps> = ({ value, setValue }) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
    };
    
	return (
		<div className={styles.form}>
            <label className={styles.formField}>
                Token Mint - wire me!f
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

