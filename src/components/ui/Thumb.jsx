export default function Thumb({ photo, className = '' }) {
  return (
    <img
      src={photo.thumb ?? photo.src}
      alt={photo.alt ?? ''}
      width={photo.w}
      height={photo.h}
      loading="lazy"
      decoding="async"
      className={`w-full h-auto aspect-[4/3] object-cover rounded-[24px] sm:rounded-2xl border border-black bg-[#FAFAFA] ${className}`}
    />
  );
}

/** Grid of thumbnails used by the event gallery preview and the homepage gallery highlights. */
export function ThumbGrid({ photos }) {
  return (
    <ul className="grid grid-cols-3 sm:grid-cols-2 gap-6 sm:gap-3 md:gap-4">
      {photos.map((photo) => (
        <li key={photo.src}>
          <Thumb photo={photo} />
        </li>
      ))}
    </ul>
  );
}
