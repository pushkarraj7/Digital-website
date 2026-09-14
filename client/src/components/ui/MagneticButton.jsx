// import { useRef, useState } from 'react';
// import { motion } from 'framer-motion';
// import { useIsTouchDevice } from '../../hooks/useMediaQuery';
// import { cn } from '../../lib/utils';

// /**
//  * A button that subtly pulls toward the cursor within its bounds.
//  * Falls back to a plain tap target on touch devices.
//  */
// export function MagneticButton({
//   children,
//   onClick,
//   href,
//   variant = 'primary',
//   className = '',
//   as,
// }) {
//   const ref = useRef(null);
//   const isTouch = useIsTouchDevice();
//   const [offset, setOffset] = useState({ x: 0, y: 0 });

//   const handleMove = (event) => {
//     if (isTouch || !ref.current) return;
//     const rect = ref.current.getBoundingClientRect();
//     const relX = event.clientX - (rect.left + rect.width / 2);
//     const relY = event.clientY - (rect.top + rect.height / 2);
//     setOffset({ x: relX * 0.28, y: relY * 0.32 });
//   };

//   const reset = () => setOffset({ x: 0, y: 0 });

//   const base =
//     'relative inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[0.95rem] font-medium tracking-tight transition-colors duration-500 ease-premium';

//   const styles =
//     variant === 'primary'
//       ? 'bg-ink text-void hover:bg-ion'
//       : 'text-ink border border-line hover:border-ion/50';

//   const Component = as || (href ? 'a' : 'button');

//   return (
//     <motion.div
//       ref={ref}
//       onMouseMove={handleMove}
//       onMouseLeave={reset}
//       animate={{ x: offset.x, y: offset.y }}
//       transition={{ type: 'spring', stiffness: 150, damping: 12, mass: 0.4 }}
//       className="inline-block"
//     >
//       <Component
//         href={href}
//         onClick={onClick}
//         className={cn(base, styles, className)}
//       >
//         {children}
//       </Component>
//     </motion.div>
//   );
// }

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useIsTouchDevice } from "../../hooks/useMediaQuery";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { cn } from "../../lib/utils";

/**
 * A button that subtly pulls toward the cursor within its bounds.
 * Falls back to a plain tap target on touch devices.
 */
export function MagneticButton({
  children,
  onClick,
  href,
  variant = "primary",
  className = "",
  as,
}) {
  const ref = useRef(null);
  const isTouch = useIsTouchDevice();
  const reducedMotion = useReducedMotion();
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMove = (event) => {
    if (isTouch || reducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = event.clientX - (rect.left + rect.width / 2);
    const relY = event.clientY - (rect.top + rect.height / 2);
    setOffset({ x: relX * 0.28, y: relY * 0.32 });
  };

  const reset = () => setOffset({ x: 0, y: 0 });

  const base =
    "relative inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[0.95rem] font-medium tracking-tight transition-colors duration-500 ease-premium";

  const styles =
    variant === "primary"
      ? "bg-ink text-void hover:bg-ion"
      : "text-ink border border-line hover:border-ion/50";

  const Component = as || (href ? "a" : "button");

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: "spring", stiffness: 150, damping: 12, mass: 0.4 }}
      whileTap={{ scale: 0.96 }}
      className="inline-block"
    >
      <Component
        href={href}
        onClick={onClick}
        className={cn(base, styles, className)}
      >
        {children}
      </Component>
    </motion.div>
  );
}
