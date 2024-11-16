import { Schema, model } from 'mongoose';

import { arrOfCategory } from '../../constants/products.js';

const ProductsSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: {
      type: String,
      enum: arrOfCategory,
      default: 'other',
      required: true,
    },
    description: { type: String },
  },
  { timestamps: true, versionKey: false },
);

export const ProductsCollection = model('products', ProductsSchema);
