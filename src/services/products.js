import { ProductsCollection } from '../db/products.js';

export const getAllProducts = async (filter) => {
  const productsQuery = ProductsCollection.find();

  if (filter.category) {
    productsQuery.where('category').equals(filter.category);
  }
  if (filter.minPrice) {
    productsQuery.where('price').gte(filter.minPrice);
  }
  if (filter.maxPrice) {
    productsQuery.where('price').lte(filter.maxPrice);
  }

  return productsQuery;
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

export const updateProduct = async (payload, _id, options = {}) => {
  const rawProduct = await ProductsCollection.findOneAndUpdate(
    { _id },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rawProduct || !rawProduct.value) return null;

  return {
    product: rawProduct.value,
    isNew: Boolean(rawProduct?.lastErrorObject?.upserted),
  };
};

export const deletProduct = async (_id) => {
  const product = await ProductsCollection.findOneAndDelete({ _id });
  return product;
};
