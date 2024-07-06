import { NextPage } from "next";
import { useState } from "react";
import styles from "../styles/Home.module.css";
import WalletContextProvider from "../components/WalletContextProvider";
import { AppBar } from "../components/AppBar";
import Head from "next/head";
import { PingButton } from "../components/PingButton";
import { IntegerInput } from "../components/IntegerInput";
import { AddressInput } from "../components/AddressInput";
import { TransferButton } from "../components/TransferButton";
import { WalletDisplay } from "../components/WalletDisplay";

const Home: NextPage = (props) => {
  const [integerValue, setIntegerValue] = useState<number>(0);
  const [addressValue, setAddressValue] = useState<string>('');

  return (
    <div className={styles.App}>
      <Head>
        <title>Wallet-Adapter Example</title>
        <meta name="description" content="Wallet-Adapter Example" />
      </Head>
      <WalletContextProvider>
        <AppBar />
        <div className={styles.AppBody}>
          <WalletDisplay />
          <IntegerInput value={integerValue} setValue={setIntegerValue} />
          <AddressInput value={addressValue} setValue={setAddressValue} />
          <TransferButton integerValue={integerValue} addressValue={addressValue}/>
        </div>
      </WalletContextProvider>
    </div>
  );
};

export default Home;