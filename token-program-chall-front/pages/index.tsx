import { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { AppBar } from '../components/AppBar'
import Head from 'next/head'
import { WalletContextProvider } from '../components/WalletContextProvider'
import { WalletDisplay } from '../components/WalletDisplay'
import { CreateMintButton } from '../components/CreateMintButton'
import { TokenAccountForm } from '../components/TokenAccountForm'
import { RecipientForm } from '../components/RecipientForm'
import { useState } from 'react';
import { FormProvider } from '../components/FormContext'


const Home: NextPage = (props) => {
  const [mintValue, setMintValue] = useState<string>('');
  const [accountOwnerValue, setAccountOwnerValue] = useState<string>('');
  const [recipientValue, setRecipientValue] = useState<string>('');
  const [tokenAmount, setTokenAmount] = useState<number>(0);

  return (
    <div className={styles.App}>
      <Head>
        <title>Wallet-Adapter Example</title>
        <meta
          name="description"
          content="Token Program Example"
        />
      </Head>
      <WalletContextProvider>
        <AppBar />
        <div className={styles.AppBody}>
          <FormProvider>
            <WalletDisplay />
            <CreateMintButton />
            <TokenAccountForm />
            <RecipientForm />
          </FormProvider>
        </div>
      </WalletContextProvider>
    </div>
  );
}

export default Home;