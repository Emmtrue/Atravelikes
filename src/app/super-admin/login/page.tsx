
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Package2 } from 'lucide-react';
import { ThemeToggleButton } from '@/components/theme-toggle-button';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

const FormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
});

export default function SuperAdminLoginPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { email: '', password: '' },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsSubmitting(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;
      
      const tokenResult = await user.getIdTokenResult(true);
      
      if (tokenResult.claims.role === 'superadmin') {
        toast({
          title: 'Login Successful',
          description: 'Redirecting to dashboard...',
        });
        // The layout's useEffect will now handle the redirect to the dashboard.
        // We can just refresh to trigger the layout's auth check.
        router.refresh();
      } else {
        await signOut(auth);
        toast({
          variant: 'destructive',
          title: 'Access Denied',
          description: 'You do not have super admin privileges.',
        });
      }
    } catch (error: any) {
       console.error('Sign in error:', error);
       toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: 'Invalid credentials. Please check your email and password.',
      });
    } finally {
        setIsSubmitting(false);
    }
  }
  
  return (
    <div className="flex min-h-screen flex-col bg-muted/40">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto flex h-14 items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 font-semibold">
                <Package2 className="h-6 w-6 text-primary" />
                <span className="">Atravelikes Admin</span>
            </div>
            <ThemeToggleButton />
        </div>
      </header>
      <main className="flex flex-1 items-center justify-center p-4">
        <Card className="w-full max-w-md">
            <CardHeader className="text-center">
                <div className="flex justify-center items-center gap-2 mb-4">
                    <h1 className="text-3xl font-bold">Welcome Back</h1>
                </div>
            <CardTitle>Super Admin Login</CardTitle>
            <CardDescription>Enter your credentials to access the admin panel.</CardDescription>
            </CardHeader>
            <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                        <Input placeholder="admin@atravelikes.com" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? 'Logging In...' : 'Login'}
                </Button>
                </form>
            </Form>
            </CardContent>
        </Card>
      </main>
    </div>
  );
}
