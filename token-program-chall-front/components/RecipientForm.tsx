import React, { useState } from 'react';
import styles from '../styles/Home.module.css';
import { MintInput } from '../components/MintInput';
import { RecipientInput } from '../components/RecipientInput';
import { AmountInput } from '../components/AmountInput';
import { MintTokensButton } from '../components/MintTokensButton';

export const RecipientForm: React.FC = () => {
    const [mintValue, setMintValue] = useState<string>('');
    const [recipientValue, setrecipientValue] = useState<string>('');
    const [amountValue, setAmountValue] = useState<number>(0);

    return (
        <div className={styles.form}>
            <MintInput value={mintValue} setValue={setMintValue} />
            <RecipientInput value={recipientValue} setValue={setrecipientValue} />
            <AmountInput value={amountValue} setValue={setAmountValue} />
            <MintTokensButton mintValue={mintValue} recipientValue={recipientValue} amountValue={amountValue} />
        </div>
    )
}