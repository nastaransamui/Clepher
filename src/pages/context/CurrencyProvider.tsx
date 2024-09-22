import { getCookie } from 'cookies-next';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { CURRENCY_EXCHANGE_RATE } from '..';
import fetchData from '@/utils/fetchData';
import LoadingSpiner from '../components/LoadingSpiner';


interface CurrencyContextType {
  fromCurrency: string;
  toCurrency: string;
  currencyExchange: CURRENCY_EXCHANGE_RATE | null,
  setFromCurrency: (currency: string) => void;
  setToCurrency: (currency: string) => void;
  setCurrencyExchange: (currencyExchange: CURRENCY_EXCHANGE_RATE) => void;
}

// initiate currencyContext
const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

// Create a provider component
export const CurrencyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

  const [fromCurrency, setFromCurrency] = useState<string>("BTC");
  const [toCurrency, setToCurrency] = useState<string>("EUR");
  const [currencyExchange, setCurrencyExchange] = useState<CURRENCY_EXCHANGE_RATE | null>(null);
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsClient(true)
      const from = getCookie('fromCurrency') || "BTC";
      const to = getCookie('toCurrency') || "EUR";

      setFromCurrency(from as string);
      setToCurrency(to as string);
    }
    const update = async () => {
      const currencyData = await fetchData(fromCurrency, toCurrency)
      setCurrencyExchange(currencyData);
    }
    update();
  }, [fromCurrency, toCurrency]);


  if (!isClient) {
    // Return nothing or a loading state while waiting for the client-side rendering
    return <LoadingSpiner />;
  }
  return (
    <CurrencyContext.Provider value={{
      fromCurrency,
      toCurrency,
      currencyExchange,
      setFromCurrency,
      setToCurrency,
      setCurrencyExchange
    }}>
      {children}
    </CurrencyContext.Provider>
  );
};

// Custom hook to use the CurrencyContext
const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
};

export default useCurrency;