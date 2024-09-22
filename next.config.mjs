/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    apiUrl: "https://www.alphavantage.co/",
    apiKey: "RIBXT3XYLI69PC0Q",
    physicalListUrl: "https://www.alphavantage.co/physical_currency_list/",
    digitalListUrl: "https://www.alphavantage.co/digital_currency_list/",
  },
};

export default nextConfig;
