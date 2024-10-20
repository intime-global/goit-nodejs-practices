import { createFakeProduct } from '../utils/createFakeProduct.js';
import fs from 'node:fs/promises';
import { PATH_DB } from '../constants/products.js';

export const addOneProduct = async () => {
  const products = await fs.readFile(PATH_DB, 'utf-8');
  const parsedProducts = products ? JSON.parse(products) : [];
  const newProduct = createFakeProduct();
  parsedProducts.push(newProduct);
  fs.writeFile(PATH_DB, JSON.stringify(parsedProducts, null, 2));
};

addOneProduct();
