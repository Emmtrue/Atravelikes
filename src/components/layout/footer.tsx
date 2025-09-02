import Link from 'next/link';
import { Plane } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Plane className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold">Atravelikes</span>
        </div>
        <p className="text-sm text-muted-foreground text-center">
          &copy; {new Date().getFullYear()} Atravelikes. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
            Terms of Service
          </Link>
          <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
