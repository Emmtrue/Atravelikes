
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { format } from "date-fns"
import { CalendarIcon, Users, ArrowRightLeft } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { handleFlightSearch } from "@/app/actions"
import { useToast } from "@/hooks/use-toast"
import { AutocompleteInput } from "./autocomplete-input"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

const FormSchema = z.object({
  origin: z.string().min(1, { message: "Origin is required."}),
  destination: z.string().min(1, { message: "Destination is required." }),
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
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      origin: "",
      destination: "",
      passengers: 1,
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const searchParams = new URLSearchParams({
        origin: data.origin,
        destination: data.destination,
        departureDate: data.departureDate.toISOString(),
        passengers: data.passengers.toString(),
      });
    
    if (data.returnDate) {
        searchParams.append('returnDate', data.returnDate.toISOString());
    }

    const result = await handleFlightSearch({
        ...data,
        departureDate: data.departureDate.toISOString(),
        returnDate: data.returnDate?.toISOString(),
    }, searchParams);

    if (result.path) {
        router.push(result.path);
    }
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
                        <AutocompleteInput placeholder="e.g., Cairo (Egypt)" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="button" variant="ghost" size="icon" className="mx-2 self-end mb-2 shrink-0" onClick={() => {
                const origin = form.getValues("origin");
                const destination = form.getValues("destination");
                form.setValue("origin", destination);
                form.setValue("destination", origin);
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
                        <AutocompleteInput placeholder="e.g., Johannesburg (South Africa)" {...field} />
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
                <FormItem className="flex flex-col">
                  <FormLabel>Departure</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="returnDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Return</FormLabel>
                   <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>One way</span>
                          )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < (form.getValues("departureDate") || new Date(new Date().setHours(0,0,0,0)))
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
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
