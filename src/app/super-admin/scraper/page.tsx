
import { AdminDashboard } from '@/components/admin/admin-dashboard';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

function AdminDashboardSkeleton() {
    return (
        <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-6">
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-48 w-full" />
            </div>
            <Skeleton className="h-96 w-full" />
        </div>
    )
}

export default function ScraperPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Scraper Control Panel</h1>
      <Suspense fallback={<AdminDashboardSkeleton />}>
        <AdminDashboard />
      </Suspense>
    </>
  );
}
