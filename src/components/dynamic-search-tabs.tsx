
'use client';

import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

function SearchTabsSkeleton() {
  return (
    <div className="border-2 rounded-lg shadow-2xl p-2 sm:p-4">
      <div className="grid w-full grid-cols-3 bg-muted/50 rounded-md p-1 h-10 mb-6">
        <Skeleton className="h-full w-full rounded-sm" />
        <Skeleton className="h-full w-full rounded-sm" />
        <Skeleton className="h-full w-full rounded-sm" />
      </div>
      <div className="space-y-4 pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-11 gap-4 items-end">
           <div className="lg:col-span-5 space-y-2">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-10 w-full" />
           </div>
            <div className="lg:col-span-4 grid grid-cols-2 gap-4">
               <div className="space-y-2">
                  <Skeleton className="h-5 w-20" />
                  <Skeleton className="h-10 w-full" />
               </div>
                <div className="space-y-2">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-10 w-full" />
               </div>
            </div>
             <div className="lg:col-span-1 space-y-2">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-10 w-full" />
            </div>
             <Skeleton className="h-10 w-full lg:col-span-1" />
        </div>
      </div>
    </div>
  )
}


export const DynamicSearchTabs = dynamic(() => import('@/components/search-tabs').then(mod => mod.SearchTabs), {
  ssr: false,
  loading: () => <SearchTabsSkeleton />,
});
