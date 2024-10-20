import { PATH_DB } from '../constants/products.js';
import { createFakeProduct } from '../utils/createFakeProduct.js';
import fs from 'node:fs/promises';

const generateProducts = async (number) => {
  const products = Array(number).fill(0).map(createFakeProduct);
  const currentProducts = await fs.readFile(PATH_DB, { encoding: 'utf-8' });
  const parsedProducts = JSON.parse(currentProducts);

  const result = [...parsedProducts, ...products];

  await fs.writeFile(PATH_DB, JSON.stringify(result, null, 2), 'utf-8');
};

generateProducts(5);
