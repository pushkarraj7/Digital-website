// src/App.jsx
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import { useReducedMotion } from "./hooks/useReducedMotion";
import { useIsDesktop } from "./hooks/useMediaQuery";

import { lazy, Suspense } from "react";
import { SmoothScroll } from "./components/layout/SmoothScroll";
import { CustomCursor } from "./components/layout/CustomCursor";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";

const GrowthField = lazy(() =>
  import("./components/three/GrowthField").then((m) => ({
    default: m.GrowthField,
  })),
);
import { PageTransition } from "./components/layout/PageTransition";
import { ErrorBoundary } from "./components/layout/ErrorBoundary";

import { Home } from "./pages/Home";
import { CaseStudy } from "./pages/CaseStudy";
import { NotFound } from "./pages/NotFound";
import { About } from "./pages/About";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <Home />
            </PageTransition>
          }
        />
        <Route
          path="/work/:slug"
          element={
            <PageTransition>
              <CaseStudy />
            </PageTransition>
          }
        />
        <Route
          path="*"
          element={
            <PageTransition>
              <NotFound />
            </PageTransition>
          }
        />

        <Route
          path="/about"
          element={
            <PageTransition>
              <About />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const prefersReducedMotion = useReducedMotion();
  const isDesktop = useIsDesktop();

  return (
    <BrowserRouter>
      <SmoothScroll enabled={isDesktop && !prefersReducedMotion}>
        <div className="relative min-h-screen bg-void text-ink antialiased selection:bg-ion/30 selection:text-ink">
          {isDesktop && !prefersReducedMotion && <CustomCursor />}

          {isDesktop && !prefersReducedMotion && (
            <Suspense fallback={null}>
              <GrowthField className="pointer-events-none fixed inset-0 z-0 opacity-90" />
            </Suspense>
          )}

          <Navbar />

          <main className="relative z-10">
            {/* Route-level boundary: a crash in either page falls back to a
                message instead of unmounting the whole app (nav/footer
                stay intact so the user isn't left on a truly blank page). */}
            <ErrorBoundary
              fallback={
                <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 px-6 text-center">
                  <p className="font-display text-2xl text-ink">
                    Something went wrong.
                  </p>
                  <p className="max-w-sm text-sm text-mist">
                    This section hit an error. Try refreshing the page.
                  </p>
                </div>
              }
            >
              <AnimatedRoutes />
            </ErrorBoundary>
          </main>

          <Footer className="relative z-10" />
        </div>
      </SmoothScroll>
    </BrowserRouter>
  );
}
