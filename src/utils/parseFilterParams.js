import { productsCategoryList } from '../constants/products.js';

const parseCategory = (category) => {
  const isString = typeof category === 'string';
  if (!isString) return;

  if (productsCategoryList.includes(category)) {
    return category;
  }
};

const parseNumber = (number) => {
  const isString = typeof number === 'string';
  if (!isString) return;

  const parsedNumber = parseFloat(number);

  if (Number.isNaN(parsedNumber)) return;

  return parsedNumber;
};

export const parseFilterParams = ({ category, minPrice, maxPrice }) => {
  const parsedCategory = parseCategory(category);

  const parsedMinPrice = parseNumber(minPrice);

  const parsedMaxPrice = parseNumber(maxPrice);

  return {
    category: parsedCategory,
    minPrice: parsedMinPrice,
    maxPrice: parsedMaxPrice,
  };
};
