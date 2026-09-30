import { useRoutes } from 'react-router-dom';
import { PageChromeContext } from './layouts/pageChrome';
import { routes } from './router';

/** Routes only; the entries (main.jsx, entry-server.jsx) add the router and HelmetProvider. */
export default function App({ pageChrome }) {
  return <PageChromeContext.Provider value={pageChrome}>{useRoutes(routes)}</PageChromeContext.Provider>;
}
