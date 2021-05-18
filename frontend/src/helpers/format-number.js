export const formatNumber = number => {
  if (number < 1e3) return number;
  const scale = number >= 1e6 ? 6 : 3;
  const scaled = number / Math.pow(10, scale);
  const suffix = scale === 6 ? 'M' : 'k';
  return scaled.toFixed(1) + suffix;
};
