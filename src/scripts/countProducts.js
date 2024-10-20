import fs from 'node:fs/promises';
import { PATH_DB } from '../constants/products.js';

const countProducts = async () => {
  const products = await fs.readFile(PATH_DB, 'utf-8');
  const parsedProduct = products ? JSON.parse(products) : [];
  return parsedProduct.length;
};

console.log(await countProducts());
