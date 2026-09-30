import { useParams } from 'react-router-dom';
import { formatDate, getConferenceBySlug, getEventBySlug, getGalleryBySlug, site } from '../content';
import { breadcrumbJsonLd } from '../lib/jsonLd';
import Seo from '../components/Seo';
import Button from '../components/ui/Button';
import PageHero from '../components/ui/PageHero';
import Container from '../components/ui/Container';
import EmptyState from '../components/ui/EmptyState';
import AlbumPhotos from '../components/gallery/AlbumPhotos';
import NotFoundPage from './NotFoundPage';

export default function GalleryDetailPage() {
  const { slug } = useParams();
  const gallery = getGalleryBySlug(slug);
  if (!gallery) return <NotFoundPage />;

  // Content validation guarantees exactly one existing parent.
  const parent = gallery.event ? getEventBySlug(gallery.event) : getConferenceBySlug(gallery.conference);
  const parentPath = gallery.event ? `/events/${parent.slug}` : `/conferences/${parent.slug}`;

  const path = `/gallery/${gallery.slug}`;

  return (
    <>
      <Seo
        title={gallery.title}
        description={`Photos from ${parent.name} by the ${site.name} community.`}
        path={path}
        image={gallery.cover}
        noindex={gallery.isSample}
        jsonLd={breadcrumbJsonLd('/gallery', { name: gallery.title, path })}
      />

      <PageHero
        title={gallery.title}
        intro={<time dateTime={gallery.date} className="font-medium">{formatDate(gallery.date)}</time>}
      >
        <Button to={parentPath} shape="card">
          Back to {parent.name}
        </Button>
      </PageHero>

      <div className="bg-[#FFFCEF]">
        <Container className="pt-[100px] pb-[100px] sm:pt-[50px] sm:pb-[50px]">
          {gallery.photos.length ? (
            <AlbumPhotos key={gallery.slug} photos={gallery.photos} />
          ) : (
            <EmptyState title="Photos coming soon" message="We are still putting this album together. Check back shortly." />
          )}
        </Container>
      </div>
    </>
  );
}
