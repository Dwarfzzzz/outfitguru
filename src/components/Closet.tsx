import { Grid, Heart, Sun, Settings, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { DashboardStats } from "./DashboardStats";
import { ClothingGrid } from "./ClothingGrid";

export const Closet = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-cream">
      <header className="bg-white shadow-sm p-4">
        <h1 className="text-2xl font-semibold text-charcoal text-center">Outfitguru</h1>
      </header>

      <main className="p-4">
        <DashboardStats />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-charcoal">Mijn Kledingkast</h2>
            <Button
              variant="outline"
              className="flex items-center gap-2 border-2 border-dashed border-secondary hover:border-primary hover:bg-primary/5"
            >
              <Plus className="w-5 h-5 text-primary" />
              <span className="text-sm text-charcoal-light">Item Toevoegen</span>
            </Button>
          </div>
          
          <ClothingGrid />
        </motion.div>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4">
        <div className="flex justify-around">
          <Button 
            variant="ghost" 
            className="text-charcoal-light flex flex-col items-center"
            onClick={() => navigate('/')}
          >
            <Grid className="h-5 w-5 mb-1" />
            <span className="text-xs">Kledingkast</span>
          </Button>
          <Button 
            variant="ghost" 
            className="text-charcoal-light flex flex-col items-center"
            onClick={() => navigate('/outfits')}
          >
            <Heart className="h-5 w-5 mb-1" />
            <span className="text-xs">Outfits</span>
          </Button>
          <Button 
            variant="ghost" 
            className="text-charcoal-light flex flex-col items-center"
            onClick={() => navigate('/weather')}
          >
            <Sun className="h-5 w-5 mb-1" />
            <span className="text-xs">Weer</span>
          </Button>
          <Button 
            variant="ghost" 
            className="text-charcoal-light flex flex-col items-center"
            onClick={() => navigate('/profile')}
          >
            <Settings className="h-5 w-5 mb-1" />
            <span className="text-xs">Instellingen</span>
          </Button>
        </div>
      </nav>
    </div>
  );
};