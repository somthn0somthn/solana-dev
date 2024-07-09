import { FC } from 'react'
import styles from '../styles/PingButton.module.css'
import { useWallet, useConnection } from '@solana/wallet-adapter-react'
import * as spl from '@solana/spl-token'
import { PublicKey, Transaction } from '@solana/web3.js'
import { useFormContext } from './FormContext'

export const TokenAccountButton: FC = () => {
    const { publicKey, sendTransaction } = useWallet();
    const { connection } = useConnection();
    const { tokenMint, associatedAccountOwner} = useFormContext();

    const handleClick = async () => {
        if (!publicKey || !connection) {
            alert("Your wallet isn't connected - so cant create Token Account");
            return
        }

        if ( tokenMint === '' || associatedAccountOwner === '') {
            alert("You havent entered one or both of the required values");
            return
        }

        try {

            const mintPubKey = new PublicKey(tokenMint);
            const ownerPubKey = new PublicKey(associatedAccountOwner);


            const associatedTokenAccount = await spl.getAssociatedTokenAddress(
                mintPubKey,
                ownerPubKey,
            )

            console.log(`Associated Token Account Address: ${associatedTokenAccount.toBase58()}`);

            const instruction = spl.createAssociatedTokenAccountInstruction(
                publicKey, // payer
                associatedTokenAccount,
                ownerPubKey,
                mintPubKey,
            )

            const transaction = new Transaction().add(instruction);

            const signature = await sendTransaction(transaction, connection, {
                signers: [],
            });

            console.log(`Transaction sent with signature: ${signature}`);

            const link = `https://explorer.solana.com/tx/${signature}?cluster=devnet`;
            console.log(`✅ Finished! Created Token Account: ${link}`);

        } catch (error) {
            console.error('Transaction failed: ', error);
            alert('Transaction failed. Please check the console for more details.')
        }


    }

    return (
        <div className={styles.buttonContainer} onClick={handleClick}>
            <button className={styles.button}>Create Token Account</button>
        </div>
    )
}

