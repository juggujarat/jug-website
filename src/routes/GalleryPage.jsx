import { Link } from 'react-router-dom';
import { allSample, formatDate, galleries, getGalleriesByYear, site } from '../content';
import Seo from '../components/Seo';
import PageHero from '../components/ui/PageHero';
import Container from '../components/ui/Container';
import EmptyState from '../components/ui/EmptyState';
import { focusRing } from '../components/ui/focusRing';
import { GRID } from '../components/events/eventsGrid';

const DESCRIPTION = `Photos from ${site.name} meetups and conferences, year by year.`;

function AlbumCard({ gallery }) {
  const count = gallery.photos.length;
  return (
    <Link
      to={`/gallery/${gallery.slug}`}
      className={`${focusRing} group block h-full overflow-hidden border border-black rounded-[24px] bg-white transition-colors duration-300 hover:bg-[#FFEFC6] motion-reduce:transition-none`}
    >
      <img
        src={gallery.cover}
        alt=""
        width="800"
        height="600"
        loading="lazy"
        decoding="async"
        className="block w-full h-auto aspect-[4/3] object-cover border-b border-black bg-[#FAFAFA]"
      />
      <div className="p-6 sm:p-5 font-raleway">
        <h3 className="font-bold text-[20px] leading-[26px] sm:text-[16px] sm:leading-[22px] break-words group-hover:underline underline-offset-4">
          {gallery.title}
        </h3>
        <p className="mt-2 flex flex-wrap gap-x-3 font-medium text-[16px] leading-[22px] sm:text-[14px] sm:leading-[20px]">
          <time dateTime={gallery.date}>{formatDate(gallery.date)}</time>
          <span>
            {count} {count === 1 ? 'photo' : 'photos'}
          </span>
        </p>
      </div>
    </Link>
  );
}

export default function GalleryPage() {
  const years = getGalleriesByYear();

  return (
    <>
      <Seo title="Gallery" description={DESCRIPTION} path="/gallery" noindex={allSample(galleries)} />

      <PageHero
        title="Community Gallery"
        intro={`Moments from ${site.name} meetups and conferences: the talks, the workshops and the people.`}
      />

      <div className="bg-[#FFFCEF]">
        <Container className="pt-[50px] pb-[100px] sm:pt-[25px] sm:pb-[50px]">
          {years.length ? (
            years.map(({ year, galleries }) => (
              <section key={year} aria-labelledby={`year-${year}`} className="pt-[50px] sm:pt-[25px]">
                <h2
                  id={`year-${year}`}
                  className="font-raleway font-bold text-[32px] leading-[40px] sm:text-[20px] sm:leading-[28px] sm:text-center"
                >
                  {year}
                </h2>
                <ul className={`mt-6 sm:mt-4 ${GRID}`}>
                  {galleries.map((gallery) => (
                    <li key={gallery.slug} className="h-full">
                      <AlbumCard gallery={gallery} />
                    </li>
                  ))}
                </ul>
              </section>
            ))
          ) : (
            <EmptyState
              className="mt-[50px] sm:mt-[25px]"
              title="No albums yet"
              message="Photos from our meetups and conferences will appear here soon."
            />
          )}
        </Container>
      </div>
    </>
  );
}
