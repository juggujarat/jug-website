// React 18 doesn't know `fetchPriority` (warns) but passes the lowercase DOM
// attribute through; spread so the lint rule doesn't flag it.
export const HERO_IMG_PRIORITY = { fetchpriority: 'high' };
