import { Link } from 'react-router-dom';
import { navLinkClass } from '../components/ui/navLink';
import ExternalLink from '../components/ui/ExternalLink';
import Container from '../components/ui/Container';

/**
 * Secondary in-page navigation for a conference page, shown under the main
 * header. `items`: [{ label, hash }] for sections, [{ label, href }] for
 * external links (opened in a new tab). Hash links stay on the current path,
 * so they work on both the legacy and the /conferences/... URL.
 */
export default function EventSubNav({ label, items, bg = 'bg-[#F6EAFF]' }) {
  if (!items?.length) return null;
  return (
    <nav aria-label={label} className={bg}>
      <Container size="xl" className="sm:max-w-[345px]">
        <ul className="flex justify-center gap-10 py-3 whitespace-nowrap overflow-x-auto sm:justify-start sm:gap-6 sm:px-3 sm:text-[14px] md:gap-8">
          {items.map((item) => (
            <li key={item.label}>
              {item.href ? (
                <ExternalLink href={item.href} className={navLinkClass}>
                  {item.label}
                </ExternalLink>
              ) : (
                <Link to={{ hash: `#${item.hash}` }} className={navLinkClass}>
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </Container>
    </nav>
  );
}
