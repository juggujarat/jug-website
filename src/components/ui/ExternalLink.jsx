import { focusRing } from './focusRing';

/**
 * <a> that opens in a new tab safely and tells screen-reader users so.
 * Pass `srLabel` to replace the visible text for assistive tech (e.g. icon links).
 */
export default function ExternalLink({ href, className = '', srLabel, children, ...rest }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${focusRing} ${className}`}
      {...rest}
    >
      {srLabel ? <span className="sr-only">{srLabel}</span> : null}
      {children}
      <span className="sr-only"> (opens in new tab)</span>
    </a>
  );
}
