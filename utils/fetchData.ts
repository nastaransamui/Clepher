import { CURRENCY_EXCHANGE_RATE } from "@/pages";

const fetchData = async (fromCurrency: string, toCurrency: string) => {
  //  Fetch data from external API
  const res = await fetch(
    process.env.apiUrl +
      `query?function=CURRENCY_EXCHANGE_RATE` +
      `&from_currency=${fromCurrency}` +
      `&to_currency=${toCurrency}` +
      `&apikey=${process.env.apiKey}`
  );
  const currencyExchange: CURRENCY_EXCHANGE_RATE = await res.json();

  return currencyExchange;
};

export default fetchData;
