import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface OnboardingCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  active: boolean;
}

export const OnboardingCard = ({ title, description, icon, active }: OnboardingCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: active ? 1 : 0.5, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "p-6 rounded-2xl bg-white shadow-lg w-[280px] mx-auto",
        "transform transition-all duration-300",
        active ? "scale-100" : "scale-95"
      )}
    >
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary/10 text-primary">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-charcoal">{title}</h3>
        <p className="text-charcoal-light text-sm">{description}</p>
      </div>
    </motion.div>
  );
};