import { Schema, model } from 'mongoose';
import { productsCategoryList } from '../../constants/products.js';

const ProductsSchema = new Schema(
    {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        category: {
            type: String,
            enum: productsCategoryList,
            default: 'other',
            required: true,
        },
        userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
        description: { type: String },
    },
    { timestamps: true, versionKey: false },
);

export const ProductsCollection = model('products', ProductsSchema);
