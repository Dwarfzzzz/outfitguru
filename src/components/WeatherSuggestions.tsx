import { useState } from 'react';
import { Cloud, CloudRain, CloudSun, Sun } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';

interface WeatherData {
  temperature: number;
  condition: 'sunny' | 'cloudy' | 'rainy' | 'partlyCloudy';
}

export const WeatherSuggestions = () => {
  // Mock weather data - in a real app, this would come from a weather API
  const [weatherData] = useState<WeatherData>({
    temperature: 22,
    condition: 'sunny'
  });

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'sunny':
        return <Sun className="h-8 w-8 text-primary" />;
      case 'cloudy':
        return <Cloud className="h-8 w-8 text-secondary" />;
      case 'rainy':
        return <CloudRain className="h-8 w-8 text-secondary" />;
      case 'partlyCloudy':
        return <CloudSun className="h-8 w-8 text-primary" />;
      default:
        return <Sun className="h-8 w-8 text-primary" />;
    }
  };

  const getOutfitSuggestion = (temperature: number, condition: string) => {
    if (temperature > 25) {
      return "Perfect weer voor lichte zomerkleding! Probeer een t-shirt met shorts.";
    } else if (temperature > 15) {
      return "Aangenaam weer voor een lichte trui of vest met een broek.";
    } else {
      return "Fris weer, denk aan een warme jas en lange broek.";
    }
  };

  return (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {getWeatherIcon(weatherData.condition)}
              <span>Huidige Weersomstandigheden</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold mb-2">{weatherData.temperature}°C</p>
            <p className="text-charcoal-light">
              {getOutfitSuggestion(weatherData.temperature, weatherData.condition)}
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};