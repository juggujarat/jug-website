// Banners ship as <name>.webp (1200w) plus <name>-640.webp for small screens/cards.
export const BANNER_SIZES = '(min-width: 1024px) 640px, 100vw';
/** Featured card: object-cover in a tall column from 1024px (draws ~1200px+); stacked full width below. */
export const FEATURED_BANNER_SIZES = '(min-width: 1024px) 1200px, 100vw';
/** Cards sit in the 3 / 2 / 1-column GRID. */
export const CARD_BANNER_SIZES = '(min-width: 1024px) 640px, (min-width: 768px) 50vw, 100vw';

export const bannerSmall = (src) => src.replace(/\.webp$/, '-640.webp');

/** Share previews use a .jpg twin of WebP images (not every scraper reads WebP). */
export const shareImage = (src) => src.replace(/\.webp$/, '.jpg');

export const bannerSrcSet = (src) => `${bannerSmall(src)} 640w, ${src} 1200w`;
