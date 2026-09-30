import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import App from './App.jsx'
import { preloadRoute } from './router'
import { setInitialNow } from './lib/useNow'
import '@fontsource/raleway';
import '@fontsource/raleway/600.css';
import '@fontsource/raleway/500.css';
import '@fontsource/raleway/700.css';
import '@fontsource/archivo-black';

// AOS is initialised in SiteLayout (client-side effect, honours reduced motion).
// Font Awesome CSS is imported by the only page that uses it (CDJ 2025).

const app = (pageChrome) => (
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App pageChrome={pageChrome} />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
)

const container = document.getElementById('root')
// Written by scripts/prerender.mjs next to the prerendered page.
const prerendered = JSON.parse(document.getElementById('prerender-data')?.textContent ?? 'null')

// Client-only render (unprerendered URL, or hydration couldn't start). Preload
// first so the markup isn't wiped for a blank Suspense fallback.
const renderClient = () =>
  preloadRoute(location.pathname)
    .catch(() => {})
    .then(() => createRoot(container).render(app({})))

// Hydrate only HTML prerendered for this URL (404.html can be served for any
// path); load the page chunk first so hydration doesn't suspend on it.
if (prerendered?.path === (location.pathname.replace(/\/+$/, '') || '/')) {
  setInitialNow(new Date(prerendered.now))
  preloadRoute(location.pathname)
    .then(() => hydrateRoot(container, app({ initial: prerendered.pageChrome })))
    // Chunk failed to load: keep the (fully visible) prerendered HTML rather than wiping it.
    .catch((error) => console.error(error))
} else {
  renderClient()
}
