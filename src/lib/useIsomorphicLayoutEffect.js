import { useEffect, useLayoutEffect } from 'react';

// useLayoutEffect in the browser (runs before paint), useEffect on the server
// (neither runs there; this avoids React's useLayoutEffect SSR warning).
export const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;
