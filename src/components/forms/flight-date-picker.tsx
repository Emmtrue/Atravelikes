
'use client';

import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { ControllerRenderProps, FieldValues } from 'react-hook-form';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface FlightDatePickerProps {
  field: ControllerRenderProps<FieldValues, 'departureDate'> | ControllerRenderProps<FieldValues, 'returnDate'>;
  label: string;
  placeholder?: string;
  disabledDate?: (date: Date) => boolean;
}

export function FlightDatePicker({ field, label, placeholder, disabledDate }: FlightDatePickerProps) {
  return (
    <FormItem className="flex flex-col">
      <FormLabel>{label}</FormLabel>
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant={'outline'}
              className={cn(
                'w-full justify-start text-left font-normal',
                !field.value && 'text-muted-foreground'
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {field.value ? (
                <span className="truncate">{format(field.value, 'PPP')}</span>
              ) : (
                <span>{placeholder || 'Pick a date'}</span>
              )}
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={field.value}
            onSelect={field.onChange}
            disabled={disabledDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <FormMessage />
    </FormItem>
  );
}
