// src/App.jsx
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useReducedMotion } from "./hooks/useReducedMotion";
import { useIsDesktop } from "./hooks/useMediaQuery";
import { lazy, Suspense } from "react";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { Contact } from "./pages/Contact";
import { Blog } from "./pages/Blog";
import { SmoothScroll } from "./components/layout/SmoothScroll";
import { PageTransition } from "./components/layout/PageTransition";
import { ErrorBoundary } from "./components/layout/ErrorBoundary";
import { Home } from "./pages/Home";
import { CaseStudy } from "./pages/CaseStudy";
import { NotFound } from "./pages/NotFound";
import { About } from "./pages/About";

import { SocialMediaMarketing } from "./pages/services/digital-marketing/SocialMediaMarketing";
import { GoogleBusinessManagement } from "./pages/services/digital-marketing/GoogleBusinessManagement";
import { LeadGenerationProgram } from "./pages/services/digital-marketing/LeadGenerationProgram";
import { OnlineAdvertiseCampaign } from "./pages/services/digital-marketing/OnlineAdvertiseCampaign";
import { WhatsAppMarketing } from "./pages/services/digital-marketing/WhatsAppMarketing";
import { Property360VirtualTour } from "./pages/services/branding/Property360VirtualTour";
import { Google360VirtualTour } from "./pages/services/branding/Google360VirtualTour";
import { GraphicDesignAndVideoEditing } from "./pages/services/branding/GraphicDesignAndVideoEditing";
import { ProductPhotography } from "./pages/services/branding/ProductPhotography";
import { CustomNfcCard } from "./pages/services/branding/CustomNfcCard";
import { SoftwareDevelopment } from "./pages/services/it-solution/SoftwareDevelopment";
import { ApplicationDevelopment } from "./pages/services/it-solution/ApplicationDevelopment";
import { WebsiteDesignAndDevelopment } from "./pages/services/it-solution/WebsiteDesignAndDevelopment";
import { SoftwarePortfolio } from "./pages/portfolio/SoftwarePortfolio";
import { WebsiteDevelopmentPortfolio } from "./pages/portfolio/WebsiteDevelopmentPortfolio";
import { GraphicDesignPortfolio } from "./pages/portfolio/GraphicDesignPortfolio";
import { SocialMediaPortfolio } from "./pages/portfolio/SocialMediaPortfolio";

const CustomCursor = lazy(() =>
  import("./components/layout/CustomCursor").then((m) => ({
    default: m.CustomCursor,
  })),
);

const GrowthField = lazy(() => {
  console.trace("GrowthField import triggered");
  return import("./components/three/GrowthField").then((m) => ({
    default: m.GrowthField,
  }));
});

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
        <Route
          path="/contact"
          element={
            <PageTransition>
              <Contact />
            </PageTransition>
          }
        />

        <Route
          path="/blog"
          element={
            <PageTransition>
              <Blog />
            </PageTransition>
          }
        />
        <Route
          path="/services/digital-marketing/social-media-marketing-management"
          element={
            <PageTransition>
              <SocialMediaMarketing />
            </PageTransition>
          }
        />
        <Route
          path="/services/digital-marketing/google-business-management"
          element={
            <PageTransition>
              <GoogleBusinessManagement />
            </PageTransition>
          }
        />

        <Route
          path="/services/digital-marketing/lead-generation-program"
          element={
            <PageTransition>
              <LeadGenerationProgram />
            </PageTransition>
          }
        />

        <Route
          path="/services/digital-marketing/online-advertise-campaign"
          element={
            <PageTransition>
              <OnlineAdvertiseCampaign />
            </PageTransition>
          }
        />

        <Route
          path="/services/digital-marketing/whatsapp-marketing"
          element={
            <PageTransition>
              <WhatsAppMarketing />
            </PageTransition>
          }
        />

        <Route
          path="/services/branding/property-360-virtual-tour"
          element={
            <PageTransition>
              <Property360VirtualTour />
            </PageTransition>
          }
        />

        <Route
          path="/services/branding/google-360-virtual-tour"
          element={
            <PageTransition>
              <Google360VirtualTour />
            </PageTransition>
          }
        />
        <Route
          path="/services/branding/graphic-design-and-video-editing"
          element={
            <PageTransition>
              <GraphicDesignAndVideoEditing />
            </PageTransition>
          }
        />

        <Route
          path="/services/branding/product-photography"
          element={
            <PageTransition>
              <ProductPhotography />
            </PageTransition>
          }
        />

        <Route
          path="/services/branding/custom-nfc-card"
          element={
            <PageTransition>
              <CustomNfcCard />
            </PageTransition>
          }
        />

        <Route
          path="/services/it-solution/software-development"
          element={
            <PageTransition>
              <SoftwareDevelopment />
            </PageTransition>
          }
        />

        <Route
          path="/services/it-solution/application-development"
          element={
            <PageTransition>
              <ApplicationDevelopment />
            </PageTransition>
          }
        />

        <Route
          path="/services/it-solution/website-design-and-development"
          element={
            <PageTransition>
              <WebsiteDesignAndDevelopment />
            </PageTransition>
          }
        />

        <Route
          path="/portfolio/software"
          element={
            <PageTransition>
              <SoftwarePortfolio />
            </PageTransition>
          }
        />

        <Route
          path="/portfolio/website-development"
          element={
            <PageTransition>
              <WebsiteDevelopmentPortfolio />
            </PageTransition>
          }
        />

        <Route
          path="/portfolio/graphic-design"
          element={
            <PageTransition>
              <GraphicDesignPortfolio />
            </PageTransition>
          }
        />
        <Route
          path="/portfolio/social-media"
          element={
            <PageTransition>
              <SocialMediaPortfolio />
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
  // console.log("DEBUG isDesktop:", isDesktop, "width:", window.innerWidth);

  return (
    <BrowserRouter>
      <SmoothScroll enabled={isDesktop && !prefersReducedMotion}>
        <div className="relative min-h-screen bg-void text-ink antialiased selection:bg-ion/30 selection:text-ink">
          {isDesktop && !prefersReducedMotion && (
            <Suspense fallback={null}>
              <CustomCursor />
            </Suspense>
          )}

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
