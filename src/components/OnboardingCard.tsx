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
      whileHover={{ scale: active ? 1.02 : 1 }}
      className={cn(
        "p-6 rounded-2xl bg-white shadow-lg w-[280px] mx-auto cursor-pointer",
        "transform transition-all duration-300",
        active ? "scale-100" : "scale-95 opacity-50"
      )}
    >
      <div className="flex flex-col items-center text-center space-y-4">
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-16 h-16 flex items-center justify-center rounded-full bg-primary/10 text-primary"
        >
          {icon}
        </motion.div>
        <motion.h3 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xl font-semibold text-charcoal"
        >
          {title}
        </motion.h3>
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-charcoal-light text-sm"
        >
          {description}
        </motion.p>
      </div>
    </motion.div>
  );
};