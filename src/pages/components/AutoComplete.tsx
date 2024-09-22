import axios, { AxiosError } from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { setCookie } from 'cookies-next';
import useCurrency from '../context/CurrencyProvider';
import fetchData from '@/utils/fetchData';
import useOutsideClick from '../hooks/useOutsideClick';

export interface CurrencyType {
  "currency code": string,
  "currency name": string,
}

const AutoComplete = ({ currencyName, defaultValue, query, setQuery }:
  {
    currencyName: 'physicalCurrency' | 'digitalCurrency',
    defaultValue: string,
    query: string,
    setQuery: (query: string) => void
  }) => {
  const { fromCurrency, toCurrency, setFromCurrency, setToCurrency, setCurrencyExchange } = useCurrency();

  const [jsonData, setJsonData] = useState<CurrencyType[]>([]);
  const [filteredData, setFilteredData] = useState<CurrencyType[]>([]);
  const dropDownRef = useRef(null);

  // Call the custom hook to close dropdown on outside click
  useOutsideClick(dropDownRef, () => setFilteredData([]));

  useEffect(() => {
    // Fetch JSON data on Input change
    const fetchData = async () => {
      try {
        const result = await axios.post(`/api/getCurrency`, {
          query,
          currencyName
        });
        const { status, data } = result;
        if (status == 200) {
          setJsonData(data);
        }
      } catch (err) {
        const errors = err as Error | AxiosError;
        const input = document.getElementById(currencyName) as HTMLInputElement
        if (input) {
          input.style.backgroundColor = 'crimson'
          input.setAttribute("disabled", "disabled")
          input.value = errors.message
        }

      }
    };
    if (query != '') {
      fetchData();
    }
  }, [query, currencyName]);

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const inputValue = e.currentTarget.value;
    setQuery(inputValue);

    const filtered = jsonData.filter(item => {
      if (item['currency name'] && item['currency name'] !== '') {
        return item['currency name'].toLowerCase().includes(inputValue.toLowerCase())
      }
    }
    );
    setFilteredData(filtered);
  };

  const handleSelect = async (name: string) => {

    const upda = await fetchData(fromCurrency, toCurrency)
    setCurrencyExchange(upda);

    if (currencyName == 'digitalCurrency') {
      setCookie('fromCurrency', name);
      setFromCurrency(name)
    } else {
      setCookie('toCurrency', name);
      setToCurrency(name)
    }
    setQuery(name);
    // Close the suggestions list
    setFilteredData([]);
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <label>Choose your {currencyName} currency</label>
      <input
        autoComplete='off'
        type="text"
        value={query}
        id={currencyName}
        onChange={handleInputChange}
        placeholder={`Search in ${currencyName}...`}
        className="w-full px-4 py-2 bg-slate-900 border border-gray-300 rounded-md focus:outline-none"
      />
      <p className='mt-3 '>{defaultValue}</p>
      {filteredData.length > 0 && (
        <ul ref={dropDownRef}
          className="absolute top-16
          z-10 w-full border-radi
           rounded-md bg-slate-900
           border border-gray-300 max-h-40 overflow-y-auto">
          {filteredData.map((item, index) => (
            <li
              key={index}
              className="px-4 py-2 cursor-pointer hover:bg-slate-950"
              onClick={() => handleSelect(item['currency code'])}
            >
              {item['currency name']} &nbsp; &nbsp;
              <small>{item["currency code"]}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AutoComplete;
