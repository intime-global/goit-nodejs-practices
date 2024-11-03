import { Schema, model } from 'mongoose';

const ProductsSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: {
      type: String,
      enum: ['books', 'electronics', 'clothing', 'other'],
      default: 'other',
      required: true,
    },
    description: { type: String },
  },
  { timestamps: true, versionKey: false },
);

export const ProductsCollection = model('products', ProductsSchema);
