import { lazy, Suspense } from "react";
import { HeroExperience } from "../components/sections/HeroExperience";

// Below-the-fold sections — lazy-loaded so they don't block the
// initial bundle / hero paint.
const ServicesExperience = lazy(() =>
  import("../components/sections/ServicesExperience").then((m) => ({
    default: m.ServicesExperience,
  })),
);
const BrandsMarquee = lazy(() =>
  import("../components/sections/BrandsMarquee").then((m) => ({
    default: m.BrandsMarquee,
  })),
);
const MethodJourney = lazy(() =>
  import("../components/sections/MethodJourney").then((m) => ({
    default: m.MethodJourney,
  })),
);
const ResultsSection = lazy(() =>
  import("../components/sections/ResultsSection").then((m) => ({
    default: m.ResultsSection,
  })),
);
const WorkShowcase = lazy(() =>
  import("../components/sections/WorkShowcase").then((m) => ({
    default: m.WorkShowcase,
  })),
);
const DigitalExperience = lazy(() =>
  import("../components/sections/DigitalExperience").then((m) => ({
    default: m.DigitalExperience,
  })),
);
const WhyMVM = lazy(() =>
  import("../components/sections/WhyMVM").then((m) => ({
    default: m.WhyMVM,
  })),
);
const Testimonials = lazy(() =>
  import("../components/sections/Testimonials").then((m) => ({
    default: m.Testimonials,
  })),
);
const EnquiryForm = lazy(() =>
  import("../components/sections/EnquiryForm").then((m) => ({
    default: m.EnquiryForm,
  })),
);

// Section order follows the spec's narrative:
// Attention -> Strategy -> Creation -> Distribution -> Conversion -> Growth.
// Each section is self-contained (owns its own data + id), so Home just
// composes them — no props to wire here.
export function Home() {
  return (
    <>
      <HeroExperience />
      <Suspense fallback={<div className="h-[400px]" />}>
        <ServicesExperience />
      </Suspense>
      <Suspense fallback={<div className="h-[300px]" />}>
        <BrandsMarquee />
      </Suspense>
      <Suspense fallback={<div className="h-[400px]" />}>
        <MethodJourney />
      </Suspense>
      <Suspense fallback={<div className="h-[400px]" />}>
        <ResultsSection />
      </Suspense>
      <Suspense fallback={<div className="h-[400px]" />}>
        <WorkShowcase />
      </Suspense>
      <Suspense fallback={<div className="h-[400px]" />}>
        <DigitalExperience />
      </Suspense>
      <Suspense fallback={<div className="h-[400px]" />}>
        <WhyMVM />
      </Suspense>
      <Suspense fallback={<div className="h-[300px]" />}>
        <Testimonials />
      </Suspense>
      <Suspense fallback={<div className="h-[500px]" />}>
        <EnquiryForm />
      </Suspense>
    </>
  );
}