// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

import { fileURLToPath } from "url";
import { CurrencyType } from "../components/AutoComplete";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicFolder = path.join(__dirname, "../../../public");

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<CurrencyType[]>
) {
  const { query, currencyName } = req.body;
  //Read currencies from json file
  const myContent = fs.readFileSync(
    `${publicFolder}/${currencyName}.json`,
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
  //Return filtered array for autoComplete
  res.status(200).json(filtered);
}
