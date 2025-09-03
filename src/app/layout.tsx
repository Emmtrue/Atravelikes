
'use client'

import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from "@/components/ui/toaster";
import { Buffer } from "buffer";
import { useEffect } from 'react';
import { AuthProvider, useAuth } from '@/hooks/use-auth';
import { usePathname } from 'next/navigation';
import { ThemeProvider } from '@/components/theme-provider';
import { requestPermissionAndSaveToken } from '@/lib/firebase/messaging';

function AppContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isSuperAdminPage = pathname.startsWith('/super-admin');
  const { user } = useAuth();

  useEffect(() => {
    // When a user logs in, ask for notification permission.
    if (user) {
      requestPermissionAndSaveToken(user);
    }
  }, [user]);

  // The super-admin section has its own layout, so we don't render header/footer
  if (isSuperAdminPage) {
    return <>{children}</>;
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  useEffect(() => {
    // This is a workaround for a browser-based dependency issue.
    if (typeof window !== 'undefined') {
        window.Buffer = Buffer;
    }
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <title>Atravelikes</title>
      </head>
      <body className="font-body antialiased" suppressHydrationWarning={true}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
            <AuthProvider>
                <AppContent>{children}</AppContent>
                <Toaster />
            </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
