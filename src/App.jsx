// src/App.jsx
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import { SmoothScroll } from "./components/layout/SmoothScroll";
import { CustomCursor } from "./components/layout/CustomCursor";
import { Navbar } from "./components/layout/Navbar";
import { GrowthField } from "./components/three/GrowthField";
import { Footer } from "./components/layout/Footer";
import { PageTransition } from "./components/layout/PageTransition";
import { ErrorBoundary } from "./components/layout/ErrorBoundary";

import { Home } from "./pages/Home";
import { CaseStudy } from "./pages/CaseStudy";

import { useReducedMotion } from "./hooks/useReducedMotion";

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
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <BrowserRouter>
      <SmoothScroll enabled={!prefersReducedMotion}>
        <div className="relative min-h-screen bg-void text-ink antialiased selection:bg-ion/30 selection:text-ink">
          {!prefersReducedMotion && <CustomCursor />}

          <GrowthField className="pointer-events-none fixed inset-0 z-0 opacity-90" />

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
