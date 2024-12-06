type SizeKeys = "mobile" | "tablet" | "desktop" | "largeDesktop";
// screen sizes
export const sizes: Record<SizeKeys, number> = {
  mobile: 480, // max-width: 480px
  tablet: 768, // max-width: 768px
  desktop: 1024, // max-width: 1024px
  largeDesktop: 1440, // max-width: 1440px
};

// Type definition for the media utility
type MediaQuery = (styles: string) => string;

export const media: Record<SizeKeys, MediaQuery> = Object.keys(sizes).reduce(
  (acc, key) => {
    const sizeKey = key as SizeKeys;
    acc[sizeKey] = (styles: string) => `
      @media (max-width: ${sizes[sizeKey]}px) {
        ${styles}
      }
    `;
    return acc;
  },
  {} as Record<SizeKeys, MediaQuery>
);
