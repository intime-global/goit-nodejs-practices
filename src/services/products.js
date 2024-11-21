import { ProductsCollection } from '../db/models/products.js';

export const getAllProducts = async (filter, userId) => {
  const productsQuery = ProductsCollection.find({ userId });

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
export const getProductById = async (productId, userId) => {
  const product = await ProductsCollection.findOne({ _id: productId, userId });
  return product;
};

export const addProduct = async (payload, userId) => {
  const product = await ProductsCollection.create({ ...payload, userId });
  return product;
};

export const updateProduct = async (payload, _id, userId, options = {}) => {
  const rawProduct = await ProductsCollection.findOneAndUpdate(
    { _id, userId },
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

export const deletProduct = async (_id, userId) => {
  const product = await ProductsCollection.findOneAndDelete({ _id, userId });
  return product;
};
