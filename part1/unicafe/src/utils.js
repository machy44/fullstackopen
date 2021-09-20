export const calculatePercentage = (value, total) => (value / total) * 100;

export const calculateAverage = (totalSum, numberOfItems) =>
  totalSum / numberOfItems;

export const getTotal = (...args) => {
  return args.reduce((sum, currentValue) => (sum += currentValue), 0);
};

const roundingNumber = (decimal) => (num) => num.toFixed(decimal);

export const roundToOneDecimal = roundingNumber(1);
