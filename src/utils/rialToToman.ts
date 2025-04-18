export const priceFormat = (num: number): string => {
  const formatter = new Intl.NumberFormat('fa-IR', {
    style: 'currency',
    currency: 'IRR',
  });
  return formatter.format(num);
};

export const rialToToman = (num: number): string => {
  const toman = Math.floor(num / 10);
  return `${priceFormat(toman)} تومان`;
};
