import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Plane, CheckCircle2, AlertTriangle, Clock } from 'lucide-react'
import { Badge } from "@/components/ui/badge";

// Mock status lookup function
const getFlightStatus = (flightNumber: string, date: string) => {
    const statuses = ['On Time', 'Delayed', 'Landed'];
    const hash = flightNumber.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const status = statuses[hash % statuses.length];
    
    return {
        flightNumber,
        date: new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
        airline: 'Atravelikes Air',
        origin: 'JFK',
        originCity: 'New York',
        destination: 'LHR',
        destinationCity: 'London',
        status,
        departure: { scheduled: '08:30', actual: status === 'Delayed' ? '09:15' : '08:28' },
        arrival: { scheduled: '20:45', actual: status === 'Landed' ? '20:40' : '21:30 (Est)' }
    }
}

const StatusIcon = ({ status }: { status: string }) => {
    switch(status) {
        case 'On Time':
            return <CheckCircle2 className="h-4 w-4 text-green-600" />;
        case 'Delayed':
            return <AlertTriangle className="h-4 w-4 text-orange-600" />;
        case 'Landed':
            return <CheckCircle2 className="h-4 w-4 text-blue-600" />;
        default:
            return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
}

export default function StatusPage({ searchParams }: { searchParams: { flightNumber?: string, date?: string } }) {
    if (!searchParams.flightNumber || !searchParams.date) {
        return (
            <div className="container mx-auto py-8 text-center">
                <p className="text-muted-foreground">Please search for a flight status on the home page.</p>
            </div>
        )
    }

    const flight = getFlightStatus(searchParams.flightNumber, searchParams.date);

    return (
        <div className="container mx-auto py-8 max-w-4xl">
            <Card className="w-full shadow-lg">
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle className="text-2xl">Flight {flight.flightNumber}</CardTitle>
                            <CardDescription>{flight.airline} &middot; {flight.date}</CardDescription>
                        </div>
                        <Badge variant="outline" className={`capitalize text-base px-3 py-1 ${
                            flight.status === 'On Time' ? 'border-green-300 bg-green-50 text-green-700' :
                            flight.status === 'Delayed' ? 'border-orange-300 bg-orange-50 text-orange-700' :
                            'border-blue-300 bg-blue-50 text-blue-700'
                        }`}>
                            <StatusIcon status={flight.status} /> <span className="ml-2">{flight.status}</span>
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 items-center text-center">
                        <div>
                            <p className="text-3xl font-bold">{flight.origin}</p>
                            <p className="text-muted-foreground">{flight.originCity}</p>
                        </div>
                        <div className="my-4 md:my-0 flex items-center justify-center text-primary">
                            <Separator className="md:hidden w-1/4" />
                            <Plane className="mx-4 h-8 w-8" />
                            <Separator className="flex-1 hidden md:block" />
                        </div>
                        <div>
                            <p className="text-3xl font-bold">{flight.destination}</p>
                            <p className="text-muted-foreground">{flight.destinationCity}</p>
                        </div>
                    </div>
                    <Separator />
                    <div className="grid grid-cols-2 gap-8">
                        <div className="text-center">
                            <h3 className="font-semibold text-lg text-muted-foreground">Departure</h3>
                            <p>Scheduled: {flight.departure.scheduled}</p>
                            <p className="font-bold text-xl">
                                Actual: {flight.departure.actual}
                            </p>
                        </div>
                        <div className="text-center">
                            <h3 className="font-semibold text-lg text-muted-foreground">Arrival</h3>
                            <p>Scheduled: {flight.arrival.scheduled}</p>
                            <p className="font-bold text-xl">
                                Actual: {flight.arrival.actual}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
