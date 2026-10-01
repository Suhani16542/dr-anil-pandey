import React from "react";
import Hero from "@/components/Hero";
import AboutPreview from "@/components/AboutPreview";
import ProfessionalProfile from "@/components/ProfessionalProfile";
import AreasOfFocus from "@/components/AreasOfFocus";
import ProfessionalHighlights from "@/components/ProfessionalHighlights";
import ProfessionalApproach from "@/components/ProfessionalApproach";
import ProfessionalJourney from "@/components/ProfessionalJourney";
import FinalCTA from "@/components/FinalCTA";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Expanded Introduction Section */}
      <AboutPreview />

      {/* 3. Professional Profile Section */}
      <ProfessionalProfile />

      {/* 4. Areas of Professional Focus (Editorial Image-Rich Layouts) */}
      <AreasOfFocus />

      {/* 5. Professional Highlights (Visual Photographic Headers) */}
      <ProfessionalHighlights />

      {/* 6. Professional Approach & Clinical Principles */}
      <ProfessionalApproach />

      {/* 7. Career Journey & Experience Timeline */}
      <ProfessionalJourney />

      {/* 8. Final Full-Width Appointment Call to Action */}
      <FinalCTA />
    </div>
  );
}
