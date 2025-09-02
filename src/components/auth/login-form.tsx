
'use client'
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { auth } from '@/lib/firebase/client';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, getIdToken } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" {...props} role="img" aria-label="Google logo">
      <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
      <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
      <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
      <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C42.022,35.022,44,30.022,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
    </svg>
  );
}

interface LoginFormProps {
  isAdminLogin?: boolean;
}

export function LoginForm({ isAdminLogin = false }: LoginFormProps) {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo') || (isAdminLogin ? '/super-admin/dashboard' : '/profile');
  
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

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
           const errorData = await response.json().catch(() => ({ error: 'An unexpected error occurred. The server response was not valid JSON.' }));
           throw new Error(errorData.error || 'Failed to create session.');
        }
        return await response.json();
    } catch (error) {
        if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
            throw new Error("The login request was blocked. This is often caused by a browser extension (like an ad-blocker) or a network issue. Please check your extensions and network connection.");
        }
        throw error;
    }
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await getIdToken(userCredential.user, true);
      
      if (isAdminLogin) {
        const tokenResult = await userCredential.user.getIdTokenResult();
        if (tokenResult.claims.role !== 'superadmin') {
          throw new Error("You do not have permission to access the admin panel.");
        }
      }
      
      const sessionData = await createSession(idToken);
      
      toast({ title: "Login successful!", description: "Welcome back. Redirecting..." });
      window.location.href = sessionData.path || redirectTo;

    } catch (error: any) {
        let description = error.message;
        if (error.code === 'auth/invalid-credential') {
          description = "Invalid email or password. Please try again.";
        } else if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
            description = "The login request was blocked. This is often caused by a browser extension (like an ad-blocker) or a network issue. Please check your extensions and network connection.";
        }
       toast({
        variant: "destructive",
        title: "Login Failed",
        description: description,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await getIdToken(result.user, true);
      
      if (isAdminLogin) {
          const tokenResult = await result.user.getIdTokenResult();
          if (tokenResult.claims.role !== 'superadmin') {
            throw new Error("You do not have permission to access the admin panel.");
          }
      }
      
      const sessionData = await createSession(idToken);

      toast({ title: "Login successful!", description: "Welcome back. Redirecting..." });
      window.location.href = sessionData.path || redirectTo;

    } catch (error: any) {
        let description = error.message;
        if (error.code === 'auth/popup-closed-by-user') {
            description = "The sign-in popup was closed before completion.";
        } else if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
            description = "The login request was blocked. This is often caused by a browser extension (like an ad-blocker) or a network issue. Please check your extensions and network connection.";
        }
       toast({
        variant: "destructive",
        title: "Login Failed",
        description: description,
      });
    } finally {
      setGoogleLoading(false);
    }
  }

  const title = isAdminLogin ? "Admin Login" : "Login";
  const description = isAdminLogin ? "Enter your credentials to access the admin panel." : "Enter your email below to login to your account.";


  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <form onSubmit={handleLogin} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="m@example.com" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" required />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>
        {!isAdminLogin && (
            <>
                <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                </div>
                </div>
                <Button variant="outline" className="w-full" onClick={handleGoogleSignIn} disabled={googleLoading}>
                <GoogleIcon className="mr-2 h-4 w-4" />
                {googleLoading ? 'Signing in...' : 'Sign in with Google'}
                </Button>
            </>
        )}
      </CardContent>
      {!isAdminLogin && (
        <CardFooter>
            <div className="text-center text-sm w-full">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="underline text-primary">
                Sign up
            </Link>
            </div>
        </CardFooter>
      )}
    </Card>
  );
}
