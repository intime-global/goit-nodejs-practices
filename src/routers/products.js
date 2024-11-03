import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  addProductController,
  getAllProductsController,
  patchProductController,
  productIdProductsController,
  deleteProductController,
  putProductController,
} from '../controllers/products.js';

const router = Router();

router.get('/', ctrlWrapper(getAllProductsController));

router.get('/:productId', ctrlWrapper(productIdProductsController));

router.post('/', ctrlWrapper(addProductController));

router.patch('/:productId', ctrlWrapper(patchProductController));

router.put('/:productId', ctrlWrapper(putProductController));

router.delete('/:productId', ctrlWrapper(deleteProductController));

export default router;
