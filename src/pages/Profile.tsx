import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

const Profile = () => {
  const [name, setName] = useState("Jane Doe");
  const [bio, setBio] = useState("Fashion enthusiast and minimalist dresser.");
  const { toast } = useToast();

  const handleSave = () => {
    // Here you would typically make an API call to save the changes
    // For now, we'll just show a success toast
    toast({
      title: "Profile Updated",
      description: "Your changes have been saved successfully.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl animate-fadeIn">
      <Card className="bg-cream shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-charcoal">Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="h-32 w-32">
              <AvatarImage src="/placeholder.svg" alt={name} />
              <AvatarFallback className="bg-secondary text-2xl">{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <Button variant="outline" className="bg-secondary-light hover:bg-secondary">
              Change Photo
            </Button>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="bg-white resize-none h-32"
                placeholder="Tell us about yourself..."
              />
            </div>

            <Button 
              className="w-full bg-primary hover:bg-primary-dark text-white"
              onClick={handleSave}
            >
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;