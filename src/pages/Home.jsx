import { HeroExperience } from "../components/sections/HeroExperience";
import { AttentionSection } from "../components/sections/AttentionSection";
import { ServicesExperience } from "../components/sections/ServicesExperience";
import { BrandsMarquee } from "../components/sections/BrandsMarquee";
import { MethodJourney } from "../components/sections/MethodJourney";
import { ResultsSection } from "../components/sections/ResultsSection";
import { WorkShowcase } from "../components/sections/WorkShowcase";
import { CreativeExperience } from "../components/sections/CreativeExperience";
import { DigitalExperience } from "../components/sections/DigitalExperience";
import { WhyMVM } from "../components/sections/WhyMVM";
import { Testimonials } from "../components/sections/Testimonials";
import { FinalCTA } from "../components/sections/FinalCTA";

// Section order follows the spec's narrative:
// Attention -> Strategy -> Creation -> Distribution -> Conversion -> Growth.
// Each section is self-contained (owns its own data + id), so Home just
// composes them — no props to wire here.
export function Home() {
  return (
    <>
      <HeroExperience />
      {/* <AttentionSection /> */}
      <ServicesExperience />
      <BrandsMarquee />
      <MethodJourney />
      <ResultsSection />
      <WorkShowcase />
      {/* <CreativeExperience /> */}
      <DigitalExperience />
      <WhyMVM />
      <Testimonials />
      <FinalCTA />
    </>
  );
}
