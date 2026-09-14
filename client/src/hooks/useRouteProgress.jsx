import {
  createContext,
  useContext,
  useRef,
  useState,
  useCallback,
} from "react";
import { useLocation } from "react-router-dom";

const RouteProgressContext = createContext(null);

export function RouteProgressProvider({ children }) {
  const location = useLocation();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const trickleRef = useRef(null);
  const hideTimeoutRef = useRef(null);
  const resetTimeoutRef = useRef(null);
  const lastPathRef = useRef(location.pathname);

  const clearTimers = () => {
    if (trickleRef.current) clearInterval(trickleRef.current);
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);
  };

  const start = useCallback(() => {
    clearTimers();
    setVisible(true);
    setProgress(12);
    trickleRef.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 90) return p;
        const step = p < 50 ? 8 : p < 75 ? 4 : 1;
        return Math.min(p + step, 90);
      });
    }, 220);
  }, []);

  const done = useCallback(() => {
    clearTimers();
    setProgress(100);
    hideTimeoutRef.current = setTimeout(() => {
      setVisible(false);
      resetTimeoutRef.current = setTimeout(() => setProgress(0), 200);
    }, 150);
  }, []);

  // Runs during render, the instant the pathname actually changes — this
  // guarantees `start` fires before ANY child of this provider (including
  // the RouteProgressDone sentinel) renders or mounts in this commit. That's
  // what makes it win the race against `done` even when the target route's
  // chunk is already cached and resolves with no visible Suspense gap.
  if (lastPathRef.current !== location.pathname) {
    lastPathRef.current = location.pathname;
    start();
  }

  return (
    <RouteProgressContext.Provider value={{ progress, visible, start, done }}>
      {children}
    </RouteProgressContext.Provider>
  );
}

export function useRouteProgress() {
  const ctx = useContext(RouteProgressContext);
  if (!ctx) {
    throw new Error(
      "useRouteProgress must be used within RouteProgressProvider",
    );
  }
  return ctx;
}
