import { motion } from "framer-motion";
import { Tshirt, Heart, Sun } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const DashboardStats = () => {
  // Mock data - in a real app this would come from your backend
  const stats = {
    totalItems: 42,
    favoriteOutfits: 5,
    weatherSuggestion: "Perfect weer voor je favoriete zomerjurk!"
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardContent className="flex items-center p-6">
            <Tshirt className="h-8 w-8 text-primary mr-4" />
            <div>
              <p className="text-sm text-charcoal-light">Totaal Items</p>
              <p className="text-2xl font-semibold text-charcoal">{stats.totalItems}</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardContent className="flex items-center p-6">
            <Heart className="h-8 w-8 text-primary mr-4" />
            <div>
              <p className="text-sm text-charcoal-light">Favoriete Outfits</p>
              <p className="text-2xl font-semibold text-charcoal">{stats.favoriteOutfits}</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card>
          <CardContent className="flex items-center p-6">
            <Sun className="h-8 w-8 text-primary mr-4" />
            <div>
              <p className="text-sm text-charcoal-light">Weersuggestie</p>
              <p className="text-sm text-charcoal">{stats.weatherSuggestion}</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};