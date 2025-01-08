import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Temporary mock data
const mockClothes = [
  { id: 1, name: "Wit T-shirt", category: "shirts", color: "white", season: "summer" },
  { id: 2, name: "Zwarte Jeans", category: "pants", color: "black", season: "all" },
  { id: 3, name: "Sneakers", category: "shoes", color: "white", season: "all" },
];

const categories = ["all", "shirts", "pants", "shoes"];
const colors = ["all", "white", "black", "blue", "red"];
const seasons = ["all", "summer", "winter", "spring", "fall"];

export const ClothingGrid = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedColor, setSelectedColor] = useState("all");
  const [selectedSeason, setSelectedSeason] = useState("all");

  const filteredClothes = mockClothes.filter((item) => {
    return (
      (selectedCategory === "all" || item.category === selectedCategory) &&
      (selectedColor === "all" || item.color === selectedColor) &&
      (selectedSeason === "all" || item.season === selectedSeason)
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4">
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Categorie" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedColor} onValueChange={setSelectedColor}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Kleur" />
          </SelectTrigger>
          <SelectContent>
            {colors.map((color) => (
              <SelectItem key={color} value={color}>
                {color.charAt(0).toUpperCase() + color.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedSeason} onValueChange={setSelectedSeason}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Seizoen" />
          </SelectTrigger>
          <SelectContent>
            {seasons.map((season) => (
              <SelectItem key={season} value={season}>
                {season.charAt(0).toUpperCase() + season.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredClothes.map((item) => (
          <Card key={item.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="aspect-square bg-gray-100 rounded-md mb-2" />
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-sm text-gray-500">
                {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};