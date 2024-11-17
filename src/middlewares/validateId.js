import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

export const validateId = (req, res, next) => {
  const { productId } = req.params;

  if (!isValidObjectId(productId))
    return next(createHttpError(400, 'Invalid Id'));

  next();
};
