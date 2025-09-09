import { useState } from "react";
import { Onboarding } from "@/components/Onboarding";
import { Dashboard } from "@/components/Dashboard";
import { SoilScan } from "@/components/SoilScan";
import { PestScan } from "@/components/PestScan";
import { VoiceAdvisor } from "@/components/VoiceAdvisor";
import { Weather } from "@/components/Weather";
import { MarketPrices } from "@/components/MarketPrices";

const Index = () => {
  const [currentPage, setCurrentPage] = useState<string>("onboarding");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");

  const handleOnboardingComplete = (language: string) => {
    setSelectedLanguage(language);
    setCurrentPage("dashboard");
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  const handleBack = () => {
    setCurrentPage("dashboard");
  };

  if (currentPage === "onboarding") {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  if (currentPage === "dashboard") {
    return <Dashboard onNavigate={handleNavigate} language={selectedLanguage} />;
  }

  if (currentPage === "soil") {
    return <SoilScan onBack={handleBack} />;
  }

  if (currentPage === "pest") {
    return <PestScan onBack={handleBack} />;
  }

  if (currentPage === "advisor") {
    return <VoiceAdvisor onBack={handleBack} />;
  }

  if (currentPage === "weather") {
    return <Weather onBack={handleBack} />;
  }

  if (currentPage === "market") {
    return <MarketPrices onBack={handleBack} />;
  }

  // Fallback for other pages
  return <Dashboard onNavigate={handleNavigate} language={selectedLanguage} />;
};

export default Index;
