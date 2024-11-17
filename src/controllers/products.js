import createHttpError from 'http-errors';
import {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deletProduct,
} from '../services/products.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export const getAllProductsController = async (req, res) => {
  const filter = parseFilterParams(req.query);

  const products = await getAllProducts(filter);

  res.status(200).json({
    status: 200,
    message: 'Successfully found products!',
    data: products,
  });
};

export const productIdProductsController = async (req, res) => {
  const { productId } = req.params;
  const product = await getProductById(productId);
  if (!product) {
    throw createHttpError(404, 'Product not found');
  }
  res.status(200).json({
    status: 200,
    message: `Successfully found product with id ${productId}!`,
    data: product,
  });
};

export const addProductController = async (req, res) => {
  const product = await addProduct(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a product!',
    data: product,
  });
};

export const patchProductController = async (req, res) => {
  const { productId } = req.params;
  const result = await updateProduct(req.body, productId);

  if (!result) {
    throw createHttpError(404, 'Product not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a product!',
    data: result.product,
  });
};

export const putProductController = async (req, res) => {
  const { productId } = req.params;
  const result = await updateProduct(req.body, productId, { upsert: true });
  const status = result.isNew ? 201 : 200;
  res.status(status).json({
    status,
    message: 'Successfully upserted product',
    data: result.product,
  });
};

// deleteProductController
export const deleteProductController = async (req, res) => {
  const { productId } = req.params;
  const product = await deletProduct(productId);
  if (!product) {
    throw createHttpError(404, 'Product not found');
  }
  res.status(204).send();
};
