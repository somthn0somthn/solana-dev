import { ChangeEvent, FC, useState } from 'react'
import styles from '../styles/Home.module.css'
import { useFormContext } from './FormContext';

export const AccountOwnerInput: FC = () => {
    const { associatedAccountOwner, setAssociatedAccountOwner} = useFormContext();
    
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setAssociatedAccountOwner(event.target.value)
    }
    
	return (
		<div className={styles.form}>
            <label className={styles.formField}>
                Token Account Owner
                <input 
                    type="text"
                    value={associatedAccountOwner}
                    onChange={handleChange}
                    placeholder="Enter Token Account Owner PublicKey"
                    className={styles.input}
                /> 
            </label>
        </div>
	);
};

