export const DEFAULT_CVC_LENGTH = 3;
export const DEFAULT_ZIP_LENGTH = 5;
export const DEFAULT_CARD_FORMAT = /(\d{1,4})/g;
export const CARD_TYPES = [
  {
    type: 'amex',
    format: /(\d{1,4})(\d{1,6})?(\d{1,5})?/,
    startPattern: /^3[47]/,
    maxCardNumberLength: 15,
    cvcLength: 4
  },
  {
    type: 'dankort',
    format: DEFAULT_CARD_FORMAT,
    startPattern: /^5019/,
    maxCardNumberLength: 16,
    cvcLength: DEFAULT_CVC_LENGTH
  },
  {
    type: 'hipercard',
    format: DEFAULT_CARD_FORMAT,
    startPattern: /^(384100|384140|384160|606282|637095|637568|60(?!11))/,
    maxCardNumberLength: 19,
    cvcLength: DEFAULT_CVC_LENGTH
  },
  {
    type: 'dinersclub',
    format: DEFAULT_CARD_FORMAT,
    startPattern: /^(36|38|30[0-5])/,
    maxCardNumberLength: 14,
    cvcLength: DEFAULT_CVC_LENGTH
  },
  {
    type: 'discover',
    format: DEFAULT_CARD_FORMAT,
    startPattern: /^(6011|65|64[4-9]|622)/,
    maxCardNumberLength: 16,
    cvcLength: DEFAULT_CVC_LENGTH
  },
  {
    type: 'jcb',
    format: DEFAULT_CARD_FORMAT,
    startPattern: /^35/,
    maxCardNumberLength: 16,
    cvcLength: DEFAULT_CVC_LENGTH
  },
  {
    type: 'laser',
    format: DEFAULT_CARD_FORMAT,
    startPattern: /^(6706|6771|6709)/,
    maxCardNumberLength: 19,
    cvcLength: DEFAULT_CVC_LENGTH
  },
  {
    type: 'maestro',
    format: DEFAULT_CARD_FORMAT,
    startPattern: /^(5018|5020|5038|6304|6703|6708|6759|676[1-3])/,
    maxCardNumberLength: 19,
    cvcLength: DEFAULT_CVC_LENGTH
  },
  {
    type: 'mastercard',
    format: DEFAULT_CARD_FORMAT,
    startPattern: /^(5[1-5]|677189)|^(222[1-9]|2[3-6]\d{2}|27[0-1]\d|2720)/,
    maxCardNumberLength: 16,
    cvcLength: DEFAULT_CVC_LENGTH
  },
  {
    type: 'unionpay',
    format: DEFAULT_CARD_FORMAT,
    startPattern: /^62/,
    maxCardNumberLength: 19,
    cvcLength: DEFAULT_CVC_LENGTH,
    luhn: false
  },
  {
    type: 'visaelectron',
    format: DEFAULT_CARD_FORMAT,
    startPattern: /^4(026|17500|405|508|844|91[37])/,
    maxCardNumberLength: 16,
    cvcLength: DEFAULT_CVC_LENGTH
  },
  {
    type: 'elo',
    format: DEFAULT_CARD_FORMAT,
    startPattern: /^(4011(78|79)|43(1274|8935)|45(1416|7393|763(1|2))|50(4175|6699|67[0-7][0-9]|9000)|627780|63(6297|6368)|650(03([^4])|04([0-9])|05(0|1)|4(0[5-9]|3[0-9]|8[5-9]|9[0-9])|5([0-2][0-9]|3[0-8])|9([2-6][0-9]|7[0-8])|541|700|720|901)|651652|655000|655021)/,
    maxCardNumberLength: 16,
    cvcLength: DEFAULT_CVC_LENGTH
  },
  {
    type: 'visa',
    format: DEFAULT_CARD_FORMAT,
    startPattern: /^4/,
    maxCardNumberLength: 19,
    cvcLength: DEFAULT_CVC_LENGTH
  }
];

export const getCardTypeByValue = value =>
  CARD_TYPES.filter(cardType => cardType.startPattern.test(value))[0];
export const getCardTypeByType = type =>
  CARD_TYPES.filter(cardType => cardType.type === type)[0];
export const hasCardNumberReachedMaxLength = (
  currentValue,
  currentValueLength
) => {
  const cardType = getCardTypeByValue(currentValue);
  return cardType && currentValueLength >= cardType.maxCardNumberLength;
};
export const hasCVCReachedMaxLength = (type, currentValueLength) => {
  const cardType = getCardTypeByType(type);
  if (!cardType) {
    return currentValueLength >= DEFAULT_CVC_LENGTH;
  }
  return currentValueLength >= cardType.cvcLength;
};
export const hasZipReachedMaxLength = (type, currentValueLength) =>
  currentValueLength >= DEFAULT_ZIP_LENGTH;
export const formatCardNumber = cardNumber => {
  const cardType = getCardTypeByValue(cardNumber);
  if (!cardType) return (cardNumber.match(/\d+/g) || []).join('');
  const { format } = cardType;
  if (format.global) {
    return cardNumber.match(format).join(' ');
  }
  const execResult = format.exec(cardNumber.split(' ').join(''));
  if (execResult) {
    return execResult
      .splice(1, 3)
      .filter(x => x)
      .join(' ');
  }
  return cardNumber;
};
export const formatCvc = cvc => {
  return (cvc.match(/\d+/g) || []).join('');
};
export const formatExpiry = event => {
  const eventData = event.nativeEvent && event.nativeEvent.data;
  const prevExpiry = event.target.value.split(' / ').join('/');

  if (!prevExpiry) return null;
  let expiry = prevExpiry;
  if (/^[2-9]$/.test(expiry)) {
    expiry = `0${expiry}`;
  }

  if (prevExpiry.length === 2 && +prevExpiry > 12) {
    const [head, ...tail] = prevExpiry;
    expiry = `0${head}/${tail.join('')}`;
  }

  if (/^1[/-]$/.test(expiry)) {
    return `01 / `;
  }

  expiry = expiry.match(/(\d{1,2})/g) || [];
  if (expiry.length === 1) {
    if (!eventData && prevExpiry.includes('/')) {
      return expiry[0];
    }
    if (/\d{2}/.test(expiry)) {
      return `${expiry[0]} / `;
    }
  }
  if (expiry.length > 2) {
    const [, month, year] = expiry.join('').match(/^(\d{2}).*(\d{2})$/) || [];
    return [month, year].join(' / ');
  }
  return expiry.join(' / ');
};
export const isHighlighted = () => window.getSelection().type === 'Range';
