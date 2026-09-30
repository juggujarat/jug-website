// Bordered rounded surface used for the big boxes (Join banner, footer bar).
// Pass a pastel `bg` class (e.g. 'bg-[#EDD7FF]') to tint it.
export default function Card({ as: Tag = 'div', bg = 'bg-white', className = '', children, ...rest }) {
  return (
    <Tag className={`border border-black rounded-[40px] ${bg} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
