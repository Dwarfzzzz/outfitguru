import { useState } from "react";
import { Camera, Shirt, Sun, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
  const [direction, setDirection] = useState(0);

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setDirection(1);
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-cream flex flex-col"
    >
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-center text-charcoal mb-2">Virtual Closet</h1>
          <p className="text-charcoal-light text-center">Your wardrobe, simplified</p>
        </motion.div>

        <div className="relative w-full max-w-md mb-12 h-[300px]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentStep}
              initial={{ 
                x: direction * 200,
                opacity: 0,
              }}
              animate={{ 
                x: 0,
                opacity: 1,
              }}
              exit={{ 
                x: direction * -200,
                opacity: 0,
              }}
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="absolute w-full"
            >
              <OnboardingCard {...onboardingSteps[currentStep]} active={true} />
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col items-center space-y-4 w-full max-w-xs"
        >
          <div className="flex space-x-4 w-full">
            {currentStep > 0 && (
              <Button
                variant="outline"
                onClick={handlePrevious}
                className="flex-1"
              >
                Previous
              </Button>
            )}
            <Button
              onClick={handleNext}
              className="flex-1 bg-primary hover:bg-primary-dark text-white"
            >
              {currentStep < onboardingSteps.length - 1 ? "Next" : "Get Started"}
            </Button>
          </div>
          <Button
            variant="ghost"
            onClick={handleSkip}
            className="text-charcoal-light hover:text-charcoal"
          >
            Skip Tutorial
          </Button>
        </motion.div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center mt-8 space-x-2"
        >
          {onboardingSteps.map((_, index) => (
            <motion.div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentStep ? "bg-primary scale-125" : "bg-secondary"
              }`}
              whileHover={{ scale: 1.2 }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};