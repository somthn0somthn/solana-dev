import { FC } from 'react';
import styles from '../styles/Home.module.css';
import { MintInputAbove } from './MintInputAbove';
import { AccountOwnerInput } from '../components/AccountOwnerInput';
import { TokenAccountButton } from '../components/TokenAccountButton';

export const TokenAccountForm: FC = () => {
    
    return (
        <div className={styles.formContainer}>
            <MintInputAbove />
            <AccountOwnerInput  />
            <TokenAccountButton />
        </div>
    );
};