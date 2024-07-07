import { FC, useEffect, useState } from 'react'
import { useWallet, useConnection } from '@solana/wallet-adapter-react'


export const WalletDisplay: FC = () => {
    const { publicKey } = useWallet();
    const { connection } = useConnection();
    const [balance, setBalance] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getBalance = async () => {
            if (publicKey) {
                setLoading(true);
                setError(null);
                try {
                    const balance = await connection.getBalance(publicKey);
                    setBalance(balance / 1e9);
                } catch (err) {
                    setError('Failed to fetch balance');
                    setBalance(null)
                } finally {
                    setLoading(false);
                }
            }
        };

        getBalance();
    }, [publicKey, connection]);

    let message;
    if (!publicKey) {
        message = "No wallet is connected";
    } else if (loading) {
        message = "Loading balance...";
    } else if (error) {
        message = error;
    } else {
        message = `Wallet Balance is ${balance !== null ? balance.toFixed(10) : 'N/A'} SOL`
    }

    return (
        <div>
            <p>
                {message}
            </p>
        </div>
    )
}