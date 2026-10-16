const formatMoney = (value: number, decimals = 2, locale = 'en-US'): string => {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
};

export default formatMoney;
