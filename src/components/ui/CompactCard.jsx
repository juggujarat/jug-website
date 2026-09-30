import { Link } from 'react-router-dom';
import { CARD_SURFACE } from './cardSurface';
import { focusRing } from './focusRing';

/**
 * Compact card: date line, title, optional place. The whole card is a single
 * <Link> with nothing interactive inside it. `date` is a node (usually <time>).
 */
export default function CompactCard({ to, date, title, place, headingAs: Heading = 'h4' }) {
  return (
    <Link
      to={to}
      className={`${CARD_SURFACE} ${focusRing} group block h-full p-6 sm:p-5 transition-colors duration-300 hover:bg-[#FFEFC6] motion-reduce:transition-none`}
    >
      <p className="font-medium text-[14px] leading-[20px] sm:text-[12px] sm:leading-[18px]">{date}</p>
      <Heading className="mt-2 font-raleway font-bold text-[20px] leading-[26px] sm:text-[16px] sm:leading-[22px] break-words group-hover:underline underline-offset-4">
        {title}
      </Heading>
      {place ? (
        <p className="mt-2 font-raleway font-medium text-[16px] leading-[22px] sm:text-[14px] sm:leading-[20px] text-gray-700">
          {place}
        </p>
      ) : null}
    </Link>
  );
}
