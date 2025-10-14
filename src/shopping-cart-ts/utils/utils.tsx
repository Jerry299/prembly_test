export const formatMoney = (number: any) => {
  const money = parseFloat(number).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return <span>{money}</span>;
};
export const formatNumber = (
  number: any = 0,
  min: number = 2,
  max: number = 2
) => {
  return parseFloat(number).toLocaleString(undefined, {
    minimumFractionDigits: min,
    maximumFractionDigits: max,
  });
};
