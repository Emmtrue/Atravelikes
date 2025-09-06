
'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import {
  Home,
  Globe,
  Search,
  Settings,
  Package2,
  LogOut,
  Users,
  CreditCard,
} from 'lucide-react';

import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';


function NavLink({ href, label, icon: Icon, pathname }: { href: string, label: string, icon: React.ElementType, pathname: string }) {
    return (
        <Link
            href={href}
            className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                pathname === href && 'bg-muted text-primary'
            )}
        >
            <Icon className="h-4 w-4" />
            {label}
        </Link>
    );
}

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, isSuperAdmin, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) {
      return; // Wait until authentication state is loaded
    }

    const isLoginPage = pathname === '/super-admin/login';

    if (!isSuperAdmin && !isLoginPage) {
        // If the user is not an admin and not on the login page,
        // redirect them to the login page.
        router.replace('/super-admin/login');
    } else if (isSuperAdmin && isLoginPage) {
        // If the user is an admin but somehow landed on the login page,
        // redirect them to the dashboard.
        router.replace('/super-admin/dashboard');
    }
  }, [loading, isSuperAdmin, pathname, router]);

  // While loading, show a full-screen loader to prevent flash of content
  if (loading) {
     return (
        <div className="flex h-screen w-full items-center justify-center bg-background">
          <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-primary"></div>
        </div>
    );
  }
  
  // If the user is not an admin, we only want to render the login page.
  // The useEffect above will handle redirecting them there if they aren't.
  if (!isSuperAdmin) {
    // Only render the children (the login page) if we are on the login path.
    // Otherwise, render the loader while the redirect happens.
    return (
        <>
            {pathname === '/super-admin/login' ? children : (
                <div className="flex h-screen w-full items-center justify-center bg-background">
                    <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-primary"></div>
                </div>
            )}
        </>
    );
  }

  const navLinks = [
    { href: '/super-admin/dashboard', label: 'Dashboard', icon: Home },
    { href: '/super-admin/users', label: 'Users', icon: Users },
    { href: '/super-admin/bookings', label: 'Bookings', icon: CreditCard },
    { href: '/super-admin/website-management', label: 'Website Management', icon: Globe },
    { href: '/super-admin/scraper', label: 'Scraper', icon: Search },
    { href: '/super-admin/settings', label: 'Settings', icon: Settings },
  ];

  // If we reach here, user is a confirmed super admin, so render the full dashboard layout.
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2 sticky top-0">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/super-admin/dashboard" className="flex items-center gap-2 font-semibold">
                <Package2 className="h-6 w-6" />
                <span className="">Atravelikes Admin</span>
            </Link>
            </div>
            <div className="flex-1 overflow-y-auto">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                {navLinks.map(link => (
                    <NavLink key={link.href} {...link} pathname={pathname} />
                ))}
            </nav>
            </div>
            <div className="mt-auto p-4">
            <Button size="sm" variant="ghost" className="w-full justify-start" onClick={signOut}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
            </Button>
            </div>
        </div>
        </div>
        <main className="flex flex-col flex-1 overflow-auto">
        <div className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            {children}
        </div>
        </main>
    </div>
  );
}
