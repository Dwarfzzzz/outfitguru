import { useState } from "react";
import { Camera, Shirt, Sun, Users } from "lucide-react";
import { motion } from "framer-motion";
import { OnboardingCard } from "./OnboardingCard";
import { Button } from "@/components/ui/button";

const onboardingSteps = [
  {
    title: "Add Your Clothes",
    description: "Take photos or upload images of your clothing items to build your virtual closet",
    icon: <Camera className="w-8 h-8" />,
  },
  {
    title: "Organize Your Closet",
    description: "Sort your items into categories and create your perfect wardrobe organization",
    icon: <Shirt className="w-8 h-8" />,
  },
  {
    title: "Get Outfit Suggestions",
    description: "Receive personalized outfit recommendations based on weather and occasions",
    icon: <Sun className="w-8 h-8" />,
  },
  {
    title: "Connect with Friends",
    description: "Share your closet and get inspired by others' style",
    icon: <Users className="w-8 h-8" />,
  },
];

export const Onboarding = ({ onComplete }: { onComplete: () => void }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex-1 flex flex-col items-center justify-center p-6"
      >
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-center text-charcoal mb-2">Virtual Closet</h1>
          <p className="text-charcoal-light text-center">Your wardrobe, simplified</p>
        </div>

        <div className="relative w-full max-w-md mb-12">
          {onboardingSteps.map((step, index) => (
            <div
              key={step.title}
              className={`absolute top-0 left-0 right-0 transition-all duration-300 ${
                index === currentStep ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <OnboardingCard {...step} active={index === currentStep} />
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center space-y-4 w-full max-w-xs">
          <Button
            onClick={handleNext}
            className="w-full bg-primary hover:bg-primary-dark text-white"
          >
            {currentStep < onboardingSteps.length - 1 ? "Next" : "Get Started"}
          </Button>
          <Button
            variant="ghost"
            onClick={onComplete}
            className="text-charcoal-light hover:text-charcoal"
          >
            Skip Tutorial
          </Button>
        </div>

        <div className="flex justify-center mt-8 space-x-2">
          {onboardingSteps.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentStep ? "bg-primary" : "bg-secondary"
              }`}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};