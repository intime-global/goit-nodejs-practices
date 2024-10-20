import fs from 'node:fs/promises';
import { PATH_DB } from '../constants/products.js';

const removeRandomProduct = async () => {
  const data = await fs.readFile(PATH_DB, 'utf-8');
  const dataParse = JSON.parse(data);

  const randomIdx = Math.floor(Math.random() * dataParse.length);

  const deleteEl = dataParse.splice(randomIdx, 1);
  console.log(deleteEl);

  await fs.writeFile(PATH_DB, JSON.stringify(dataParse, null, 2));
};

removeRandomProduct();
