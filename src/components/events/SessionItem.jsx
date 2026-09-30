import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import {
  formatDate,
  formatTimeRange,
  getSessionDate,
  getSpeakerBySlug,
} from '../../content';
import ExternalLink from '../ui/ExternalLink';
import { focusRing } from '../ui/focusRing';
import { linkClass } from '../ui/linkClass';
import Pill from '../ui/Pill';
import { pillClass } from '../ui/pillClass';

const TYPE_LABELS = {
  workshop: 'Workshop',
  panel: 'Panel',
  keynote: 'Keynote',
  registration: 'Registration',
  opening: 'Opening',
  break: 'Break',
};

const RESOURCES = [
  { key: 'slidesUrl', label: 'Slides' },
  { key: 'repoUrl', label: 'Code' },
  { key: 'videoUrl', label: 'Video' },
];

/**
 * One talk / workshop / agenda slot: time (and optionally date), title,
 * type pill (non-talks), linked speaker names, description, and
 * Slides / Code / Video links — each only when present.
 *
 * @param {object}  session      session record (sessions.js)
 * @param {object[]} [speakers]  resolved speaker records; defaults to session.speakers looked up by slug
 * @param {string}  [headingAs]  tag for the title (default 'h3')
 * @param {boolean} [showDate]   also show the session date (multi-day conferences)
 * @param {string}  [as]         wrapper tag (default 'article'; use 'li' inside a <ul>)
 * @param {string}  [id]         anchor id (event pages use the session slug)
 * @param {string}  [titleTo]    link the title to this path (e.g. from a speaker profile)
 * @param {string}  [className]
 */
export default function SessionItem({
  session,
  speakers,
  headingAs: Heading = 'h3',
  showDate = false,
  as: Tag = 'article',
  id,
  titleTo,
  className = '',
}) {
  if (!session) return null;
  const people =
    speakers ?? (session.speakers ?? []).map(getSpeakerBySlug).filter(Boolean);
  const time = formatTimeRange(session.startTime, session.endTime);
  const date = showDate ? getSessionDate(session) : undefined;
  const typeLabel = TYPE_LABELS[session.type];
  const resources = RESOURCES.filter(({ key }) => session[key]);

  return (
    <Tag
      id={id}
      className={`grid grid-cols-12 gap-6 sm:gap-3 md:gap-3 p-8 sm:p-5 bg-white border border-black rounded-[24px] ${className}`}
    >
      <div className="col-span-3 sm:col-span-12 md:col-span-12 font-medium text-[16px] leading-[24px] sm:text-[13px] sm:leading-[20px]">
        {date ? (
          <p>
            <time dateTime={date}>{formatDate(date)}</time>
          </p>
        ) : null}
        {time ? <p>{time}</p> : null}
        {typeLabel ? (
          <p className="pt-2">
            <Pill size="compact" tone="bg-[#FFEFC6] border-[#E8C52A]">
              {typeLabel}
            </Pill>
          </p>
        ) : null}
      </div>
      <div className="col-span-9 sm:col-span-12 md:col-span-12 min-w-0">
        <Heading className="font-raleway font-bold text-[24px] leading-[30px] sm:text-[18px] sm:leading-[24px] break-words">
          {titleTo ? (
            <Link to={titleTo} className={`underline underline-offset-4 hover:text-gray-600 ${focusRing}`}>
              {session.title}
            </Link>
          ) : (
            session.title
          )}
        </Heading>
        {people.length > 0 ? (
          <p className="pt-2 font-raleway text-[16px] leading-[22px] sm:text-[13px] sm:leading-[20px]">
            <span className="text-gray-600">by </span>
            {people.map((speaker, i) => (
              <Fragment key={speaker.slug}>
                {i > 0 ? (i === people.length - 1 ? ' & ' : ', ') : null}
                <Link
                  to={`/speakers/${speaker.slug}`}
                  className={`${linkClass} ${focusRing}`}
                >
                  {speaker.name}
                </Link>
              </Fragment>
            ))}
          </p>
        ) : null}
        {session.description ? (
          <p className="pt-3 font-raleway text-[16px] leading-[26px] sm:text-[14px] sm:leading-[22px]">
            {session.description}
          </p>
        ) : null}
        {resources.length > 0 ? (
          <ul className="flex flex-wrap gap-3 pt-4">
            {resources.map(({ key, label }) => (
              <li key={key}>
                <ExternalLink
                  href={session[key]}
                  className={pillClass({
                    size: 'compact',
                    tone: 'bg-[#D7FFF1] border-black',
                    className: 'hover:bg-black hover:text-white transition-colors',
                  })}
                >
                  {label}
                  <span className="sr-only"> for {session.title}</span>
                </ExternalLink>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </Tag>
  );
}
