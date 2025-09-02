
'use client';

import Link from 'next/link';
import { Plane, LogIn, UserPlus, User, LogOut, Menu, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { auth } from '@/lib/firebase/client';
import type { User as FirebaseUser } from 'firebase/auth';
import { onIdTokenChanged, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';


interface AppUser extends FirebaseUser {
  isSuperAdmin?: boolean;
}

export function Header() {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (currentUser) => {
      if (currentUser) {
        const tokenResult = await currentUser.getIdTokenResult();
        const isSuperAdmin = tokenResult.claims.role === 'superadmin';
        setUser({ ...currentUser, isSuperAdmin });
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    await signOut(auth);
    router.push('/');
    router.refresh();
  };
  
  const navLinks = (
    <>
      <Link href="/#search" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary" onClick={() => setOpen(false)}>
        Flights
      </Link>
      <Link href="/#search" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary" onClick={() => setOpen(false)}>
        Hotels
      </Link>
      <Link href="/#search" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary" onClick={() => setOpen(false)}>
        Flight Status
      </Link>
    </>
  );

  const renderUserAuth = () => {
    if (loading) {
      return (
        <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-24" />
        </div>
      );
    }

    if (user) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full">
              <Avatar className="h-9 w-9">
                <AvatarImage src={user.photoURL || "https://i.pravatar.cc/150"} alt={user.displayName || 'User'} />
                <AvatarFallback>{user.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user.displayName || 'Welcome'}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/profile">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
             {user.isSuperAdmin && (
              <DropdownMenuItem asChild>
                <Link href="/super-admin/dashboard">
                  <ShieldCheck className="mr-2 h-4 w-4" />
                  <span>Admin Panel</span>
                </Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
    
    return (
      <div className='hidden md:flex md:items-center md:gap-2'>
        <Button variant="ghost" asChild>
          <Link href="/login">
            <LogIn className="mr-2 h-4 w-4" />
            Login
          </Link>
        </Button>
        <Button asChild>
          <Link href="/signup">
            <UserPlus className="mr-2 h-4 w-4" />
            Sign Up
          </Link>
        </Button>
      </div>
    );
  };
  

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Plane className="h-7 w-7 text-primary" />
          <span className="text-xl font-bold tracking-tight text-foreground">Atravelikes</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks}
        </nav>
        <div className="flex items-center gap-2">
          {renderUserAuth()}
           <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 mt-8">
                {navLinks}
                <DropdownMenuSeparator />
                 {!loading && !user && (
                   <div className='flex flex-col gap-4'>
                     <Link href="/login" onClick={() => setOpen(false)}>
                       <Button variant="outline" className='w-full'><LogIn className="mr-2 h-4 w-4" /> Login</Button>
                     </Link>
                     <Link href="/signup" onClick={() => setOpen(false)}>
                       <Button className='w-full'><UserPlus className="mr-2 h-4 w-4" /> Sign Up</Button>
                     </Link>
                   </div>
                 )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
