import { motion } from "framer-motion";
import { useRouteProgress } from "../../hooks/useRouteProgress";

export function TopProgressBar() {
  const { progress, visible } = useRouteProgress();

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-[3px] overflow-hidden">
      <motion.div
        className="h-full w-full origin-left bg-ion"
        animate={{ scaleX: progress / 100, opacity: visible ? 1 : 0 }}
        transition={{
          duration: progress === 100 ? 0.25 : 0.35,
          ease: "easeOut",
        }}
        style={{ willChange: "transform, opacity" }}
      />
    </div>
  );
}
