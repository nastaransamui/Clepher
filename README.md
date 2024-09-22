# Welcome to Alphavantage #### [CURRENCY_EXCHANGE_RATE](https://www.alphavantage.co/documentation/#crypto-exchange)

API key has 25 maximum request per there therefore it's possible to get error and because it's public api key I didn't hide it in **.env** file and because I used **Nextjs** frame work it's save in **next.config.mjs**.

# Logic
First I check the [physical currency](https://www.alphavantage.co/physical_currency_list/) or [digital/crypto currency](https://www.alphavantage.co/digital_currency_list/) json file exist in **/public** folder, if not I send request and conver **.csv** file to **.json** for purpose of autocomplete I emplemented for change currency and one simple api inside **/api** folder of next js to use **fs** from **Node.js** to read and filter list of currencies.
Then there are 2 autocomplete for select **physical currency** and **digital currency** if user need to change default **BTC** and **EUR** on each currency change I save each value in small cookie for persist on refresh page and update **React Context** to run fetch data instantly from **API End point**. I understand even in documentation of **Alphavantage** mentioned this API available for all currencies but most of not currencies return **Error Message** therefore I check Error Message before show the data.


# UI

I used **TailwindCSS** as requirement, as it's a **Small React app** I didn't apply any fancy css just 2 autocomplete 1 image for flip and table to show data. And handle close dropdown of autocomplete on click outside with small custom hook. 

## To run application

> **In dev mode:** Run **npm install** and then **npm run dev** and open browser in http://localhost:3000

and for production:
> **In Prod mode:** Run **npm install** and then **npm start** and open browser in http://localhost:3000
