import HeroSection from './_components/sections/hero';
import ExploreSection from './_components/sections/explore';
import FeaturesSection from './_components/sections/features';
import SolutionsSection from './_components/sections/solutions';
import TestimonialsSection from './_components/sections/testimonials';
import WaitlistSection from './_components/sections/waitlist';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ExploreSection />
      <FeaturesSection />
      <SolutionsSection />
      <TestimonialsSection />
      <WaitlistSection />
    </main>
  );
}
