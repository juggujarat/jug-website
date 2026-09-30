import Container from './Container';

/** Light-blue page-top block. `top` sits above the title (e.g. a logo); `children` below the intro (CTAs). */
export default function PageHero({ top, title, intro, children }) {
  return (
    <section className="bg-[#E1EEFB]">
      <Container size="xl" className="sm:max-w-[345px]">
        <div className="pt-12 pb-[80px] sm:pt-6 sm:pb-[40px] text-center">
          {top ? <div className="mb-6">{top}</div> : null}
          <h1 className="font-raleway font-medium text-[56px] leading-[65px] sm:text-[24px] sm:leading-[32px] md:text-[44px] md:leading-[52px] break-words">
            {title}
          </h1>
          {intro ? (
            <p className="mt-6 mx-auto max-w-[760px] font-raleway text-[18px] leading-[30px] sm:text-[14px] sm:leading-[24px]">
              {intro}
            </p>
          ) : null}
          {children ? <div className="mt-8 sm:mt-6 flex justify-center">{children}</div> : null}
        </div>
      </Container>
    </section>
  );
}

export function DetailHero({ children }) {
  return (
    <section className="bg-[#E1EEFB]">
      <Container size="xl" className="sm:max-w-[345px]">
        <div className="grid grid-cols-12 gap-10 md:gap-8 sm:gap-6 items-center pt-12 pb-[80px] sm:pt-6 sm:pb-[40px]">
          {children}
        </div>
      </Container>
    </section>
  );
}

export function DetailTitle({ className = '', children }) {
  return <h1 className={`font-raleway font-semibold text-[46px] leading-[58px] md:text-[38px] md:leading-[48px] sm:text-[24px] sm:leading-[32px] break-words ${className}`}>{children}</h1>;
}
