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
import { validateBody } from '../middlewares/validateBody.js';
import {
  createProductSchema,
  putProductsSchema,
  updateProductsSchema,
} from '../validation/products.js';
import { validateId } from '../middlewares/validateId.js';

const router = Router();

router.get('/', ctrlWrapper(getAllProductsController));

router.get('/:productId', validateId, ctrlWrapper(productIdProductsController));

router.post(
  '/',
  validateBody(createProductSchema),
  ctrlWrapper(addProductController),
);

router.patch(
  '/:productId',
  validateId,
  validateBody(updateProductsSchema),
  ctrlWrapper(patchProductController),
);

router.put(
  '/:productId',
  validateId,
  validateBody(putProductsSchema),
  ctrlWrapper(putProductController),
);

router.delete('/:productId', validateId, ctrlWrapper(deleteProductController));

export default router;
