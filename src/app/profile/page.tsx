
'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FlightResultCard } from "@/components/flight-result-card"
import { HotelResultCard } from "@/components/hotel-result-card"
import { Plane, Hotel, History, Briefcase, Clock, BarChart3, Heart } from "lucide-react"
import { useEffect, useState, useMemo } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase/client"; // Use client-side firebase
import type { User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

// MOCK DATA - In a real app, this would be fetched from a secure API endpoint
const allFlights = Array.from({ length: 5 }, (_, i) => ({
    id: i + 1,
    airline: ['American Airlines', 'Delta', 'United', 'Southwest', 'British Airways'][i % 5],
    airlineLogo: `https://picsum.photos/40/40?random=airline${i}`,
    origin: 'SFO', destination: 'CDG', departureTime: '14:00', arrivalTime: '09:30',
    duration: '11h 30m', price: 890 + i*10, stops: 1,
}));

const allHotels = Array.from({ length: 6 }, (_, i) => ({
    id: i + 1, name: `Le Grand Hôtel #${i+1}`, image: `https://picsum.photos/400/300?random=hotel_paris${i}`,
    rating: '4.8', price: 350 + i*20, amenities: ['Spa', 'Pool', 'Free WiFi'],
}));


interface SearchHistoryItem {
    id: string;
    type: 'flight' | 'hotel' | 'status';
    query: any;
    timestamp: { seconds: number; nanoseconds: number; };
}


interface UserData {
    id: string;
    savedFlights: number[];
    savedHotels: number[];
    searchHistory: SearchHistoryItem[];
}


function StatCard({ title, value, icon, loading }: { title: string, value: string | number, loading?: boolean, icon: React.ReactNode }) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                {icon}
            </CardHeader>
            <CardContent>
                {loading ? <Skeleton className="h-8 w-12" /> : <div className="text-2xl font-bold">{value}</div>}
            </CardContent>
        </Card>
    )
}

function ProfileSkeleton() {
    return (
        <div className="container mx-auto py-8">
             <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
                <Skeleton className="h-24 w-24 rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-4 w-64" />
                </div>
            </div>
            <div className="grid gap-4 md:grid-cols-3 my-8">
                <StatCard title="Total Saved" value={0} icon={<Heart className="h-4 w-4 text-muted-foreground" />} loading />
                <StatCard title="Total Searches" value={0} icon={<History className="h-4 w-4 text-muted-foreground" />} loading />
                <StatCard title="Favorite Search" value={"N/A"} icon={<BarChart3 className="h-4 w-4 text-muted-foreground" />} loading />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                 <div className="lg:col-span-2 space-y-12">
                    <div>
                        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2"><Plane className="text-primary"/> Saved Flights</h2>
                        <div className="space-y-4">
                            <Skeleton className="h-24 w-full" />
                            <Skeleton className="h-24 w-full" />
                        </div>
                    </div>
                     <div>
                        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2"><Hotel className="text-primary"/> Saved Hotels</h2>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Skeleton className="h-72 w-full" />
                            <Skeleton className="h-72 w-full" />
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-1">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <History className="text-primary" />
                                Search History
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           <Skeleton className="h-16 w-full" />
                           <Skeleton className="h-16 w-full" />
                           <Skeleton className="h-16 w-full" />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default function ProfilePage() {
    const [user, setUser] = useState<User | null>(null);
    const [userData, setUserData] = useState<UserData | null>(null);
    const [authLoading, setAuthLoading] = useState(true);
    const router = useRouter();

     useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                // In a real app, you would fetch user-specific data from a secure API.
                // For this demo, we'll use mock data.
                 setUserData({
                    id: currentUser.uid,
                    savedFlights: [2, 4],
                    savedHotels: [1, 3, 5],
                    searchHistory: [
                        {id: '1', type: 'flight', query: {origin: 'JFK', destination: 'LAX'}, timestamp: {seconds: Date.now()/1000 - 86400, nanoseconds: 0}},
                        {id: '2', type: 'hotel', query: {destination: 'Paris'}, timestamp: {seconds: Date.now()/1000 - 172800, nanoseconds: 0}},
                        {id: '3', type: 'flight', query: {origin: 'SFO', destination: 'LHR'}, timestamp: {seconds: Date.now()/1000 - 259200, nanoseconds: 0}},
                    ]
                });
            } else {
                router.push('/login');
            }
            setAuthLoading(false);
        });
        return () => unsubscribe();
    }, [router]);

    const savedFlights = useMemo(() => allFlights.filter(f => userData?.savedFlights?.includes(f.id)), [userData?.savedFlights]);
    const savedHotels = useMemo(() => allHotels.filter(h => userData?.savedHotels?.includes(h.id)), [userData?.savedHotels]);
    
    const stats = useMemo(() => {
        const totalSaved = (userData?.savedFlights?.length || 0) + (userData?.savedHotels?.length || 0);
        const totalSearches = userData?.searchHistory?.length || 0;
        
        if (!userData?.searchHistory || totalSearches === 0) {
            return { totalSaved, totalSearches, mostSearched: 'N/A' };
        }

        const typeCounts = userData.searchHistory.reduce((acc, item) => {
            acc[item.type] = (acc[item.type] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        const mostSearched = Object.keys(typeCounts).reduce((a, b) => typeCounts[a] > typeCounts[b] ? a : b, 'N/A');

        return {
            totalSaved,
            totalSearches,
            mostSearched: mostSearched === 'N/A' ? 'N/A' : mostSearched.charAt(0).toUpperCase() + mostSearched.slice(1)
        }
    }, [userData]);
    
    if (authLoading || !userData) {
        return <ProfileSkeleton />;
    }
    
    if (!user) return <ProfileSkeleton />;

    const renderSearchHistoryItem = (item: SearchHistoryItem) => {
        const { query, timestamp } = item;
        const date = new Date(timestamp.seconds * 1000);
        return (
            <Card key={item.id} className="p-4 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    {item.type === 'flight' && <Briefcase className="h-5 w-5 text-muted-foreground" />}
                    {item.type === 'hotel' && <Hotel className="h-5 w-5 text-muted-foreground" />}
                    {item.type === 'status' && <Clock className="h-5 w-5 text-muted-foreground" />}
                    <div>
                        {item.type === 'flight' && <p>Flight from <strong>{query.origin}</strong> to <strong>{query.destination}</strong></p>}
                        {item.type === 'hotel' && <p>Hotels in <strong>{query.destination}</strong></p>}
                        {item.type === 'status' && <p>Status for flight <strong>{query.flightNumber}</strong></p>}
                        <p className="text-xs text-muted-foreground">{format(date, "PPP p")}</p>
                    </div>
                </div>
                <Button variant="ghost" size="sm">Search Again</Button>
            </Card>
        );
    }


    return (
        <div className="container mx-auto py-8">
            <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
                <Avatar className="h-24 w-24 border-4 border-primary/20">
                    <AvatarImage src={user.photoURL || 'https://i.pravatar.cc/150'} alt={user.displayName || 'User'} />
                    <AvatarFallback>{user.displayName?.charAt(0) || user.email?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                    <h1 className="text-3xl font-bold">{user.displayName}</h1>
                    <p className="text-muted-foreground">{user.email}</p>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3 my-8">
                <StatCard title="Total Saved" value={stats.totalSaved} icon={<Heart className="h-4 w-4 text-muted-foreground" />} />
                <StatCard title="Total Searches" value={stats.totalSearches} icon={<History className="h-4 w-4 text-muted-foreground" />} />
                <StatCard title="Favorite Search" value={stats.mostSearched} icon={<BarChart3 className="h-4 w-4 text-muted-foreground" />} />
            </div>

            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-12">
                     <div>
                        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2"><Plane className="text-primary"/> Saved Flights</h2>
                        <div className="space-y-4">
                            {savedFlights.length > 0 ? (
                                savedFlights.map(flight => <FlightResultCard key={flight.id} flight={flight} />)
                            ) : (
                                <p className="text-muted-foreground ml-2">You have no saved flights.</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2"><Hotel className="text-primary"/> Saved Hotels</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {savedHotels.length > 0 ? (
                                savedHotels.map(hotel => <HotelResultCard key={hotel.id} hotel={hotel} />)
                            ) : (
                                 <p className="text-muted-foreground ml-2 col-span-full">You have no saved hotels.</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-1">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <History className="text-primary" />
                                Search History
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {userData.searchHistory && userData.searchHistory.length > 0 ? (
                                userData.searchHistory.map(renderSearchHistoryItem)
                             ) : (
                                <p className="text-muted-foreground p-4 text-sm">Your recent searches will appear here.</p>
                             )}
                        </CardContent>
                    </Card>
                </div>

            </div>
        </div>
    )
}
