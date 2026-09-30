import { getStartDateTime } from '../../content';
import { useNow } from '../../lib/useNow';

const plural = (n, word) => `${n} ${word}${n === 1 ? '' : 's'}`;

const UNITS = [
  ['Days', 86400],
  ['Hours', 3600],
  ['Mins', 60],
  ['Secs', 1],
];

/** Live countdown to an event/conference start (IST); renders nothing once it has started. */
export default function Countdown({ entity, className = '' }) {
  const now = useNow(1000);
  let left = Math.floor((getStartDateTime(entity) - now) / 1000);
  if (!(left > 0)) return null;
  const parts = UNITS.map(([label, size]) => {
    const value = Math.floor(left / size);
    left -= value * size;
    return [label, value];
  });

  return (
    <div role="timer" aria-label={`Starts in ${plural(parts[0][1], 'day')}, ${plural(parts[1][1], 'hour')}`} className={`flex gap-3 sm:gap-2 ${className}`}>
      {parts.map(([label, value]) => (
        <div
          key={label}
          aria-hidden="true"
          className="w-[76px] sm:w-[62px] rounded-2xl border border-black bg-white py-2 sm:py-1 text-center"
        >
          <span className="block font-raleway font-bold tabular-nums text-[28px] leading-[34px] sm:text-[20px] sm:leading-[26px]">
            {String(value).padStart(2, '0')}
          </span>
          <span className="block text-[12px] leading-[16px] sm:text-[10px]">{label}</span>
        </div>
      ))}
    </div>
  );
}
