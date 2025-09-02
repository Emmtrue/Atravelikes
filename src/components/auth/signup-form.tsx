
'use client'
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { auth } from '@/lib/firebase/client';
import { createUserWithEmailAndPassword, updateProfile, getIdToken } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function SignupForm() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const createSession = async (idToken: string) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken }),
      });

      if (!response.ok) {
         const errorData = await response.json().catch(() => ({ error: 'An unexpected error occurred during session creation.' }));
         throw new Error(errorData.error || 'Failed to create session.');
      }
      return await response.json();
    } catch (error) {
       if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
            throw new Error("The signup request was blocked. This is often caused by a browser extension (like an ad-blocker) or a network issue. Please check your extensions and network connection.");
        }
        throw error;
    }
  }

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const firstName = formData.get('first-name') as string;
    const lastName = formData.get('last-name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    
    try {
      // 1. Create the user with Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // 2. Set their display name
      await updateProfile(userCredential.user, { displayName: `${firstName} ${lastName}` });

      // 3. Get the ID token from the newly created user
      const idToken = await getIdToken(userCredential.user, true);

      // 4. Create the server-side session cookie and get redirect path
      const sessionData = await createSession(idToken);
      
      toast({ title: "Account created!", description: "You have been successfully signed up." });
      
      // Force a full page reload to ensure cookie is set before navigating
      window.location.href = sessionData.path || '/profile'; 

    } catch (error: any) {
      let description = error.message;
       if (error.code === 'auth/email-already-in-use') {
           description = "This email is already in use. Please try logging in instead.";
       } else if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
            description = "The signup request was blocked. This is often caused by a browser extension (like an ad-blocker) or a network issue. Please check your extensions and network connection.";
       }
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: description,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Sign Up</CardTitle>
        <CardDescription>Enter your information to create an account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSignup} className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="first-name">First name</Label>
              <Input id="first-name" name="first-name" placeholder="Max" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="last-name">Last name</Label>
              <Input id="last-name" name="last-name" placeholder="Robinson" required />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="m@example.com" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" required />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Creating account...' : 'Create an account'}
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <Link href="/login" className="underline text-primary">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
