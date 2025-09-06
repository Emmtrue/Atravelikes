
import './globals.css';
import type { Metadata } from 'next';
import { Buffer } from "buffer";
import { AuthProvider } from '@/hooks/use-auth';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { Suspense } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { LiveChatWidget } from '@/components/live-chat-widget';

// This is a workaround for a browser-based dependency issue.
if (typeof window !== 'undefined') {
    window.Buffer = Buffer;
}

export const metadata: Metadata = {
    title: 'Atravelikes',
    description: 'Discover and book flights, hotels, and more. Atravelikes makes your travel planning seamless and enjoyable.',
    manifest: '/manifest.ts'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased" suppressHydrationWarning={true}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
            <AuthProvider>
                <div className="relative flex min-h-screen w-full flex-col">
                    <Suspense>
                        <Header />
                    </Suspense>
                    <main className="flex-1">{children}</main>
                    <Footer />
                </div>
                <Toaster />
                <LiveChatWidget />
            </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
