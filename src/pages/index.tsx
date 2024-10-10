import { Fragment } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import fs from "fs";
import path from "path";

import { fileURLToPath } from "url";
// import downloadAndConvertToJSON from "@/utils/downloadAndConvertToJSON";
import Head from "next/head";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface Types {
  '1. From_Currency Code': string,
  "2. From_Currency Name": string,
  "3. To_Currency Code": string,
  "4. To_Currency Name": string,
  "5. Exchange Rate": string,
  "6. Last Refreshed": string,
  "7. Time Zone": string,
  "8. Bid Price": string,
  "9. Ask Price": string,
}

export type CURRENCY_EXCHANGE_RATE = {
  "Realtime Currency Exchange Rate": Types,
  "Error Message"?: string,
  Information?: string,
}
export default function Home() {

  return (
    <Fragment>
      <Head>
        <title>Digital & Crypto Currencies</title>
        <meta name="description" content="This is a concise summary of your web page content, ideally between 150-160 characters." />
      </Head>
      <Header />
      <Main />
    </Fragment>
  );
}

export const getServerSideProps = (async () => {

  //Check if physical currency file is available if not download
  // const physicalListUrl = process.env.physicalListUrl!;
  // const digitalListUrl = process.env.digitalListUrl!;
  const publicFolder = path.join(__dirname, "../../public");
  // Destination file path for JSON
  const physicalCurrency = `${publicFolder}/physicalCurrency.json`;
  const digitalCurrency = `${publicFolder}/digitalCurrency.json`


  // Call the function to download and convert the CSV
  if (!fs.existsSync(physicalCurrency)) {
    // downloadAndConvertToJSON(physicalListUrl, physicalCurrency);
  }

  if (!fs.existsSync(digitalCurrency)) {
    // downloadAndConvertToJSON(digitalListUrl, digitalCurrency);
  }



  return {
    props: {}
  }
});

export const dynamic = 'force-static';