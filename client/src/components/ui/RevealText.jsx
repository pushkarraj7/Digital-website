import { motion } from 'framer-motion';
import { EASE, viewportOnce } from '../../lib/animations';
import { cn } from '../../lib/utils';

/**
 * Reveals text with a soft mask-up motion when scrolled into view.
 * Accepts either a single string or an array of lines, each animating
 * with a small stagger for a considered, editorial reveal.
 */
export function RevealText({ children, as: Tag = 'p', className = '', delay = 0 }) {
  const lines = Array.isArray(children) ? children : [children];

  return (
    <Tag className={cn('overflow-hidden', className)}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span
            className="block"
            initial={{ y: '110%', opacity: 0 }}
            whileInView={{ y: '0%', opacity: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.9, ease: EASE, delay: delay + i * 0.08 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}