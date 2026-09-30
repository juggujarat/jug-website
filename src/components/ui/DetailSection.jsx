import SectionHeading from './SectionHeading';

/** One content block on the warm background, with an h2. */
export default function DetailSection({ title, squiggle, children }) {
  return (
    <section className="pt-[100px] sm:pt-[50px] md:pt-[72px]">
      <SectionHeading className="md:text-[44px] md:leading-[52px]" squiggle={squiggle}>
        {title}
      </SectionHeading>
      <div className="pt-[48px] sm:pt-[20px]">{children}</div>
    </section>
  );
}
