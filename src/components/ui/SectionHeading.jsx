// Section heading in the site's style, e.g. "Here Come the Experts!".
// `squiggle` is the trailing word(s) that get the hand-drawn underline.
// Heading level comes from `as` (default h2); size always from classes.
// `id` / other props (e.g. for aria-labelledby) pass through to the heading.
export default function SectionHeading({ as: Tag = 'h2', squiggle, className = '', children, ...rest }) {
  return (
    <Tag
      className={`font-raleway font-medium text-[56px] leading-[65px] sm:text-[24px] sm:leading-[32px] ${className}`}
      {...rest}
    >
      {children}
      {squiggle ? (
        <span className="relative inline-block ml-4 sm:ml-2">
          {/* `children` and `squiggle` are separate DOM nodes with no space
              between them, so the accessible name would run the words
              together ("About thismeetup"). A visually hidden non-breaking
              space (a plain one would collapse away) fixes the accessible name without touching the visible
              layout (same technique as the "(opens in new tab)" hints). */}
          <span className="sr-only">{' '}</span>
          {squiggle}
          <img
            src="/Experts/squiggly_line.svg"
            alt=""
            aria-hidden="true"
            className="absolute left-1/2 -translate-x-1/2 w-[100%] -mt-2 sm:hidden"
          />
        </span>
      ) : null}
    </Tag>
  );
}
