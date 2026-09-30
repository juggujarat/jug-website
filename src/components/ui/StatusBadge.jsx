// Status pill for events/conferences. Always carries text so status never
// relies on colour alone. Colours reuse the existing pill styles.
const STYLES = {
  live: 'bg-[#FFC0E7] border-black',
  upcoming: 'bg-[#D7FFF1] border-[#1AD090]',
  completed: 'bg-[#FAFAFA] border-[#C5C5C5]',
};

const LABELS = { live: 'LIVE', upcoming: 'UPCOMING', completed: 'COMPLETED' };

const SIZES = {
  xs: 'px-2 py-[2px] text-[10px] leading-[14px]',
  sm: 'px-4 py-[6px] text-[12px] sm:px-2 sm:py-[4px] sm:text-[10px]',
};

export default function StatusBadge({ status, size = 'sm', className = '' }) {
  if (!LABELS[status]) return null;
  return (
    <span
      className={`inline-block rounded-full border font-medium tracking-[1%] whitespace-nowrap text-black ${STYLES[status]} ${SIZES[size]} ${className}`}
    >
      {LABELS[status]}
    </span>
  );
}
