import { ChangeEvent, FC } from 'react';
import styles from '../styles/Home.module.css';
import { useFormContext } from './FormContext';

export const MintInputAbove: FC = () => {
    const { tokenMint, setTokenMint } = useFormContext();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTokenMint(event.target.value);
    };

    return (
        <div className={styles.form}>
            <label className={styles.formField}>
                Token Mint
                <input
                    type="text"
                    value={tokenMint}
                    onChange={handleChange}
                    placeholder="Enter Token Mint"
                    className={styles.input}
                />
            </label>
        </div>
    );
};
