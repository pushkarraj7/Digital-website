// src/App.jsx
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useReducedMotion } from "./hooks/useReducedMotion";
import { useIsDesktop } from "./hooks/useMediaQuery";
import { lazy, Suspense, useEffect, useRef } from "react";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { SmoothScroll } from "./components/layout/SmoothScroll";
import { PageTransition } from "./components/layout/PageTransition";
import { ErrorBoundary } from "./components/layout/ErrorBoundary";
import { Home } from "./pages/Home"; // kept eager — it's the most common entry point

// Every other route is code-split: each page's JS is only fetched
// when a user actually navigates to it, instead of bloating the
// initial bundle every visitor downloads on the homepage.
const About = lazy(() =>
  import("./pages/About").then((m) => ({ default: m.About })),
);
const Contact = lazy(() =>
  import("./pages/Contact").then((m) => ({ default: m.Contact })),
);
const Blog = lazy(() =>
  import("./pages/Blog").then((m) => ({ default: m.Blog })),
);
const CaseStudy = lazy(() =>
  import("./pages/CaseStudy").then((m) => ({ default: m.CaseStudy })),
);
const NotFound = lazy(() =>
  import("./pages/NotFound").then((m) => ({ default: m.NotFound })),
);

const SocialMediaMarketing = lazy(() =>
  import("./pages/services/digital-marketing/SocialMediaMarketing").then(
    (m) => ({ default: m.SocialMediaMarketing }),
  ),
);
const GoogleBusinessManagement = lazy(() =>
  import("./pages/services/digital-marketing/GoogleBusinessManagement").then(
    (m) => ({ default: m.GoogleBusinessManagement }),
  ),
);
const LeadGenerationProgram = lazy(() =>
  import("./pages/services/digital-marketing/LeadGenerationProgram").then(
    (m) => ({ default: m.LeadGenerationProgram }),
  ),
);
const OnlineAdvertiseCampaign = lazy(() =>
  import("./pages/services/digital-marketing/OnlineAdvertiseCampaign").then(
    (m) => ({ default: m.OnlineAdvertiseCampaign }),
  ),
);
const WhatsAppMarketing = lazy(() =>
  import("./pages/services/digital-marketing/WhatsAppMarketing").then((m) => ({
    default: m.WhatsAppMarketing,
  })),
);
const Property360VirtualTour = lazy(() =>
  import("./pages/services/branding/Property360VirtualTour").then((m) => ({
    default: m.Property360VirtualTour,
  })),
);
const Google360VirtualTour = lazy(() =>
  import("./pages/services/branding/Google360VirtualTour").then((m) => ({
    default: m.Google360VirtualTour,
  })),
);
const GraphicDesignAndVideoEditing = lazy(() =>
  import("./pages/services/branding/GraphicDesignAndVideoEditing").then(
    (m) => ({ default: m.GraphicDesignAndVideoEditing }),
  ),
);
const ProductPhotography = lazy(() =>
  import("./pages/services/branding/ProductPhotography").then((m) => ({
    default: m.ProductPhotography,
  })),
);
const CustomNfcCard = lazy(() =>
  import("./pages/services/branding/CustomNfcCard").then((m) => ({
    default: m.CustomNfcCard,
  })),
);
const SoftwareDevelopment = lazy(() =>
  import("./pages/services/it-solution/SoftwareDevelopment").then((m) => ({
    default: m.SoftwareDevelopment,
  })),
);
const ApplicationDevelopment = lazy(() =>
  import("./pages/services/it-solution/ApplicationDevelopment").then((m) => ({
    default: m.ApplicationDevelopment,
  })),
);
const WebsiteDesignAndDevelopment = lazy(() =>
  import("./pages/services/it-solution/WebsiteDesignAndDevelopment").then(
    (m) => ({ default: m.WebsiteDesignAndDevelopment }),
  ),
);
const SoftwarePortfolio = lazy(() =>
  import("./pages/portfolio/SoftwarePortfolio").then((m) => ({
    default: m.SoftwarePortfolio,
  })),
);
const WebsiteDevelopmentPortfolio = lazy(() =>
  import("./pages/portfolio/WebsiteDevelopmentPortfolio").then((m) => ({
    default: m.WebsiteDevelopmentPortfolio,
  })),
);
const GraphicDesignPortfolio = lazy(() =>
  import("./pages/portfolio/GraphicDesignPortfolio").then((m) => ({
    default: m.GraphicDesignPortfolio,
  })),
);
const SocialMediaPortfolio = lazy(() =>
  import("./pages/portfolio/SocialMediaPortfolio").then((m) => ({
    default: m.SocialMediaPortfolio,
  })),
);

const CustomCursor = lazy(() =>
  import("./components/layout/CustomCursor").then((m) => ({
    default: m.CustomCursor,
  })),
);

const GrowthField = lazy(() =>
  import("./components/three/GrowthField").then((m) => ({
    default: m.GrowthField,
  })),
);

function useGlobalScrollRef() {
  const scrollRef = useRef(0);
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scrollRef.current = max > 0 ? window.scrollY / max : 0;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return scrollRef;
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<div className="min-h-[60vh]" />}>
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
      </Suspense>
    </AnimatePresence>
  );
}

export default function App() {
  const prefersReducedMotion = useReducedMotion();
  const isDesktop = useIsDesktop();
  const scrollRef = useGlobalScrollRef();
  console.log("DEBUG is Desktop:", isDesktop, "width:", window.innerWidth);

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
              <GrowthField
                scrollRef={scrollRef}
                className="pointer-events-none fixed inset-0 z-0 opacity-90"
              />
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
