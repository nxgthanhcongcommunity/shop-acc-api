export const GreaterThanZero = (path: string) => ({
  isNumeric: {
    errorMessage: `${path} must be a number`,
  },
  custom: {
    options: (value: number) => {
      if (value <= 0) {
        throw new Error(`${path} must be greater than 0`);
      }
      return true;
    },
  },
});

export const IsValueString = (path: string) => ({
  isString: {
    errorMessage: `${path} must be a string`,
  },
  isLength: {
    options: { min: 1 },
    errorMessage: `${path} must have a length greater than 0`,
  },
});
