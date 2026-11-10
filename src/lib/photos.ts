import type { ImageMetadata } from 'astro';
import type { EventEntry } from './data';

/** All meetup photos, keyed by folder (meetup-<n>). Files are optimised by astro:assets at build time. */
const files = import.meta.glob<{ default: ImageMetadata }>('/src/assets/meetups/*/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', {
  eager: true,
});

export interface Photo {
  image: ImageMetadata;
  file: string;
  folder: string;
  meetupNumber: number;
}

const all: Photo[] = Object.entries(files)
  .map(([path, mod]) => {
    const [, , , , folder, file] = path.split('/');
    const n = Number(folder.match(/(\d+)/)?.[1] ?? 0);
    return { image: mod.default, file, folder, meetupNumber: n };
  })
  .sort((a, b) => a.meetupNumber - b.meetupNumber || a.file.localeCompare(b.file, undefined, { numeric: true }));

export const isGroupPhoto = (file: string) => /group/i.test(file);

export function photosFor(event: EventEntry): Photo[] {
  const n = event.data.meetupNumber;
  if (!n) return [];
  return all.filter((p) => p.meetupNumber === n);
}

/** The group photo used as the event banner, if the meetup folder has one. */
export function bannerFor(event: EventEntry): Photo | undefined {
  const photos = photosFor(event);
  if (!photos.length) return undefined;
  if (event.data.banner) return photos.find((p) => p.file === event.data.banner);
  return photos.find((p) => isGroupPhoto(p.file));
}

export const allPhotos = () => all;
