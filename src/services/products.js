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

export const patchProduct = async (payload, _id) => {
  const product = await ProductsCollection.findOneAndUpdate({ _id }, payload, {
    new: true,
  });
  return product;
};

export const deletProduct = async (_id) => {
  const product = await ProductsCollection.findOneAndDelete({ _id });
  return product;
};
