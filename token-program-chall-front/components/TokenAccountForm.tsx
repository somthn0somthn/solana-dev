import React, { useState } from 'react';
import styles from '../styles/Home.module.css';
import { MintInput } from '../components/MintInput';
import { AccountOwnerInput } from '../components/AccountOwnerInput';
import { TokenAccountButton } from '../components/TokenAccountButton';

export const TokenAccountForm: React.FC = () => {
    const [mintValue, setMintValue] = useState<string>('');
    const [accountOwnerValue, setAccountOwnerValue] = useState<string>('');

    return (
        <div className={styles.form}>
            <MintInput value={mintValue} setValue={setMintValue} />
            <AccountOwnerInput value={accountOwnerValue} setValue={setAccountOwnerValue} />
            <TokenAccountButton mintValue={mintValue} accountOwnerValue={accountOwnerValue} />
        </div>
    )
}