import { site } from '../content';

/**
 * Turn a root-relative path (or already-absolute URL) into an absolute URL
 * against `site.url`, so an image/URL that's already absolute isn't
 * double-prefixed. Used by Seo (meta/OG tags) and JSON-LD builders.
 * @param {string} [url]
 * @returns {string|undefined}
 */
export const absoluteUrl = (url) => (!url ? undefined : /^https?:\/\//.test(url) ? url : `${site.url}${url}`);
