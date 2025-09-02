'use client'

import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from "@/components/ui/toaster";
import { Buffer } from "buffer";
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const pathname = usePathname();
  const isSuperAdmin = pathname.startsWith('/super-admin');

  useEffect(() => {
    // This is a workaround for a browser-based dependency issue.
    if (typeof window !== 'undefined') {
        window.Buffer = Buffer;
    }
  }, []);

  if (isSuperAdmin) {
    return (
       <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
          <title>Admin - Atravelikes</title>
        </head>
        <body className="font-body antialiased" suppressHydrationWarning={true}>
          {children}
          <Toaster />
        </body>
      </html>
    )
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <title>Atravelikes</title>
      </head>
      <body className="font-body antialiased" suppressHydrationWarning={true}>
        <div className="relative flex min-h-screen w-full flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
