export const formatMoney = (number: any) => {
  const money = parseFloat(number).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return <span>{money}</span>;
};
