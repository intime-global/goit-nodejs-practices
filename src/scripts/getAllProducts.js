import fs from 'node:fs/promises';
import { PATH_DB } from '../constants/products.js';

const getAllProducts = async () => {
  const data = await fs.readFile(PATH_DB, 'utf-8');
  const dataParse = data ? JSON.parse(data) : [];
  return dataParse;
};

console.log(await getAllProducts());
