
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { format } from "date-fns"
import { Users, ArrowRightLeft } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { handleFlightSearch } from "@/app/actions"
import { AutocompleteInput } from "./autocomplete-input"
import { Input } from "@/components/ui/input"
import { destinations } from '@/lib/destinations'
import { useToast } from "@/hooks/use-toast"
import { FlightDatePicker } from './flight-date-picker';

const destinationLabels = destinations.map(d => d.label);

// Zod schema for form validation
const FormSchema = z.object({
  origin: z.string().refine(val => destinationLabels.includes(val), {
    message: "Please select a valid origin from the list.",
  }),
  destination: z.string().refine(val => destinationLabels.includes(val), {
    message: "Please select a valid destination from the list.",
  }),
  departureDate: z.date({ required_error: "Departure date is required." }),
  returnDate: z.date().optional(),
  passengers: z.coerce.number().int().min(1, "At least one passenger is required.").max(9, "Maximum 9 passengers."),
}).refine(data => {
    if (!data.origin || !data.destination) return true;
    return data.origin.toLowerCase() !== data.destination.toLowerCase()
}, {
  message: "Origin and destination cannot be the same.",
  path: ["destination"],
});


export function FlightSearchForm() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      origin: "",
      destination: "",
      passengers: 1,
    },
  });

  // Helper to get the IATA code from the label
  const getIataCode = (label: string) => {
    if (!label) return '';
    const destination = destinations.find(d => d.label === label);
    return destination ? destination.iata : '';
  };

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const result = await handleFlightSearch({
      ...data,
      departureDate: format(data.departureDate, 'yyyy-MM-dd'),
      returnDate: data.returnDate ? format(data.returnDate, 'yyyy-MM-dd') : undefined
    });

    if (!result.success) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please check your inputs and try again.",
      });
      console.error("Server-side validation failed:", result.errors);
      return;
    }

    const originIata = getIataCode(data.origin);
    const destinationIata = getIataCode(data.destination);

    const params = new URLSearchParams({
        origin: originIata,
        destination: destinationIata,
        departureDate: format(data.departureDate, 'yyyy-MM-dd'),
        passengers: data.passengers.toString(),
    });
    if (data.returnDate) {
        params.set('returnDate', format(data.returnDate, 'yyyy-MM-dd'));
    }

    router.push(`/flights?${params.toString()}`);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-11 gap-4 items-end">
          <div className="lg:col-span-5">
            <div className="relative flex items-center">
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="origin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>From</FormLabel>
                      <FormControl>
                        <AutocompleteInput placeholder="e.g., Cairo (CAI)" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="button" variant="ghost" size="icon" className="mx-2 self-end mb-2 shrink-0" onClick={() => {
                const origin = form.getValues("origin");
                const destination = form.getValues("destination");
                form.setValue("origin", destination, { shouldValidate: true });
                form.setValue("destination", origin, { shouldValidate: true });
              }}>
                <ArrowRightLeft className="h-4 w-4" />
              </Button>
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="destination"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>To</FormLabel>
                      <FormControl>
                        <AutocompleteInput placeholder="e.g., Johannesburg (JNB)" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="departureDate"
              render={({ field }) => (
                <FlightDatePicker 
                  field={field} 
                  label="Departure" 
                  disabledDate={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                />
              )}
            />
            <FormField
              control={form.control}
              name="returnDate"
              render={({ field }) => (
                <FlightDatePicker 
                  field={field} 
                  label="Return" 
                  placeholder="One way"
                  disabledDate={(date) => date < (form.getValues("departureDate") || new Date(new Date().setHours(0, 0, 0, 0)))}
                />
              )}
            />
          </div>

          <div className="lg:col-span-1">
            <FormField
              control={form.control}
              name="passengers"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Passengers</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input type="number" placeholder="1" className="pl-9" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <Button type="submit" className="w-full lg:col-span-1" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? 'Searching...' : 'Search'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
