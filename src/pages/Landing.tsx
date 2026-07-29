import { useState } from "react";
import AboutSection from "../components/AboutSection";
import DoodleBackground from "../components/DoodleBackground";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import StepsSection from "../components/StepsSection";
import type { AmbassadorType } from "../lib/types";

export default function Landing() {
  const [audience, setAudience] = useState<AmbassadorType>("pais");

  return (
    <DoodleBackground>
      <Header audience={audience} onAudienceChange={setAudience} />
      <Hero audience={audience} />
      <StepsSection />
      <AboutSection />
      <Footer />
    </DoodleBackground>
  );
}
