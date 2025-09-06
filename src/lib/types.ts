
// This type is aligned with the response from the AeroDataBox API
// Specifically for the FIDS (airport departures/arrivals) endpoint and flight status by number
export type Flight = {
  number: string;
  callSign?: string;
  status: 'Unknown' | 'Scheduled' | 'EnRoute' | 'Landed' | 'Cancelled' | 'Diverted';
  codeshareStatus: 'Unknown' | 'IsOperator' | 'IsCodeshared';
  isCargo: boolean;
  
  departure: {
    airport: Airport;
    scheduledTime: TimeInfo;
    revisedTime?: TimeInfo;
    runwayTime?: TimeInfo;
    terminal?: string;
    gate?: string;
    quality: string[];
  };

  arrival: {
    airport: Airport;
    scheduledTime: TimeInfo;
    revisedTime?: TimeInfo;
    runwayTime?: TimeInfo;
    terminal?: string;
    gate?: string;
    baggageBelt?: string;
    quality: string[];
  };

  aircraft?: {
    reg?: string;
    modeS?: string;
    model?: string;
    image?: {
      url: string;
      webUrl: string;
      author: string;
      title: string;
      description: string;
      license: string;
      htmlAttributions: string[];
    };
  };

  airline: {
    name: string;
    iata?: string;
    icao?: string;
  };

  greatCircleDistance?: {
    meter: number;
    km: number;
    mile: number;
    nm: number;
    feet: number;
  };
};

export type Airport = {
  icao: string;
  iata: string;
  name: string;
  shortName: string;
  municipalityName: string;
  location: {
    lat: number;
    lon: number;
  };
  countryCode: string;
};

export type TimeInfo = {
  utc: string;
  local: string;
};


// Types for LiteAPI v3.0
export interface LiteAPIPlace {
  placeId: string;
  displayName: string;
  formattedAddress: string;
  types: string[];
  language: string;
}

export interface LiteAPIHotelImage {
  url: string;
  urlHd?: string;
  caption?: string;
  defaultImage?: boolean;
}

export interface LiteAPIRate {
  rateId: string;
  retailRate: {
    amount: number;
    currency: {
      code: string;
    };
  };
}

export interface LiteAPIHotel {
  hotelId: string;
  name?: string;
  address?: string;
  starRating?: number;
  hotelImages?: LiteAPIHotelImage[];
  hotelFacilities?: string[];
  rates?: LiteAPIRate[];
  roomTypes?: any[];
}
