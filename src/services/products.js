import { ProductsCollection } from '../db/products.js';

export const getAllProducts = async () => {
  const products = await ProductsCollection.find();
  return products;
};
