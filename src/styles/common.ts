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
