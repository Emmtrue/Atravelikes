import { generateDestinationGuide } from '@/ai/flows/destination-guide-generation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Wand2 } from 'lucide-react';

export async function DestinationGuide({ destination }: { destination: string }) {
  if (!destination || destination === 'your destination') {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Wand2 /> AI Travel Guide</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">Enter a real destination in your search to get an AI-powered travel guide!</p>
            </CardContent>
        </Card>
    );
  }

  const guide = await generateDestinationGuide({ destination });

  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wand2 className="text-primary" />
          AI Guide to {destination.charAt(0).toUpperCase() + destination.slice(1)}
        </CardTitle>
        <CardDescription>Travel tips & popular attractions.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-foreground/80 whitespace-pre-wrap leading-relaxed">
          {guide.summary}
        </p>
      </CardContent>
    </Card>
  );
}
