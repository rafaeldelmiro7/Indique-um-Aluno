import { useState } from "react";
import BenefitsSection from "../components/BenefitsSection";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import PageBackground from "../components/PageBackground";
import RewardSection from "../components/RewardSection";
import StepsSection from "../components/StepsSection";
import TrustBar from "../components/TrustBar";
import type { AmbassadorType } from "../lib/types";

export default function Landing() {
  const [audience, setAudience] = useState<AmbassadorType>("pais");

  return (
    <PageBackground>
      <Header audience={audience} onAudienceChange={setAudience} />
      <main>
        <Hero audience={audience} />
        <BenefitsSection />
        <StepsSection />
        <RewardSection audience={audience} />
        <TrustBar />
      </main>
      <Footer />
    </PageBackground>
  );
}
