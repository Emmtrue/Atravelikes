import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { DynamicSearchTabs } from '@/components/dynamic-search-tabs';


function SearchTabsSkeleton() {
  return (
    <div className="border-2 rounded-lg shadow-2xl p-2 sm:p-4">
      <div className="grid w-full grid-cols-3 bg-muted/50 rounded-md p-1 h-10 mb-6">
        <Skeleton className="h-full w-full rounded-sm" />
      </div>
      <div className="space-y-4">
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


export default function Home() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDepartureDate = tomorrow.toISOString().split('T')[0];

  return (
    <div className="flex flex-col">
       <section className="relative w-full h-[50vh] min-h-[400px]">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <Image
          src="https://picsum.photos/1600/900"
          alt="Exotic travel destination"
          data-ai-hint="travel destination"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center text-white p-4">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl font-headline">
            Your Journey Starts Here
          </h1>
          <p className="mt-4 max-w-2xl text-lg sm:text-xl">
            Discover and book flights, hotels, and more. Atravelikes makes your travel planning seamless and enjoyable.
          </p>
        </div>
      </section>
      
      <div id="search" className="relative z-30 container mx-auto px-4 sm:px-6 lg:px-8 -mt-24 md:-mt-20">
         <Suspense fallback={<SearchTabsSkeleton />}>
            <DynamicSearchTabs />
         </Suspense>
      </div>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Featured Destinations</h2>
          <p className="mt-2 text-lg text-muted-foreground">Get inspired for your next adventure</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { city: 'Paris', hint: 'eiffel tower' },
            { city: 'Tokyo', hint: 'shibuya crossing' },
            { city: 'New York', hint: 'skyline manhattan' },
            { city: 'Bali', hint: 'indonesia temple' },
          ].map(({ city, hint }) => (
            <Link key={city} href={`/flights?destination=${city}&departureDate=${defaultDepartureDate}&passengers=1&origin=Anywhere`} className="group relative block overflow-hidden rounded-lg shadow-lg aspect-[4/5]">
                <Image
                  src={`https://picsum.photos/400/500?${city}`}
                  alt={`View of ${city}`}
                  data-ai-hint={hint}
                  fill
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">{city}</h3>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
