
export type Destination = {
    id: string;
    city: string;
    country: string;
    iata: string;
    label: string;
    type: 'city' | 'country';
};

const rawDestinations: Omit<Destination, 'id' | 'label'>[] = [
  // Major African Cities
  { city: "Cairo", country: "Egypt", type: "city", iata: "CAI" },
  { city: "Johannesburg", country: "South Africa", type: "city", iata: "JNB" },
  { city: "Addis Ababa", country: "Ethiopia", type: "city", iata: "ADD" },
  { city: "Casablanca", country: "Morocco", type: "city", iata: "CMN" },
  { city: "Cape Town", country: "South Africa", type: "city", iata: "CPT" },
  { city: "Nairobi", country: "Kenya", type: "city", iata: "NBO" },
  { city: "Lagos", country: "Nigeria", type: "city", iata: "LOS" },
  { city: "Algiers", country: "Algeria", type: "city", iata: "ALG" },
  { city: "Accra", country: "Ghana", type: "city", iata: "ACC" },
  { city: "Dakar", country: "Senegal", type: "city", iata: "DSS" },
  
  // Major European Cities
  { city: "London", country: "United Kingdom", type: "city", iata: "LHR" },
  { city: "Paris", country: "France", type: "city", iata: "CDG" },
  { city: "Istanbul", country: "Turkey", type: "city", iata: "IST" },
  { city: "Amsterdam", country: "Netherlands", type: "city", iata: "AMS" },
  { city: "Frankfurt", country: "Germany", type: "city", iata: "FRA" },
  { city: "Madrid", country: "Spain", type: "city", iata: "MAD" },
  { city: "Rome", country: "Italy", type: "city", iata: "FCO" },

  // Major North American Cities
  { city: "New York", country: "USA", type: "city", iata: "JFK" },
  { city: "Los Angeles", country: "USA", type: "city", iata: "LAX" },
  { city: "Toronto", country: "Canada", type: "city", iata: "YYZ" },
  { city: "Chicago", country: "USA", type: "city", iata: "ORD" },
  { city: "Mexico City", country: "Mexico", type: "city", iata: "MEX" },
  { city: "Miami", country: "USA", type: "city", iata: "MIA" },

  // Major Asian Cities
  { city: "Dubai", country: "UAE", type: "city", iata: "DXB" },
  { city: "Tokyo", country: "Japan", type: "city", iata: "HND" },
  { city: "Singapore", country: "Singapore", type: "city", iata: "SIN" },
  { city: "Hong Kong", country: "Hong Kong", type: "city", iata: "HKG" },
  { city: "Shanghai", country: "China", type: "city", iata: "PVG" },
  { city: "Jeddah", country: "Saudi Arabia", type: "city", iata: "JED" },
];

export const destinations: Destination[] = rawDestinations.map((d, index) => {
    const id = `${d.iata}-${index}`;
    const label = d.type === 'city' && d.city !== d.country ? `${d.city} (${d.iata})` : `${d.country} (${d.iata})`;
    return { ...d, id, label };
});
