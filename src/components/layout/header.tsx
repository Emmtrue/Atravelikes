
'use client';

import Link from 'next/link';
import { Plane, Menu, LogOut, LayoutDashboard, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, Suspense, useEffect } from 'react';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useAuth } from '@/hooks/use-auth';
import { AuthDialog } from '@/components/auth/auth-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Skeleton } from '../ui/skeleton';
import { useSearchParams, useRouter } from 'next/navigation';
import { ThemeToggleButton } from '../theme-toggle-button';
import { Separator } from '../ui/separator';

function AuthHandler() {
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [defaultTab, setDefaultTab] = useState('sign-in');
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (searchParams.get('auth') === 'true') {
        if (!authDialogOpen) {
            setAuthDialogOpen(true);
            const newUrl = window.location.pathname;
            router.replace(newUrl, { scroll: false });
        }
    }
  }, [searchParams, authDialogOpen, router]);


  return <AuthDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} defaultTab={defaultTab as 'sign-in' | 'sign-up'} />;
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [authDefaultTab, setAuthDefaultTab] = useState('sign-in');
  const { user, loading, signOut } = useAuth();
  
  const handleAuthOpen = (tab: 'sign-in' | 'sign-up') => {
    setOpen(false);
    setAuthDefaultTab(tab);
    setAuthDialogOpen(true);
  };

  const navLinks = (closeSheet?: () => void) => (
    <>
      <Link href="/#search" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary" onClick={closeSheet}>
        Flights
      </Link>
      <Link href="/#search" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary" onClick={closeSheet}>
        Hotels
      </Link>
      <Link href="/#search" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary" onClick={closeSheet}>
        Flight Status
      </Link>
    </>
  );

  const UserMenu = () => {
    if(loading) {
      return <Skeleton className="h-10 w-24 rounded-md" />;
    }

    if(user) {
      return (
         <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                        <AvatarImage src={user.photoURL || undefined} alt={user.displayName || 'User'} />
                        <AvatarFallback>{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">My Account</p>
                        <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={signOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
      )
    }

    return (
      <div className="flex items-center gap-2">
        <Button variant="ghost" onClick={() => handleAuthOpen('sign-in')}>Login</Button>
        <Button onClick={() => handleAuthOpen('sign-up')}>Sign Up</Button>
      </div>
    );
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <Plane className="h-7 w-7 text-primary" />
            <span className="text-xl font-bold tracking-tight text-foreground">Atravelikes</span>
          </Link>
          
          <nav className="hidden items-center gap-6 md:flex">
            {navLinks()}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
              <ThemeToggleButton />
              <UserMenu />
          </div>

          <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                      <Menu className="h-6 w-6" />
                      <span className="sr-only">Toggle menu</span>
                  </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[320px]">
                <SheetHeader>
                   <SheetTitle className="text-left flex items-center gap-2">
                       <Plane className="h-6 w-6 text-primary" />
                       <span className="text-lg font-bold">Atravelikes</span>
                   </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col h-full pt-8 pb-8">
                    <nav className="flex flex-col gap-4">
                      {navLinks(() => setOpen(false))}
                    </nav>

                    <Separator className="my-6" />
                    
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-muted-foreground">Toggle Theme</span>
                            <ThemeToggleButton />
                        </div>
                    </div>

                    <div className="mt-auto">
                        {loading ? (
                            <Skeleton className="h-10 w-full" />
                        ) : user ? (
                            <div className="flex flex-col gap-4">
                                <Separator />
                                <Link href="/profile" className="flex items-center gap-3" onClick={() => setOpen(false)}>
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src={user.photoURL || undefined} alt={user.displayName || 'User'} />
                                        <AvatarFallback>{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium leading-none">My Account</span>
                                        <span className="text-xs leading-none text-muted-foreground truncate">{user.email}</span>
                                    </div>
                                </Link>
                                <Button variant="ghost" onClick={() => {
                                  signOut();
                                  setOpen(false);
                                }} className="w-full justify-start">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Sign Out</span>
                                </Button>
                            </div>
                        ) : (
                             <div className="flex flex-col gap-2 pt-6">
                                <Button onClick={() => handleAuthOpen('sign-in')} className="w-full">Login</Button>
                                <Button variant="outline" onClick={() => handleAuthOpen('sign-up')} className="w-full">Sign Up</Button>
                            </div>
                        )}
                    </div>
                </div>
              </SheetContent>
          </Sheet>
        </div>
      </header>
      <AuthDialog 
        open={authDialogOpen} 
        onOpenChange={setAuthDialogOpen} 
        defaultTab={authDefaultTab as 'sign-in' | 'sign-up'}
      />
      <Suspense fallback={null}>
        <AuthHandler />
      </Suspense>
    </>
  );
}
