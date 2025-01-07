import { useState } from "react";
import { Onboarding } from "@/components/Onboarding";
import { Closet } from "@/components/Closet";

const Index = () => {
  const [showOnboarding, setShowOnboarding] = useState(true);

  return showOnboarding ? (
    <Onboarding onComplete={() => setShowOnboarding(false)} />
  ) : (
    <Closet />
  );
};

export default Index;