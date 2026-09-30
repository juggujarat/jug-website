import Card from '../ui/Card';
import ExternalLink from '../ui/ExternalLink';
import { linkClass } from '../ui/linkClass';

/**
 * Where something happens + thanks to the venue partner.
 * Handles a venue partner (logo/website), an inline location (no logo) and
 * online events. Renders nothing if there is neither a place nor a venue.
 *
 * @param {object} [place]      from getEventPlace(): { name, address, city, mapUrl, online }
 * @param {object} [venue]      venue partner record (venues.js): logo, website, name…
 * @param {string} [onlineUrl]  page to join/see an online event (e.g. Luma)
 * @param {string|false} [thanks] thanks line; defaults to one naming the venue partner, `false` hides it
 * @param {string} [headingAs]  tag for the place name (default 'h3')
 * @param {string} [bg]         Card background class (default white)
 * @param {string} [className]
 * @param {node}   [children]   extra content at the end of the text column
 */
export default function VenueCard({
  place,
  venue,
  onlineUrl,
  thanks,
  headingAs: Heading = 'h3',
  bg = 'bg-white',
  className = '',
  children,
}) {
  const name = venue?.name ?? place?.name;
  if (!name && !place?.online) return null;

  const online = Boolean(place?.online) && !venue;
  const address = venue?.address ?? place?.address;
  const city = venue?.city ?? place?.city;
  const mapUrl = venue?.mapUrl ?? place?.mapUrl;
  const addressLine = [address, city && !address?.includes(city) ? city : null]
    .filter(Boolean)
    .join(', ');
  const thanksLine =
    thanks === false ? null : (thanks ?? (venue ? `Thank you, ${venue.name}, for hosting us!` : null));

  return (
    <Card
      bg={bg}
      className={`flex items-center gap-10 sm:flex-col sm:items-start sm:gap-5 md:gap-6 p-[50px] sm:p-[25px] md:p-[40px] ${className}`}
    >
      {venue?.logo ? (
        <div className="shrink-0 flex items-center justify-center w-[160px] h-[160px] sm:w-[96px] sm:h-[96px] rounded-[24px] border border-black bg-white p-4 sm:p-3">
          <img
            src={venue.logo}
            alt={venue.name}
            width="128"
            height="128"
            loading="lazy"
            decoding="async"
            className="max-w-full max-h-full w-auto h-auto object-contain"
          />
        </div>
      ) : null}
      <div className="flex-1 min-w-0 font-raleway">
        <Heading className="font-bold text-[32px] leading-[40px] sm:text-[20px] sm:leading-[26px] break-words">
          {online ? name ?? 'Online' : name}
        </Heading>
        {online ? (
          <p className="pt-2 text-[18px] leading-[28px] sm:text-[14px] sm:leading-[22px]">
            This is an online event.
          </p>
        ) : null}
        {addressLine ? (
          <p className="pt-2 text-[18px] leading-[28px] sm:text-[14px] sm:leading-[22px]">
            {addressLine}
          </p>
        ) : null}
        {thanksLine ? (
          <p className="pt-4 font-medium text-[18px] leading-[28px] sm:text-[14px] sm:leading-[22px]">
            {thanksLine}
          </p>
        ) : null}
        {venue?.website || mapUrl || (online && onlineUrl) ? (
          <ul className="flex flex-wrap gap-x-6 gap-y-2 pt-4 text-[16px] sm:text-[14px]">
            {venue?.website ? (
              <li>
                <ExternalLink href={venue.website} className={linkClass}>
                  Visit website<span className="sr-only"> of {venue.name}</span>
                </ExternalLink>
              </li>
            ) : null}
            {mapUrl ? (
              <li>
                <ExternalLink href={mapUrl} className={linkClass}>
                  Open in Maps<span className="sr-only">: {name}</span>
                </ExternalLink>
              </li>
            ) : null}
            {online && onlineUrl ? (
              <li>
                <ExternalLink href={onlineUrl} className={linkClass}>
                  Event page
                </ExternalLink>
              </li>
            ) : null}
          </ul>
        ) : null}
        {children}
      </div>
    </Card>
  );
}
