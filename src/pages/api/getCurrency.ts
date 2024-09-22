// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import { CurrencyType } from "../components/AutoComplete";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<CurrencyType[]>
) {
  const { query, currencyName } = req.body;
  //Read currencies from json file
  const myContent = fs.readFileSync(
    process.cwd() + `/public/${currencyName}.json`,
    `utf8`
  );

  //filter currencies base on user input
  const filtered = JSON.parse(myContent).filter((item: CurrencyType) => {
    if (item["currency name"] && item["currency name"] !== "") {
      return `${item["currency name"]}`
        .toLowerCase()
        .includes(query.toLowerCase());
    }
  });
  //Improve bfcatche
  res.setHeader("Cache-Control", "public, max-age=0, must-revalidate");
  //Return filtered array for autoComplete
  res.status(200).json(filtered);
}
