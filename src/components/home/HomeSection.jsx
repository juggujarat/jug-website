import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';

/** Homepage section: coloured band, heading with an optional action button, then the content. */
export default function HomeSection({ id, bg, title, squiggle, action, children }) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className={`${bg} overflow-x-clip`}>
      <Container className="pt-[128px] pb-[100px] sm:pt-[50px] sm:pb-[50px]">
        <div className="flex justify-between items-center gap-4 sm:flex-col">
          <SectionHeading id={`${id}-heading`} squiggle={squiggle} className="sm:text-center">
            {title}
          </SectionHeading>
          {action}
        </div>
        <div className="pt-[48px] sm:pt-[20px]">{children}</div>
      </Container>
    </section>
  );
}
