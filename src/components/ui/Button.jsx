import { Link } from 'react-router-dom';
import { focusRing } from './focusRing';
import { BUTTON_SHAPES } from './buttonShapes';

// Signature outlined button with a black fill that rises on hover
// (see Experts "Submit Your Talk" / Header "Join Community").
//
const BASE =
  'relative inline-block align-top text-center text-black border-black bg-white overflow-hidden transition-all duration-300 group';

function Inner({ children, labelClassName }) {
  return (
    <>
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-black scale-y-0 origin-bottom transition-transform duration-300 ease-in-out group-hover:scale-y-100 motion-reduce:transition-none"
      ></span>
      <span
        className={`relative z-10 text-black group-hover:text-white transition-colors duration-300 ${labelClassName}`}
      >
        {children}
      </span>
    </>
  );
}

/**
 * - `href`  → external <a target="_blank"> with an sr-only new-tab hint
 * - `to`    → internal react-router <Link>
 * - neither → <button type="button">
 * `shape` is a key of BUTTON_SHAPES or a full class string.
 */
export default function Button({
  href,
  to,
  shape = 'default',
  className = '',
  labelClassName = '',
  children,
  ...rest
}) {
  const shapeClasses = BUTTON_SHAPES[shape] ?? shape;
  const classes = `${BASE} ${shapeClasses} ${focusRing} ${className}`;
  const inner = <Inner labelClassName={labelClassName}>{children}</Inner>;

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...rest}>
        {inner}
        <span className="sr-only"> (opens in new tab)</span>
      </a>
    );
  }
  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {inner}
      </Link>
    );
  }
  return (
    <button type="button" className={classes} {...rest}>
      {inner}
    </button>
  );
}
