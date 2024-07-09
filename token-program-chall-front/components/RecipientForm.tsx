import React, { useState } from 'react';
import styles from '../styles/Home.module.css';
import { MintInputBelow } from './MintInputBelow';
import { RecipientInput } from '../components/RecipientInput';
import { AmountInput } from '../components/AmountInput';
import { MintTokensButton } from '../components/MintTokensButton';

export const RecipientForm: React.FC = () => {

    return (
        <div className={styles.form}>
            <MintInputBelow />
            <RecipientInput />
            <AmountInput />
            <MintTokensButton />
        </div>
    )
}