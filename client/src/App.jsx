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
import {
  RouteProgressProvider,
  useRouteProgress,
} from "./hooks/useRouteProgress";
import { TopProgressBar } from "./components/layout/TopProgressBar";

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

const BlogPost = lazy(() =>
  import("./pages/BlogPost").then((m) => ({ default: m.BlogPost })),
);

const CaseStudy = lazy(() =>
  import("./pages/CaseStudy").then((m) => ({ default: m.CaseStudy })),
);
const NotFound = lazy(() =>
  import("./pages/NotFound").then((m) => ({ default: m.NotFound })),
);

const PrivacyPolicy = lazy(() =>
  import("./pages/DataPolicy").then((m) => ({ default: m.PrivacyPolicy })),
);
const TermsAndConditions = lazy(() =>
  import("./pages/TermsAndConditions").then((m) => ({
    default: m.TermsAndConditions,
  })),
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

const PodcastStudioSpace = lazy(() =>
  import("./pages/services/branding/PodcastStudioSpace").then((m) => ({
    default: m.PodcastStudioSpace,
  })),
);
const StudioShoot = lazy(() =>
  import("./pages/services/branding/StudioShoot").then((m) => ({
    default: m.StudioShoot,
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

// Signals "this page has actually mounted" — placed inside each route's
// Suspense boundary so it only fires once the real chunk has loaded,
// not on a timer.
function RouteProgressDone() {
  const { done } = useRouteProgress();
  useEffect(() => {
    done();
  }, [done]);
  return null;
}

function PageWrapper({ Component }) {
  return (
    <PageTransition>
      <Suspense fallback={<div className="min-h-[60vh]" />}>
        <Component />
        <RouteProgressDone />
      </Suspense>
    </PageTransition>
  );
}
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
              <RouteProgressDone />
            </PageTransition>
          }
        />
        <Route
          path="/work/:slug"
          element={<PageWrapper Component={CaseStudy} />}
        />
        <Route path="*" element={<PageWrapper Component={NotFound} />} />

        <Route path="/about" element={<PageWrapper Component={About} />} />
        <Route path="/contact" element={<PageWrapper Component={Contact} />} />

        <Route path="/blog" element={<PageWrapper Component={Blog} />} />
        <Route
          path="/blog/:slug"
          element={<PageWrapper Component={BlogPost} />}
        />

        <Route
          path="/services/digital-marketing/social-media-marketing-management"
          element={<PageWrapper Component={SocialMediaMarketing} />}
        />
        <Route
          path="/services/digital-marketing/google-business-management"
          element={<PageWrapper Component={GoogleBusinessManagement} />}
        />
        <Route
          path="/services/digital-marketing/lead-generation-program"
          element={<PageWrapper Component={LeadGenerationProgram} />}
        />
        <Route
          path="/services/digital-marketing/online-advertise-campaign"
          element={<PageWrapper Component={OnlineAdvertiseCampaign} />}
        />
        <Route
          path="/services/digital-marketing/whatsapp-marketing"
          element={<PageWrapper Component={WhatsAppMarketing} />}
        />

        <Route
          path="/services/branding/property-360-virtual-tour"
          element={<PageWrapper Component={Property360VirtualTour} />}
        />
        <Route
          path="/services/branding/google-360-virtual-tour"
          element={<PageWrapper Component={Google360VirtualTour} />}
        />
        <Route
          path="/services/branding/graphic-design-and-video-editing"
          element={<PageWrapper Component={GraphicDesignAndVideoEditing} />}
        />
        <Route
          path="/services/branding/product-photography"
          element={<PageWrapper Component={ProductPhotography} />}
        />
        <Route
          path="/services/branding/custom-nfc-card"
          element={<PageWrapper Component={CustomNfcCard} />}
        />
        <Route
          path="/services/branding/podcast-studio-space"
          element={<PageWrapper Component={PodcastStudioSpace} />}
        />
        <Route
          path="/services/branding/studio-shoot"
          element={<PageWrapper Component={StudioShoot} />}
        />

        <Route
          path="/services/it-solution/software-development"
          element={<PageWrapper Component={SoftwareDevelopment} />}
        />
        <Route
          path="/services/it-solution/application-development"
          element={<PageWrapper Component={ApplicationDevelopment} />}
        />
        <Route
          path="/services/it-solution/website-design-and-development"
          element={<PageWrapper Component={WebsiteDesignAndDevelopment} />}
        />

        <Route
          path="/portfolio/software"
          element={<PageWrapper Component={SoftwarePortfolio} />}
        />
        <Route
          path="/portfolio/website-development"
          element={<PageWrapper Component={WebsiteDevelopmentPortfolio} />}
        />
        <Route
          path="/portfolio/graphic-design"
          element={<PageWrapper Component={GraphicDesignPortfolio} />}
        />
        <Route
          path="/portfolio/social-media"
          element={<PageWrapper Component={SocialMediaPortfolio} />}
        />

        <Route
          path="/privacy-policy"
          element={<PageWrapper Component={PrivacyPolicy} />}
        />
        <Route
          path="/terms-conditions"
          element={<PageWrapper Component={TermsAndConditions} />}
        />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const prefersReducedMotion = useReducedMotion();
  const isDesktop = useIsDesktop();
  const scrollRef = useGlobalScrollRef();

  return (
    <BrowserRouter>
      <RouteProgressProvider>
        <TopProgressBar />
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
      </RouteProgressProvider>
    </BrowserRouter>
  );
}
