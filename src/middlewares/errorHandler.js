import { HttpError } from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  if (err instanceof HttpError) {
    res.status(err.status).json({
      status: err.status,
      message: err.name,
      error: err,
    });
    return;
  }

  const { status = 500, message = 'Something went wrong' } = err;
  res.status(status).json({
    status,
    message,
  });
};
