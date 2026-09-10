import { Suspense } from "react";
import { useInView } from "../../hooks/useInView";

export function LazySection({ children, fallback, rootMargin }) {
  const [ref, inView] = useInView({ rootMargin });

  return (
    <div ref={ref}>
      {inView ? <Suspense fallback={fallback}>{children}</Suspense> : fallback}
    </div>
  );
}
