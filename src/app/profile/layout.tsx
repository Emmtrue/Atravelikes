
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Plane, UserCog, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';


export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, signOut } = useAuth();
  const pathname = usePathname();

  const navLinks = [
    { href: '/profile/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/profile/flights', label: 'My Flights', icon: Plane },
    { href: '/profile/settings', label: 'Account Settings', icon: UserCog },
  ];

  if (loading) {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8">
                <aside className="md:col-span-1 lg:col-span-1 space-y-4">
                     <Skeleton className="h-24 w-full" />
                     <Skeleton className="h-10 w-full" />
                     <Skeleton className="h-10 w-full" />
                     <Skeleton className="h-10 w-full" />
                </aside>
                <main className="md:col-span-3 lg:col-span-4">
                    <Skeleton className="h-64 w-full" />
                </main>
            </div>
        </div>
    )
  }

  if (!user) {
    // This could be a redirect or a login prompt, for now we show nothing.
    return null;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8">
        <aside className="md:col-span-1 lg:col-span-1">
          <div className="flex flex-col items-center p-4 border rounded-lg bg-card mb-6">
            <Avatar className="h-20 w-20 mb-3">
              <AvatarImage src={user.photoURL || undefined} alt={user.displayName || 'User'} />
              <AvatarFallback className="text-3xl">{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <h2 className="text-lg font-semibold text-center">{user.displayName || 'User'}</h2>
            <p className="text-sm text-muted-foreground text-center truncate w-full">{user.email}</p>
          </div>

          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  pathname === link.href
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                <link.icon className="h-4 w-4" />
                <span>{link.label}</span>
              </Link>
            ))}
             <button
              onClick={signOut}
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </nav>
        </aside>
        <main className="md:col-span-3 lg:col-span-4">
          {children}
        </main>
      </div>
    </div>
  );
}
