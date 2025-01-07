import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export const Closet = () => {
  return (
    <div className="min-h-screen bg-cream">
      <header className="bg-white shadow-sm p-4">
        <h1 className="text-2xl font-semibold text-charcoal text-center">My Closet</h1>
      </header>

      <main className="p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 gap-4"
        >
          <Button
            variant="outline"
            className="h-40 flex flex-col items-center justify-center space-y-2 border-2 border-dashed border-secondary rounded-lg hover:border-primary hover:bg-primary/5"
          >
            <Plus className="w-8 h-8 text-primary" />
            <span className="text-sm text-charcoal-light">Add Item</span>
          </Button>
        </motion.div>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4">
        <div className="flex justify-around">
          <Button variant="ghost" className="text-charcoal-light">
            Closet
          </Button>
          <Button variant="ghost" className="text-charcoal-light">
            Outfits
          </Button>
          <Button variant="ghost" className="text-charcoal-light">
            Profile
          </Button>
        </div>
      </nav>
    </div>
  );
};