import React, { Fragment } from 'react';
import useCurrency from '../context/CurrencyProvider';
import LoadingSpiner from './LoadingSpiner';

const Main = () => {
  const { currencyExchange } = useCurrency();
  return (
    <Fragment>
      {currencyExchange == null ? <LoadingSpiner /> :
        <div className='overflow-x-auto mt-48 lg:mt-4'>
          <table className="table-auto border-separate border border-gray-400 w-screen bg-slate-900 mt-5 text-sm">

            {
              typeof currencyExchange["Error Message"] === 'undefined' &&
                typeof currencyExchange.Information === 'undefined' ?
                <thead>
                  <tr>
                    {Object.keys(currencyExchange["Realtime Currency Exchange Rate"]).map((key, i) => {
                      return (
                        <Fragment key={i}>
                          <th className="border border-gray-300 ">{key}</th>
                        </Fragment>
                      )
                    })}

                  </tr>
                </thead>
                :
                <thead>
                  <tr>
                    <th>{currencyExchange['Error Message'] || currencyExchange.Information}</th>
                  </tr>
                </thead>
            }
            {
              typeof currencyExchange["Error Message"] === 'undefined' &&
              typeof currencyExchange.Information === 'undefined' &&
              <tbody>
                <tr className='hover:bg-slate-950'>
                  {Object.values(currencyExchange["Realtime Currency Exchange Rate"]).map((value, i) => {
                    return (
                      <Fragment key={i}>
                        <td className="border border-gray-300 text-center">{value}</td>
                      </Fragment>
                    )
                  })}
                </tr>
              </tbody>
            }
          </table>
        </div>
      }
    </Fragment >
  );
}

export default Main;
