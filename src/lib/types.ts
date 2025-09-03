
// This type is aligned with the response from the /schedules endpoint and /flights/{id}
export type Flight = {
    fa_flight_id?: string | null;
    ident: string | null;
    ident_icao?: string | null;
    ident_iata?: string | null;
    operator?: string | null;
    flight_number?: string | null;
    registration?: string | null;
    atc_ident?: string | null;
    inbound_fa_flight_id?: string | null;
    blocked?: boolean;
    diverted?: boolean;
    cancelled?: boolean;
    position_only?: boolean;
    actual_ident?: string | null;
    departure_delay?: number | null;
    arrival_delay?: number | null;
    filed_ete?: number | null;
    progress_percent?: number | null;
    status?: string;
    aircraft_type?: string | null;
    route_distance?: number | null;
    filed_airspeed?: number | null;
    filed_altitude?: number | null;
    route?: string | null;
    baggage_claim?: string | null;
    seats_cabin_business?: number | null;
    seats_cabin_coach?: number | null;
    seats_cabin_first?: number | null;
    gate_origin?: string | null;
    gate_destination?: string | null;
    terminal_origin?: string | null;
    terminal_destination?: string | null;
    type?: string;

    origin: {
        code: string;
        code_icao: string;
        code_iata: string;
        code_lid: string;
        timezone: string;
        name: string;
        city: string;
        airport_info_url: string;
    } | null;
    destination: {
        code: string;
        code_icao: string;
        code_iata: string;
        code_lid: string;
        timezone: string;
        name: string;
        city: string;
        airport_info_url: string;
    } | null;

    scheduled_out: string | null;
    estimated_out?: string | null;
    actual_out?: string | null;
    scheduled_off?: string | null;
    estimated_off?: string | null;
    actual_off?: string | null;
    
    scheduled_in: string | null;
    estimated_in?: string | null;
    actual_in?: string | null;
    scheduled_on?: string | null;
    estimated_on?: string | null;
    actual_on?: string | null;
    
    foresight_predictions_available?: boolean;
};
