import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plane, Hotel, Clock } from 'lucide-react'
import { FlightSearchForm } from '@/components/forms/flight-search-form'
import { HotelSearchForm } from '@/components/forms/hotel-search-form'
import { StatusSearchForm } from '@/components/forms/status-search-form'
import { Card, CardContent } from "@/components/ui/card"

export function SearchTabs() {
  return (
    <Card className="shadow-2xl border-2">
      <CardContent className="p-2 sm:p-4">
        <Tabs defaultValue="flights" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-muted/50">
            <TabsTrigger value="flights">
              <Plane className="mr-2 h-4 w-4" />
              Flights
            </TabsTrigger>
            <TabsTrigger value="hotels">
              <Hotel className="mr-2 h-4 w-4" />
              Hotels
            </TabsTrigger>
            <TabsTrigger value="status">
              <Clock className="mr-2 h-4 w-4" />
              Flight Status
            </TabsTrigger>
          </TabsList>
          <TabsContent value="flights" className="pt-6">
            <FlightSearchForm />
          </TabsContent>
          <TabsContent value="hotels" className="pt-6">
            <HotelSearchForm />
          </TabsContent>
          <TabsContent value="status" className="pt-6">
            <StatusSearchForm />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
