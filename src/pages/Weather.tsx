import { WeatherSuggestions } from '@/components/WeatherSuggestions';
import { AddClothingForm } from '@/components/AddClothingForm';

const Weather = () => {
  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-2xl font-bold mb-6">Weersuggesties</h1>
      <WeatherSuggestions />
      <h2 className="text-2xl font-bold mb-6">Voeg Kledingstuk Toe</h2>
      <AddClothingForm />
    </div>
  );
};

export default Weather;