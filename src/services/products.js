import { ProductsCollection } from '../db/products.js';

export const getAllProducts = async () => {
  const products = await ProductsCollection.find();
  return products;
};
// getProductById
export const getProductById = async (productId) => {
  const product = await ProductsCollection.findById(productId);
  return product;
};

export const addProduct = async (payload) => {
  const product = await ProductsCollection.create(payload);
  return product;
};
