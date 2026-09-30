import ExternalLink from '../ui/ExternalLink';

/** Row of fixed-size logo tiles (centred unless `justify` says otherwise); each links to the partner's website when it has one. */
const TILE =
  'flex items-center justify-center w-[285px] h-[163px] sm:w-[148px] sm:h-[112px] rounded-3xl border border-black bg-white px-6 py-4 sm:px-3 sm:py-2 text-center font-bold';
const TILE_LINK = 'transition-colors hover:bg-[#FFEFC6] motion-reduce:transition-none';

export default function PartnerLogos({ partners, justify = 'justify-center', className = '' }) {
  return (
    <ul className={`flex flex-wrap ${justify} gap-6 sm:gap-3 ${className}`}>
      {partners.map((p) => {
        const content = p.logo ? (
          <img
            src={p.logo}
            alt={p.name}
            width="237"
            height="80"
            loading="lazy"
            decoding="async"
            className="max-w-full max-h-full w-auto h-auto object-contain"
          />
        ) : (
          p.name
        );
        return (
          <li key={p.slug}>
            {p.website ? (
              <ExternalLink href={p.website} className={`${TILE} ${TILE_LINK}`}>
                {content}
              </ExternalLink>
            ) : (
              <div className={TILE}>{content}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
