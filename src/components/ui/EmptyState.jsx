import Card from './Card';

/**
 * Friendly placeholder for empty lists / not-yet-available content.
 * `action` is any node (usually a <Button>).
 */
export default function EmptyState({
  title,
  message,
  action,
  headingAs: Heading = 'h2',
  bg = 'bg-[#EDD7FF]',
  className = '',
}) {
  return (
    <Card
      bg={bg}
      className={`px-[50px] py-[60px] sm:px-[25px] sm:py-[40px] text-center ${className}`}
    >
      {title ? (
        <Heading className="font-raleway font-bold text-[40px] leading-[48px] sm:text-[24px] sm:leading-[28.8px]">
          {title}
        </Heading>
      ) : null}
      {message ? (
        <p className="mt-4 font-raleway font-medium text-[20px] leading-[28px] sm:text-[16px] sm:leading-[24px] max-w-[760px] mx-auto">
          {message}
        </p>
      ) : null}
      {action ? <div className="mt-8 sm:mt-6 flex flex-wrap justify-center gap-4">{action}</div> : null}
    </Card>
  );
}
