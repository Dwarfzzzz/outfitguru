import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

interface ClothingFormData {
  name: string;
  category: string;
  color: string;
  season: string;
  image?: File;
}

export const AddClothingForm = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { register, handleSubmit, reset } = useForm<ClothingFormData>();

  const onSubmit = (data: ClothingFormData) => {
    console.log('Form data:', data);
    toast.success('Kledingstuk succesvol toegevoegd!');
    reset();
    setImagePreview(null);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto p-6"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex flex-col items-center gap-4">
          <div
            className="w-32 h-32 border-2 border-dashed border-primary rounded-lg flex items-center justify-center cursor-pointer overflow-hidden"
            onClick={() => document.getElementById('image-upload')?.click()}
          >
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <Upload className="w-8 h-8 text-primary" />
            )}
          </div>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
            {...register('image')}
          />
        </div>

        <Input
          placeholder="Naam van het kledingstuk"
          {...register('name', { required: true })}
        />

        <Select {...register('category')}>
          <SelectTrigger>
            <SelectValue placeholder="Selecteer categorie" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="shirts">Shirts</SelectItem>
            <SelectItem value="pants">Broeken</SelectItem>
            <SelectItem value="shoes">Schoenen</SelectItem>
            <SelectItem value="accessories">Accessoires</SelectItem>
          </SelectContent>
        </Select>

        <Select {...register('color')}>
          <SelectTrigger>
            <SelectValue placeholder="Selecteer kleur" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="black">Zwart</SelectItem>
            <SelectItem value="white">Wit</SelectItem>
            <SelectItem value="blue">Blauw</SelectItem>
            <SelectItem value="red">Rood</SelectItem>
            <SelectItem value="green">Groen</SelectItem>
          </SelectContent>
        </Select>

        <Select {...register('season')}>
          <SelectTrigger>
            <SelectValue placeholder="Selecteer seizoen" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="spring">Lente</SelectItem>
            <SelectItem value="summer">Zomer</SelectItem>
            <SelectItem value="autumn">Herfst</SelectItem>
            <SelectItem value="winter">Winter</SelectItem>
          </SelectContent>
        </Select>

        <Button type="submit" className="w-full">
          Toevoegen
        </Button>
      </form>
    </motion.div>
  );
};