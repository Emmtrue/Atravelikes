
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const HintRequestSchema = z.object({
  origin: z.string().min(1),
  destination: z.string().min(1),
});

const HINT_RULES = [
    {
        routes: [
            { origin: "JFK", destination: "LAX" },
            { origin: "LAX", destination: "JFK" }
        ],
        hint: "This is a popular coast-to-coast route. Book at least 3 weeks in advance for better prices."
    },
    {
        routes: [
            { origin: "LHR", destination: "CDG" },
            { origin: "CDG", destination: "LHR" }
        ],
        hint: "Consider taking the train as a faster and often cheaper alternative for this route."
    },
     {
        routes: [
            { origin: "Nairobi", destination: "Dubai" },
            { origin: "Dubai", destination: "Nairobi" }
        ],
        hint: "Look out for deals on Emirates and Kenya Airways, which frequently fly this route directly."
    },
     {
        routes: [
            { origin: "Cairo", destination: "Jeddah" },
        ],
        hint: "This route is very popular for religious pilgrimages. Book well outside of major Islamic holidays to find lower fares."
    }
];

// A very simple rule-based hint engine.
function getLocationHint(origin: string, destination: string): string | null {
    const originCity = origin.split(" ")[0].replace(/,/g, '');
    const destCity = destination.split(" ")[0].replace(/,/g, '');

    for (const rule of HINT_RULES) {
        for (const route of rule.routes) {
             if (origin.includes(route.origin) && destination.includes(route.destination)) {
                return rule.hint;
            }
        }
    }

    // Add a default hint for long-haul flights
    const longHaulRoutes = [ "New York-Tokyo", "London-Sydney", "Johannesburg-New York", "Dubai-Los Angeles" ];
    if (longHaulRoutes.some(r => (origin.includes(r.split('-')[0]) && destination.includes(r.split('-')[1])) || (origin.includes(r.split('-')[1]) && destination.includes(r.split('-')[0])))) {
        return "For long-haul flights, consider a layover in a major hub like Addis Ababa or Istanbul for potentially cheaper fares and a chance to stretch your legs."
    }

    return null; // No specific hint found
}


export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const validation = HintRequestSchema.safeParse({
    origin: searchParams.get('origin'),
    destination: searchParams.get('destination'),
  });

  if (!validation.success) {
    return NextResponse.json({ error: 'Invalid origin or destination' }, { status: 400 });
  }

  const { origin, destination } = validation.data;
  const hint = getLocationHint(origin, destination);

  if (hint) {
    return NextResponse.json({ hint });
  } else {
    // It's better to return a 204 No Content or just an empty object 
    // if no hint is available, rather than a 404.
    return NextResponse.json({ hint: null }, { status: 200 });
  }
}
