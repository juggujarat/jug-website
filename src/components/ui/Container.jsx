// Page-width wrapper matching the existing sections:
//   size="xl"  → hero/header/footer width (container xl:max-w-screen-xl)
//   size="2xl" → content sections (container 2xl:max-w-screen-2xl)
const SIZES = {
  xl: 'xl:max-w-screen-xl',
  '2xl': '2xl:max-w-screen-2xl',
};

export default function Container({ as: Tag = 'div', size = '2xl', className = '', children, ...rest }) {
  return (
    <Tag className={`container mx-auto ${SIZES[size] ?? ''} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
