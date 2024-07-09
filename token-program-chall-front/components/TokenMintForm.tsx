import { FC, useState } from 'react';
import styles from '../styles/Home.module.css';
import { MintInput } from './MintInputAbove';
import { TokenAccountButton } from '../components/TokenAccountButton';
import { RecipientInput } from '../components/RecipientInput';

export const TokenAccountForm: FC = () => {
    const [mintValue, setMintValue] = useState<string>('');
    const [accountOwnerValue, setAccountOwnerValue] = useState<string>('');

    return (
        <div className={styles.form}>
            <MintInput value={mintValue} setValue={setMintValue} />
            <RecipientInput value={accountOwnerValue} setValue={setAccountOwnerValue} />
            <TokenAccountButton mintValue={mintValue} accountOwnerValue={accountOwnerValue} />
        </div>
    )
}