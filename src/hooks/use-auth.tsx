
'use client';

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { onAuthStateChanged, signOut as firebaseSignOut, User, getIdTokenResult } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useToast } from './use-toast';
import { useRouter, usePathname } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isSuperAdmin: boolean;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isSuperAdmin: false,
  signOut: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      if (user) {
        try {
            const tokenResult = await getIdTokenResult(user, true); // Force refresh
            const claims = tokenResult.claims;
            setIsSuperAdmin(claims.role === 'superadmin');
            setUser(user);
        } catch (error) {
            console.error("Error fetching user token:", error);
            setUser(user);
            setIsSuperAdmin(false);
        }
      } else {
        setUser(null);
        setIsSuperAdmin(false);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signOut = async () => {
    try {
      const isAdminPath = pathname.startsWith('/super-admin');
      
      await firebaseSignOut(auth);
      
      toast({
        title: 'Signed Out',
        description: 'You have been successfully signed out.',
      });

      if (isAdminPath) {
        // Use replace so the user can't navigate back to the admin area
        router.replace('/super-admin/login');
      } else {
        // For non-admin pages, just go to home and refresh.
        router.push('/');
        router.refresh();
      }

    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        variant: 'destructive',
        title: 'Sign Out Failed',
        description: 'There was an error signing you out.',
      });
    }
  };

  const value = {
    user,
    loading,
    isSuperAdmin,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};
