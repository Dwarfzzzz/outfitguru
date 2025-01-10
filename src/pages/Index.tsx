import { useState } from "react";
import { Onboarding } from "@/components/Onboarding";
import { Closet } from "@/components/Closet";
import { SocialFeed } from "@/components/SocialFeed";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const [showOnboarding, setShowOnboarding] = useState(true);

  if (showOnboarding) {
    return <Onboarding onComplete={() => setShowOnboarding(false)} />;
  }

  return (
    <div className="min-h-screen bg-cream">
      <header className="bg-white shadow-sm p-4">
        <h1 className="text-2xl font-semibold text-charcoal text-center">
          Outfitguru
        </h1>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Tabs defaultValue="closet" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="closet">Mijn Kledingkast</TabsTrigger>
            <TabsTrigger value="feed">Social Feed</TabsTrigger>
          </TabsList>
          <TabsContent value="closet">
            <Closet />
          </TabsContent>
          <TabsContent value="feed">
            <SocialFeed />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;