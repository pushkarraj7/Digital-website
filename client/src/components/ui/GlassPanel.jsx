import { cn } from '../../lib/utils';

/**
 * A single reusable "glass" surface treatment — used sparingly, per the
 * brief, for navigation, overlays and selected content surfaces only.
 * Not meant to be the default wrapper for every block on the page.
 */
export function GlassPanel({ children, className = '', as: Tag = 'div', ...rest }) {
  return (
    <Tag
      className={cn(
        'bg-surface/60 backdrop-blur-xl border border-line rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.35)]',
        className
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}