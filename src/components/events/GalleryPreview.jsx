import Button from '../ui/Button';
import { ThumbGrid } from '../ui/Thumb';

/**
 * Up to `limit` photo thumbnails from a gallery + "View full gallery" link
 * to /gallery/:slug. Renders nothing when the gallery has no photos.
 *
 * @param {object}  gallery     gallery record (galleries.js)
 * @param {number}  [limit]     max thumbnails (default 6)
 * @param {boolean} [showTitle] show the gallery title above the grid (e.g. when listing several)
 * @param {string}  [headingAs] tag for the title (default 'h3')
 * @param {string}  [className]
 */
export default function GalleryPreview({
  gallery,
  limit = 6,
  showTitle = false,
  headingAs: Heading = 'h3',
  className = '',
}) {
  const photos = (gallery?.photos ?? []).slice(0, limit);
  if (photos.length === 0) return null;

  return (
    <div className={className}>
      {showTitle && gallery.title ? (
        <Heading className="pb-6 sm:pb-4 font-raleway font-bold text-[24px] leading-[30px] sm:text-[18px] sm:leading-[24px]">
          {gallery.title}
        </Heading>
      ) : null}
      <ThumbGrid photos={photos} />
      <div className="pt-8 sm:pt-5 flex justify-center">
        <Button
          to={`/gallery/${gallery.slug}`}
          shape="card"
          aria-label={gallery.title ? `View full gallery: ${gallery.title}` : undefined}
        >
          View full gallery
        </Button>
      </div>
    </div>
  );
}
