import { pillClass } from './pillClass';

/**
 * Small rounded pill badge/tag. Always carries visible text (status/labels
 * must never rely on colour alone).
 *
 * @param {string} [as]        wrapper tag (default 'span')
 * @param {'default'|'compact'} [size]
 * @param {string} [tone]      bg + border colour classes, e.g. 'bg-white border-black'
 * @param {string} [className] extra classes
 */
export default function Pill({
  as: Tag = 'span',
  size = 'default',
  tone = 'bg-white border-black',
  className = '',
  children,
  ...rest
}) {
  return (
    <Tag className={pillClass({ size, tone, className })} {...rest}>
      {children}
    </Tag>
  );
}
