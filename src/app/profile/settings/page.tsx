
'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Loader2 } from "lucide-react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { auth } from '@/lib/firebase';
import { Progress } from '@/components/ui/progress';


export default function AccountSettingsPage() {
    const { user, loading } = useAuth();
    const { toast } = useToast();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file || !user) return;

        if (file.size > 2 * 1024 * 1024) { // 2MB limit
            toast({
                variant: 'destructive',
                title: 'File too large',
                description: 'Please select an image smaller than 2MB.',
            });
            return;
        }

        setIsUploading(true);
        setUploadProgress(0);

        const storage = getStorage();
        const storageRef = ref(storage, `profile-pictures/${user.uid}/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploadProgress(progress);
            },
            (error) => {
                console.error("Upload failed:", error);
                toast({
                    variant: "destructive",
                    title: "Upload Failed",
                    description: "There was an error uploading your picture. Please try again.",
                });
                setIsUploading(false);
            },
            async () => {
                try {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    await updateProfile(user, { photoURL: downloadURL });
                    toast({
                        title: "Profile Picture Updated",
                        description: "Your new picture has been saved.",
                    });
                } catch (error) {
                     console.error("Failed to update profile:", error);
                     toast({
                        variant: "destructive",
                        title: "Update Failed",
                        description: "Could not update your profile with the new picture.",
                    });
                } finally {
                    setIsUploading(false);
                }
            }
        );
    };


  return (
    <div className="space-y-8">
       <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/profile">Profile</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Settings</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Card>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
          <CardDescription>Manage your account details and preferences.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="flex items-center gap-6">
                <div className="relative group">
                    <Avatar className="h-24 w-24">
                        <AvatarImage src={user?.photoURL || ''} alt={user?.displayName || 'User'} />
                        <AvatarFallback className="text-4xl">{user?.email?.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <button onClick={handleAvatarClick} disabled={isUploading} className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50">
                        {isUploading ? (
                            <Loader2 className="h-8 w-8 text-white animate-spin" />
                        ) : (
                            <Camera className="h-8 w-8 text-white" />
                        )}
                    </button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/png, image/jpeg, image/gif"
                        className="hidden"
                    />
                </div>
                <div className="flex-1">
                    <h3 className="text-lg font-semibold">Profile Picture</h3>
                    <p className="text-sm text-muted-foreground">Click on the avatar to upload a new photo. Max 2MB.</p>
                     {isUploading && <Progress value={uploadProgress} className="w-full mt-2" />}
                </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="displayName">Display Name</Label>
              <Input id="displayName" placeholder="Enter your name" defaultValue={user?.displayName || ''} />
          </div>
          <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" value={user?.email || ''} disabled />
              <p className="text-xs text-muted-foreground">Email address cannot be changed.</p>
          </div>
        </CardContent>
         <CardFooter>
            <Button>Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
