import { ChangeEvent, FC } from 'react';
import styles from '../styles/Home.module.css';
import { useFormContext } from './FormContext';

export const MintInputBelow: FC = () => {
    const { tokenMint, setTokenMint } = useFormContext();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTokenMint(event.target.value);
    };

    return (
        <div className={styles.formField}>
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
