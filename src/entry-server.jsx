import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import { preloadRoute } from './router';
import { setInitialNow } from './lib/useNow';

export { routes, matchedPages } from './router';

const renderApp = (url, pageChrome, helmetContext = {}) =>
  renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <App pageChrome={pageChrome} />
      </StaticRouter>
    </HelmetProvider>,
  );

/**
 * Prerenders `url` as of `now`: app HTML, Helmet head tags and the header
 * chrome the page declared (the client hydrates with the same `now` + chrome).
 */
export async function render(url, now) {
  await preloadRoute(url);
  setInitialNow(now);
  let pageChrome;
  renderApp(url, { collect: (chrome) => (pageChrome = chrome) });
  const helmetContext = {};
  const html = renderApp(url, { initial: pageChrome }, helmetContext);
  const { title, meta, link, script } = helmetContext.helmet;
  return { html, head: [title, meta, link, script].join(''), pageChrome };
}
