import { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { AppBar } from '../components/AppBar'
import Head from 'next/head'
import { WalletContextProvider } from '../components/WalletContextProvider'
import { WalletDisplay } from '../components/WalletDisplay'
import { CreateMintButton } from '../components/CreateMintButton'
import { TokenAccountForm } from '../components/TokenAccountForm'
import { RecipientForm } from '../components/RecipientForm'
import { FormProvider } from '../components/FormContext'


const Home: NextPage = (props) => {

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