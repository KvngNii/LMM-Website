import Hero from "@/components/Hero";
import Statement from "@/components/Statement";
import CostSection from "@/components/CostSection";
import Services from "@/components/Services";
import FullReveal from "@/components/FullReveal";
import Work from "@/components/Work";
import TeamCarousel from "@/components/TeamCarousel";
import StoreTeaser from "@/components/StoreTeaser";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Statement />
      <CostSection />
      <Services />
      <FullReveal />
      <Work />
      <TeamCarousel />
      <StoreTeaser />
      <CTA />
    </>
  );
}
