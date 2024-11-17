import Joi from 'joi';
import { productsCategoryList } from '../constants/products.js';

export const createProductSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  category: Joi.string()
    .valid(...productsCategoryList)
    .required(),
  description: Joi.string(),
});

export const updateProductsSchema = Joi.object({
  name: Joi.string(),
  price: Joi.number(),
  category: Joi.string().valid(...productsCategoryList),
  description: Joi.string(),
});

export const putProductsSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  category: Joi.string()
    .valid(...productsCategoryList)
    .required(),
  description: Joi.string().required(),
});
