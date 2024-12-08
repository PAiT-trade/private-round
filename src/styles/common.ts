export const pixelToViewPortWidth = (size: number, maxWidth = 1440) =>
  `${(size / maxWidth) * 100}vw`;

const deviceSizes = {
  mobile: "480px",
  tablet: "768px",
  desktop: "1024px",
  largest: "75em", // 1200px
  large: "68.75em", // 1100px
  medium: "56.25em", // 900px
  small: "37.5em", // 600px
  smallest: "31.25em", // 500px
};

export const devices = {
  mobile: `(max-width: ${deviceSizes.mobile})`,
  tablet: `(max-width: ${deviceSizes.tablet})`,
  desktop: `(min-width: ${deviceSizes.desktop})`,

  largest: `(max-width: ${deviceSizes.largest})`,
  large: `(max-width: ${deviceSizes.large})`,
  medium: `(max-width: ${deviceSizes.medium})`,
  small: `(max-width: ${deviceSizes.small})`,
  smallest: `(max-width: ${deviceSizes.smallest})`,
};

export const formatNumber = (num: number) => {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
};

export const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};
