// import { motion } from 'framer-motion';
// import { EASE } from '../../lib/animations';

// /**
//  * Wraps route content with a soft cross-fade + rise, used by App.jsx
//  * around <Outlet /> so navigating between Home and a case study feels
//  * continuous rather than a hard cut.
//  */
// export function PageTransition({ children, keyId }) {
//   return (
//     <motion.div
//       key={keyId}
//       initial={{ opacity: 0, y: 16 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -16 }}
//       transition={{ duration: 0.6, ease: EASE }}
//     >
//       {children}
//     </motion.div>
//   );
// }



import { motion } from 'framer-motion';
import { EASE } from '../../lib/animations';

export function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}