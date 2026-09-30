import { Link, useLocation } from 'react-router-dom';
import { getYearInIST, site } from '../content';
import { useNow } from '../lib/useNow';
import FooterItem from './FooterItem';
import { NAV_ITEMS, isNavItemActive } from './navItems';
import { navLinkClass } from './ui/navLink';
import ExternalLink from './ui/ExternalLink';
import Container from './ui/Container';

// Icons exist for these networks only; others in site.socials are skipped.
const SOCIAL_ICONS = [
  { key: 'linkedin', label: 'LinkedIn', icon: '/SocialMediaIcon/LinkedinIcon.svg' },
  { key: 'x', label: 'X (Twitter)', icon: '/SocialMediaIcon/Twitter.svg' },
  { key: 'whatsapp', label: 'WhatsApp', icon: '/SocialMediaIcon/Whatsapp.svg' },
];

/** Site footer: white nav/socials bar, copyright, bottom illustration. */
function Footer({ activeNav = null }) {
  const { pathname } = useLocation();
  const socials = SOCIAL_ICONS.filter(({ key }) => site.socials?.[key]);
  const year = Math.max(getYearInIST(useNow()), site.copyrightStartYear);

  return (
    <footer className="bg-[#FFFCEF]">
      <Container>
        <div
          className="grid grid-cols-12 bg-[#FFFFFF] border border-black rounded-[40px] pl-[56px] py-[18px] items-center justify-center
          sm:grid-cols-1 sm:pl-[0px] sm:py-[0px] md:grid-cols-1 md:pl-0 md:py-[24px] lg:pl-[40px]"
        >
          <nav aria-label="Footer" className="col-span-8 lg:col-span-9 sm:text-center md:text-center">
            <ul className="flex flex-wrap gap-x-10 gap-y-3 lg:gap-x-5 sm:flex-col sm:gap-x-0 sm:pt-[18px] md:justify-center md:gap-x-8">
              {NAV_ITEMS.map((item) => {
                const active = isNavItemActive(item, pathname, activeNav);
                return (
                  <li key={item.to}>
                    <Link to={item.to} aria-current={active ? 'page' : undefined} className={navLinkClass}>
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {socials.length ? (
            <ul
              aria-label={`${site.name} on social media`}
              className="flex col-span-4 lg:col-span-3 justify-end pr-[19px] space-x-2 sm:pr-[0px] sm:mt-[36px] sm:space-x-3 sm:justify-center sm:pb-[20px] md:pr-0 md:mt-6 md:justify-center"
            >
              {socials.map(({ key, label, icon }) => (
                <li key={key}>
                  <ExternalLink
                    href={site.socials[key]}
                    srLabel={`${site.name} on ${label}`}
                    className="block rounded-full"
                  >
                    <img
                      src={icon}
                      alt=""
                      width="48"
                      height="48"
                      loading="lazy"
                      decoding="async"
                      className="block w-12 h-12 transition-transform duration-300 hover:scale-110 hover:shadow-lg hover:opacity-80"
                    />
                  </ExternalLink>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <p className="text-center mt-[72px] sm:text-[8px] sm:mt-4">© Copyright {year} All Rights Reserved</p>
      </Container>
      <FooterItem />
    </footer>
  );
}

export default Footer;
