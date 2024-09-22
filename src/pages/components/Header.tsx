import React, { useState } from 'react';
import AutoComplete from './AutoComplete';
import useCurrency from '../context/CurrencyProvider';
import Image from 'next/image';

const Header = () => {
  const { fromCurrency, toCurrency } = useCurrency();
  const [rotate, setRotate] = useState(false)
  const [physicalQuery, setPhysicalQuery] = useState('');
  const [digitalQuery, setDigitalQuery] = useState('');
  const changeRotate = () => {
    setRotate(!rotate)
  }
  return (
    <div className='flex flex-col  items-center h-40 gap-10 mt-12 w-auto'>
      <h4 className='text-center'>Digital & Crypto Currencies get CURRENCY_EXCHANGE_RATE from {process.env.apiUrl}</h4>
      <div className='flex flex-col lg:flex-row justify-around items-center gap-0 lg:gap-28 px-4 lg:px-0'>
        <AutoComplete
          query={!rotate ? physicalQuery : digitalQuery}
          setQuery={!rotate ? setPhysicalQuery : setDigitalQuery}
          currencyName={!rotate ? 'physicalCurrency' : 'digitalCurrency'}
          defaultValue={!rotate ? toCurrency : fromCurrency} />
        <Image onClick={changeRotate} src={'/transfer.png'} height={20} width={20} alt='transfer' className={`${rotate ? 'rotate-180' : 'rotate-0'} cursor-pointer transform transition-transform duration-300 ease-in-out`} />
        <AutoComplete
          query={!rotate ? digitalQuery : physicalQuery}
          setQuery={!rotate ? setDigitalQuery : setPhysicalQuery}
          currencyName={!rotate ? 'digitalCurrency' : 'physicalCurrency'}
          defaultValue={!rotate ? fromCurrency : toCurrency} />
      </div>
    </div>
  );
}

export default Header;

