
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const { user } = useAuth();
  const { toast } = useToast();

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would handle form submission to an API here.
    toast({
      title: "Settings Saved",
      description: "Your changes have been successfully saved.",
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">General Settings</h1>
        <p className="text-muted-foreground">Manage your admin account and application preferences.</p>
      </div>

      <form onSubmit={handleSaveChanges}>
        <div className="grid gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Update your personal information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="displayName">Display Name</Label>
                <Input id="displayName" defaultValue={user?.displayName || ''} placeholder="Your display name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={user?.email || ''} disabled />
                <p className="text-xs text-muted-foreground">Email addresses cannot be changed.</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit">Save Profile</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription>Manage your password and security settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input id="confirmPassword" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit">Change Password</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize the look and feel of the admin dashboard.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <Label htmlFor="dark-mode" className="font-medium">Dark Mode</Label>
                  <p className="text-xs text-muted-foreground">Toggle the UI between light and dark themes.</p>
                </div>
                <Switch
                  id="dark-mode"
                  checked={theme === 'dark'}
                  onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
}
