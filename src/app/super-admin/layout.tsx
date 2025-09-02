
'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  Globe,
  Users,
  Settings,
  Bot,
  LogOut,
  User,
  ShieldCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { auth } from '@/lib/firebase/client';
import { onIdTokenChanged, signOut, type User as FirebaseUser } from 'firebase/auth';


interface AppUser extends FirebaseUser {
  isSuperAdmin?: boolean;
}

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = React.useState<AppUser | null>(null);
  const [loading, setLoading] = React.useState(true);
  const isActive = (path: string) => pathname.startsWith(path);

  React.useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (currentUser) => {
      if (currentUser) {
        const tokenResult = await currentUser.getIdTokenResult();
        const isSuperAdmin = tokenResult.claims.role === 'superadmin';
        
        if (pathname.startsWith('/super-admin') && !isSuperAdmin) {
          router.push('/login'); // Redirect non-admins trying to access admin area
          return;
        }
        setUser({ ...currentUser, isSuperAdmin });
      } else {
        // If no user, redirect any page within super-admin (except the login page itself) to the admin login
        if(pathname !== '/super-admin') {
            router.push('/super-admin');
        }
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [pathname, router]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    await signOut(auth);
    router.push('/super-admin');
    router.refresh();
  };
  
  // This is the dedicated login page for the admin panel
  if (pathname === '/super-admin') {
    return <>{children}</>;
  }


  if (loading) {
      return (
          <div className="flex h-screen items-center justify-center">
              <p>Loading Admin Panel...</p>
          </div>
      )
  }
  
  // The useEffect handles redirecting away, so we can return null to avoid content flash
  if (!user || !user.isSuperAdmin) {
    return null;
  }


  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <span className="text-lg font-semibold">Admin Panel</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <Link href="/super-admin/dashboard">
                <SidebarMenuButton isActive={isActive('/super-admin/dashboard')}>
                  <LayoutDashboard />
                  Dashboard
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/super-admin/scraper">
                <SidebarMenuButton isActive={isActive('/super-admin/scraper')}>
                  <Bot />
                  Scraper
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
               <Link href="/super-admin/websites">
                <SidebarMenuButton isActive={isActive('/super-admin/websites')}>
                  <Globe />
                  Website Management
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
               <Link href="/super-admin/user-management">
                <SidebarMenuButton isActive={isActive('/super-admin/user-management')}>
                  <Users />
                  User Management
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
               <Link href="/super-admin/settings">
                <SidebarMenuButton isActive={isActive('/super-admin/settings')}>
                  <Settings />
                  Settings
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center justify-between border-b bg-background/90 px-4 backdrop-blur-sm">
            <SidebarTrigger className="md:hidden" />
            <div className="ml-auto">
              {!loading && user && (
                 <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.photoURL || 'https://i.pravatar.cc/150'} alt={user.displayName || 'Admin'} />
                        <AvatarFallback>{user.displayName?.charAt(0) || user.email?.charAt(0) || 'A'}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.displayName || 'Administrator'}</p>
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
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </header>
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
