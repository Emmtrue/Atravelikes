
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Wifi, Utensils, ParkingCircle, Sun } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

export default function HotelDetailsPage({ params }: { params: { id: string } }) {
  // In a real app, you'd fetch this data based on params.id
  const hotel = {
    id: params.id,
    name: 'The Grand Parisian Hotel',
    location: 'Paris, France',
    rating: 4.8,
    reviews: 1245,
    price: 350,
    description: "Experience the pinnacle of luxury at The Grand Parisian Hotel. Located in the heart of Paris, our hotel offers breathtaking views of the Eiffel Tower, exquisite dining options, and a world-class spa. Each room is designed with elegance and comfort in mind, ensuring an unforgettable stay.",
    images: [
      'https://picsum.photos/1200/800?random=hotel_lobby',
      'https://picsum.photos/1200/800?random=hotel_room_view',
      'https://picsum.photos/1200/800?random=hotel_pool',
      'https://picsum.photos/1200/800?random=hotel_restaurant',
    ],
    amenities: [
      { name: 'Free Wi-Fi', icon: Wifi },
      { name: 'Restaurant', icon: Utensils },
      { name: 'Free Parking', icon: ParkingCircle },
      { name: 'Swimming Pool', icon: Sun },
    ],
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Card className="overflow-hidden">
        <CardHeader className="p-0">
           <Carousel className="w-full">
            <CarouselContent>
              {hotel.images.map((src, index) => (
                <CarouselItem key={index}>
                  <div className="relative h-[300px] md:h-[500px]">
                    <Image src={src} alt={`${hotel.name} - view ${index + 1}`} fill className="object-cover" data-ai-hint="hotel luxury" priority={index === 0} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10" />
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10" />
          </Carousel>
        </CardHeader>
        <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                    <CardTitle className="text-4xl font-bold">{hotel.name}</CardTitle>
                    <div className="flex items-center gap-4 mt-2 mb-4">
                        <div className="flex items-center gap-1 text-yellow-500">
                            {[...Array(5)].map((_, i) => <Star key={i} className={`h-5 w-5 ${i < hotel.rating ? 'fill-current' : 'stroke-current'}`} />)}
                        </div>
                        <span className="font-semibold">{hotel.rating}</span>
                        <span className="text-muted-foreground">({hotel.reviews} reviews)</span>
                        <span className="text-muted-foreground flex items-center gap-1"><MapPin className="h-4 w-4" /> {hotel.location}</span>
                    </div>
                    <p className="text-foreground/80 leading-relaxed">{hotel.description}</p>
                </div>
                 <div className="md:col-span-1">
                    <Card className="bg-muted/50 p-6">
                        <div className="flex justify-between items-baseline mb-4">
                            <p className="text-3xl font-extrabold text-primary">${hotel.price}</p>
                            <p className="text-muted-foreground">per night</p>
                        </div>
                        <Button className="w-full text-lg py-6">Book Now</Button>
                        <p className="text-xs text-muted-foreground text-center mt-2">Free cancellation</p>
                    </Card>
                </div>
            </div>
            
            <Separator className="my-8" />

            <div>
                <h3 className="text-2xl font-semibold mb-4">Amenities</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {hotel.amenities.map(amenity => (
                        <div key={amenity.name} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                            <amenity.icon className="h-6 w-6 text-primary" />
                            <span className="font-medium">{amenity.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}

