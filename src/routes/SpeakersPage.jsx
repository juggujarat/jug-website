import { useEffect, useRef, useState } from 'react';
import { allSample, countLabel, getSpeakerDirectory, site } from '../content';
import Seo from '../components/Seo';
import PageHero from '../components/ui/PageHero';
import Container from '../components/ui/Container';
import EmptyState from '../components/ui/EmptyState';
import { focusRing } from '../components/ui/focusRing';
import SpeakerCard from '../components/speakers/SpeakerCard';

const DESCRIPTION = `Everyone who has spoken at a ${site.name} meetup or conference — their talks, slides and recordings.`;

const directory = getSpeakerDirectory();

const matches = (speaker, query) =>
  [speaker.name, speaker.company].some((text) => text?.toLowerCase().includes(query));

export default function SpeakersPage() {
  const [query, setQuery] = useState('');
  const searchRef = useRef(null);
  // Pick up text typed into the prerendered box before hydration.
  useEffect(() => {
    if (searchRef.current.value) setQuery(searchRef.current.value);
  }, []);
  const needle = query.trim().toLowerCase();
  const shown = needle ? directory.filter((speaker) => matches(speaker, needle)) : directory;

  return (
    <>
      <Seo title="Speakers" description={DESCRIPTION} path="/speakers" noindex={allSample(directory)} />

      <PageHero
        title="Speakers"
        intro={`Everyone who has shared their knowledge on a ${site.name} stage. Pick a speaker to see their talks, slides and recordings.`}
      />

      <section className="bg-[#FFFCEF]">
        <Container className="pt-[100px] pb-[100px] sm:pt-[50px] sm:pb-[50px]">
          <div className="max-w-[560px] sm:mx-auto">
            <label htmlFor="speaker-search" className="block font-raleway font-semibold text-[18px] sm:text-[14px]">
              Search by name or company
            </label>
            <input
              id="speaker-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              ref={searchRef}
              autoComplete="off"
              className={`mt-3 w-full px-5 py-4 sm:px-4 sm:py-3 border border-black rounded-2xl bg-white font-raleway text-[16px] ${focusRing}`}
            />
          </div>
          <p role="status" className="sr-only">
            {countLabel(shown.length, 'speaker') ?? '0 speakers'}
          </p>

          <div className="pt-[48px] sm:pt-[24px]">
            {shown.length ? (
              <ul className="grid grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-x-6 gap-y-12 sm:gap-y-8">
                {shown.map((speaker) => (
                  <li key={speaker.slug}>
                    <SpeakerCard speaker={speaker} />
                  </li>
                ))}
              </ul>
            ) : (
              <EmptyState
                title={needle ? 'No speakers found' : 'No speakers yet'}
                message={
                  needle
                    ? 'Nobody matches that search. Try a different name or company.'
                    : `Speakers appear here after their first session at ${site.name}.`
                }
              />
            )}
          </div>
        </Container>
      </section>
    </>
  );
}
