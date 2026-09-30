import Seo from '../components/Seo';
import Button from '../components/ui/Button';
import Container from '../components/ui/Container';
import EmptyState from '../components/ui/EmptyState';
import PageHero from '../components/ui/PageHero';
import Pill from '../components/ui/Pill';

export default function NotFoundPage() {
  return (
    <>
      <Seo title="Page not found" description="This page does not exist." noindex />
      <PageHero
        top={
          <>
            <img
              src="/Img/duke-logo-svg.svg"
              alt=""
              width="463"
              height="483"
              className="mx-auto w-[140px] h-auto sm:w-[90px]"
            />
            <Pill as="p" tone="bg-[#FFFCEF] border-[#E8C52A]" className="mt-6">
              404
            </Pill>
          </>
        }
        title="Page not found"
        intro="The page you are looking for has moved or never existed."
      />
      <section className="bg-[#FFFCEF]">
        <Container>
          <div className="pt-[100px] pb-[100px] sm:pt-[50px] sm:pb-[50px]">
            <EmptyState
              title="Let’s get you back on track"
              message="Head to the homepage or browse our events."
              action={
                <>
                  <Button to="/">Back to homepage</Button>
                  <Button to="/events">Browse events</Button>
                </>
              }
            />
          </div>
        </Container>
      </section>
    </>
  );
}
