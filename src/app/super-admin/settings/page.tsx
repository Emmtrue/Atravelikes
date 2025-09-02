
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

export default function SettingsPage() {
    const { toast } = useToast();

    const handleSave = (section: string) => {
        toast({
            title: `Settings Saved`,
            description: `${section} settings have been updated (demo).`,
        });
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold">Settings</h1>
                <p className="text-muted-foreground">Manage your platform's configuration.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>General Settings</CardTitle>
                    <CardDescription>Update general information about the application.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="site-name">Site Name</Label>
                        <Input id="site-name" defaultValue="Atravelikes" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="site-description">Site Description</Label>
                        <Input id="site-description" defaultValue="Your Journey Starts Here" />
                    </div>
                     <Button onClick={() => handleSave('General')}>Save Changes</Button>
                </CardContent>
            </Card>

            <Separator />

            <Card>
                <CardHeader>
                    <CardTitle>API Keys</CardTitle>
                    <CardDescription>Manage third-party API keys for services.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="google-maps-key">Google Maps API Key</Label>
                        <Input id="google-maps-key" type="password" placeholder="**************" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="some-other-key">Another Service API Key</Label>
                        <Input id="some-other-key" type="password" placeholder="**************" />
                    </div>
                    <Button onClick={() => handleSave('API Keys')}>Save Changes</Button>
                </CardContent>
            </Card>
        </div>
    );
}
