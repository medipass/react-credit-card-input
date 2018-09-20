// @flow

const ERROR_TEXT__INVALID_EXPIRY_DATE = 'Expiry date is invalid';
const ERROR_TEXT__MONTH_OUT_OF_RANGE = 'Expiry month must be between 01 and 12';
const ERROR_TEXT__YEAR_OUT_OF_RANGE = 'Expiry year cannot be in the past';
const ERROR_TEXT__DATE_OUT_OF_RANGE = 'Expiry date cannot be in the past';

const EXPIRY_DATE_REGEX = /^(\d{2})\/(\d{4}|\d{2})$/;
const MONTH_REGEX = /(0[1-9]|1[0-2])/;

type CustomExpiryErrorTexts = {
  invalidExpiryDate?: string,
  monthOutOfRange?: string,
  yearOutOfRange?: string,
  dateOutOfRange?: string
};

export default (
  expiryDate: string,
  customExpiryErrorTexts?: CustomExpiryErrorTexts = {}
) => {
  const splitDate = expiryDate.split('/');
  if (!EXPIRY_DATE_REGEX.test(expiryDate)) {
    return (
      customExpiryErrorTexts.invalidExpiryDate ||
      ERROR_TEXT__INVALID_EXPIRY_DATE
    );
  }

  const expiryMonth = splitDate[0];
  if (!MONTH_REGEX.test(expiryMonth)) {
    return (
      customExpiryErrorTexts.monthOutOfRange || ERROR_TEXT__MONTH_OUT_OF_RANGE
    );
  }

  const expiryYear = splitDate[1];
  let date = new Date();
  let currentYear = date.getFullYear();
  let currentMonth = date.getMonth() + 1;
  currentYear = parseInt(
    expiryYear.length === 4 ? currentYear : currentYear.toString().substr(-2),
    10
  );
  if (currentYear > parseInt(expiryYear, 10)) {
    return (
      customExpiryErrorTexts.yearOutOfRange || ERROR_TEXT__YEAR_OUT_OF_RANGE
    );
  }

  if (
    parseInt(expiryYear, 10) === currentYear &&
    parseInt(expiryMonth, 10) < currentMonth
  ) {
    return (
      customExpiryErrorTexts.dateOutOfRange || ERROR_TEXT__DATE_OUT_OF_RANGE
    );
  }

  return false;
};
