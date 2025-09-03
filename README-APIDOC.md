AeroAPI 4.28.0
Introduction
AeroAPI is a simple, query-based API that gives software developers access to a variety of FlightAware's flight data. Users can obtain current or historical data. AeroAPI is a RESTful API delivering accurate and actionable aviation data. With the introduction of Foresight™, customers have access to the data that powers over half of the predictive airline ETAs in the US.
Categories
AeroAPI is divided into several categories to make things easier to discover.
•	Flights: Summary information, planned routes, positions and more
•	Foresight: Flight positions enhanced with FlightAware Foresight™
•	Airports: Airport information and FIDS style resources
•	Operators: Operator information and fleet activity resources
•	Alerts: Configure flight alerts and delivery destinations
•	History: Historical flight access for various endpoints
•	Miscellaneous: Flight disruption, future schedule information, and aircraft owner information
•	Account: AeroAPI usage statistics
Development Tools
AeroAPI is defined using the OpenAPI Spec 3.0, which means it can be easily imported into tools like Postman. To get started try importing the API specification using Postman's instructions. Once imported as a collection only the "Value" field under the collection's Authorization tab needs to be populated and saved before making calls.
The AeroAPI OpenAPI specification is located at:
https://static.flightaware.com/rsrc/aeroapi/aeroapi-openapi.yml
Our open source AeroApps project provides a small collection of services and sample applications to help you get started.
The Flight Information Display System (FIDS) AeroApp is an example of a multi-tier application using multiple languages and Docker containers. It demonstrates connectivity, data caching, flight presentation, and leveraging flight maps.
The Alerts AeroApp demonstrates the use of AeroAPI to set, edit, and receive alerts in a sample application with a Dockerized Python backend and a React frontend.
Our AeroAPI push notification testing interface provides a quick and easy way to test the delivery of customized alerts via AeroAPI push.
API SERVER
  https://{env}.flightaware.com/aeroapi
SELECTED: https://aeroapi.flightaware.com/aeroapi
SERVER VARIABLES
env	              

AUTHENTICATION
No API key applied
API Key (x-apikey)
Unlike previous versions of AeroAPI, authentication is now controlled by an API key that must be set in the header x-apikey. Your FlightAware username is not used when authenticating to the API.
Send x-apikey in header
  

FLIGHTS
Get an image of a flight's track on a map
GET /flights/{id}/map
Returns a flight's track as a base64-encoded image. Image can contain a variety of additional data layers beyond just the track. Data from up to 10 days ago can be obtained. If looking for older data, please use the corresponding historical endpoint.
API Key (x-apikey)
REQUEST
PATH PARAMETERS
* id
string	 

	The fa_flight_id to fetch. If looking for data from more than 10 days ago, please use the corresponding historical endpoint.
Example: UAL1234-1234567890-airline-0123	
QUERY-STRING PARAMETERS
height
integer	 
Default: 480
Min 1┃Max 1500
	Height of requested image (pixels)
width
integer	 
Default: 640
Min 1┃Max 1500
	Width of requested image (pixels)
layer_on
array of string	 
Allowed: US Cities ┃ european country boundaries ┃ asia country boundaries ┃ major airports ┃ country boundaries ┃ US state boundaries ┃ water ┃ US major roads ┃ radar ┃ track ┃ flights ┃ airports
	List of map layers to enable
layer_off
array of string	 
Allowed: US Cities ┃ european country boundaries ┃ asia country boundaries ┃ major airports ┃ country boundaries ┃ US state boundaries ┃ water ┃ US major roads ┃ radar ┃ track ┃ flights ┃ airports
	List of map layers to disable
show_data_block
boolean	 
Default: false
	Whether a textual caption containing the ident, type, heading, altitude, origin, and destination should be displayed by the flight's position.
airports_expand_view
boolean	 
Default: false
	Whether to force zoom area to ensure origin/destination airports are visible. Enabling this flag forcefully enables the show_airports flag as well.
show_airports
boolean	 
Default: false
	Whether to show the origin/destination airports for the flight as labeled points on the map.
bounding_box
array of number	 

	Manually specify the zoom area of the map using custom bounds. Should be a list of 4 coordinates representing the top, right, bottom, and left sides of the area (in that order).	
API Server
https://aeroapi.flightaware.com/aeroapi
Authentication
Required (None Applied)
RESPONSE
OK
EXAMPLESCHEMA
application/json; charset=UTF-8
Copy
{
"map": ""
}
Get flight's current position
GET /flights/{id}/position
Returns the latest position for a flight
API Key (x-apikey)
REQUEST
PATH PARAMETERS
* id
string	 

	The fa_flight_id to fetch. If looking for data from more than 10 days ago, please use the corresponding historical endpoint.
Example: UAL1234-1234567890-airline-0123	
API Server
https://aeroapi.flightaware.com/aeroapi
Authentication
Required (None Applied)
RESPONSE
OK
EXAMPLESCHEMA
application/json; charset=UTF-8
Copy
{
"ident": "string",
"ident_icao": "string",
"ident_iata": "string",
"fa_flight_id": "string",
"registration": "string",
"origin": 
{
"code": "string",
"code_icao": "string",
"code_iata": "string",
"code_lid": "string",
"timezone": "America/New_York",
"name": "LaGuardia",
"city": "New York",
"airport_info_url": ""
},
"destination": 
{
"code": "string",
"code_icao": "string",
"code_iata": "string",
"code_lid": "string",
"timezone": "America/New_York",
"name": "LaGuardia",
"city": "New York",
"airport_info_url": ""
},
"waypoints": 
[
0
],
"first_position_time": "2021-12-31T19:59:59Z",
"last_position": 
{
"fa_flight_id": "string",
"altitude": 0,
"altitude_change": "C",
"groundspeed": 0,
"heading": 0,
"latitude": 0,
"longitude": 0,
"timestamp": "2021-12-31T19:59:59Z",
"update_type": "P"
},
"bounding_box": 
[
0
],
"ident_prefix": "string",
"aircraft_type": "string",
"actual_off": "2021-12-31T19:59:59Z",
"actual_on": "2021-12-31T19:59:59Z",
"foresight_predictions_available": true,
"predicted_out": 
null
"predicted_off": 
null
"predicted_on": 
null
"predicted_in": 
null
"predicted_out_source": 
null
"predicted_off_source": 
null
"predicted_on_source": 
null
"predicted_in_source": 
null
}
Get flight's filed route
GET /flights/{id}/route
Returns information about a flight's filed route including coordinates, names, and types of fixes along the route. Not all flight routes can be successfully decoded by this endpoint, particularly if the flight is not entirely within the continental U.S. airspace, since this function only has access to navaids within that area. If data on a waypoint is missing then the type will be listed as "UNKNOWN". Data from up to 10 days ago can be obtained. If looking for older data, please use the corresponding historical endpoint.
API Key (x-apikey)
REQUEST
PATH PARAMETERS
* id
string	 

	The fa_flight_id to fetch. If looking for data from more than 10 days ago, please use the corresponding historical endpoint.
Example: UAL1234-1234567890-airline-0123	
API Server
https://aeroapi.flightaware.com/aeroapi
Authentication
Required (None Applied)
RESPONSE
OK
EXAMPLESCHEMA
application/json; charset=UTF-8
Copy
{
"route_distance": "string",
"fixes": 
[
{
"name": "string",
"latitude": 0,
"longitude": 0,
"distance_from_origin": 0,
"distance_this_leg": 0,
"distance_to_destination": 0,
"outbound_course": 0,
"type": "string"
}
]
}
Get flight's track
GET /flights/{id}/track
Returns the track for a flight as an array of positions. By default only actual airborne positions will be included. Surface positions (aircraft taxi movement at supported airports) can be requested using the query-string parameters. Data from up to 10 days ago can be obtained. If looking for older data, please use the corresponding historical endpoint.
API Key (x-apikey)
REQUEST
PATH PARAMETERS
* id
string	 

	The fa_flight_id to fetch. If looking for data from more than 10 days ago, please use the corresponding historical endpoint.
Example: UAL1234-1234567890-airline-0123	
QUERY-STRING PARAMETERS
include_estimated_positions
boolean	 
Default: false
	Whether to include estimated positions in the flight track.
include_surface_positions
boolean	 
Default: false
	Whether to include surface positions in the flight track and actual_distance computation.
API Server
https://aeroapi.flightaware.com/aeroapi
Authentication
Required (None Applied)
RESPONSE
OK
EXAMPLESCHEMA
application/json; charset=UTF-8
Copy
{
"actual_distance": 0,
"positions": 
[
{
"fa_flight_id": "string",
"altitude": 0,
"altitude_change": "C",
"groundspeed": 0,
"heading": 0,
"latitude": 0,
"longitude": 0,
"timestamp": "2021-12-31T19:59:59Z",
"update_type": "P"
}
]
}
Get information for a flight
GET /flights/{ident}
Returns the flight info status summary for a registration, ident, or fa_flight_id. If a fa_flight_id is specified then a maximum of 1 flight is returned, unless the flight has been diverted in which case both the original flight and any diversions will be returned with a duplicate fa_flight_id. If a registration or ident is specified, approximately 14 days of recent and scheduled flight information is returned, ordered by scheduled_out (or scheduled_off if scheduled_out is missing) descending. Alternately, specify a start and end parameter to find your flight(s) of interest, including up to 10 days of flight history.
API Key (x-apikey)
REQUEST
PATH PARAMETERS
* ident
string	 

	The ident, registration, or fa_flight_id to fetch. If using a flight ident, it is highly recommended to specify ICAO flight ident rather than IATA flight ident to avoid ambiguity and unexpected results. Setting the ident_type can also be used to help disambiguate.
Example: UAL4 ┃ N123HQ ┃ UAL1234-1234567890-airline-0123	
QUERY-STRING PARAMETERS
ident_type
enum	 
Allowed: designator ┃ registration ┃ fa_flight_id
	Type of ident provided in the ident parameter. By default, the passed ident is interpreted as a registration if possible. This parameter can force the ident to be interpreted as a designator instead.
start
string	 

	The starting date range for flight results, comparing against flights' scheduled_out field (or scheduled_off if scheduled_out is missing). The format is ISO8601 date or datetime, and the bound is inclusive. Specified start date must be no further than 10 days in the past and 2 days in the future. If not specified, will default to departures starting approximately 11 days in the past. If using date instead of datetime, the time will default to 00:00:00Z.
Example: 2021-12-31T19:59:59Z ┃ 2021-12-31	
end
string	 

	The ending date range for flight results, comparing against flights' scheduled_out field (or scheduled_off if scheduled_out is missing). The format is ISO8601 date or datetime, and the bound is exclusive. Specified end date must be no further than 10 days in the past and 2 days in the future. If not specified, will default to departures starting approximately 2 days in the future. If using date instead of datetime, the time will default to 00:00:00Z.
Example: 2021-12-31T19:59:59Z ┃ 2021-12-31	
max_pages
integer	 
Default: 1
Min 1	
	Maximum number of pages to fetch. This is an upper limit and not a guarantee of how many pages will be returned.	
cursor
string	 

	Opaque value used to get the next batch of data from a paged collection.	
API Server
https://aeroapi.flightaware.com/aeroapi
Authentication
Required (None Applied)
RESPONSE
OK
EXAMPLESCHEMA
application/json; charset=UTF-8
Copy
{
"links": 
{
"next": ""
},
"num_pages": 1,
"flights": 
[
{
"ident": "string",
"ident_icao": "string",
"ident_iata": "string",
"actual_runway_off": "string",
"actual_runway_on": "string",
"fa_flight_id": "string",
"operator": "string",
"operator_icao": "string",
"operator_iata": "string",
"flight_number": "string",
"registration": "string",
"atc_ident": "string",
"inbound_fa_flight_id": "string",
"codeshares": 
[
"string"
],
"codeshares_iata": 
[
"string"
],
"blocked": false,
"diverted": false,
"cancelled": false,
"position_only": false,
"origin": 
{
"code": "string",
"code_icao": "string",
"code_iata": "string",
"code_lid": "string",
"timezone": "America/New_York",
"name": "LaGuardia",
"city": "New York",
"airport_info_url": ""
},
"destination": 
{
"code": "string",
"code_icao": "string",
"code_iata": "string",
"code_lid": "string",
"timezone": "America/New_York",
"name": "LaGuardia",
"city": "New York",
"airport_info_url": ""
},
"departure_delay": 0,
"arrival_delay": 0,
"filed_ete": 0,
"progress_percent": 0,
"status": "string",
"aircraft_type": "string",
"route_distance": 0,
"filed_airspeed": 0,
"filed_altitude": 0,
"route": "string",
"baggage_claim": "string",
"seats_cabin_business": 0,
"seats_cabin_coach": 0,
"seats_cabin_first": 0,
"gate_origin": "string",
"gate_destination": "string",
"terminal_origin": "string",
"terminal_destination": "string",
"type": "General_Aviation",
"scheduled_out": "2021-12-31T19:59:59Z",
"estimated_out": "2021-12-31T19:59:59Z",
"actual_out": "2021-12-31T19:59:59Z",
"scheduled_off": "2021-12-31T19:59:59Z",
"estimated_off": "2021-12-31T19:59:59Z",
"actual_off": "2021-12-31T19:59:59Z",
"scheduled_on": "2021-12-31T19:59:59Z",
"estimated_on": "2021-12-31T19:59:59Z",
"actual_on": "2021-12-31T19:59:59Z",
"scheduled_in": "2021-12-31T19:59:59Z",
"estimated_in": "2021-12-31T19:59:59Z",
"actual_in": "2021-12-31T19:59:59Z",
"foresight_predictions_available": true
}
]
}
Get the canonical ident of a flight
GET /flights/{ident}/canonical
When the ident parameter is a code that could map to multiple other codes, this endpoint returns an array of information about all the possible codes. An optional ident type and country code can be provided to refine ambiguous idents to a single result. The ident type should either be designator or registration to describe the ident being passed in. The country code should represent a country the operator of the flight operates within.
API Key (x-apikey)
REQUEST
PATH PARAMETERS
* ident
string	 

	The flight designator or aircraft registration
Example: B6109	
QUERY-STRING PARAMETERS
ident_type
enum	 
Allowed: designator ┃ registration
	Type of ident provided in the ident parameter
country_code
string	 

	An ISO 3166-1 alpha-2 country code.
Example: US	
API Server
https://aeroapi.flightaware.com/aeroapi
Authentication
Required (None Applied)
RESPONSE
OK
EXAMPLESCHEMA
application/json; charset=UTF-8
Copy
{
"idents": 
[
{
"ident": "string",
"ident_type": "designator"
}
]
}
Submit a Flight Intent
POST /flights/{ident}/intents
This operation informs FlightAware of an upcoming (or recently departed) flight. This information is used solely by FlightAware for improving the accuracy of flight tracking. This method does not transmit to any ANSP/ATC facility for flight separation or operational services. Access to this endpoint requires special account authorization. The FlightAware account must also be subscribed to FlightAware Global and the specified registration or ident must be on the Global account.
API Key (x-apikey)
REQUEST
PATH PARAMETERS
* ident
string	 

	The ident or registration of the Flight Intent
Example: RPA4854 ┃ N123HQ	
REQUEST BODYapplication/json; charset=UTF-8
Flight Intent
EXAMPLESCHEMA
 
API Server
https://aeroapi.flightaware.com/aeroapi
Authentication
Required (None Applied)
RESPONSE
OK
Search for flights
GET /flights/search
Search for airborne flights by matching against various parameters including geospatial data. Uses a simplified query syntax compared to /flights/search/advanced.
API Key (x-apikey)
REQUEST
QUERY-STRING PARAMETERS
query
string	 

	Query to search for flights with a simplified syntax (compared to /flights/search/advanced). It should not exceed 1000 bytes in length. Query syntax allows filtering by latitude/longitude box, aircraft ident with wildcards, type with wildcards, prefix, origin airport, destination airport, origin or destination airport, groundspeed, and altitude. It takes search terms in a single string comprising "-key value" pairs. Codeshares and alternate idents are NOT searched when using the -idents clause.
Keys include:
•	-prefix STRING
•	-type STRING
•	-idents STRING
•	-identOrReg STRING
•	-airline STRING
•	-destination STRING
•	-origin STRING
•	-originOrDestination STRING
•	-aboveAltitude INTEGER
•	-belowAltitude INTEGER
•	-aboveGroundspeed INTEGER
•	-belowGroundspeed INTEGER
•	-latlong "MINLAT MINLON MAXLAT MAXLON"
•	-filter {ga|airline}
Example: -latlong "44.953469 -111.045360 40.962321 -104.046577"	
max_pages
integer	 
Default: 1
Min 1	
	Maximum number of pages to fetch. This is an upper limit and not a guarantee of how many pages will be returned.	
cursor
string	 

	Opaque value used to get the next batch of data from a paged collection.	
API Server
https://aeroapi.flightaware.com/aeroapi
Authentication
Required (None Applied)
RESPONSE
OK
EXAMPLESCHEMA
application/json; charset=UTF-8
Copy
{
"links": 
{
"next": ""
},
"num_pages": 1,
"flights": 
[
{
"ident": "string",
"ident_icao": "string",
"ident_iata": "string",
"fa_flight_id": "string",
"registration": "string",
"origin": 
{
"code": "string",
"code_icao": "string",
"code_iata": "string",
"code_lid": "string",
"timezone": "America/New_York",
"name": "LaGuardia",
"city": "New York",
"airport_info_url": ""
},
"destination": 
{
"code": "string",
"code_icao": "string",
"code_iata": "string",
"code_lid": "string",
"timezone": "America/New_York",
"name": "LaGuardia",
"city": "New York",
"airport_info_url": ""
},
"waypoints": 
[
0
],
"first_position_time": "2021-12-31T19:59:59Z",
"last_position": 
{
"fa_flight_id": "string",
"altitude": 0,
"altitude_change": "C",
"groundspeed": 0,
"heading": 0,
"latitude": 0,
"longitude": 0,
"timestamp": "2021-12-31T19:59:59Z",
"update_type": "P"
},
"bounding_box": 
[
0
],
"ident_prefix": "string",
"aircraft_type": "string",
"actual_off": "2021-12-31T19:59:59Z",
"actual_on": "2021-12-31T19:59:59Z",
"foresight_predictions_available": true,
"predicted_out": 
null
"predicted_off": 
null
"predicted_on": 
null
"predicted_in": 
null
"predicted_out_source": 
null
"predicted_off_source": 
null
"predicted_on_source": 
null
"predicted_in_source": 
null
}
]
}
Search for flights using advanced syntax
GET /flights/search/advanced
Returns currently or recently airborne flights based on geospatial search parameters.
Query parameters include a latitude/longitude box, aircraft ident with wildcards, type with wildcards, prefix, origin airport, destination airport, origin or destination airport, groundspeed, and altitude. It takes search terms in a single string comprising of {operator key value} elements and returns an array of flight structures. Each search term must be enclosed in curly braces. Multiple search terms can be combined in an implicit boolean "and" by separating the terms with at least one space. This function only searches flight data representing approximately the last 24 hours. Codeshares and alternate idents are NOT searched when matching against the ident key.
The supported operators include (note that operators take different numbers of arguments):
•	false - results must have the specified boolean key set to a value of false. Example: {false arrived}
•	true - results must have the specified boolean key set to a value of true. Example: {true lifeguard}
•	null - results must have the specified key set to a null value. Example: {null waypoints}
•	notnull - results must have the specified key not set to a null value. Example: {notnull aircraftType}
•	= - results must have a key that exactly matches the specified value. Example: {= aircraftType C172}
•	!= - results must have a key that must not match the specified value. Example: {!= prefix H}
•	< - results must have a key that is lexicographically less-than a specified value. Example: {< arrivalTime 1276811040}
•	> - results must have a key that is lexicographically greater-than a specified value. Example: {> speed 500}
•	<= - results must have a key that is lexicographically less-than-or-equal-to a specified value. Example: {<= alt 8000}
•	>= - results must have a key that is lexicographically greater-than-or-equal-to a specified value.
•	match - results must have a key that matches against a case-insensitive wildcard pattern. Example: {match ident AAL*}
•	notmatch - results must have a key that does not match against a case-insensitive wildcard pattern. Example: {notmatch aircraftType B76*}
•	range - results must have a key that is numerically between the two specified values. Example: {range alt 8000 20000}
•	in - results must have a key that exactly matches one of the specified values. Example: {in orig {KLAX KBUR KSNA KLGB}}
•	orig_or_dest - results must have either the origin or destination key exactly match one of the specified values. Example: {orig_or_dest {KLAX KBUR KSNA KLGB}}
•	airline - results will only include airline flight if the argument is 1, or will only include GA flights if the argument is 0. Example: {airline 1}
•	aircraftType - results must have an aircraftType key that matches one of the specified case-insensitive wildcard patterns. Example: {aircraftType {B76* B77*}}
•	ident - results must have an ident key that matches one of the specified case-insensitive wildcard patterns. Example: {ident {N123* N456* AAL* UAL*}}
•	ident_or_reg - results must have an ident key or was known to be operated by an aircraft registration that matches one of the specified case-insensitive wildcard patterns. Example: {ident_or_reg {N123* N456* AAL* UAL*}}
The supported key names include (note that not all of these key names are returned in the result structure, and some have slightly different names):
•	actualDepartureTime - Actual time of departure, or null if not departed yet. UNIX epoch timestamp seconds since 1970
•	aircraftType - aircraft type ID (for example: B763)
•	alt - altitude at last reported position (hundreds of feet or Flight Level)
•	altChange - altitude change indication (for example: "C" if climbing, "D" if descending, and empty if it is level)
•	arrivalTime - Actual time of arrival, or null if not arrived yet. UNIX epoch timestamp seconds since 1970
•	arrived - true if the flight has arrived at its destination.
•	cancelled - true if the flight has been cancelled. The meaning of cancellation is that the flight is no longer being tracked by FlightAware. There are a number of reasons a flight may be cancelled including cancellation by the airline, but that will not always be the case.
•	cdt - Controlled Departure Time, set if there is a ground hold on the flight. UNIX epoch timestamp seconds since 1970
•	clock - Time of last received position. UNIX epoch timestamp seconds since 1970
•	cta - Controlled Time of Arrival, set if there is a ground hold on the flight. UNIX epoch timestamp seconds since 1970
•	dest - ICAO airport code of destination (for example: KLAX)
•	edt - Estimated Departure Time. Epoch timestamp seconds since 1970
•	eta - Estimated Time of Arrival. Epoch timestamp seconds since 1970
•	fdt - Field Departure Time. UNIX epoch timestamp seconds since 1970
•	firstPositionTime - Time when first reported position was received, or 0 if no position has been received yet. Epoch timestamp seconds since 1970
•	fixes - intersections and/or VORs along the route (for example: SLS AMERO ARTOM VODIR NOTOS ULAPA ACA NUXCO OLULA PERAS ALIPO UPN GDL KEDMA BRISA CUL PERTI CEN PPE ALTAR ASUTA JLI RONLD LAADY WYVIL OLDEE RAL PDZ ARNES BASET WELLZ CIVET)
•	fp - unique identifier assigned by FlightAware for this flight, aka fa_flight_id.
•	gs - ground speed at last reported position, in kts.
•	heading - direction of travel at last reported position.
•	hiLat - highest latitude travelled by flight.
•	hiLon - highest longitude travelled by flight.
•	ident - flight identifier or registration of aircraft.
•	lastPositionTime - Time when last reported position was received, or 0 if no position has been received yet. Epoch timestamp seconds since 1970.
•	lat - latitude of last reported position.
•	lifeguard - true if a "lifeguard" rescue flight.
•	lon - longitude of last reported position.
•	lowLat - lowest latitude travelled by flight.
•	lowLon - lowest longitude travelled by flight.
•	ogta - Original Time of Arrival. UNIX epoch timestamp seconds since 1970
•	ogtd - Original Time of Departure. UNIX epoch timestamp seconds since 1970
•	orig - ICAO airport code of origin (for example: KIAH)
•	physClass - physical class (for example: J is jet)
•	prefix - A one or two character identifier prefix code (common values: G or GG Medevac, L Lifeguard, A Air Taxi, H Heavy, M Medium).
•	speed - ground speed, in kts.
•	status - Single letter code for current flight status, can be S Scheduled, F Filed, A Active, Z Completed, or X Cancelled.
•	updateType - data source of last position (P=projected, O=oceanic, Z=radar, A=ADS-B, M=multilateration, D=datalink, X=surface and near surface (ADS-B and ASDE-X), S=space-based, V=virtual event).
•	waypoints - all of the intersections and VORs comprising the route
API Key (x-apikey)
REQUEST
QUERY-STRING PARAMETERS
query
string	 

	Query to search for airborne or recently arrived flights. It should not exceed 1000 bytes in length. Search criteria is only applied to the most recent position for a flight. This function only searches flights within approximately the last 24 hours. The supported operators include (note that operators take different numbers of arguments):
•	false - results must have the specified boolean key set to a value of false. Example: {false arrived}
•	true - results must have the specified boolean key set to a value of true. Example: {true lifeguard}
•	null - results must have the specified key set to a null value. Example: {null waypoints}
•	notnull - results must have the specified key not set to a null value. Example: {notnull aircraftType}
•	= - results must have a key that exactly matches the specified value. Example: {= aircraftType C172}
•	!= - results must have a key that must not match the specified value. Example: {!= prefix H}
•	< - results must have a key that is lexicographically less-than a specified value. Example: {< arrivalTime 1276811040}
•	> - results must have a key that is lexicographically greater-than a specified value. Example: {> speed 500}
•	<= - results must have a key that is lexicographically less-than-or-equal-to a specified value. Example: {<= alt 8000}
•	>= - results must have a key that is lexicographically greater-than-or-equal-to a specified value.
•	match - results must have a key that matches against a case-insensitive wildcard pattern. Example: {match ident AAL*}
•	notmatch - results must have a key that does not match against a case-insensitive wildcard pattern. Example: {notmatch aircraftType B76*}
•	range - results must have a key that is numerically between the two specified values. Example: {range alt 8000 20000}
•	in - results must have a key that exactly matches one of the specified values. Example: {in orig {KLAX KBUR KSNA KLGB}}
•	orig_or_dest - results must have either the origin or destination key exactly match one of the specified values. Example: {orig_or_dest {KLAX KBUR KSNA KLGB}}
•	airline - results will only include airline flight if the argument is 1, or will only include GA flights if the argument is 0. Example: {airline 1}
•	aircraftType - results must have an aircraftType key that matches one of the specified case-insensitive wildcard patterns. Example: {aircraftType {B76* B77*}}
•	ident - results must have an ident key that matches one of the specified case-insensitive wildcard patterns. Example: {ident {N123* N456* AAL* UAL*}}
•	ident_or_reg - results must have an ident key or was known to be operated by an aircraft registration that matches one of the specified case-insensitive wildcard patterns. Example: {ident_or_reg {N123* N456* AAL* UAL*}}
The supported key names include (note that not all of these key names are returned in the result structure, and some have slightly different names):
•	actualDepartureTime - Actual time of departure, or null if not departed yet. UNIX epoch timestamp seconds since 1970
•	aircraftType - aircraft type ID (for example: B763)
•	alt - altitude at last reported position (hundreds of feet or Flight Level)
•	altChange - altitude change indication (for example: "C" if climbing, "D" if descending, and empty if it is level)
•	arrivalTime - Actual time of arrival, or null if not arrived yet. UNIX epoch timestamp seconds since 1970
•	arrived - true if the flight has arrived at its destination.
•	cancelled - true if the flight has been cancelled. The meaning of cancellation is that the flight is no longer being tracked by FlightAware. There are a number of reasons a flight may be cancelled including cancellation by the airline, but that will not always be the case.
•	cdt - Controlled Departure Time, set if there is a ground hold on the flight. UNIX epoch timestamp seconds since 1970
•	clock - Time of last received position. UNIX epoch timestamp seconds since 1970
•	cta - Controlled Time of Arrival, set if there is a ground hold on the flight. UNIX epoch timestamp seconds since 1970
•	dest - ICAO airport code of destination (for example: KLAX)
•	edt - Estimated Departure Time. Epoch timestamp seconds since 1970
•	eta - Estimated Time of Arrival. Epoch timestamp seconds since 1970
•	fdt - Field Departure Time. UNIX epoch timestamp seconds since 1970
•	firstPositionTime - Time when first reported position was received, or 0 if no position has been received yet. Epoch timestamp seconds since 1970
•	fixes - intersections and/or VORs along the route (for example: SLS AMERO ARTOM VODIR NOTOS ULAPA ACA NUXCO OLULA PERAS ALIPO UPN GDL KEDMA BRISA CUL PERTI CEN PPE ALTAR ASUTA JLI RONLD LAADY WYVIL OLDEE RAL PDZ ARNES BASET WELLZ CIVET)
•	fp - unique identifier assigned by FlightAware for this flight, aka fa_flight_id.
•	gs - ground speed at last reported position, in kts.
•	heading - direction of travel at last reported position.
•	hiLat - highest latitude travelled by flight.
•	hiLon - highest longitude travelled by flight.
•	ident - flight identifier or registration of aircraft.
•	lastPositionTime - Time when last reported position was received, or 0 if no position has been received yet. Epoch timestamp seconds since 1970.
•	lat - latitude of last reported position.
•	lifeguard - true if a "lifeguard" rescue flight.
•	lon - longitude of last reported position.
•	lowLat - lowest latitude travelled by flight.
•	lowLon - lowest longitude travelled by flight.
•	ogta - Original Time of Arrival. UNIX epoch timestamp seconds since 1970
•	ogtd - Original Time of Departure. UNIX epoch timestamp seconds since 1970
•	orig - ICAO airport code of origin (for example: KIAH)
•	physClass - physical class (for example: J is jet)
•	prefix - A one or two character identifier prefix code (common values: G or GG Medevac, L Lifeguard, A Air Taxi, H Heavy, M Medium).
•	speed - ground speed, in kts.
•	status - Single letter code for current flight status, can be S Scheduled, F Filed, A Active, Z Completed, or X Cancelled.
•	updateType - data source of last position (P=projected, O=oceanic, Z=radar, A=ADS-B, M=multilateration, D=datalink, X=surface and near surface (ADS-B and ASDE-X), S=space-based, V=virtual event).
•	waypoints - all of the intersections and VORs comprising the route
Example: {orig_or_dest {KLAX KBUR KSNA KLGB}} {<= alt 8000} {match ident AAL*}	
max_pages
integer	 
Default: 1
Min 1	
	Maximum number of pages to fetch. This is an upper limit and not a guarantee of how many pages will be returned.	
cursor
string	 

	Opaque value used to get the next batch of data from a paged collection.	
API Server
https://aeroapi.flightaware.com/aeroapi
Authentication
Required (None Applied)
RESPONSE
OK
EXAMPLESCHEMA
application/json; charset=UTF-8
Copy
{
"links": 
{
"next": ""
},
"num_pages": 1,
"flights": 
[
{
"ident": "string",
"ident_icao": "string",
"ident_iata": "string",
"fa_flight_id": "string",
"registration": "string",
"origin": 
{
"code": "string",
"code_icao": "string",
"code_iata": "string",
"code_lid": "string",
"timezone": "America/New_York",
"name": "LaGuardia",
"city": "New York",
"airport_info_url": ""
},
"destination": 
{
"code": "string",
"code_icao": "string",
"code_iata": "string",
"code_lid": "string",
"timezone": "America/New_York",
"name": "LaGuardia",
"city": "New York",
"airport_info_url": ""
},
"waypoints": 
[
0
],
"first_position_time": "2021-12-31T19:59:59Z",
"last_position": 
{
"fa_flight_id": "string",
"altitude": 0,
"altitude_change": "C",
"groundspeed": 0,
"heading": 0,
"latitude": 0,
"longitude": 0,
"timestamp": "2021-12-31T19:59:59Z",
"update_type": "P"
},
"bounding_box": 
[
0
],
"ident_prefix": "string",
"aircraft_type": "string",
"actual_off": "2021-12-31T19:59:59Z",
"actual_on": "2021-12-31T19:59:59Z",
"foresight_predictions_available": true,
"predicted_out": 
null
"predicted_off": 
null
"predicted_on": 
null
"predicted_in": 
null
"predicted_out_source": 
null
"predicted_off_source": 
null
"predicted_on_source": 
null
"predicted_in_source": 
null
}
]
}
Get count of flights matching search parameters
GET /flights/search/count
Full search query documentation is available at the /flights/search endpoint.
API Key (x-apikey)
REQUEST
QUERY-STRING PARAMETERS
query
string	 

	Query to search for flights with a simplified syntax (compared to /flights/search/advanced). It should not exceed 1000 bytes in length. Query syntax allows filtering by latitude/longitude box, aircraft ident with wildcards, type with wildcards, prefix, origin airport, destination airport, origin or destination airport, groundspeed, and altitude. It takes search terms in a single string comprising "-key value" pairs. Codeshares and alternate idents are NOT searched when using the -idents clause.
Keys include:
•	-prefix STRING
•	-type STRING
•	-idents STRING
•	-identOrReg STRING
•	-airline STRING
•	-destination STRING
•	-origin STRING
•	-originOrDestination STRING
•	-aboveAltitude INTEGER
•	-belowAltitude INTEGER
•	-aboveGroundspeed INTEGER
•	-belowGroundspeed INTEGER
•	-latlong "MINLAT MINLON MAXLAT MAXLON"
Example: -latlong "44.953469 -111.045360 40.962321 -104.046577"	
API Server
https://aeroapi.flightaware.com/aeroapi
Authentication
Required (None Applied)
RESPONSE
200
OK
EXAMPLESCHEMA
application/json; charset=UTF-8
Copy
{
"count": 0
}
Search for flight positions
GET /flights/search/positions
Returns flight positions based on geospatial search parameters. This allows you to locate flights that have ever flown within a specific a latitude/longitude box, groundspeed, and altitude. It takes search terms in a single string comprising of {operator key value} elements and returns an array of flight structures. Each search term must be enclosed in curly braces. Multiple search terms can be combined in an implicit boolean "and" by separating the terms with at least one space. This function only searches flight data representing approximately the last 24 hours.
The supported operators include (note that operators take different numbers of arguments):
•	false - results must have the specified boolean key set to a value of false. Example: {false preferred}
•	true - results must have the specified boolean key set to a value of true. Example: {true preferred}
•	null - results must have the specified key set to a null value. Example: {null waypoints}
•	notnull - results must have the specified key not set to a null value. Example: {notnull aircraftType}
•	= - results must have a key that exactly matches the specified value. Example: {= fp C172}
•	!= - results must have a key that must not match the specified value. Example: {!= prefix H}
•	< - results must have a key that is lexicographically less-than a specified value. Example: {< arrivalTime 1276811040}
•	> - results must have a key that is lexicographically greater-than a specified value. Example: {> speed 500}
•	<= - results must have a key that is lexicographically less-than-or-equal-to a specified value. Example: {<= alt 8000}
•	>= - results must have a key that is lexicographically greater-than-or-equal-to a specified value.
•	match - results must have a key that matches against a case-insensitive wildcard pattern. Example: {match ident AAL*}
•	notmatch - results must have a key that does not match against a case-insensitive wildcard pattern. Example: {notmatch aircraftType B76*}
•	range - results must have a key that is numerically between the two specified values. Example: {range alt 8000 20000}
•	in - results must have a key that exactly matches one of the specified values. Example: {in orig {KLAX KBUR KSNA KLGB}}
The supported key names include (note that not all of these key names are returned in the result structure, and some have slightly different names):
•	alt - Altitude, measured in hundreds of feet or Flight Level.
•	altChange - a one-character code indicating the change in altitude.
•	cid - a three-character cid code
•	clock - UNIX epoch timestamp seconds since 1970
•	fp - unique identifier assigned by FlightAware for this flight, aka fa_flight_id.
•	gs - ground speed, measured in kts.
•	lat - latitude of the reported position.
•	lon - longitude of the reported position
•	updateType - source of the last reported position (P=projected, O=oceanic, Z=radar, A=ADS-B, M=multilateration, D=datalink, X=surface and near surface (ADS-B and ASDE-X), S=space-based, V=virtual event)
API Key (x-apikey)
REQUEST
QUERY-STRING PARAMETERS
query
string	 

	Query to search for flight positions. It should not exceed 1000 bytes in length. Search criteria is applied against all positions of a flight. This function only searches flights within approximately the last 24 hours. The supported operators include (note that operators take different numbers of arguments):
•	false - results must have the specified boolean key set to a value of false. Example: {false preferred}
•	true - results must have the specified boolean key set to a value of true. Example: {true preferred}
•	null - results must have the specified key set to a null value. Example: {null waypoints}
•	notnull - results must have the specified key not set to a null value. Example: {notnull aircraftType}
•	= - results must have a key that exactly matches the specified value. Example: {= fp C172}
•	!= - results must have a key that must not match the specified value. Example: {!= prefix H}
•	< - results must have a key that is lexicographically less-than a specified value. Example: {< arrivalTime 1276811040}
•	> - results must have a key that is lexicographically greater-than a specified value. Example: {> speed 500}
•	<= - results must have a key that is lexicographically less-than-or-equal-to a specified value. Example: {<= alt 8000}
•	>= - results must have a key that is lexicographically greater-than-or-equal-to a specified value.
•	match - results must have a key that matches against a case-insensitive wildcard pattern. Example: {match ident AAL*}
•	notmatch - results must have a key that does not match against a case-insensitive wildcard pattern. Example: {notmatch aircraftType B76*}
•	range - results must have a key that is numerically between the two specified values. Example: {range alt 8000 20000}
•	in - results must have a key that exactly matches one of the specified values. Example: {in orig {KLAX KBUR KSNA KLGB}}
The supported key names include (note that not all of these key names are returned in the result structure, and some have slightly different names):
•	alt - Altitude, measured in hundreds of feet or Flight Level.
•	altChange - a one-character code indicating the change in altitude.
•	altMax - Altitude, measured in hundreds of feet or Flight Level.
•	cid - a three-character cid code
•	cidfac - a four-character cidfac code
•	clock - UNIX epoch timestamp seconds since 1970
•	fp - unique identifier assigned by FlightAware for this flight, aka fa_flight_id.
•	gs - ground speed, measured in kts.
•	lat - latitude of the reported position.
•	lon - longitude of the reported position
•	preferred - boolean indicator of position quality
•	recvd - UNIX epoch timestamp seconds since 1970
•	updateType - source of the last reported position (P=projected, O=oceanic, Z=radar, A=ADS-B, M=multilateration, D=datalink, X=surface and near surface (ADS-B and ASDE-X), S=space-based, V=virtual event)
Example: {< alt 500} {range gs 10 100}	
unique_flights
boolean	 
Default: false	
	Whether to return only a single position per unique fa_flight_id.	
max_pages
integer	 
Default: 1
Min 1	
	Maximum number of pages to fetch. This is an upper limit and not a guarantee of how many pages will be returned.	
cursor
string	 

	Opaque value used to get the next batch of data from a paged collection.	
API Server
https://aeroapi.flightaware.com/aeroapi
Authentication
Required (None Applied)
RESPONSE
OK
EXAMPLESCHEMA
application/json; charset=UTF-8
Copy
{
"links": 
{
"next": ""
},
"num_pages": 1,
"positions": 
[
{
"fa_flight_id": "string",
"altitude": 0,
"altitude_change": "C",
"groundspeed": 0,
"heading": 0,
"latitude": 0,
"longitude": 0,
"timestamp": "2021-12-31T19:59:59Z",
"update_type": "P"
}
]
}
FORESIGHT
Foresight endpoints provide access to FlightAware's Foresight predictive models and predictions for key events. Our advanced machine learning (ML) models identify key influencing factors for a flight to forecast future events in real-time, providing unprecedented insight to improve operational efficiencies and facilitate better decision-making in the air and on the ground. To learn more about the power of Foresight, visit https://www.flightaware.com/commercial/foresight/
These endpoints each mirror a non-Foresight equivalent endpoint of similar functionality, with the addition of all the ML 'predicted' values included in the Foresight response. The respective non-Foresight endpoint response includes a flag, 'foresight_predictions_available', which can optionally be used as a trigger to obtain and leverage Foresight predictions on an as-needed basis and manage cost. Foresight is only available to Premium tier customers. Contact integrationsales@flightaware.com for more information, pricing details, and to have your account enabled for Foresight.
Get flight's current position, including Foresight data
GET /foresight/flights/{id}/position
Returns the latest position for a flight
API Key (x-apikey)
REQUEST
PATH PARAMETERS
* id
string	 

	The fa_flight_id to fetch. If looking for data from more than 10 days ago, please use the corresponding historical endpoint.
Example: UAL1234-1234567890-airline-0123	
API Server
https://aeroapi.flightaware.com/aeroapi
Authentication
Required (None Applied)
RESPONSE
OK
EXAMPLESCHEMA
application/json; charset=UTF-8
Copy
{
"ident": "string",
"ident_icao": "string",
"ident_iata": "string",
"fa_flight_id": "string",
"registration": "string",
"origin": 
{
"code": "string",
"code_icao": "string",
"code_iata": "string",
"code_lid": "string",
"timezone": "America/New_York",
"name": "LaGuardia",
"city": "New York",
"airport_info_url": ""
},
"destination": 
{
"code": "string",
"code_icao": "string",
"code_iata": "string",
"code_lid": "string",
"timezone": "America/New_York",
"name": "LaGuardia",
"city": "New York",
"airport_info_url": ""
},
"waypoints": 
[
0
],
"first_position_time": "2021-12-31T19:59:59Z",
"last_position": 
{
"fa_flight_id": "string",
"altitude": 0,
"altitude_change": "C",
"groundspeed": 0,
"heading": 0,
"latitude": 0,
"longitude": 0,
"timestamp": "2021-12-31T19:59:59Z",
"update_type": "P"
},
"bounding_box": 
[
0
],
"ident_prefix": "string",
"aircraft_type": "string",
"actual_off": "2021-12-31T19:59:59Z",
"actual_on": "2021-12-31T19:59:59Z",
"foresight_predictions_available": true,
"predicted_out": "2021-12-31T19:59:59Z",
"predicted_off": "2021-12-31T19:59:59Z",
"predicted_on": "2021-12-31T19:59:59Z",
"predicted_in": "2021-12-31T19:59:59Z",
"predicted_out_source": "Foresight",
"predicted_off_source": "Historical Average",
"predicted_on_source": "Historical Average",
"predicted_in_source": "Foresight",
"predicted_taxi_out_duration": 1234,
"predicted_taxi_out_duration_source": "Foresight"
}
Get information for a flight, including Foresight data
GET /foresight/flights/{ident}
Returns the flight info status summary for a registration, ident, or fa_flight_id, including all available predicted fields. If a fa_flight_id is specified then a maximum of 1 flight is returned, unless the flight has been diverted in which case both the original flight and any diversions will be returned with a duplicate fa_flight_id.
API Key (x-apikey)
REQUEST
PATH PARAMETERS
* ident
string	 

	The ident, registration, or fa_flight_id to fetch. If using a flight ident, it is highly recommended to specify ICAO flight ident rather than IATA flight ident to avoid ambiguity and unexpected results. Setting the ident_type can also be used to help disambiguate.
Example: UAL4 ┃ N123HQ ┃ UAL1234-1234567890-airline-0123	
QUERY-STRING PARAMETERS
ident_type
enum	 
Allowed: designator ┃ registration ┃ fa_flight_id
	Type of ident provided in the ident parameter. By default, the passed ident is interpreted as a registration if possible. This parameter can force the ident to be interpreted as a designator instead.
start
string	 

	The starting date range for flight results, comparing against flights' scheduled_out field (or scheduled_off if scheduled_out is missing). The format is ISO8601 date or datetime, and the bound is inclusive. Specified start date must be no further than 10 days in the past and 2 days in the future. If not specified, will default to departures starting approximately 11 days in the past. If using date instead of datetime, the time will default to 00:00:00Z.
Example: 2021-12-31T19:59:59Z ┃ 2021-12-31	
end
string	 

	The ending date range for flight results, comparing against flights' scheduled_out field (or scheduled_off if scheduled_out is missing). The format is ISO8601 date or datetime, and the bound is exclusive. Specified end date must be no further than 10 days in the past and 2 days in the future. If not specified, will default to departures starting approximately 2 days in the future. If using date instead of datetime, the time will default to 00:00:00Z.
Example: 2021-12-31T19:59:59Z ┃ 2021-12-31	
max_pages
integer	 
Default: 1
Min 1	
	Maximum number of pages to fetch. This is an upper limit and not a guarantee of how many pages will be returned.	
cursor
string	 

	Opaque value used to get the next batch of data from a paged collection.	
API Server
https://aeroapi.flightaware.com/aeroapi
Authentication
Required (None Applied)
RESPONSE
OK
EXAMPLESCHEMA
application/json; charset=UTF-8
Copy
{
"links": 
{
"next": ""
},
"num_pages": 1,
"flights": 
[
{
"ident": "string",
"ident_icao": "string",
"ident_iata": "string",
"actual_runway_off": "string",
"actual_runway_on": "string",
"fa_flight_id": "string",
"operator": "string",
"operator_icao": "string",
"operator_iata": "string",
"flight_number": "string",
"registration": "string",
"atc_ident": "string",
"inbound_fa_flight_id": "string",
"codeshares": 
[
"string"
],
"codeshares_iata": 
[
"string"
],
"blocked": false,
"diverted": false,
"cancelled": false,
"position_only": false,
"origin": 
{
"code": "string",
"code_icao": "string",
"code_iata": "string",
"code_lid": "string",
"timezone": "America/New_York",
"name": "LaGuardia",
"city": "New York",
"airport_info_url": ""
},
"destination": 
{
"code": "string",
"code_icao": "string",
"code_iata": "string",
"code_lid": "string",
"timezone": "America/New_York",
"name": "LaGuardia",
"city": "New York",
"airport_info_url": ""
},
"departure_delay": 0,
"arrival_delay": 0,
"filed_ete": 0,
"progress_percent": 0,
"status": "string",
"aircraft_type": "string",
"route_distance": 0,
"filed_airspeed": 0,
"filed_altitude": 0,
"route": "string",
"baggage_claim": "string",
"seats_cabin_business": 0,
"seats_cabin_coach": 0,
"seats_cabin_first": 0,
"gate_origin": "string",
"gate_destination": "string",
"terminal_origin": "string",
"terminal_destination": "string",
"type": "General_Aviation",
"scheduled_out": "2021-12-31T19:59:59Z",
"estimated_out": "2021-12-31T19:59:59Z",
"actual_out": "2021-12-31T19:59:59Z",
"scheduled_off": "2021-12-31T19:59:59Z",
"estimated_off": "2021-12-31T19:59:59Z",
"actual_off": "2021-12-31T19:59:59Z",
"scheduled_on": "2021-12-31T19:59:59Z",
"estimated_on": "2021-12-31T19:59:59Z",
"actual_on": "2021-12-31T19:59:59Z",
"scheduled_in": "2021-12-31T19:59:59Z",
"estimated_in": "2021-12-31T19:59:59Z",
"actual_in": "2021-12-31T19:59:59Z",
"foresight_predictions_available": true,
"predicted_out": "2021-12-31T19:59:59Z",
"predicted_off": "2021-12-31T19:59:59Z",
"predicted_on": "2021-12-31T19:59:59Z",
"predicted_in": "2021-12-31T19:59:59Z",
"predicted_out_source": "Foresight",
"predicted_off_source": "Historical Average",
"predicted_on_source": "Historical Average",
"predicted_in_source": "Foresight",
"predicted_taxi_out_duration": 1234,
"predicted_taxi_out_duration_source": "Foresight"
}
]
}
Search for flights, responses include Foresight data
GET /foresight/flights/search/advanced
Returns currently or recently airborne flights based on geospatial search parameters. If available, flights' predicted OOOI fields will be set.
API Key (x-apikey)
REQUEST
QUERY-STRING PARAMETERS
query
string	 

	Query to search for airborne or recently arrived flights. It should not exceed 1000 bytes in length. Search criteria is only applied to the most recent position for a flight. This function only searches flights within approximately the last 24 hours. The supported operators include (note that operators take different numbers of arguments):
•	false - results must have the specified boolean key set to a value of false. Example: {false arrived}
•	true - results must have the specified boolean key set to a value of true. Example: {true lifeguard}
•	null - results must have the specified key set to a null value. Example: {null waypoints}
•	notnull - results must have the specified key not set to a null value. Example: {notnull aircraftType}
•	= - results must have a key that exactly matches the specified value. Example: {= aircraftType C172}
•	!= - results must have a key that must not match the specified value. Example: {!= prefix H}
•	< - results must have a key that is lexicographically less-than a specified value. Example: {< arrivalTime 1276811040}
•	> - results must have a key that is lexicographically greater-than a specified value. Example: {> speed 500}
•	<= - results must have a key that is lexicographically less-than-or-equal-to a specified value. Example: {<= alt 8000}
•	>= - results must have a key that is lexicographically greater-than-or-equal-to a specified value.
•	match - results must have a key that matches against a case-insensitive wildcard pattern. Example: {match ident AAL*}
•	notmatch - results must have a key that does not match against a case-insensitive wildcard pattern. Example: {notmatch aircraftType B76*}
•	range - results must have a key that is numerically between the two specified values. Example: {range alt 8000 20000}
•	in - results must have a key that exactly matches one of the specified values. Example: {in orig {KLAX KBUR KSNA KLGB}}
•	orig_or_dest - results must have either the origin or destination key exactly match one of the specified values. Example: {orig_or_dest {KLAX KBUR KSNA KLGB}}
•	airline - results will only include airline flight if the argument is 1, or will only include GA flights if the argument is 0. Example: {airline 1}
•	aircraftType - results must have an aircraftType key that matches one of the specified case-insensitive wildcard patterns. Example: {aircraftType {B76* B77*}}
•	ident - results must have an ident key that matches one of the specified case-insensitive wildcard patterns. Example: {ident {N123* N456* AAL* UAL*}}
•	ident_or_reg - results must have an ident key or was known to be operated by an aircraft registration that matches one of the specified case-insensitive wildcard patterns. Example: {ident_or_reg {N123* N456* AAL* UAL*}}
The supported key names include (note that not all of these key names are returned in the result structure, and some have slightly different names):
•	actualDepartureTime - Actual time of departure, or null if not departed yet. UNIX epoch timestamp seconds since 1970
•	aircraftType - aircraft type ID (for example: B763)
•	alt - altitude at last reported position (hundreds of feet or Flight Level)
•	altChange - altitude change indication (for example: "C" if climbing, "D" if descending, and empty if it is level)
•	arrivalTime - Actual time of arrival, or null if not arrived yet. UNIX epoch timestamp seconds since 1970
•	arrived - true if the flight has arrived at its destination.
•	cancelled - true if the flight has been cancelled. The meaning of cancellation is that the flight is no longer being tracked by FlightAware. There are a number of reasons a flight may be cancelled including cancellation by the airline, but that will not always be the case.
•	cdt - Controlled Departure Time, set if there is a ground hold on the flight. UNIX epoch timestamp seconds since 1970
•	clock - Time of last received position. UNIX epoch timestamp seconds since 1970
•	cta - Controlled Time of Arrival, set if there is a ground hold on the flight. UNIX epoch timestamp seconds since 1970
•	dest - ICAO airport code of destination (for example: KLAX)
•	edt - Estimated Departure Time. Epoch timestamp seconds since 1970
•	eta - Estimated Time of Arrival. Epoch timestamp seconds since 1970
•	fdt - Field Departure Time. UNIX epoch timestamp seconds since 1970
•	firstPositionTime - Time when first reported position was received, or 0 if no position has been received yet. Epoch timestamp seconds since 1970
•	fixes - intersections and/or VORs along the route (for example: SLS AMERO ARTOM VODIR NOTOS ULAPA ACA NUXCO OLULA PERAS ALIPO UPN GDL KEDMA BRISA CUL PERTI CEN PPE ALTAR ASUTA JLI RONLD LAADY WYVIL OLDEE RAL PDZ ARNES BASET WELLZ CIVET)
•	fp - unique identifier assigned by FlightAware for this flight, aka fa_flight_id.
•	gs - ground speed at last reported position, in kts.
•	heading - direction of travel at last reported position.
•	hiLat - highest latitude travelled by flight.
•	hiLon - highest longitude travelled by flight.
•	ident - flight identifier or registration of aircraft.
•	lastPositionTime - Time when last reported position was received, or 0 if no position has been received yet. Epoch timestamp seconds since 1970.
•	lat - latitude of last reported position.
•	lifeguard - true if a "lifeguard" rescue flight.
•	lon - longitude of last reported position.
•	lowLat - lowest latitude travelled by flight.
•	lowLon - lowest longitude travelled by flight.
•	ogta - Original Time of Arrival. UNIX epoch timestamp seconds since 1970
•	ogtd - Original Time of Departure. UNIX epoch timestamp seconds since 1970
•	orig - ICAO airport code of origin (for example: KIAH)
•	physClass - physical class (for example: J is jet)
•	prefix - A one or two character identifier prefix code (common values: G or GG Medevac, L Lifeguard, A Air Taxi, H Heavy, M Medium).
•	speed - ground speed, in kts.
•	status - Single letter code for current flight status, can be S Scheduled, F Filed, A Active, Z Completed, or X Cancelled.
•	updateType - data source of last position (P=projected, O=oceanic, Z=radar, A=ADS-B, M=multilateration, D=datalink, X=surface and near surface (ADS-B and ASDE-X), S=space-based, V=virtual event).
•	waypoints - all of the intersections and VORs comprising the route
Example: {orig_or_dest {KLAX KBUR KSNA KLGB}} {<= alt 8000} {match ident AAL*}	
max_pages
integer	 
Default: 1
Min 1	
	Maximum number of pages to fetch. This is an upper limit and not a guarantee of how many pages will be returned.	
cursor
string	 

	Opaque value used to get the next batch of data from a paged collection.	
API Server
https://aeroapi.flightaware.com/aeroapi
Authentication
Required (None Applied)
RESPONSE
OK
EXAMPLESCHEMA
application/json; charset=UTF-8
Copy
{
"links": 
{
"next": ""
},
"num_pages": 1,
"flights": 
[
{
"ident": "string",
"ident_icao": "string",
"ident_iata": "string",
"fa_flight_id": "string",
"registration": "string",
"origin": 
{
"code": "string",
"code_icao": "string",
"code_iata": "string",
"code_lid": "string",
"timezone": "America/New_York",
"name": "LaGuardia",
"city": "New York",
"airport_info_url": ""
},
"destination": 
{
"code": "string",
"code_icao": "string",
"code_iata": "string",
"code_lid": "string",
"timezone": "America/New_York",
"name": "LaGuardia",
"city": "New York",
"airport_info_url": ""
},
"waypoints": 
[
0
],
"first_position_time": "2021-12-31T19:59:59Z",
"last_position": 
{
"fa_flight_id": "string",
"altitude": 0,
"altitude_change": "C",
"groundspeed": 0,
"heading": 0,
"latitude": 0,
"longitude": 0,
"timestamp": "2021-12-31T19:59:59Z",
"update_type": "P"
},
"bounding_box": 
[
0
],
"ident_prefix": "string",
"aircraft_type": "string",
"actual_off": "2021-12-31T19:59:59Z",
"actual_on": "2021-12-31T19:59:59Z",
"foresight_predictions_available": true,
"predicted_out": "2021-12-31T19:59:59Z",
"predicted_off": "2021-12-31T19:59:59Z",
"predicted_on": "2021-12-31T19:59:59Z",
"predicted_in": "2021-12-31T19:59:59Z",
"predicted_out_source": "Foresight",
"predicted_off_source": "Historical Average",
"predicted_on_source": "Historical Average",
"predicted_in_source": "Foresight",
"predicted_taxi_out_duration": 1234,
"predicted_taxi_out_duration_source": "Foresight"
}
]
}
AIRPORTS
Get all airports
GET /airports
Returns the ICAO identifiers of all known airports. For airports that do not have an ICAO identifier, the FAA LID identifier will be used. Links for further information about each airport are included.
API Key (x-apikey)
REQUEST
QUERY-STRING PARAMETERS
max_pages
integer	 
Default: 1
Min 1
	Maximum number of pages to fetch. This is an upper limit and not a guarantee of how many pages will be returned.
cursor
string	 

	Opaque value used to get the next batch of data from a paged collection.	
API Server
https://aeroapi.flightaware.com/aeroapi
Authentication
Required (None Applied)
RESPONSE
200
Returns a list of airports
EXAMPLESCHEMA
application/json; charset=UTF-8
Copy
{
"links": 
{
"next": ""
},
"num_pages": 1,
"airports": 
[
{
"code": "string",
"airport_info_url": ""
}
]
}
Get static information about an airport
GET /airports/{id}
Returns information about an airport given an ICAO or LID airport code such as KLAX, KIAH, O07, etc. Data returned includes airport name, city, state (when known), latitude, longitude, and timezone.
API Key (x-apikey)
REQUEST
PATH PARAMETERS
* id
string	 

	ICAO, IATA or LID ID of destination airport to fetch. ICAO is highly preferred to prevent ambiguity and reduce risk of missing data results.
Example: KIAH ┃ IAH	
API Server
https://aeroapi.flightaware.com/aeroapi
Authentication
Required (None Applied)
RESPONSE
Information about the requested airport.
EXAMPLESCHEMA
application/json; charset=UTF-8
Copy
{
"airport_code": "KHOU",
"code_icao": "KHOU",
"code_iata": "HOU",
"code_lid": "HOU",
"name": "William P Hobby",
"type": "Airport",
"elevation": 0,
"city": "string",
"state": "string",
"longitude": 0,
"latitude": 0,
"timezone": "America/Chicago",
"country_code": "string",
"wiki_url": "http://example.com",
"airport_flights_url": "",
"alternatives": 
[
{
"airport_code": "KHOU",
"code_icao": "KHOU",
"code_iata": "HOU",
"code_lid": "HOU",
"name": "William P Hobby",
"type": "Airport",
"elevation": 0,
"city": "string",
"state": "string",
"longitude": 0,
"latitude": 0,
"timezone": "America/Chicago",
"country_code": "string",
"wiki_url": "http://example.com",
"airport_flights_url": ""
}
]
}
Get the canonical code of an airport
GET /airports/{id}/canonical
Returns a list of ICAO airport codes corresponding to the given IATA or LID airport code. IATA codes can be identical to some LID codes, so if id_type is specified, only 1 ICAO code will be returned. If no id_type is specified and there are two possible ICAO codes, both will be returned.
API Key (x-apikey)
REQUEST
PATH PARAMETERS
* id
string	 

	ICAO, IATA or LID ID of destination airport to fetch. ICAO is highly preferred to prevent ambiguity and reduce risk of missing data results.
Example: KIAH ┃ IAH	
QUERY-STRING PARAMETERS
id_type
enum	 
Allowed: iata ┃ lid ┃ icao
	Type of airport code provided in the id parameter
API Server
https://aeroapi.flightaware.com/aeroapi
Authentication
Required (None Applied)
RESPONSE
OK
EXAMPLESCHEMA
application/json; charset=UTF-8
Copy
{
"airports": 
[
{
"id": "string",
"id_type": "icao"
}
]
}
Get airport delay information
GET /airports/{id}/delays
Returns a list of reason codes for delays at a specific airport. There may be multiple reasons returned if there are multiple types of delays reported at an airport. Note that individual flights may be delayed without there being an airport delay returned by this endpoint.
API Key (x-apikey)
REQUEST
PATH PARAMETERS
* id
string	 

	ICAO, IATA or LID ID of destination airport to fetch. ICAO is highly preferred to prevent ambiguity and reduce risk of missing data results.
Example: KIAH ┃ IAH	
API Server
https://aeroapi.flightaware.com/aeroapi
Authentication
Required (None Applied)
RESPONSE
OK
EXAMPLESCHEMA
application/json; charset=UTF-8
Copy
{
"airport": "string",
"category": "string",
"color": "red",
"delay_secs": 0,
"reasons": 
[
{
"category": "string",
"color": "red",
"delay_secs": 0,
"reason": "string"
}
]
}
Get all flights for a given airport
GET /airports/{id}/flights
Returns all recent and upcoming flights departing from or arriving at the specified airport. Filtering/ordering behavior for the optional start and end parameters for each type (scheduled_departures, scheduled_arrivals, departures, arrivals) match the behavior in their corresponding endpoints.
API Key (x-apikey)
REQUEST
PATH PARAMETERS
* id
string	 

	ICAO, IATA or LID ID of destination airport to fetch. ICAO is highly preferred to prevent ambiguity and reduce risk of missing data results.
Example: KIAH ┃ IAH	
QUERY-STRING PARAMETERS
airline
string	 

	Airline to filter flights by. Do not provide airline if type is provided.
Example: UAL	
type
enum	 
Allowed: General_Aviation ┃ Airline	
	Type of flights to return. Do not provide type if airline is provided.	
start
string	 

	The starting date range for flight results. The format is ISO8601 date or datetime, and the bound is inclusive. Specified start date must be no further than 10 days in the past and 2 days in the future. If using date instead of datetime, the time will default to 00:00:00Z.
Example: 2021-12-31T19:59:59Z ┃ 2021-12-31	
end
string	 

	The ending date range for flight results. The format is ISO8601 date or datetime, and the bound is exclusive. Specified end date must be no further than 10 days in the past and 2 days in the future. If using date instead of datetime, the time will default to 00:00:00Z.
Example: 2021-12-31T19:59:59Z ┃ 2021-12-31	
max_pages
integer	 
Default: 1
Min 1	
	Maximum number of pages to fetch. This is an upper limit and not a guarantee of how many pages will be returned.	
cursor
string	 

	Opaque value used to get the next batch of data from a paged collection.	
API Server
https://aeroapi.flightaware.com/aeroapi
Authentication
Required (None Applied)
RESPONSE
OK
EXAMPLESCHEMA
application/json; charset=UTF-8
Copy
{
"links": 
{
"next": ""
},
"num_pages": 1,
"scheduled_arrivals": 
[
{
"ident": "string",
"ident_icao": "string",
"ident_iata": "string",
"actual_runway_off": "string",
"actual_runway_on": "string",
"fa_flight_id": "string",
"operator": "string",
"operator_icao": "string",
"operator_iata": "string",
"flight_number": "string",
"registration": "string",
"atc_ident": "string",
"inbound_fa_flight_id": "string",
"codeshares": 
[
"string"
],
"codeshares_iata": 
[
"string"
],
"blocked": false,
"diverted": false,
"cancelled": false,
"position_only": false,
"origin": 
{
"code": "string",
"code_icao": "string",
"code_iata": "string",
"code_lid": "string",
"timezone": "America/New_York",
"name": "LaGuardia",
"city": "New York",
"airport_info_url": ""
},
"destination": 
{
"code": "string",
"code_icao": "string",
"code_iata": "string",
"code_lid": "string",
"timezone": "America/New_York",
"name": "LaGuardia",
"city": "New York",
"airport_info_url": ""
},
"departure_delay": 0,
"arrival_delay": 0,
"filed_ete": 0,
"progress_percent": 0,
"status": "string",
"aircraft_type": "string",
"route_distance": 0,
"filed_airspeed": 0,
"filed_altitude": 0,
"route": "string",
"baggage_claim": "string",
"seats_cabin_business": 0,
"seats_cabin_coach": 0,
"seats_cabin_first": 0,
"gate_origin": "string",
"gate_destination": "string",
"terminal_origin": "string",
"terminal_destination": "string",
"type": "General_Aviation",
"scheduled_out": "2021-12-31T19:59:59Z",
"estimated_out": "2021-12-31T19:59:59Z",
"actual_out": "2021-12-31T19:59:59Z",
"scheduled_off": "2021-12-31T19:59:59Z",
"estimated_off": "2021-12-31T19:59:59Z",
"actual_off": "2021-12-31T19:59:59Z",
"scheduled_on": "2021-12-31T19:59:59Z",
"estimated_on": "2021-12-31T19:59:59Z",
"actual_on": "2021-12-31T19:59:59Z",
"scheduled_in": "2021-12-31T19:59:59Z",
"estimated_in": "2021-12-31T19:59:59Z",
"actual_in": "2021-12-31T19:59:59Z"
}
],
"scheduled_departures": 
[
{
"ident": "string",
"ident_icao": "string",
"ident_iata": "string",
"actual_runway_off": "string",
"actual_runway_on": "string",
"fa_flight_id": "string",
"operator": "string",
"operator_icao": "string",
"operator_iata": "string",
"flight_number": "string",
"registration": "string",
"atc_ident": "string",
"inbound_fa_flight_id": "string",
"codeshares": 
[
"string"
],
"codeshares_iata": 
[
"string"
],
"blocked": false,
"diverted": false,
"cancelled": false,
"position_only": false,
"origin": 
{
"code": "string",
"code_icao": "string",
"code_iata": "string",
"code_lid": "string",
"timezone": "America/New_York",
"name": "LaGuardia",
"city": "New York",
"airport_info_url": ""
},
"destination": 
{
"code": "string",
"code_icao": "string",
"code_iata": "string",
"code_lid": "string",
"timezone": "America/New_York",
"name": "LaGuardia",
"city": "New York",
"airport_info_url": ""
},
"departure_delay": 0,
"arrival_delay": 0,
"filed_ete": 0,
"progress_percent": 0,
"status": "string",
"aircraft_type": "string",
"route_distance": 0,
"filed_airspeed": 0,
"filed_altitude": 0,
"route": "string",
"baggage_claim": "string",
"seats_cabin_business": 0,
"seats_cabin_coach": 0,
"seats_cabin_first": 0,
"gate_origin": "string",
"gate_destination": "string",
"terminal_origin": "string",
"terminal_destination": "string",
"type": "General_Aviation",
"scheduled_out": "2021-12-31T19:59:59Z",
"estimated_out": "2021-12-31T19:59:59Z",
"actual_out": "2021-12-31T19:59:59Z",
"scheduled_off": "2021-12-31T19:59:59Z",
"estimated_off": "2021-12-31T19:59:59Z",
"actual_off": "2021-12-31T19:59:59Z",
"scheduled_on": "2021-12-31T19:59:59Z",
"estimated_on": "2021-12-31T19:59:59Z",
"actual_on": "2021-12-31T19:59:59Z",
"scheduled_in": "2021-12-31T19:59:59Z",
"estimated_in": "2021-12-31T19:59:59Z",
"actual_in": "2021-12-31T19:59:59Z"
}
],
"arrivals": 
[
{
"ident": "string",
"ident_icao": "string",
"ident_iata": "string",
"actual_runway_off": "string",
"actual_runway_on": "string",
"fa_flight_id": "string",
"operator": "string",
"operator_icao": "string",
"operator_iata": "string",
"flight_number": "string",
"registration": "string",
"atc_ident": "string",
"inbound_fa_flight_id": "string",
"codeshares": 
[
"string"
],
"codeshares_iata": 
[
"string"
],
"blocked": false,
"diverted": false,
"cancelled": false,
"position_only": false,
"origin": 
{
"code": "string",
"code_icao": "string",
"code_iata": "string",
"code_lid": "string",
"timezone": "America/New_York",
"name": "LaGuardia",
"city": "New York",
"airport_info_url": ""
},
"destination": 
{
"code": "string",
"code_icao": "string",
"code_iata": "string",
"code_lid": "string",
"timezone": "America/New_York",
"name": "LaGuardia",
"city": "New York",
"airport_info_url": ""
},
"departure_delay": 0,
"arrival_delay": 0,
"filed_ete": 0,
"progress_percent": 0,
"status": "string",
"aircraft_type": "string",
"route_distance": 0,
"filed_airspeed": 0,
"filed_altitude": 0,
"route": "string",
"baggage_claim": "string",
"seats_cabin_business": 0,
"seats_cabin_coach": 0,
"seats_cabin_first": 0,
"gate_origin": "string",
"gate_destination": "string",
"terminal_origin": "string",
"terminal_destination": "string",
"type": "General_Aviation",
"scheduled_out": "2021-12-31T19:59:59Z",
"estimated_out": "2021-12-31T19:59:59Z",
"actual_out": "2021-12-31T19:59:59Z",
"scheduled_off": "2021-12-31T19:59:59Z",
"estimated_off": "2021-12-31T19:59:59Z",
"actual_off": "2021-12-31T19:59:59Z",
"scheduled_on": "2021-12-31T19:59:59Z",
"estimated_on": "2021-12-31T19:59:59Z",
"actual_on": "2021-12-31T19:59:59Z",
"scheduled_in": "2021-12-31T19:59:59Z",
"estimated_in": "2021-12-31T19:59:59Z",
"actual_in": "2021-12-31T19:59:59Z"
}
],
"departures": 
[
{
"ident": "string",
"ident_icao": "string",
"ident_iata": "string",
"actual_runway_off": "string",
"actual_runway_on": "string",
"fa_flight_id": "string",
"operator": "string",
"operator_icao": "string",
"operator_iata": "string",
"flight_number": "string",
"registration": "string",
"atc_ident": "string",
"inbound_fa_flight_id": "string",
"codeshares": 
[
"string"
],
"codeshares_iata": 
[
"string"
],
"blocked": false,
"diverted": false,
"cancelled": false,
"position_only": false,
"origin": 
{
"code": "string",
"code_icao": "string",
"code_iata": "string",
"code_lid": "string",
"timezone": "America/New_York",
"name": "LaGuardia",
"city": "New York",
"airport_info_url": ""
},
"destination": 
{
"code": "string",
"code_icao": "string",
"code_iata": "string",
"code_lid": "string",
"timezone": "America/New_York",
"name": "LaGuardia",
"city": "New York",
"airport_info_url": ""
},
"departure_delay": 0,
"arrival_delay": 0,
"filed_ete": 0,
"progress_percent": 0,
"status": "string",
"aircraft_type": "string",
"route_distance": 0,
"filed_airspeed": 0,
"filed_altitude": 0,
"route": "string",
"baggage_claim": "string",
"seats_cabin_business": 0,
"seats_cabin_coach": 0,
"seats_cabin_first": 0,
"gate_origin": "string",
"gate_destination": "string",
"terminal_origin": "string",
"terminal_destination": "string",
"type": "General_Aviation",
"scheduled_out": "2021-12-31T19:59:59Z",
"estimated_out": "2021-12-31T19:59:59Z",
"actual_out": "2021-12-31T19:59:59Z",
"scheduled_off": "2021-12-31T19:59:59Z",
"estimated_off": "2021-12-31T19:59:59Z",
"actual_off": "2021-12-31T19:59:59Z",
"scheduled_on": "2021-12-31T19:59:59Z",
"estimated_on": "2021-12-31T19:59:59Z",
"actual_on": "2021-12-31T19:59:59Z",
"scheduled_in": "2021-12-31T19:59:59Z",
"estimated_in": "2021-12-31T19:59:59Z",
"actual_in": "2021-12-31T19:59:59Z"
}
]
}
Get flights that have recently arrived at an airport
GET /airports/{id}/flights/arrivals
Returns flights that have arrived at an airport, orderd by actual_on descending. The start parameter's default value is 24 hours before the current time. The end parameter's default value is the current time.
API Key (x-apikey)
REQUEST
PATH PARAMETERS
* id
string	 

	ICAO, IATA or LID ID of destination airport to fetch. ICAO is highly preferred to prevent ambiguity and reduce risk of missing data results.
Example: KIAH ┃ IAH	
QUERY-STRING PARAMETERS
airline
string	 

	Airline to filter flights by. Do not provide airline if type is provided.
Example: UAL	
type
enum	 
Allowed: General_Aviation ┃ Airline	
	Type of flights to return. Do not provide type if airline is provided.	
start
string	 

	The starting date range for flight results. The format is ISO8601 date or datetime, and the bound is inclusive. Specified start date must be no further than 10 days in the past and 2 days in the future. If using date instead of datetime, the time will default to 00:00:00Z.
Example: 2021-12-31T19:59:59Z ┃ 2021-12-31	
end
string	 

	The ending date range for flight results. The format is ISO8601 date or datetime, and the bound is exclusive. Specified end date must be no further than 10 days in the past and 2 days in the future. If using date instead of datetime, the time will default to 00:00:00Z.
Example: 2021-12-31T19:59:59Z ┃ 2021-12-31	
max_pages
integer	 
Default: 1
Min 1	
	Maximum number of pages to fetch. This is an upper limit and not a guarantee of how many pages will be returned.	
cursor
string	 

	Opaque value used to get the next batch of data from a paged collection.	
API Server
https://aeroapi.flightaware.com/aeroapi
Authentication
Required (None Applied)
RESPONSE
OK
EXAMPLESCHEMA
application/json; charset=UTF-8
Copy
{
"links": 
{
"next": ""
},
"num_pages": 1,
"arrivals": 
[
{
"ident": "string",
"ident_icao": "string",
"ident_iata": "string",
"actual_runway_off": "string",
"actual_runway_on": "string",
"fa_flight_id": "string",
"operator": "string",
"operator_icao": "string",
"operator_iata": "string",
"flight_number": "string",
"registration": "string",
"atc_ident": "string",
"inbound_fa_flight_id": "string",
"codeshares": 
[
"string"
],
"codeshares_iata": 
[
"string"
],
"blocked": false,
"diverted": false,
"cancelled": false,
"position_only": false,
"origin": 
{
"code": "string",
"code_icao": "string",
"code_iata": "string",
"code_lid": "string",
"timezone": "America/New_York",
"name": "LaGuardia",
"city": "New York",
"airport_info_url": ""
},
"destination": 
{
"code": "string",
"code_icao": "string",
"code_iata": "string",
"code_lid": "string",
"timezone": "America/New_York",
"name": "LaGuardia",
"city": "New York",
"airport_info_url": ""
},
"departure_delay": 0,
"arrival_delay": 0,
"filed_ete": 0,
"progress_percent": 0,
"status": "string",
"aircraft_type": "string",
"route_distance": 0,
"filed_airspeed": 0,
"filed_altitude": 0,
"route": "string",
"baggage_claim": "string",
"seats_cabin_business": 0,
"seats_cabin_coach": 0,
"seats_cabin_first": 0,
"gate_origin": "string",
"gate_destination": "string",
"terminal_origin": "string",
"terminal_destination": "string",
"type": "General_Aviation",
"scheduled_out": "2021-12-31T19:59:59Z",
"estimated_out": "2021-12-31T19:59:59Z",
"actual_out": "2021-12-31T19:59:59Z",
"scheduled_off": "2021-12-31T19:59:59Z",
"estimated_off": "2021-12-31T19:59:59Z",
"actual_off": "2021-12-31T19:59:59Z",
"scheduled_on": "2021-12-31T19:59:59Z",
"estimated_on": "2021-12-31T19:59:59Z",
"actual_on": "2021-12-31T19:59:59Z",
"scheduled_in": "2021-12-31T19:59:59Z",
"estimated_in": "2021-12-31T19:59:59Z",
"actual_in": "2021-12-31T19:59:59Z"
}
]
}
Get flight counts for an airport
GET /airports/{id}/flights/counts
Returns counts of flights for an airport broken down by flight status. The returned categories are subtly different from what is returned from the /airports/{id}/flights endpoints. Specifically, this operation does not include completed flights in its counts, and it does not count cancelled/diverted flights. It also does not strictly bound the time for which scheduled flights are counted, so all future flights that FlightAware knows about are included in the counts. See the response schema and documentation for the airport flights endpoints for more information.
API Key (x-apikey)
REQUEST
PATH PARAMETERS
* id
string	 

	ICAO, IATA or LID ID of destination airport to fetch. ICAO is highly preferred to prevent ambiguity and reduce risk of missing data results.
Example: KIAH ┃ IAH	
API Server
https://aeroapi.flightaware.com/aeroapi
Authentication
Required (None Applied)
RESPONSE
OK
EXAMPLESCHEMA
application/json; charset=UTF-8
None of the counts include cancellations.
Copy
{
"departed": 0,
"enroute": 0,
"scheduled_arrivals": 0,
"scheduled_departures": 0
}
Get flights that have recently departed from an airport
GET /airports/{id}/flights/departures
Returns flights that have departed from an airport and not been diverted, ordered by actual_off descending. The optional start and end parameters will be compared against actual_off to limit the flights returned. The start parameter's default value is 24 hours before the current time. The end parameter's default value is the current time.
API Key (x-apikey)
REQUEST
PATH PARAMETERS
* id
string	 

	ICAO, IATA or LID ID of destination airport to fetch. ICAO is highly preferred to prevent ambiguity and reduce risk of missing data results.
Example: KIAH ┃ IAH	
QUERY-STRING PARAMETERS
airline
string	 

	Airline to filter flights by. Do not provide airline if type is provided.
Example: UAL	
type
enum	 
Allowed: General_Aviation ┃ Airline	
	Type of flights to return. Do not provide type if airline is provided.	
start
string	 

	The starting date range for flight results. The format is ISO8601 date or datetime, and the bound is inclusive. Specified start date must be no further than 10 days in the past and 2 days in the future. If using date instead of datetime, the time will default to 00:00:00Z.
Example: 2021-12-31T19:59:59Z ┃ 2021-12-31	
end
string	 

	The ending date range for flight results. The format is ISO8601 date or datetime, and the bound is exclusive. Specified end date must be no further than 10 days in the past and 2 days in the future. If using date instead of datetime, the time will default to 00:00:00Z.
Example: 2021-12-31T19:59:59Z ┃ 2021-12-31	
max_pages
integer	 
Default: 1
Min 1	
	Maximum number of pages to fetch. This is an upper limit and not a guarantee of how many pages will be returned.	
cursor
string	 

	Opaque value used to get the next batch of data from a paged collection.	
API Server
https://aeroapi.flightaware.com/aeroapi
Authentication
Required (None Applied)
RESPONSE
OK
EXAMPLESCHEMA
application/json; charset=UTF-8
Copy
{
"links": 
{
"next": ""
},
"num_pages": 1,
"departures": 
[
{
"ident": "string",
"ident_icao": "string",
"ident_iata": "string",
"actual_runway_off": "string",
"actual_runway_on": "string",
"fa_flight_id": "string",
"operator": "string",
"operator_icao": "string",
"operator_iata": "string",
"flight_number": "string",
"registration": "string",
"atc_ident": "string",
"inbound_fa_flight_id": "string",
"codeshares": 
[
"string"
],
"codeshares_iata": 
[
"string"
],
"blocked": false,
"diverted": false,
"cancelled": false,
"position_only": false,
"origin": 
{
"code": "string",
"code_icao": "string",
"code_iata": "string",
"code_lid": "string",
"timezone": "America/New_York",
"name": "LaGuardia",
"city": "New York",
"airport_info_url": ""
},
"destination": 
{
"code": "string",
"code_icao": "string",
"code_iata": "string",
"code_lid": "string",
"timezone": "America/New_York",
"name": "LaGuardia",
"city": "New York",
"airport_info_url": ""
},
"departure_delay": 0,
"arrival_delay": 0,
"filed_ete": 0,
"progress_percent": 0,
"status": "string",
"aircraft_type": "string",
"route_distance": 0,
"filed_airspeed": 0,
"filed_altitude": 0,
"route": "string",
"baggage_claim": "string",
"seats_cabin_business": 0,
"seats_cabin_coach": 0,
"seats_cabin_first": 0,
"gate_origin": "string",
"gate_destination": "string",
"terminal_origin": "string",
"terminal_destination": "string",
"type": "General_Aviation",
"scheduled_out": "2021-12-31T19:59:59Z",
"estimated_out": "2021-12-31T19:59:59Z",
"actual_out": "2021-12-31T19:59:59Z",
"scheduled_off": "2021-12-31T19:59:59Z",
"estimated_off": "2021-12-31T19:59:59Z",
"actual_off": "2021-12-31T19:59:59Z",
"scheduled_on": "2021-12-31T19:59:59Z",
"estimated_on": "2021-12-31T19:59:59Z",
"actual_on": "2021-12-31T19:59:59Z",
"scheduled_in": "2021-12-31T19:59:59Z",
"estimated_in": "2021-12-31T19:59:59Z",
"actual_in": "2021-12-31T19:59:59Z"
}
]
}
Get future flights arriving at an airport
GET /airports/{id}/flights/scheduled_arrivals
Returns flights that are expected to arrive at an airport. This can include both undeparted and en route flights. Flights are ordered by estimated_on ascending. The optional start and end parameters will be compared against estimated_on to limit the flights returned. The start parameter's default value is 48 hours before the current time (this accounts for delayed flights). The end parameter's default value is 24 hours after the current time.
API Key (x-apikey)
REQUEST
PATH PARAMETERS
* id
string	 

	ICAO, IATA or LID ID of destination airport to fetch. ICAO is highly preferred to prevent ambiguity and reduce risk of missing data results.
Example: KIAH ┃ IAH	
QUERY-STRING PARAMETERS
airline
string	 

	Airline to filter flights by. Do not provide airline if type is provided.
Example: UAL	
type
enum	 
Allowed: General_Aviation ┃ Airline	
	Type of flights to return. Do not provide type if airline is provided.	
start
string	 

	The starting date range for flight results. The format is ISO8601 date or datetime, and the bound is inclusive. Specified start date must be no further than 10 days in the past and 2 days in the future. If using date instead of datetime, the time will default to 00:00:00Z.
Example: 2021-12-31T19:59:59Z ┃ 2021-12-31	
end
string	 

	The ending date range for flight results. The format is ISO8601 date or datetime, and the bound is exclusive. Specified end date must be no further than 10 days in the past and 2 days in the future. If using date instead of datetime, the time will default to 00:00:00Z.
Example: 2021-12-31T19:59:59Z ┃ 2021-12-31	
max_pages
integer	 
Default: 1
Min 1	
	Maximum number of pages to fetch. This is an upper limit and not a guarantee of how many pages will be returned.	
cursor
string	 

	Opaque value used to get the next batch of data from a paged collection.	
API Server
https://aeroapi.flightaware.com/aeroapi
Authentication
Required (None Applied)
RESPONSE
OK
EXAMPLESCHEMA
application/json; charset=UTF-8
Copy
{
"links": 
{
"next": ""
},
"num_pages": 1,
"scheduled_arrivals": 
[
{
"ident": "string",
"ident_icao": "string",
"ident_iata": "string",
"actual_runway_off": "string",
"actual_runway_on": "string",
"fa_flight_id": "string",
"operator": "string",
"operator_icao": "string",
"operator_iata": "string",
"flight_number": "string",
"registration": "string",
"atc_ident": "string",
"inbound_fa_flight_id": "string",
"codeshares": 
[
"string"
],
"codeshares_iata": 
[
"string"
],
"blocked": false,
"diverted": false,
"cancelled": false,
"position_only": false,
"origin": 
{
"code": "string",
"code_icao": "string",
"code_iata": "string",
"code_lid": "string",
"timezone": "America/New_York",
"name": "LaGuardia",
"city": "New York",
"airport_info_url": ""
},
"destination": 
{
"code": "string",
"code_icao": "string",
"code_iata": "string",
"code_lid": "string",
"timezone": "America/New_York",
"name": "LaGuardia",
"city": "New York",
"airport_info_url": ""
},
"departure_delay": 0,
"arrival_delay": 0,
"filed_ete": 0,
"progress_percent": 0,
"status": "string",
"aircraft_type": "string",
"route_distance": 0,
"filed_airspeed": 0,
"filed_altitude": 0,
"route": "string",
"baggage_claim": "string",
"seats_cabin_business": 0,
"seats_cabin_coach": 0,
"seats_cabin_first": 0,
"gate_origin": "string",
"gate_destination": "string",
"terminal_origin": "string",
"terminal_destination": "string",
"type": "General_Aviation",
"scheduled_out": "2021-12-31T19:59:59Z",
"estimated_out": "2021-12-31T19:59:59Z",
"actual_out": "2021-12-31T19:59:59Z",
"scheduled_off": "2021-12-31T19:59:59Z",
"estimated_off": "2021-12-31T19:59:59Z",
"actual_off": "2021-12-31T19:59:59Z",
"scheduled_on": "2021-12-31T19:59:59Z",
"estimated_on": "2021-12-31T19:59:59Z",
"actual_on": "2021-12-31T19:59:59Z",
"scheduled_in": "2021-12-31T19:59:59Z",
"estimated_in": "2021-12-31T19:59:59Z",
"actual_in": "2021-12-31T19:59:59Z"
}
]
}
Get future flights departing from an airport
GET /airports/{id}/flights/scheduled_departures
Returns flights that are scheduled to depart from an airport or have recently been cancelled, ordered by estimated_off (or scheduled_off if estimated_off is missing) ascending. The optional start and end parameters will be compared against scheduled_off to limit the flights returned. The start parameter's default value is 2 hours before the current time. The end parameter's default value is 24 hours after the current time.
API Key (x-apikey)
REQUEST
PATH PARAMETERS
* id
string	 

	ICAO, IATA or LID ID of destination airport to fetch. ICAO is highly preferred to prevent ambiguity and reduce risk of missing data results.
Example: KIAH ┃ IAH	
QUERY-STRING PARAMETERS
airline
string	 

	Airline to filter flights by. Do not provide airline if type is provided.
Example: UAL	
type
enum	 
Allowed: General_Aviation ┃ Airline	
	Type of flights to return. Do not provide type if airline is provided.	
start
string	 

	The starting date range for flight results. The format is ISO8601 date or datetime, and the bound is inclusive. Specified start date must be no further than 10 days in the past and 2 days in the future. If using date instead of datetime, the time will default to 00:00:00Z.
Example: 2021-12-31T19:59:59Z ┃ 2021-12-31	
end
string	 

	The ending date range for flight results. The format is ISO8601 date or datetime, and the bound is exclusive. Specified end date must be no further than 10 days in the past and 2 days in the future. If using date instead of datetime, the time will default to 00:00:00Z.
Example: 2021-12-31T19:59:59Z ┃ 2021-12-31	
max_pages
integer	 
Default: 1
Min 1	
	Maximum number of pages to fetch. This is an upper limit and not a guarantee of how many pages will be returned.	
cursor
string	 

	Opaque value used to get the next batch of data from a paged collection.	
API Server
https://aeroapi.flightaware.com/aeroapi
Authentication
Required (None Applied)
RESPONSE
OK
EXAMPLESCHEMA
application/json; charset=UTF-8
Copy
{
"links": 
{
"next": ""
},
"num_pages": 1,
"scheduled_departures": 
[
{
"ident": "string",
"ident_icao": "string",
"ident_iata": "string",
"actual_runway_off": "string",
"actual_runway_on": "string",
"fa_flight_id": "string",
"operator": "string",
"operator_icao": "string",
"operator_iata": "string",
"flight_number": "string",
"registration": "string",
"atc_ident": "string",
"inbound_fa_flight_id": "string",
"codeshares": 
[
"string"
],
"codeshares_iata": 
[
"string"
],
"blocked": false,
"diverted": false,
"cancelled": false,
"position_only": false,
"origin": 
{
"code": "string",
"code_icao": "string",
"code_iata": "string",
"code_lid": "string",
"timezone": "America/New_York",
"name": "LaGuardia",
"city": "New York",
"airport_info_url": ""
},
"destination": 
{
"code": "string",
"code_icao": "string",
"code_iata": "string",
"code_lid": "string",
"timezone": "America/New_York",
"name": "LaGuardia",
"city": "New York",
"airport_info_url": ""
},
"departure_delay": 0,
"arrival_delay": 0,
"filed_ete": 0,
"progress_percent": 0,
"status": "string",
"aircraft_type": "string",
"route_distance": 0,
"filed_airspeed": 0,
"filed_altitude": 0,
"route": "string",
"baggage_claim": "string",
"seats_cabin_business": 0,
"seats_cabin_coach": 0,
"seats_cabin_first": 0,
"gate_origin": "string",
"gate_destination": "string",
"terminal_origin": "string",
"terminal_destination": "string",
"type": "General_Aviation",
"scheduled_out": "2021-12-31T19:59:59Z",
"estimated_out": "2021-12-31T19:59:59Z",
"actual_out": "2021-12-31T19:59:59Z",
"scheduled_off": "2021-12-31T19:59:59Z",
"estimated_off": "2021-12-31T19:59:59Z",
"actual_off": "2021-12-31T19:59:59Z",
"scheduled_on": "2021-12-31T19:59:59Z",
"estimated_on": "2021-12-31T19:59:59Z",
"actual_on": "2021-12-31T19:59:59Z",
"scheduled_in": "2021-12-31T19:59:59Z",
"estimated_in": "2021-12-31T19:59:59Z",
"actual_in": "2021-12-31T19:59:59Z"
}
]
}
Get flights with a specific origin and destination
GET /airports/{id}/flights/to/{dest_id}
This endpoint is quite similar to the FindFlight operator in prior versions of AeroAPI. Results may include both non-stop and one-stop flights. Note that because the returned flights can include multiple legs, the response format differs from most other flight-returning endpoints. If the optional start or end query parameters are not provided start will default to 1 day in the future, while end will default to 7 days in the past relative to the time the query is made.
API Key (x-apikey)
REQUEST
PATH PARAMETERS
* id
string	 

	ICAO, IATA or LID ID of destination airport to fetch. ICAO is highly preferred to prevent ambiguity and reduce risk of missing data results.
Example: KIAH ┃ IAH	
* dest_id
string	 

	ICAO, IATA or LID ID of destination airport to fetch. ICAO is highly preferred to prevent ambiguity.
Example: KIAH ┃ IAH	
QUERY-STRING PARAMETERS
type
enum	 
Allowed: General_Aviation ┃ Airline
	Type of flights to return.
connection
enum	 
Allowed: nonstop ┃ onestop
	Whether flights should be filtered based on their connection status. If setting start/end date parameters then connection must be set to nonstop, and will default to nonstop if left blank. If start/end are not specified then leaving this blank will result in a mix of nonstop and one-stop flights being returned, with a preference for nonstop flights. One-stop flights are identified with a custom heuristic, which may be incomplete.
start
string	 

	The starting date range for flight results. The format is ISO8601 date or datetime, and the bound is inclusive. Specified start date must be no further than 10 days in the past and 2 days in the future. If using date instead of datetime, the time will default to 00:00:00Z.
Example: 2021-12-31T19:59:59Z ┃ 2021-12-31	
end
string	 

	The ending date range for flight results. The format is ISO8601 date or datetime, and the bound is exclusive. Specified end date must be no further than 10 days in the past and 2 days in the future. If using date instead of datetime, the time will default to 00:00:00Z.
Example: 2021-12-31T19:59:59Z ┃ 2021-12-31	
max_pages
integer	 
Default: 1
Min 1	
	Maximum number of pages to fetch. This is an upper limit and not a guarantee of how many pages will be returned.	
cursor
string	 

	Opaque value used to get the next batch of data from a paged collection.	
API Server
https://aeroapi.flightaware.com/aeroapi
Authentication
Required (None Applied)
RESPONSE
OK
EXAMPLESCHEMA
application/json; charset=UTF-8
Copy
{
"links": 
{
"next": ""
},
"num_pages": 1,
"flights": 
[
{
"segments": 
[
{
"ident": "string",
"ident_icao": "string",
"ident_iata": "string",
"actual_runway_off": "string",
"actual_runway_on": "string",
"fa_flight_id": "string",
"operator": "string",
"operator_icao": "string",
"operator_iata": "string",
"flight_number": "string",
"registration": "string",
"atc_ident": "string",
"inbound_fa_flight_id": "string",
"codeshares": 
[
"string"
],
"codeshares_iata": 
[
"string"
],
"blocked": false,
"diverted": false,
"cancelled": false,
"position_only": false,
"origin": 
{
"code": "string",
"code_icao": "string",
"code_iata": "string",
"code_lid": "string",
"timezone": "America/New_York",
"name": "LaGuardia",
"city": "New York",
"airport_info_url": ""
},
"destination": 
{
"code": "string",
"code_icao": "string",
"code_iata": "string",
"code_lid": "string",
"timezone": "America/New_York",
"name": "LaGuardia",
"city": "New York",
"airport_info_url": ""
},
"departure_delay": 0,
"arrival_delay": 0,
"filed_ete": 0,
"progress_percent": 0,
"status": "string",
"aircraft_type": "string",
"route_distance": 0,
"filed_airspeed": 0,
"filed_altitude": 0,
"route": "string",
"baggage_claim": "string",
"seats_cabin_business": 0,
"seats_cabin_coach": 0,
"seats_cabin_first": 0,
"gate_origin": "string",
"gate_destination": "string",
"terminal_origin": "string",
"terminal_destination": "string",
"type": "General_Aviation",
"scheduled_out": "2021-12-31T19:59:59Z",
"estimated_out": "2021-12-31T19:59:59Z",
"actual_out": "2021-12-31T19:59:59Z",
"scheduled_off": "2021-12-31T19:59:59Z",
"estimated_off": "2021-12-31T19:59:59Z",
"actual_off": "2021-12-31T19:59:59Z",
"scheduled_on": "2021-12-31T19:59:59Z",
"estimated_on": "2021-12-31T19:59:59Z",
"actual_on": "2021-12-31T19:59:59Z",
"scheduled_in": "2021-12-31T19:59:59Z",
"estimated_in": "2021-12-31T19:59:59Z",
"actual_in": "2021-12-31T19:59:59Z"
}
]
}
]
}
Get airports near an airport
GET /airports/{id}/nearby
Returns a list of airports located within a given distance from the specified airport.
API Key (x-apikey)
REQUEST
PATH PARAMETERS
* id
string	 

	ICAO, IATA or LID ID of destination airport to fetch. ICAO is highly preferred to prevent ambiguity and reduce risk of missing data results.
Example: KIAH ┃ IAH	
QUERY-STRING PARAMETERS
* radius
integer	 

	The search radius to use for finding nearby airports (statue miles)	
only_iap
boolean	 
Default: false	
	Return only nearby airports with Instrument Approaches (also limits results to North American airports)	
max_pages
integer	 
Default: 1
Min 1	
	Maximum number of pages to fetch. This is an upper limit and not a guarantee of how many pages will be returned.	
cursor
string	 

	Opaque value used to get the next batch of data from a paged collection.	
API Server
https://aeroapi.flightaware.com/aeroapi
Authentication
Required (None Applied)
RESPONSE
OK
EXAMPLESCHEMA
application/json; charset=UTF-8
Copy
{
"links": 
{
"next": ""
},
"num_pages": 1,
"airports": 
[
{
"airport_code": "KHOU",
"code_icao": "KHOU",
"code_iata": "HOU",
"code_lid": "HOU",
"name": "William P Hobby",
"type": "Airport",
"elevation": 0,
"city": "string",
"state": "string",
"longitude": 0,
"latitude": 0,
"timezone": "America/Chicago",
"country_code": "string",
"wiki_url": "http://example.com",
"airport_flights_url": "",
"distance": 0,
"heading": 1,
"direction": "N"
}
]
}
Get routes between 2 airports
GET /airports/{id}/routes/{dest_id}
Returns information about assigned IFR routings between two airports.
API Key (x-apikey)
REQUEST
PATH PARAMETERS
* id
string	 

	ICAO, IATA or LID ID of destination airport to fetch. ICAO is highly preferred to prevent ambiguity and reduce risk of missing data results.
Example: KIAH ┃ IAH	
* dest_id
string	 

	ICAO, IATA or LID ID of destination airport to fetch. ICAO is highly preferred to prevent ambiguity.
Example: KIAH ┃ IAH	
QUERY-STRING PARAMETERS
sort_by
enum	 
Default: count
Allowed: count ┃ last_departure_time
	Field to sort results by. "count" will sort results by the route filing count (descending). "last_departure_time" will sort results by the latest scheduled departure time for that route (descending).
max_file_age
string	 
Default: 2 weeks
	Maximum filed plan age of flights to consider. Can be a value less than or equal to 14 days (2 weeks) OR 1 month OR 1 year.
Example: 6 days ┃ 1 month ┃ 1 year
max_pages
integer	 
Default: 1
Min 1
	Maximum number of pages to fetch. This is an upper limit and not a guarantee of how many pages will be returned.
cursor
string	 

	Opaque value used to get the next batch of data from a paged collection.	
API Server
https://aeroapi.flightaware.com/aeroapi
Authentication
Required (None Applied)
RESPONSE
OK
EXAMPLESCHEMA
application/json; charset=UTF-8
Copy
{
"links": 
{
"next": ""
},
"num_pages": 1,
"routes": 
[
{
"aircraft_types": 
[
"string"
],
"count": 0,
"filed_altitude_max": 0,
"filed_altitude_min": 0,
"last_departure_time": "2021-12-31T19:59:59Z",
"route": "string",
"route_distance": "string"
}
]
}
Get weather forecast for given airport
GET /airports/{id}/weather/forecast
Returns the weather forecast for an airport in the form of a decoded TAF (Terminal Area Forecast). Only a single result is returned.
API Key (x-apikey)
REQUEST
PATH PARAMETERS
* id
string	 

	ICAO, IATA or LID ID of destination airport to fetch. ICAO is highly preferred to prevent ambiguity and reduce risk of missing data results.
Example: KIAH ┃ IAH	
QUERY-STRING PARAMETERS
timestamp
date-time	 

	Timestamp from which to begin returning weather data in a 1 day range. Because weather data is returned in reverse chronological order, all returned weather reports will be from before this timestamp. If unspecified, weather is returned starting from now up to or less than the user history limit, normally 14 days.
Example: 2021-12-31T19:59:59Z	
return_nearby_weather
boolean	 
Default: false	
	If the requested airport does not have a weather conditions report then the weather for the nearest airport within 30 miles will be returned instead.	
API Server
https://aeroapi.flightaware.com/aeroapi
Authentication
Required (None Applied)
RESPONSE
OK
EXAMPLESCHEMA
application/json; charset=UTF-8
Copy
{
"airport_code": "string",
"raw_forecast": 
[
"string"
],
"time": "2021-12-31T19:59:59Z",
"decoded_forecast": 
{
"start": "2021-12-31T19:59:59Z",
"end": "2021-12-31T19:59:59Z",
"lines": 
[
{
"type": "string",
"start": "2021-12-31T19:59:59Z",
"end": "2021-12-31T19:59:59Z",
"turbulence_layers": "string",
"icing_layers": "string",
"barometric_pressure": 0,
"significant_weather": "string",
"winds": 
{
"symbol": "string",
"direction": "string",
"speed": 0,
"units": "string",
"peak_gusts": 0
},
"windshear": 
{
"symbol": "string",
"height": "string",
"direction": "string",
"speed": "string",
"units": "string"
},
"visibility": 
{
"symbol": "string",
"visibility": "string",
"units": "string"
},
"clouds": 
[
{
"symbol": "string",
"coverage": 
null
"altitude": "string",
"special": "string"
}
]
}
]
}
}
Get weather conditions for given airport
GET /airports/{id}/weather/observations
Returns weather for an airport in the form of a decoded METAR, starting from the latest report and working backwards in time as more data is requested. Data is provided in parsed, human-readable, and raw formats.
API Key (x-apikey)
REQUEST
PATH PARAMETERS
* id
string	 

	ICAO, IATA or LID ID of destination airport to fetch. ICAO is highly preferred to prevent ambiguity and reduce risk of missing data results.
Example: KIAH ┃ IAH	
QUERY-STRING PARAMETERS
temperature_units
enum	 
Default: Celsius
Allowed: C ┃ F ┃ Celsius ┃ Fahrenheit
	Units to use for temperature fields.
return_nearby_weather
boolean	 
Default: false
	If the requested airport does not have a weather conditions report then the weather for the nearest airport within 30 miles will be returned instead.
timestamp
date-time	 

	Timestamp from which to begin returning weather data in a 1 day range. Because weather data is returned in reverse chronological order, all returned weather reports will be from before this timestamp. If unspecified, weather is returned starting from now up to or less than the user history limit, normally 14 days.
Example: 2021-12-31T19:59:59Z	
max_pages
integer	 
Default: 1
Min 1	
	Maximum number of pages to fetch. This is an upper limit and not a guarantee of how many pages will be returned.	
cursor
string	 

	Opaque value used to get the next batch of data from a paged collection.	
API Server
https://aeroapi.flightaware.com/aeroapi
Authentication
Required (None Applied)
RESPONSE
OK
EXAMPLESCHEMA
application/json; charset=UTF-8
Copy
{
"links": 
{
"next": ""
},
"num_pages": 1,
"observations": 
[
{
"airport_code": "string",
"cloud_friendly": "Overcast skies",
"clouds": 
[
{
"altitude": 0,
"symbol": "string",
"type": "string"
}
],
"conditions": "BR",
"pressure": 0,
"pressure_units": 
null
"raw_data": "string",
"temp_air": 0,
"temp_dewpoint": 0,
"temp_perceived": 0,
"relative_humidity": 0,
"time": "2021-12-31T19:59:59Z",
"visibility": 0,
"visibility_units": 
null
"wind_direction": 0,
"wind_friendly": "Very windy",
"wind_speed": 0,
"wind_speed_gust": 0,
"wind_units": "MPS"
}
]
}
Get delay information for all airports with delays
GET /airports/delays
Returns a list of airports with delays. There may be multiple reasons returned per airport if there are multiple types of delays reported at an airport. Note that individual flights can be delayed without there being an airport-wide delay returned by this endpoint.
API Key (x-apikey)
REQUEST
QUERY-STRING PARAMETERS
max_pages
integer	 
Default: 1
Min 1
	Maximum number of pages to fetch. This is an upper limit and not a guarantee of how many pages will be returned.
cursor
string	 

	Opaque value used to get the next batch of data from a paged collection.	
API Server
https://aeroapi.flightaware.com/aeroapi
Authentication
Required (None Applied)
RESPONSE
200
OK
EXAMPLESCHEMA
application/json; charset=UTF-8
Copy
{
"links": 
{
"next": ""
},
"num_pages": 1,
"delays": 
[
{
"airport": "string",
"category": "string",
"color": "red",
"delay_secs": 0,
"reasons": 
[
{
"category": "string",
"color": "red",
"delay_secs": 0,
"reason": "string"
}
]
}
]
}
Get airports near a location
GET /airports/nearby
Returns a list of airports located within a given distance from the given location.
API Key (x-apikey)
REQUEST
QUERY-STRING PARAMETERS
* latitude
number	 

	The latitude of the point used to search for nearby airports	
* longitude
number	 

	The longitude of the point used to search for nearby airports	
* radius
integer	 

	The search radius to use for finding nearby airports (statue miles)	
only_iap
boolean	 
Default: false	
	Return only nearby airports with Instrument Approaches (also limits results to North American airports)	
max_pages
integer	 
Default: 1
Min 1	
	Maximum number of pages to fetch. This is an upper limit and not a guarantee of how many pages will be returned.	
cursor
string	 

	Opaque value used to get the next batch of data from a paged collection.	
API Server
https://aeroapi.flightaware.com/aeroapi
Authentication
Required (None Applied)
RESPONSE
OK
EXAMPLESCHEMA
application/json; charset=UTF-8
Copy
{
"links": 
{
"next": ""
},
"num_pages": 1,
"airports": 
[
{
"airport_code": "KHOU",
"code_icao": "KHOU",
"code_iata": "HOU",
"code_lid": "HOU",
"name": "William P Hobby",
"type": "Airport",
"elevation": 0,
"city": "string",
"state": "string",
"longitude": 0,
"latitude": 0,
"timezone": "America/Chicago",
"country_code": "string",
"wiki_url": "http://example.com",
"airport_flights_url": "",
"distance": 0,
"heading": 1,
"direction": "N"
}
]
}
OPERATORS
Get all operators.
GET /operators
Returns list of operator references (ICAO/IATA codes and URLs to access more information).
API Key (x-apikey)
REQUEST
QUERY-STRING PARAMETERS
max_pages
integer	 
Default: 1
Min 1
	Maximum number of pages to fetch. This is an upper limit and not a guarantee of how many pages will be returned.
cursor
string	 

	Opaque value used to get the next batch of data from a paged collection.	
API Server
https://aeroapi.flightaware.com/aeroapi
Authentication
Required (None Applied)
RESPONSE
200
List of operators.
EXAMPLESCHEMA
application/json; charset=UTF-8
Copy
{
"links": 
{
"next": ""
},
"num_pages": 1,
"operators": 
[
{
"code": "string",
"operator_info_url": ""
}
]
}
Get static information for an operator.
GET /operators/{id}
Returns information for an operator such as their name, ICAO/IATA codes, headquarter location, etc.
API Key (x-apikey)
REQUEST
PATH PARAMETERS
* id
string	 

	The ICAO or IATA identifier for an operator. The use of ICAO code is strongly preferred. In the case of non-unique IATA codes the operator with the lexicographically first ICAO code will be returned.
Example: UAL	
API Server
https://aeroapi.flightaware.com/aeroapi
Authentication
Required (None Applied)
RESPONSE
OK
EXAMPLESCHEMA
application/json; charset=UTF-8
Copy
{
"icao": "string",
"iata": "string",
"callsign": "string",
"name": "string",
"country": "string",
"location": "string",
"phone": "string",
"shortname": "string",
"url": "string",
"wiki_url": "string",
"alternatives": 
[
{
"icao": "string",
"iata": "string",
"callsign": "string",
"name": "string",
"country": "string",
"location": "string",
"phone": "string",
"shortname": "string",
"url": "string",
"wiki_url": "string"
}
]
}
Get the canonical code of an operator for API usage.
GET /operators/{id}/canonical
Returns all possible matches for a given operator code (ICAO or IATA). An optional country code can be provided to refine ambiguous IATA codes to a single result. The country code should represent a country the operator operates within.
API Key (x-apikey)
REQUEST
PATH PARAMETERS
* id
string	 

	The ICAO or IATA identifier for an operator. The use of ICAO code is strongly preferred. In the case of non-unique IATA codes the operator with the lexicographically first ICAO code will be returned.
Example: UAL	
QUERY-STRING PARAMETERS
country_code
string	 

	An ISO 3166-1 alpha-2 country code.
Example: US	
API Server
https://aeroapi.flightaware.com/aeroapi
Authentication
Required (None Applied)
RESPONSE
OK
EXAMPLESCHEMA
application/json; charset=UTF-8
Copy
{
"operators": 
[
{
"id": "string",
"id_type": "icao"
}
]
}
Get all of an operator's flights
GET /operators/{id}/flights
Returns all recent and upcoming flights for this operator. Behaviour for optional start and end dates for each type returned (scheduled, arrivals, enroute) match the behaviour in their corresponding endpoints.
API Key (x-apikey)
REQUEST
PATH PARAMETERS
* id
string	 

	The ICAO or IATA identifier for an operator. The use of ICAO code is strongly preferred. In the case of non-unique IATA codes the operator with the lexicographically first ICAO code will be returned.
Example: UAL	
QUERY-STRING PARAMETERS
start
string	 

	The starting date range for flight results. The format is ISO8601 date or datetime, and the bound is inclusive. Specified start date must be no further than 10 days in the past and 2 days in the future. If using date instead of datetime, the time will default to 00:00:00Z.
Example: 2021-12-31T19:59:59Z ┃ 2021-12-31	
end
string	 

	The ending date range for flight results. The format is ISO8601 date or datetime, and the bound is exclusive. Specified end date must be no further than 10 days in the past and 2 days in the future. If using date instead of datetime, the time will default to 00:00:00Z.
Example: 2021-12-31T19:59:59Z ┃ 2021-12-31	
max_pages
integer	 
Default: 1
Min 1	
	Maximum number of pages to fetch. This is an upper limit and not a guarantee of how many pages will be returned.	
cursor
string	 

	Opaque value used to get the next batch of data from a paged collection.	
API Server
https://aeroapi.flightaware.com/aeroapi
Authentication
Required (None Applied)
RESPONSE
Operator's flights.
EXAMPLESCHEMA
application/json; charset=UTF-8
Copy
{
"links": 
{
"next": ""
},
"num_pages": 1,
"scheduled": 
[
{
"ident": "string",
"ident_icao": "string",
"ident_iata": "string",
"actual_runway_off": "string",
"actual_runway_on": "string",
"fa_flight_id": "string",
"operator": "string",
"operator_icao": "string",
"operator_iata": "string",
"flight_number": "string",
"registration": "string",
"atc_ident": "string",
"inbound_fa_flight_id": "string",
"codeshares": 
[
"string"
],
"codeshares_iata": 
[
"string"
],
"blocked": false,
"diverted": false,
"cancelled": false,
"position_only": false,
"origin": 
{
"code": "string",
"code_icao": "string",
"code_iata": "string",
"code_lid": "string",
"timezone": "America/New_York",
"name": "LaGuardia",
"city": "New York",
"airport_info_url": ""
},
"destination": 
{
"code": "string",
"code_icao": "string",
"code_iata": "string",
"code_lid": "string",
"timezone": "America/New_York",
"name": "LaGuardia",
"city": "New York",
"airport_info_url": ""
},
"departure_delay": 0,
"arrival_delay": 0,
"filed_ete": 0,
"progress_percent": 0,
"status": "string",
"aircraft_type": "string",
"route_distance": 0,
"filed_airspeed": 0,
"filed_altitude": 0,
"route": "string",
"baggage_claim": "string",
"seats_cabin_business": 0,
"seats_cabin_coach": 0,
"seats_cabin_first": 0,
"gate_origin": "string",
"gate_destination": "string",
"terminal_origin": "string",
"terminal_destination": "string",
"type": "General_Aviation",
"scheduled_out": "2021-12-31T19:59:59Z",
"estimated_out": "2021-12-31T19:59:59Z",
"actual_out": "2021-12-31T19:59:59Z",
"scheduled_off": "2021-12-31T19:59:59Z",
"estimated_off": "2021-12-31T19:59:59Z",
"actual_off": "2021-12-31T19:59:59Z",
"scheduled_on": "2021-12-31T19:59:59Z",
"estimated_on": "2021-12-31T19:59:59Z",
"actual_on": "2021-12-31T19:59:59Z",
"scheduled_in": "2021-12-31T19:59:59Z",
"estimated_in": "2021-12-31T19:59:59Z",
"actual_in": "2021-12-31T19:59:59Z"
}
],
"arrivals": 
[
{
"ident": "string",
"ident_icao": "string",
"ident_iata": "string",
"actual_runway_off": "string",
"actual_runway_on": "string",
"fa_flight_id": "string",
"operator": "string",
"operator_icao": "string",
"operator_iata": "string",
"flight_number": "string",
"registration": "string",
"atc_ident": "string",
"inbound_fa_flight_id": "string",
"codeshares": 
[
"string"
],
"codeshares_iata": 
[
"string"
],
"blocked": false,
"diverted": false,
"cancelled": false,
"position_only": false,
"origin": 
{
"code": "string",
"code_icao": "string",
"code_iata": "string",
"code_lid": "string",
"timezone": "America/New_York",
"name": "LaGuardia",
"city": "New York",
"airport_info_url": ""
},
"destination": 
{
"code": "string",
"code_icao": "string",
"code_iata": "string",
"code_lid": "string",
"timezone": "America/New_York",
"name": "LaGuardia",
"city": "New York",
"airport_info_url": ""
},
"departure_delay": 0,
"arrival_delay": 0,
"filed_ete": 0,
"progress_percent": 0,
"status": "string",
"aircraft_type": "string",
"route_distance": 0,
"filed_airspeed": 0,
"filed_altitude": 0,
"route": "string",
"baggage_claim": "string",
"seats_cabin_business": 0,
"seats_cabin_coach": 0,
"seats_cabin_first": 0,
"gate_origin": "string",
"gate_destination": "string",
"terminal_origin": "string",
"terminal_destination": "string",
"type": "General_Aviation",
"scheduled_out": "2021-12-31T19:59:59Z",
"estimated_out": "2021-12-31T19:59:59Z",
"actual_out": "2021-12-31T19:59:59Z",
"scheduled_off": "2021-12-31T19:59:59Z",
"estimated_off": "2021-12-31T19:59:59Z",
"actual_off": "2021-12-31T19:59:59Z",
"scheduled_on": "2021-12-31T19:59:59Z",
"estimated_on": "2021-12-31T19:59:59Z",
"actual_on": "2021-12-31T19:59:59Z",
"scheduled_in": "2021-12-31T19:59:59Z",
"estimated_in": "2021-12-31T19:59:59Z",
"actual_in": "2021-12-31T19:59:59Z"
}
],
"enroute": 
[
{
"ident": "string",
"ident_icao": "string",
"ident_iata": "string",
"actual_runway_off": "string",
"actual_runway_on": "string",
"fa_flight_id": "string",
"operator": "string",
"operator_icao": "string",
"operator_iata": "string",
"flight_number": "string",
"registration": "string",
"atc_ident": "string",
"inbound_fa_flight_id": "string",
"codeshares": 
[
"string"
],
"codeshares_iata": 
[
"string"
],
"blocked": false,
"diverted": false,
"cancelled": false,
"position_only": false,
"origin": 
{
"code": "string",
"code_icao": "string",
"code_iata": "string",
"code_lid": "string",
"timezone": "America/New_York",
"name": "LaGuardia",
"city": "New York",
"airport_info_url": ""
},
"destination": 
{
"code": "string",
"code_icao": "string",
"code_iata": "string",
"code_lid": "string",
"timezone": "America/New_York",
"name": "LaGuardia",
"city": "New York",
"airport_info_url": ""
},
"departure_delay": 0,
"arrival_delay": 0,
"filed_ete": 0,
"progress_percent": 0,
"status": "string",
"aircraft_type": "string",
"route_distance": 0,
"filed_airspeed": 0,
"filed_altitude": 0,
"route": "string",
"baggage_claim": "string",
"seats_cabin_business": 0,
"seats_cabin_coach": 0,
"seats_cabin_first": 0,
"gate_origin": "string",
"gate_destination": "string",
"terminal_origin": "string",
"terminal_destination": "string",
"type": "General_Aviation",
"scheduled_out": "2021-12-31T19:59:59Z",
"estimated_out": "2021-12-31T19:59:59Z",
"actual_out": "2021-12-31T19:59:59Z",
"scheduled_off": "2021-12-31T19:59:59Z",
"estimated_off": "2021-12-31T19:59:59Z",
"actual_off": "2021-12-31T19:59:59Z",
"scheduled_on": "2021-12-31T19:59:59Z",
"estimated_on": "2021-12-31T19:59:59Z",
"actual_on": "2021-12-31T19:59:59Z",
"scheduled_in": "2021-12-31T19:59:59Z",
"estimated_in": "2021-12-31T19:59:59Z",
"actual_in": "2021-12-31T19:59:59Z"
}
]
}
Get arrived flights
GET /operators/{id}/flights/arrivals
Returns flights for this operator that have departed and subsequently arrived, ordered by actual_on descending. The optional start and end parameters will be compared against actual_on to limit the flights returned. The start parameter's default value is 24 hours before the current time. The end parameter's default value is the current time.
API Key (x-apikey)
REQUEST
PATH PARAMETERS
* id
string	 

	The ICAO or IATA identifier for an operator. The use of ICAO code is strongly preferred. In the case of non-unique IATA codes the operator with the lexicographically first ICAO code will be returned.
Example: UAL	
QUERY-STRING PARAMETERS
start
string	 

	The starting date range for flight results. The format is ISO8601 date or datetime, and the bound is inclusive. Specified start date must be no further than 10 days in the past and 2 days in the future. If using date instead of datetime, the time will default to 00:00:00Z.
Example: 2021-12-31T19:59:59Z ┃ 2021-12-31	
end
string	 

	The ending date range for flight results. The format is ISO8601 date or datetime, and the bound is exclusive. Specified end date must be no further than 10 days in the past and 2 days in the future. If using date instead of datetime, the time will default to 00:00:00Z.
Example: 2021-12-31T19:59:59Z ┃ 2021-12-31	
max_pages
integer	 
Default: 1
Min 1	
	Maximum number of pages to fetch. This is an upper limit and not a guarantee of how many pages will be returned.	
cursor
string	 

	Opaque value used to get the next batch of data from a paged collection.	
API Server
https://aeroapi.flightaware.com/aeroapi
Authentication
Required (None Applied)
RESPONSE
Arrived flights.
EXAMPLESCHEMA
application/json; charset=UTF-8
Copy
{
"links": 
{
"next": ""
},
"num_pages": 1,
"arrivals": 
[
{
"ident": "string",
"ident_icao": "string",
"ident_iata": "string",
"actual_runway_off": "string",
"actual_runway_on": "string",
"fa_flight_id": "string",
"operator": "string",
"operator_icao": "string",
"operator_iata": "string",
"flight_number": "string",
"registration": "string",
"atc_ident": "string",
"inbound_fa_flight_id": "string",
"codeshares": 
[
"string"
],
"codeshares_iata": 
[
"string"
],
"blocked": false,
"diverted": false,
"cancelled": false,
"position_only": false,
"origin": 
{
"code": "string",
"code_icao": "string",
"code_iata": "string",
"code_lid": "string",
"timezone": "America/New_York",
"name": "LaGuardia",
"city": "New York",
"airport_info_url": ""
},
"destination": 
{
"code": "string",
"code_icao": "string",
"code_iata": "string",
"code_lid": "string",
"timezone": "America/New_York",
"name": "LaGuardia",
"city": "New York",
"airport_info_url": ""
},
"departure_delay": 0,
"arrival_delay": 0,
"filed_ete": 0,
"progress_percent": 0,
"status": "string",
"aircraft_type": "string",
"route_distance": 0,
"filed_airspeed": 0,
"filed_altitude": 0,
"route": "string",
"baggage_claim": "string",
"seats_cabin_business": 0,
"seats_cabin_coach": 0,
"seats_cabin_first": 0,
"gate_origin": "string",
"gate_destination": "string",
"terminal_origin": "string",
"terminal_destination": "string",
"type": "General_Aviation",
"scheduled_out": "2021-12-31T19:59:59Z",
"estimated_out": "2021-12-31T19:59:59Z",
"actual_out": "2021-12-31T19:59:59Z",
"scheduled_off": "2021-12-31T19:59:59Z",
"estimated_off": "2021-12-31T19:59:59Z",
"actual_off": "2021-12-31T19:59:59Z",
"scheduled_on": "2021-12-31T19:59:59Z",
"estimated_on": "2021-12-31T19:59:59Z",
"actual_on": "2021-12-31T19:59:59Z",
"scheduled_in": "2021-12-31T19:59:59Z",
"estimated_in": "2021-12-31T19:59:59Z",
"actual_in": "2021-12-31T19:59:59Z"
}
]
}
Get flight counts for operator
GET /operators/{id}/flights/counts
Returns counts of both airborne and recently operated flights for operator.
API Key (x-apikey)
REQUEST
PATH PARAMETERS
* id
string	 

	The ICAO or IATA identifier for an operator. The use of ICAO code is strongly preferred. In the case of non-unique IATA codes the operator with the lexicographically first ICAO code will be returned.
Example: UAL	
API Server
https://aeroapi.flightaware.com/aeroapi
Authentication
Required (None Applied)
RESPONSE
OK
EXAMPLESCHEMA
application/json; charset=UTF-8
Copy
{
"airborne": 0,
"flights_last_24_hours": 0
}
Get en route flights
GET /operators/{id}/flights/enroute
Returns flights for this operator that have departed and are currently en route, ordered by estimated_on ascending. The optional start and end parameters will be compared against estimated_on to limit the flights returned. The start parameter's default value is 48 hours before the current time (this accounts for delayed flights). There is no default end bound.
API Key (x-apikey)
REQUEST
PATH PARAMETERS
* id
string	 

	The ICAO or IATA identifier for an operator. The use of ICAO code is strongly preferred. In the case of non-unique IATA codes the operator with the lexicographically first ICAO code will be returned.
Example: UAL	
QUERY-STRING PARAMETERS
start
string	 

	The starting date range for flight results. The format is ISO8601 date or datetime, and the bound is inclusive. Specified start date must be no further than 10 days in the past and 2 days in the future. If using date instead of datetime, the time will default to 00:00:00Z.
Example: 2021-12-31T19:59:59Z ┃ 2021-12-31	
end
string	 

	The ending date range for flight results. The format is ISO8601 date or datetime, and the bound is exclusive. Specified end date must be no further than 10 days in the past and 2 days in the future. If using date instead of datetime, the time will default to 00:00:00Z.
Example: 2021-12-31T19:59:59Z ┃ 2021-12-31	
max_pages
integer	 
Default: 1
Min 1	
	Maximum number of pages to fetch. This is an upper limit and not a guarantee of how many pages will be returned.	
cursor
string	 

	Opaque value used to get the next batch of data from a paged collection.	
API Server
https://aeroapi.flightaware.com/aeroapi
Authentication
Required (None Applied)
RESPONSE
En route flights.
EXAMPLESCHEMA
application/json; charset=UTF-8
Copy
{
"links": 
{
"next": ""
},
"num_pages": 1,
"enroute": 
[
{
"ident": "string",
"ident_icao": "string",
"ident_iata": "string",
"actual_runway_off": "string",
"actual_runway_on": "string",
"fa_flight_id": "string",
"operator": "string",
"operator_icao": "string",
"operator_iata": "string",
"flight_number": "string",
"registration": "string",
"atc_ident": "string",
"inbound_fa_flight_id": "string",
"codeshares": 
[
"string"
],
"codeshares_iata": 
[
"string"
],
"blocked": false,
"diverted": false,
"cancelled": false,
"position_only": false,
"origin": 
{
"code": "string",
"code_icao": "string",
"code_iata": "string",
"code_lid": "string",
"timezone": "America/New_York",
"name": "LaGuardia",
"city": "New York",
"airport_info_url": ""
},
"destination": 
{
"code": "string",
"code_icao": "string",
"code_iata": "string",
"code_lid": "string",
"timezone": "America/New_York",
"name": "LaGuardia",
"city": "New York",
"airport_info_url": ""
},
"departure_delay": 0,
"arrival_delay": 0,
"filed_ete": 0,
"progress_percent": 0,
"status": "string",
"aircraft_type": "string",
"route_distance": 0,
"filed_airspeed": 0,
"filed_altitude": 0,
"route": "string",
"baggage_claim": "string",
"seats_cabin_business": 0,
"seats_cabin_coach": 0,
"seats_cabin_first": 0,
"gate_origin": "string",
"gate_destination": "string",
"terminal_origin": "string",
"terminal_destination": "string",
"type": "General_Aviation",
"scheduled_out": "2021-12-31T19:59:59Z",
"estimated_out": "2021-12-31T19:59:59Z",
"actual_out": "2021-12-31T19:59:59Z",
"scheduled_off": "2021-12-31T19:59:59Z",
"estimated_off": "2021-12-31T19:59:59Z",
"actual_off": "2021-12-31T19:59:59Z",
"scheduled_on": "2021-12-31T19:59:59Z",
"estimated_on": "2021-12-31T19:59:59Z",
"actual_on": "2021-12-31T19:59:59Z",
"scheduled_in": "2021-12-31T19:59:59Z",
"estimated_in": "2021-12-31T19:59:59Z",
"actual_in": "2021-12-31T19:59:59Z"
}
]
}
Get scheduled flights
GET /operators/{id}/flights/scheduled
Returns flights for this operator that are scheduled to depart or have recently been cancelled, ordered by estimated_off (or scheduled_off if estimated_off is missing) ascending. The optional start and end parameters will be compared against scheduled_off to limit the flights returned. If start is not specified, flights with a scheduled_off or cancellation time no further than two hours into the past will be returned. If end is not specified, there is no guaranteed bound for how far in the future scheduled flights will be returned (it will typically be around 48 hours in the future for commercial flights, though).
API Key (x-apikey)
REQUEST
PATH PARAMETERS
* id
string	 

	The ICAO or IATA identifier for an operator. The use of ICAO code is strongly preferred. In the case of non-unique IATA codes the operator with the lexicographically first ICAO code will be returned.
Example: UAL	
QUERY-STRING PARAMETERS
start
string	 

	The starting date range for flight results. The format is ISO8601 date or datetime, and the bound is inclusive. Specified start date must be no further than 10 days in the past and 2 days in the future. If using date instead of datetime, the time will default to 00:00:00Z.
Example: 2021-12-31T19:59:59Z ┃ 2021-12-31	
end
string	 

	The ending date range for flight results. The format is ISO8601 date or datetime, and the bound is exclusive. Specified end date must be no further than 10 days in the past and 2 days in the future. If using date instead of datetime, the time will default to 00:00:00Z.
Example: 2021-12-31T19:59:59Z ┃ 2021-12-31	
max_pages
integer	 
Default: 1
Min 1	
	Maximum number of pages to fetch. This is an upper limit and not a guarantee of how many pages will be returned.	
cursor
string	 

	Opaque value used to get the next batch of data from a paged collection.	
API Server
https://aeroapi.flightaware.com/aeroapi
Authentication
Required (None Applied)
RESPONSE
OK
EXAMPLESCHEMA
application/json; charset=UTF-8
Copy
{
"links": 
{
"next": ""
},
"num_pages": 1,
"scheduled": 
[
{
"ident": "string",
"ident_icao": "string",
"ident_iata": "string",
"actual_runway_off": "string",
"actual_runway_on": "string",
"fa_flight_id": "string",
"operator": "string",
"operator_icao": "string",
"operator_iata": "string",
"flight_number": "string",
"registration": "string",
"atc_ident": "string",
"inbound_fa_flight_id": "string",
"codeshares": 
[
"string"
],
"codeshares_iata": 
[
"string"
],
"blocked": false,
"diverted": false,
"cancelled": false,
"position_only": false,
"origin": 
{
"code": "string",
"code_icao": "string",
"code_iata": "string",
"code_lid": "string",
"timezone": "America/New_York",
"name": "LaGuardia",
"city": "New York",
"airport_info_url": ""
},
"destination": 
{
"code": "string",
"code_icao": "string",
"code_iata": "string",
"code_lid": "string",
"timezone": "America/New_York",
"name": "LaGuardia",
"city": "New York",
"airport_info_url": ""
},
"departure_delay": 0,
"arrival_delay": 0,
"filed_ete": 0,
"progress_percent": 0,
"status": "string",
"aircraft_type": "string",
"route_distance": 0,
"filed_airspeed": 0,
"filed_altitude": 0,
"route": "string",
"baggage_claim": "string",
"seats_cabin_business": 0,
"seats_cabin_coach": 0,
"seats_cabin_first": 0,
"gate_origin": "string",
"gate_destination": "string",
"terminal_origin": "string",
"terminal_destination": "string",
"type": "General_Aviation",
"scheduled_out": "2021-12-31T19:59:59Z",
"estimated_out": "2021-12-31T19:59:59Z",
"actual_out": "2021-12-31T19:59:59Z",
"scheduled_off": "2021-12-31T19:59:59Z",
"estimated_off": "2021-12-31T19:59:59Z",
"actual_off": "2021-12-31T19:59:59Z",
"scheduled_on": "2021-12-31T19:59:59Z",
"estimated_on": "2021-12-31T19:59:59Z",
"actual_on": "2021-12-31T19:59:59Z",
"scheduled_in": "2021-12-31T19:59:59Z",
"estimated_in": "2021-12-31T19:59:59Z",
"actual_in": "2021-12-31T19:59:59Z"
}
]
}
ALERTS
AeroAPI alerting can be used to configure and receive real-time alerts on key flight events. With customizable alerting offered by our alert endpoints, AeroAPI empowers users to selectively pick various types of events/filters to alert on. By doing so, you can receive specially tailored alerts delivered to you for events such as flight plan filed, flight departure (out and off), flight arrival (on and in), and more!
To get started with alerting, the PUT /alerts/endpoint endpoint must first be used to set up the account-wide default URL that alerts will be delivered to. This step must be done before any alerts can be configured and will serve as the fallback URL that all alerts will be sent to for the account if a specific delivery URL is not designated on a particular alert. If this is not performed before configuring alerts, then you will receive a 400 error with an error message reminding you of this step when trying to interact with the POST /alerts endpoint. Once a URL is set via the PUT /alerts/endpoint endpoint, then alerts can be configured using the POST /alerts endpoint. The GET /alerts endpoint can also be used to retrieve all currently configured alerts associated with your AeroAPI key. The GET /alerts endpoint will allow you to easily retrieve the id of any specific alerts of interest configured for the account which can let you use the GET PUT and DELETE /alerts/{id} endpoints to retrieve, update, and delete specific alerts.
When configuring an individual alert, the target_url field can be set to a URL that’s different than the account-wide target endpoint set via the PUT /alerts/endpoint. If the target_url field is set on an alert, then that specific alert will be delivered to the specified target_url rather than the default account-wide one. If this field is not configured for the alert, then the alert will be delivered to the default account-wide endpoint. By setting this field, one can easily target different alerts to be received by different endpoints which can be useful for configuring per-application alerts or sending alerts to an alternate development environment without having to adjust a production alert configuration.
For each alert configured, one-to-many ‘events’ can be set for alert delivery. While most events will result in one alert delivery, both the arrival and the departure events can result in multiple alerts delivered (referred to as bundled). The departure event bundles the departure (actual OFF the ground) alert, along with the flight plan filed alert and up to 5 per-departure changes which can include alerts for significant departure delays of over 30 minutes, gate changes, and airport delays. FlightAware Global customers will also receive Power on and Ready to taxi alerts as part of the departure bundle. The arrival event bundles the arrival (actual ON the ground) alert, along with up to 5 en-route changes (including delays of over 30 minutes and excluding diversions) identified. FlightAware Global customers will also receive taxi stop times as part of the arrival bundle. Setting a bundled type and unbundled type for an On/Off will only result in a single alert in the case where events may overlap.
If there is a need to change the alert configurations, updating an alert using the PUT /alerts/{id} endpoint and a unique alert identifier (id) is preferred rather than creating an additional alert. By doing so, you can avoid duplicate alerts being delivered which could create unnecessary noise if they are not of interest anymore. Creating duplicate alerts with the exact same configuration more than 50 times will result in a 400 error.
If at any point there is a need to delete an alert, the DELETE alerts/{id} endpoint can be leveraged to delete an alert so that it won’t be delivered anymore. As a reminder, specific alert IDs can be retrieved from the GET /alerts endpoint.
Get all configured alerts
GET /alerts
Returns all configured alerts for the FlightAware account (this includes alerts configured through other means by the FlightAware user owning the AeroAPI account like FlightAware's website or mobile apps).
API Key (x-apikey)
REQUEST
QUERY-STRING PARAMETERS
max_pages
integer	 
Default: 0
Min 0
	Maximum number of pages to fetch. This is an upper limit and not a guarantee of how many pages will be returned. Defaults to 0, meaning no maximum is set. Set this parameter if your call is timing out (most likely due to a high number of alerts).
cursor
string	 

	Opaque value used to get the next batch of data from a paged collection.	
API Server
https://aeroapi.flightaware.com/aeroapi
Authentication
Required (None Applied)
RESPONSE
200
List of all alerts.
EXAMPLESCHEMA
application/json; charset=UTF-8
Copy
{
"links": 
{
"next": ""
},
"num_pages": 1,
"alerts": 
[
{
"id": 0,
"description": "string",
"ident": "string",
"ident_icao": "string",
"ident_iata": "string",
"origin": "string",
"origin_icao": "string",
"origin_iata": "string",
"origin_lid": "string",
"destination": "string",
"destination_icao": "string",
"destination_iata": "string",
"destination_lid": "string",
"aircraft_type": "string",
"created": "2021-12-31T19:59:59Z",
"changed": "2021-12-31T19:59:59Z",
"start": "1970-01-01",
"end": "1970-01-01",
"user_ident": "string",
"eta": 0,
"impending_arrival": 
[
5,
10,
15
],
"impending_departure": 
[
5,
10,
15
],
"events": 
{
"arrival": false,
"cancelled": false,
"departure": false,
"diverted": false,
"filed": false,
"out": false,
"off": false,
"on": false,
"in": false,
"hold_start": false,
"hold_end": false
},
"target_url": "string",
"enabled": false
}
]
}
Create new alert
POST /alerts
Create a new AeroAPI flight alert. When the alert is triggered, a callback mechanism will be used to notify the address set via the /alerts/endpoint endpoint. Each callback will be charged as a query and count towards usage for the AeroAPI key that created the alert. If this key is disabled or removed, the alert will no longer be available. If a target_url is provided, then this specific alert will be delivered to that address regardless of the adress set via the /alerts/endpoint endpoint. Creating more than 50 duplicate alerts with the exact same configuration will result in a 400 error.
API Key (x-apikey)
REQUEST
REQUEST BODYapplication/json; charset=UTF-8
Alert configuration structure
EXAMPLESCHEMA
 
API Server
https://aeroapi.flightaware.com/aeroapi
Authentication
Required (None Applied)
RESPONSE
Alert created successfully
RESPONSE HEADERS
Location	string	URL of the newly created alert	
Get specific alert
GET /alerts/{id}
Returns the configuration data for an alert with the specified ID.
API Key (x-apikey)
REQUEST
PATH PARAMETERS
* id
integer	 

	The ID of the alert to fetch or update	
API Server
https://aeroapi.flightaware.com/aeroapi
Authentication
Required (None Applied)
RESPONSE
Returns alert configuration structure.
EXAMPLESCHEMA
application/json; charset=UTF-8
Copy
{
"id": 0,
"description": "string",
"ident": "string",
"ident_icao": "string",
"ident_iata": "string",
"origin": "string",
"origin_icao": "string",
"origin_iata": "string",
"origin_lid": "string",
"destination": "string",
"destination_icao": "string",
"destination_iata": "string",
"destination_lid": "string",
"aircraft_type": "string",
"created": "2021-12-31T19:59:59Z",
"changed": "2021-12-31T19:59:59Z",
"start": "1970-01-01",
"end": "1970-01-01",
"user_ident": "string",
"eta": 0,
"impending_arrival": 
[
5,
10,
15
],
"impending_departure": 
[
5,
10,
15
],
"events": 
{
"arrival": false,
"cancelled": false,
"departure": false,
"diverted": false,
"filed": false,
"out": false,
"off": false,
"on": false,
"in": false,
"hold_start": false,
"hold_end": false
},
"target_url": "string",
"enabled": false
}
Modify specific alert
PUT /alerts/{id}
Modifies the configuration for an alert with the specified ID. If a target URL address is provided, then the alert will be delivered to that address even if it is different than the default account-wide address set through the alerts/endpoint endpoint. Updating an alert that was created with a different AeroAPI key is possible, but will not change the AeroAPI key that the alert is associated with for usage.
API Key (x-apikey)
REQUEST
PATH PARAMETERS
* id
integer	 

	The ID of the alert to fetch or update	
REQUEST BODYapplication/json; charset=UTF-8
Alert configuration structure
EXAMPLESCHEMA
 
API Server
https://aeroapi.flightaware.com/aeroapi
Authentication
Required (None Applied)
RESPONSE
Alert modified
Delete specific alert
DELETE /alerts/{id}
Deletes specific alert with given ID
API Key (x-apikey)
REQUEST
PATH PARAMETERS
* id
integer	 

	The ID of the alert to fetch or update	
API Server
https://aeroapi.flightaware.com/aeroapi
Authentication
Required (None Applied)
RESPONSE
Alert deleted.
Get configured alert callback URL
GET /alerts/endpoint
Returns URL that will be POSTed to for alerts that are delivered via AeroAPI.
API Key (x-apikey)
REQUEST
API Server
https://aeroapi.flightaware.com/aeroapi
Authentication
Required (None Applied)
RESPONSE
Returns endpoint URL.
EXAMPLESCHEMA
application/json; charset=UTF-8
Configuration for a URL to which AeroAPI alerts should be delivered via HTTP POST. This is the default account-wide URL that all AeroAPI alerts will be delivered to if the alert does not have a specific alert URL configured for it.
Copy
{
"url": "http://example.com"
}
Set alert callback URL
PUT /alerts/endpoint
Updates the default URL that will be POSTed to for alerts that are delivered via AeroAPI. This sets the account-wide default URL that all alerts will be delivered to unless the specific alert has a different delivery address configured for it.
API Key (x-apikey)
REQUEST
REQUEST BODYapplication/json; charset=UTF-8
Endpoint URL configuration structure
EXAMPLESCHEMA
Configuration for a URL to which AeroAPI alerts should be delivered via HTTP POST. This is the default account-wide URL that all AeroAPI alerts will be delivered to if the alert does not have a specific alert URL configured for it.
 
API Server
https://aeroapi.flightaware.com/aeroapi
Authentication
Required (None Applied)
CALLBACKS
deliver_alert
⥄ post
registered endpoint
CALLBACK REQUEST
REQUEST BODY*application/json; charset=UTF-8
EXAMPLESCHEMA
 
CALLBACK RESPONSE
200
Your server returns this code if it accepts the callback
RESPONSE
Endpoint updated successfully, empty response.
Remove and disable default account-wide alert callback URL
DELETE /alerts/endpoint
Remove the default account-wide URL that will be POSTed to for alerts that are not configured with a specific URL. This means that any alerts that are not configured with a specific URL will not be delivered.
API Key (x-apikey)
REQUEST
API Server
https://aeroapi.flightaware.com/aeroapi
Authentication
Required (None Applied)
RESPONSE
Endpoint successfully removed.
HISTORY
Get aircraft's last known flight
GET /history/aircraft/{registration}/last_flight
Returns flight info status summary for an aircraft's last known flight given its registration. The search is limited to flights flown since January 1, 2011. On a successful response, the body will contain a flights array with only 1 element. If a user queries a registration with it's last known flight before January 1, 2011, an empty flights array will be returned.
API Key (x-apikey)
REQUEST
PATH PARAMETERS
* registration
string	 

	The registration number of the aircraft to fetch
Example: N199UA	
API Server
https://aeroapi.flightaware.com/aeroapi
Authentication
Required (None Applied)
RESPONSE
OK
EXAMPLESCHEMA
application/json; charset=UTF-8
Copy
{
"flights": 
[
{
"ident": "string",
"ident_icao": "string",
"ident_iata": "string",
"actual_runway_off": "string",
"actual_runway_on": "string",
"fa_flight_id": "string",
"operator": "string",
"operator_icao": "string",
"operator_iata": "string",
"flight_number": "string",
"registration": "string",
"atc_ident": "string",
"inbound_fa_flight_id": "string",
"codeshares": 
[
"string"
],
"codeshares_iata": 
[
"string"
],
"blocked": false,
"diverted": false,
"cancelled": false,
"position_only": false,
"origin": 
{
"code": "string",
"code_icao": "string",
"code_iata": "string",
"code_lid": "string",
"timezone": "America/New_York",
"name": "LaGuardia",
"city": "New York",
"airport_info_url": ""
},
"destination": 
{
"code": "string",
"code_icao": "string",
"code_iata": "string",
"code_lid": "string",
"timezone": "America/New_York",
"name": "LaGuardia",
"city": "New York",
"airport_info_url": ""
},
"departure_delay": 0,
"arrival_delay": 0,
"filed_ete": 0,
"progress_percent": 0,
"status": "string",
"aircraft_type": "string",
"route_distance": 0,
"filed_airspeed": 0,
"filed_altitude": 0,
"route": "string",
"baggage_claim": "string",
"seats_cabin_business": 0,
"seats_cabin_coach": 0,
"seats_cabin_first": 0,
"gate_origin": "string",
"gate_destination": "string",
"terminal_origin": "string",
"terminal_destination": "string",
"type": "General_Aviation",
"scheduled_out": "2021-12-31T19:59:59Z",
"estimated_out": "2021-12-31T19:59:59Z",
"actual_out": "2021-12-31T19:59:59Z",
"scheduled_off": "2021-12-31T19:59:59Z",
"estimated_off": "2021-12-31T19:59:59Z",
"actual_off": "2021-12-31T19:59:59Z",
"scheduled_on": "2021-12-31T19:59:59Z",
"estimated_on": "2021-12-31T19:59:59Z",
"actual_on": "2021-12-31T19:59:59Z",
"scheduled_in": "2021-12-31T19:59:59Z",
"estimated_in": "2021-12-31T19:59:59Z",
"actual_in": "2021-12-31T19:59:59Z"
}
]
}
Get historical flights that were planned to arrive at an airport
GET /history/airports/{id}/flights/arrivals
Returns all flights that were planned to arrive at a given airport between the requested start and end date, including canceled flights. The span between start and end date parameters can be up to 1 day (24 hours). No more than 40 pages may be requested at once. Data is available between 2011-01-01 00:00:00 UTC and up to 15 days prior to current datetime. The field inbound_fa_flight_id will not be populated by this resource.
API Key (x-apikey)
REQUEST
PATH PARAMETERS
* id
string	 

	ICAO, IATA or LID ID of destination airport to fetch. ICAO is highly preferred to prevent ambiguity and reduce risk of missing data results.
Example: KIAH ┃ IAH	
QUERY-STRING PARAMETERS
airline
string	 

	Airline to filter flights by. Do not provide airline if type is provided.
Example: UAL	
type
enum	 
Allowed: General_Aviation ┃ Airline	
	Type of flights to return. Do not provide type if airline is provided.	
* start
string	 

	The starting date range for flight results, comparing against flight's scheduled_on field (which represents the flight’s planned ON the ground time). The format is ISO8601 date or datetime, and the bound is inclusive. Specified start date must occur on or after 2011-01-01 00:00:00 UTC and the most recent it can be is 15 days ago from today. If using date instead of datetime, the time will default to 00:00:00Z.
Example: 2024-10-05T19:59:59Z ┃ 2024-10-05	
* end
string	 

	The ending date range for flight results, comparing against flight's scheduled_on field (which represents the flight’s planned ON the ground time), The format is ISO8601 date or datetime, and the bound is exclusive. Specified end date must occur after 2011-01-01 00:00:00 UTC and the most recent it can be is 15 days ago from today. If using date instead of datetime, the time will default to 00:00:00Z.
Example: 2024-10-06T19:59:59Z ┃ 2024-10-06	
max_pages
integer	 
Default: 1
Min 1	
	Maximum number of pages to fetch. This is an upper limit and not a guarantee of how many pages will be returned.	
cursor
string	 

	Opaque value used to get the next batch of data from a paged collection.	
API Server
https://aeroapi.flightaware.com/aeroapi
Authentication
Required (None Applied)
RESPONSE
OK
EXAMPLESCHEMA
application/json; charset=UTF-8
Copy
{
"links": 
{
"next": ""
},
"num_pages": 1,
"arrivals": 
[
{
"ident": "string",
"ident_icao": "string",
"ident_iata": "string",
"actual_runway_off": "string",
"actual_runway_on": "string",
"fa_flight_id": "string",
"operator": "string",
"operator_icao": "string",
"operator_iata": "string",
"flight_number": "string",
"registration": "string",
"atc_ident": "string",
"inbound_fa_flight_id": "string",
"codeshares": 
[
"string"
],
"codeshares_iata": 
[
"string"
],
"blocked": false,
"diverted": false,
"cancelled": false,
"position_only": false,
"origin": 
{
"code": "string",
"code_icao": "string",
"code_iata": "string",
"code_lid": "string",
"timezone": "America/New_York",
"name": "LaGuardia",
"city": "New York",
"airport_info_url": ""
},
"destination": 
{
"code": "string",
"code_icao": "string",
"code_iata": "string",
"code_lid": "string",
"timezone": "America/New_York",
"name": "LaGuardia",
"city": "New York",
"airport_info_url": ""
},
"departure_delay": 0,
"arrival_delay": 0,
"filed_ete": 0,
"progress_percent": 0,
"status": "string",
"aircraft_type": "string",
"route_distance": 0,
"filed_airspeed": 0,
"filed_altitude": 0,
"route": "string",
"baggage_claim": "string",
"seats_cabin_business": 0,
"seats_cabin_coach": 0,
"seats_cabin_first": 0,
"gate_origin": "string",
"gate_destination": "string",
"terminal_origin": "string",
"terminal_destination": "string",
"type": "General_Aviation",
"scheduled_out": "2021-12-31T19:59:59Z",
"estimated_out": "2021-12-31T19:59:59Z",
"actual_out": "2021-12-31T19:59:59Z",
"scheduled_off": "2021-12-31T19:59:59Z",
"estimated_off": "2021-12-31T19:59:59Z",
"actual_off": "2021-12-31T19:59:59Z",
"scheduled_on": "2021-12-31T19:59:59Z",
"estimated_on": "2021-12-31T19:59:59Z",
"actual_on": "2021-12-31T19:59:59Z",
"scheduled_in": "2021-12-31T19:59:59Z",
"estimated_in": "2021-12-31T19:59:59Z",
"actual_in": "2021-12-31T19:59:59Z"
}
]
}
Get historical flights that were planned to depart from an airport
GET /history/airports/{id}/flights/departures
Returns all flights that were planned to depart from a given airport between the requested start and end date, including canceled flights. The span between start and end date parameters can be up to 1 day (24 hours). No more than 40 pages may be requested at once. Data is available between 2011-01-01 00:00:00 UTC and up to 15 days prior to current datetime. The field inbound_fa_flight_id will not be populated by this resource.
API Key (x-apikey)
REQUEST
PATH PARAMETERS
* id
string	 

	ICAO, IATA or LID ID of destination airport to fetch. ICAO is highly preferred to prevent ambiguity and reduce risk of missing data results.
Example: KIAH ┃ IAH	
QUERY-STRING PARAMETERS
airline
string	 

	Airline to filter flights by. Do not provide airline if type is provided.
Example: UAL	
type
enum	 
Allowed: General_Aviation ┃ Airline	
	Type of flights to return. Do not provide type if airline is provided.	
* start
string	 

	The starting date range for flight results, comparing against flight's scheduled_off field (which represents the flight’s planned OFF the ground time). The format is ISO8601 date or datetime, and the bound is inclusive. Specified start date must occur on or after 2011-01-01 00:00:00 UTC and the most recent it can be is 15 days ago from today. If using date instead of datetime, the time will default to 00:00:00Z.
Example: 2024-10-05T19:59:59Z ┃ 2024-10-05	
* end
string	 

	The ending date range for flight results, comparing against flight's scheduled_off field (which represents the flight’s planned OFF the ground time) The format is ISO8601 date or datetime, and the bound is exclusive. Specified end date must occur after 2011-01-01 00:00:00 UTC and the most recent it can be is 15 days ago from today. If using date instead of datetime, the time will default to 00:00:00Z.
Example: 2024-10-06T19:59:59Z ┃ 2024-10-06	
max_pages
integer	 
Default: 1
Min 1	
	Maximum number of pages to fetch. This is an upper limit and not a guarantee of how many pages will be returned.	
cursor
string	 

	Opaque value used to get the next batch of data from a paged collection.	
API Server
https://aeroapi.flightaware.com/aeroapi
Authentication
Required (None Applied)
RESPONSE
OK
EXAMPLESCHEMA
application/json; charset=UTF-8
Copy
{
"links": 
{
"next": ""
},
"num_pages": 1,
"departures": 
[
{
"ident": "string",
"ident_icao": "string",
"ident_iata": "string",
"actual_runway_off": "string",
"actual_runway_on": "string",
"fa_flight_id": "string",
"operator": "string",
"operator_icao": "string",
"operator_iata": "string",
"flight_number": "string",
"registration": "string",
"atc_ident": "string",
"inbound_fa_flight_id": "string",
"codeshares": 
[
"string"
],
"codeshares_iata": 
[
"string"
],
"blocked": false,
"diverted": false,
"cancelled": false,
"position_only": false,
"origin": 
{
"code": "string",
"code_icao": "string",
"code_iata": "string",
"code_lid": "string",
"timezone": "America/New_York",
"name": "LaGuardia",
"city": "New York",
"airport_info_url": ""
},
"destination": 
{
"code": "string",
"code_icao": "string",
"code_iata": "string",
"code_lid": "string",
"timezone": "America/New_York",
"name": "LaGuardia",
"city": "New York",
"airport_info_url": ""
},
"departure_delay": 0,
"arrival_delay": 0,
"filed_ete": 0,
"progress_percent": 0,
"status": "string",
"aircraft_type": "string",
"route_distance": 0,
"filed_airspeed": 0,
"filed_altitude": 0,
"route": "string",
"baggage_claim": "string",
"seats_cabin_business": 0,
"seats_cabin_coach": 0,
"seats_cabin_first": 0,
"gate_origin": "string",
"gate_destination": "string",
"terminal_origin": "string",
"terminal_destination": "string",
"type": "General_Aviation",
"scheduled_out": "2021-12-31T19:59:59Z",
"estimated_out": "2021-12-31T19:59:59Z",
"actual_out": "2021-12-31T19:59:59Z",
"scheduled_off": "2021-12-31T19:59:59Z",
"estimated_off": "2021-12-31T19:59:59Z",
"actual_off": "2021-12-31T19:59:59Z",
"scheduled_on": "2021-12-31T19:59:59Z",
"estimated_on": "2021-12-31T19:59:59Z",
"actual_on": "2021-12-31T19:59:59Z",
"scheduled_in": "2021-12-31T19:59:59Z",
"estimated_in": "2021-12-31T19:59:59Z",
"actual_in": "2021-12-31T19:59:59Z"
}
]
}
Get historical flights with a specific origin and destination
GET /history/airports/{id}/flights/to/{dest_id}
This endpoint is the historical version of the /airports/{id}/flights/to/{dest_id} endpoint with a few differences. Returns all flights that departed from a given airport and arrived at a specified airport between the requested start and end date. The span between start and end date parameters can be up to 1 day (24 hours). No more than 40 pages may be requested at once. Data is available between 2011-01-01 00:00:00 UTC and up to 15 days prior to current datetime. Results only include non-stop flights. The field inbound_fa_flight_id will not be populated by this resource.
API Key (x-apikey)
REQUEST
PATH PARAMETERS
* id
string	 

	ICAO, IATA or LID ID of destination airport to fetch. ICAO is highly preferred to prevent ambiguity and reduce risk of missing data results.
Example: KIAH ┃ IAH	
* dest_id
string	 

	ICAO, IATA or LID ID of destination airport to fetch. ICAO is highly preferred to prevent ambiguity.
Example: KLAX ┃ LAX	
QUERY-STRING PARAMETERS
airline
string	 

	Airline to filter flights by. Do not provide airline if type is provided.
Example: UAL	
type
enum	 
Allowed: General_Aviation ┃ Airline	
	Type of flights to return. Do not provide type if airline is provided.	
* start
string	 

	The starting date range for flight results, comparing against flight's scheduled_off field (which represents the flight’s planned OFF the ground time). The format is ISO8601 date or datetime, and the bound is inclusive. Specified start date must occur on or after 2011-01-01 00:00:00 UTC and the most recent it can be is 15 days ago from today. If using date instead of datetime, the time will default to 00:00:00Z.
Example: 2024-10-05T19:59:59Z ┃ 2024-10-05	
* end
string	 

	The ending date range for flight results, comparing against flight's scheduled_off field (which represents the flight’s planned OFF the ground time) The format is ISO8601 date or datetime, and the bound is exclusive. Specified end date must occur after 2011-01-01 00:00:00 UTC and the most recent it can be is 15 days ago from today. If using date instead of datetime, the time will default to 00:00:00Z.
Example: 2024-10-06T19:59:59Z ┃ 2024-10-06	
max_pages
integer	 
Default: 1
Min 1	
	Maximum number of pages to fetch. This is an upper limit and not a guarantee of how many pages will be returned.	
cursor
string	 

	Opaque value used to get the next batch of data from a paged collection.	
API Server
https://aeroapi.flightaware.com/aeroapi
Authentication
Required (None Applied)
RESPONSE
OK
EXAMPLESCHEMA
application/json; charset=UTF-8
Copy
{
"links": 
{
"next": ""
},
"num_pages": 1,
"flights": 
[
{
"ident": "string",
"ident_icao": "string",
"ident_iata": "string",
"actual_runway_off": "string",
"actual_runway_on": "string",
"fa_flight_id": "string",
"operator": "string",
"operator_icao": "string",
"operator_iata": "string",
"flight_number": "string",
"registration": "string",
"atc_ident": "string",
"inbound_fa_flight_id": "string",
"codeshares": 
[
"string"
],
"codeshares_iata": 
[
"string"
],
"blocked": false,
"diverted": false,
"cancelled": false,
"position_only": false,
"origin": 
{
"code": "string",
"code_icao": "string",
"code_iata": "string",
"code_lid": "string",
"timezone": "America/New_York",
"name": "LaGuardia",
"city": "New York",
"airport_info_url": ""
},
"destination": 
{
"code": "string",
"code_icao": "string",
"code_iata": "string",
"code_lid": "string",
"timezone": "America/New_York",
"name": "LaGuardia",
"city": "New York",
"airport_info_url": ""
},
"departure_delay": 0,
"arrival_delay": 0,
"filed_ete": 0,
"progress_percent": 0,
"status": "string",
"aircraft_type": "string",
"route_distance": 0,
"filed_airspeed": 0,
"filed_altitude": 0,
"route": "string",
"baggage_claim": "string",
"seats_cabin_business": 0,
"seats_cabin_coach": 0,
"seats_cabin_first": 0,
"gate_origin": "string",
"gate_destination": "string",
"terminal_origin": "string",
"terminal_destination": "string",
"type": "General_Aviation",
"scheduled_out": "2021-12-31T19:59:59Z",
"estimated_out": "2021-12-31T19:59:59Z",
"actual_out": "2021-12-31T19:59:59Z",
"scheduled_off": "2021-12-31T19:59:59Z",
"estimated_off": "2021-12-31T19:59:59Z",
"actual_off": "2021-12-31T19:59:59Z",
"scheduled_on": "2021-12-31T19:59:59Z",
"estimated_on": "2021-12-31T19:59:59Z",
"actual_on": "2021-12-31T19:59:59Z",
"scheduled_in": "2021-12-31T19:59:59Z",
"estimated_in": "2021-12-31T19:59:59Z",
"actual_in": "2021-12-31T19:59:59Z"
}
]
}
Get an image of a historical flight's track on a map
GET /history/flights/{id}/map
Returns a historical flight's track as a base64-encoded image. Image can contain a variety of additional data layers beyond just the track. Data is available from now back to 2011-01-01T00:00:00Z.
API Key (x-apikey)
REQUEST
PATH PARAMETERS
* id
string	 

	The fa_flight_id to fetch
Example: UAL1234-1234567890-airline-0123	
QUERY-STRING PARAMETERS
height
integer	 
Default: 480
Min 1┃Max 1500
	Height of requested image (pixels)
width
integer	 
Default: 640
Min 1┃Max 1500
	Width of requested image (pixels)
layer_on
array of string	 
Allowed: US Cities ┃ european country boundaries ┃ asia country boundaries ┃ major airports ┃ country boundaries ┃ US state boundaries ┃ water ┃ US major roads ┃ radar ┃ track ┃ flights ┃ airports
	List of map layers to enable
layer_off
array of string	 
Allowed: US Cities ┃ european country boundaries ┃ asia country boundaries ┃ major airports ┃ country boundaries ┃ US state boundaries ┃ water ┃ US major roads ┃ radar ┃ track ┃ flights ┃ airports
	List of map layers to disable
show_data_block
boolean	 
Default: false
	Whether a textual caption containing the ident, type, heading, altitude, origin, and destination should be displayed by the flight's position.
airports_expand_view
boolean	 
Default: false
	Whether to force zoom area to ensure origin/destination airports are visible. Enabling this flag forcefully enables the show_airports flag as well.
show_airports
boolean	 
Default: false
	Whether to show the origin/destination airports for the flight as labeled points on the map.
bounding_box
array of number	 

	Manually specify the zoom area of the map using custom bounds. Should be a list of 4 coordinates representing the top, right, bottom, and left sides of the area (in that order).	
API Server
https://aeroapi.flightaware.com/aeroapi
Authentication
Required (None Applied)
RESPONSE
OK
EXAMPLESCHEMA
application/json; charset=UTF-8
Copy
{
"map": ""
}
Get historical flight's filed route
GET /history/flights/{id}/route
Returns information about a historical flight's filed route including coordinates, names, and types of fixes along the route. Not all flight routes can be successfully decoded by this endpoint, particularly if the flight is not entirely within the continental U.S. airspace, since this function only has access to navaids within that area. If data on a waypoint is missing then the type will be listed as "UNKNOWN". Data is available from now back to 2011-01-01T00:00:00Z.
API Key (x-apikey)
REQUEST
PATH PARAMETERS
* id
string	 

	The fa_flight_id to fetch
Example: UAL1234-1234567890-airline-0123	
API Server
https://aeroapi.flightaware.com/aeroapi
Authentication
Required (None Applied)
RESPONSE
OK
EXAMPLESCHEMA
application/json; charset=UTF-8
Copy
{
"route_distance": "string",
"fixes": 
[
{
"name": "string",
"latitude": 0,
"longitude": 0,
"distance_from_origin": 0,
"distance_this_leg": 0,
"distance_to_destination": 0,
"outbound_course": 0,
"type": "string"
}
]
}
Get historical information for a flight's track
GET /history/flights/{id}/track
Returns the track for a historical flight as an array of positions. By default only actual airborne positions will be included. Surface positions (aircraft taxi movement at supported airports) can be requested using the query-string parameters. Data is available from now back to 2011-01-01T00:00:00Z.
API Key (x-apikey)
REQUEST
PATH PARAMETERS
* id
string	 

	The fa_flight_id to fetch
Example: UAL1234-1234567890-airline-0123	
QUERY-STRING PARAMETERS
include_estimated_positions
boolean	 
Default: false
	Whether to include estimated positions in the flight track.
include_surface_positions
boolean	 
Default: false
	Whether to include surface positions in the flight track and actual_distance computation.
API Server
https://aeroapi.flightaware.com/aeroapi
Authentication
Required (None Applied)
RESPONSE
OK
EXAMPLESCHEMA
application/json; charset=UTF-8
Copy
{
"actual_distance": 0,
"positions": 
[
{
"fa_flight_id": "string",
"altitude": 0,
"altitude_change": "C",
"groundspeed": 0,
"heading": 0,
"latitude": 0,
"longitude": 0,
"timestamp": "2021-12-31T19:59:59Z",
"update_type": "P"
}
]
}
Get information for a historical flight
GET /history/flights/{ident}
Returns historical flight info status summary for a registration, ident, or fa_flight_id. If a fa_flight_id is specified then a maximum of 1 flight is returned, unless the flight has been diverted in which case both the original flight and any diversions will be returned with a duplicate fa_flight_id. If a registraion or ident is specified then start and end date parameters must be specified. The span between start and end can be up to 7 days. No more than 40 pages may be requested at once. Data is available from now back to 2011-01-01 00:00:00 UTC.
The field inbound_fa_flight_id will not be populated by this resource.
API Key (x-apikey)
REQUEST
PATH PARAMETERS
* ident
string	 

	The ident, registration, or fa_flight_id to fetch. If using a flight ident, it is highly recommended to specify ICAO flight ident rather than IATA flight ident to avoid ambiguity and unexpected results. Setting the ident_type can also be used to help disambiguate.
Example: UAL4 ┃ N123HQ ┃ UAL1234-1234567890-airline-0123	
QUERY-STRING PARAMETERS
ident_type
enum	 
Allowed: designator ┃ registration ┃ fa_flight_id
	Type of ident provided in the ident parameter. By default, the passed ident is interpreted as a registration if possible. This parameter can force the ident to be interpreted as a designator instead.
start
string	 

	The starting date range for flight results, comparing against flights' scheduled_out field (or scheduled_off if scheduled_out is missing). The format is ISO8601 date or datetime, and the bound is inclusive. Specified start date must occur on or after 2011-01-01 00:00:00 UTC and cannot be in the future. If using date instead of datetime, the time will default to 00:00:00Z.
Example: 2024-10-05T19:59:59Z ┃ 2024-10-05	
end
string	 

	The ending date range for flight results, comparing against flights' scheduled_out field (or scheduled_off if scheduled_out is missing). The format is ISO8601 date or datetime, and the bound is exclusive. Specified end date must occur after 2011-01-01 00:00:00 UTC and cannot be in the future. If using date instead of datetime, the time will default to 00:00:00Z.
Example: 2024-10-10T19:59:59Z ┃ 2024-10-10	
max_pages
integer	 
Default: 1
Min 1	
	Maximum number of pages to fetch. This is an upper limit and not a guarantee of how many pages will be returned.	
cursor
string	 

	Opaque value used to get the next batch of data from a paged collection.	
API Server
https://aeroapi.flightaware.com/aeroapi
Authentication
Required (None Applied)
RESPONSE
OK
EXAMPLESCHEMA
application/json; charset=UTF-8
Copy
{
"links": 
{
"next": ""
},
"num_pages": 1,
"flights": 
[
{
"ident": "string",
"ident_icao": "string",
"ident_iata": "string",
"actual_runway_off": "string",
"actual_runway_on": "string",
"fa_flight_id": "string",
"operator": "string",
"operator_icao": "string",
"operator_iata": "string",
"flight_number": "string",
"registration": "string",
"atc_ident": "string",
"inbound_fa_flight_id": "string",
"codeshares": 
[
"string"
],
"codeshares_iata": 
[
"string"
],
"blocked": false,
"diverted": false,
"cancelled": false,
"position_only": false,
"origin": 
{
"code": "string",
"code_icao": "string",
"code_iata": "string",
"code_lid": "string",
"timezone": "America/New_York",
"name": "LaGuardia",
"city": "New York",
"airport_info_url": ""
},
"destination": 
{
"code": "string",
"code_icao": "string",
"code_iata": "string",
"code_lid": "string",
"timezone": "America/New_York",
"name": "LaGuardia",
"city": "New York",
"airport_info_url": ""
},
"departure_delay": 0,
"arrival_delay": 0,
"filed_ete": 0,
"progress_percent": 0,
"status": "string",
"aircraft_type": "string",
"route_distance": 0,
"filed_airspeed": 0,
"filed_altitude": 0,
"route": "string",
"baggage_claim": "string",
"seats_cabin_business": 0,
"seats_cabin_coach": 0,
"seats_cabin_first": 0,
"gate_origin": "string",
"gate_destination": "string",
"terminal_origin": "string",
"terminal_destination": "string",
"type": "General_Aviation",
"scheduled_out": "2021-12-31T19:59:59Z",
"estimated_out": "2021-12-31T19:59:59Z",
"actual_out": "2021-12-31T19:59:59Z",
"scheduled_off": "2021-12-31T19:59:59Z",
"estimated_off": "2021-12-31T19:59:59Z",
"actual_off": "2021-12-31T19:59:59Z",
"scheduled_on": "2021-12-31T19:59:59Z",
"estimated_on": "2021-12-31T19:59:59Z",
"actual_on": "2021-12-31T19:59:59Z",
"scheduled_in": "2021-12-31T19:59:59Z",
"estimated_in": "2021-12-31T19:59:59Z",
"actual_in": "2021-12-31T19:59:59Z",
"foresight_predictions_available": true
}
]
}
Get historical flights for a given operator
GET /history/operators/{id}/flights
This endpoint is the historical version of the /operators/{id}/flights endpoint with a few differences. Returns all flights from a given operator between the requested start and end date. The span between start and end date parameters can be up to 1 day (24 hours). No more than 40 pages may be requested at once. Data is available between 2011-01-01 00:00:00 UTC and up to 15 days prior to current datetime. Results only include non-stop flights. The field inbound_fa_flight_id will not be populated by this resource.
API Key (x-apikey)
REQUEST
PATH PARAMETERS
* id
string	 

	The ICAO or IATA identifier for an operator. The use of ICAO code is strongly preferred. In the case of non-unique IATA codes the operator with the lexicographically first ICAO code will be returned.
Example: UAL	
QUERY-STRING PARAMETERS
* start
string	 

	The starting date range for flight results, comparing against flight's scheduled_off field (which represents the flight’s planned OFF the ground time). The format is ISO8601 date or datetime, and the bound is inclusive. Specified start date must occur on or after 2011-01-01 00:00:00 UTC and the most recent it can be is 15 days ago from today. If using date instead of datetime, the time will default to 00:00:00Z.
Example: 2024-10-05T19:59:59Z ┃ 2024-10-05	
* end
string	 

	The ending date range for flight results, comparing against flight's scheduled_off field (which represents the flight’s planned OFF the ground time) The format is ISO8601 date or datetime, and the bound is exclusive. Specified end date must occur after 2011-01-01 00:00:00 UTC and the most recent it can be is 15 days ago from today. If using date instead of datetime, the time will default to 00:00:00Z.
Example: 2024-10-06T19:59:59Z ┃ 2024-10-06	
max_pages
integer	 
Default: 1
Min 1	
	Maximum number of pages to fetch. This is an upper limit and not a guarantee of how many pages will be returned.	
cursor
string	 

	Opaque value used to get the next batch of data from a paged collection.	
API Server
https://aeroapi.flightaware.com/aeroapi
Authentication
Required (None Applied)
RESPONSE
OK
EXAMPLESCHEMA
application/json; charset=UTF-8
Copy
{
"links": 
{
"next": ""
},
"num_pages": 1,
"flights": 
[
{
"ident": "string",
"ident_icao": "string",
"ident_iata": "string",
"actual_runway_off": "string",
"actual_runway_on": "string",
"fa_flight_id": "string",
"operator": "string",
"operator_icao": "string",
"operator_iata": "string",
"flight_number": "string",
"registration": "string",
"atc_ident": "string",
"inbound_fa_flight_id": "string",
"codeshares": 
[
"string"
],
"codeshares_iata": 
[
"string"
],
"blocked": false,
"diverted": false,
"cancelled": false,
"position_only": false,
"origin": 
{
"code": "string",
"code_icao": "string",
"code_iata": "string",
"code_lid": "string",
"timezone": "America/New_York",
"name": "LaGuardia",
"city": "New York",
"airport_info_url": ""
},
"destination": 
{
"code": "string",
"code_icao": "string",
"code_iata": "string",
"code_lid": "string",
"timezone": "America/New_York",
"name": "LaGuardia",
"city": "New York",
"airport_info_url": ""
},
"departure_delay": 0,
"arrival_delay": 0,
"filed_ete": 0,
"progress_percent": 0,
"status": "string",
"aircraft_type": "string",
"route_distance": 0,
"filed_airspeed": 0,
"filed_altitude": 0,
"route": "string",
"baggage_claim": "string",
"seats_cabin_business": 0,
"seats_cabin_coach": 0,
"seats_cabin_first": 0,
"gate_origin": "string",
"gate_destination": "string",
"terminal_origin": "string",
"terminal_destination": "string",
"type": "General_Aviation",
"scheduled_out": "2021-12-31T19:59:59Z",
"estimated_out": "2021-12-31T19:59:59Z",
"actual_out": "2021-12-31T19:59:59Z",
"scheduled_off": "2021-12-31T19:59:59Z",
"estimated_off": "2021-12-31T19:59:59Z",
"actual_off": "2021-12-31T19:59:59Z",
"scheduled_on": "2021-12-31T19:59:59Z",
"estimated_on": "2021-12-31T19:59:59Z",
"actual_on": "2021-12-31T19:59:59Z",
"scheduled_in": "2021-12-31T19:59:59Z",
"estimated_in": "2021-12-31T19:59:59Z",
"actual_in": "2021-12-31T19:59:59Z"
}
]
}
MISCELLANEOUS
Check if a given ident is blocked
GET /aircraft/{ident}/blocked
Given an aircraft identification, returns true if the aircraft is blocked from public tracking per request from the owner/operator, false if it is not blocked. Any IATA-like idents will be translated to ICAO before lookup. When marked as blocked, no associated flight information will be visible in AeroAPI. FlightAware can provide aircraft owner/operators with secure access to their blocked flight data by contacting FlightAware for help.
API Key (x-apikey)
REQUEST
PATH PARAMETERS
* ident
string	 

	The ident or registration of the aircraft
Example: RPA4854 ┃ N123HQ	
API Server
https://aeroapi.flightaware.com/aeroapi
Authentication
Required (None Applied)
RESPONSE
OK
EXAMPLESCHEMA
application/json; charset=UTF-8
Copy
{
"blocked": false
}
Get the owner of an aircraft
GET /aircraft/{ident}/owner
Returns information about the owner of an aircraft, given a flight number or aircraft registration. Data returned includes owner's name, location (typically city and state), and website, if any. Codeshares and alternate idents are automatically searched. Specific owner name information is limited to ownership within the US (sourced by the FAA), Australia, and New Zealand. Note that while this information is updated weekly, there may be a lag in upstream data sources reflecting a change in ownership.
API Key (x-apikey)
REQUEST
PATH PARAMETERS
* ident
string	 

	The ident or registration of the aircraft
Example: RPA4854 ┃ N123HQ	
API Server
https://aeroapi.flightaware.com/aeroapi
Authentication
Required (None Applied)
RESPONSE
OK
EXAMPLESCHEMA
application/json; charset=UTF-8
Copy
{
"owner": 
{
"name": "string",
"location": "string",
"location2": "string",
"website": "string"
}
}
Get information about an aircraft type
GET /aircraft/types/{type}
Returns information about an aircraft type, given an ICAO aircraft type designator string. Data returned includes the description, type, manufacturer, engine type, and engine count.
API Key (x-apikey)
REQUEST
PATH PARAMETERS
* type
string	 

	The ICAO aircraft type designator for the aircraft to fetch information for
Example: GALX	
API Server
https://aeroapi.flightaware.com/aeroapi
Authentication
Required (None Applied)
RESPONSE
OK
EXAMPLESCHEMA
application/json; charset=UTF-8
Copy
{
"manufacturer": "string",
"type": "string",
"description": "string",
"engine_count": 0,
"engine_type": "string"
}
Get global flight disruption statistics
GET /disruption_counts/{entity_type}
Returns overall flight cancellation or delay counts in the specified time period for either all airlines or all airports.
Cancellation Counts
A cancelled flight will be counted if their scheduled_out (or scheduled_off if scheduled_out is missing) time falls within the specified time period. Cancellation counts are calculated at query time based on airline partner data and only count airline-confirmed cancellations.
Delay Counts
Delays are calculated based on the timezone of the origin airport and per day and are counted based on the specified time period. Delay statistics update cycles are re-calculated every 20 minutes and represent gate arrival delays (estimated or actual) of 15 minutes or more for flights that are not cancelled. If a delayed flight is eventually cancelled, it will be removed from the statistics count in the next update cycle.
Time Periods
When yesterday, today, tomorrow, plus2days, twoDaysAgo, and week are used as the time period, the current day is defined by the user's website timezone setting and starts at 08:00 and ends at 08:00 the next day. For example:
•	today will represent a 24-hour span starting at the current day at 08:00.
•	yesterday will represent a 24-hour span starting at 08:00 the previous day and ending at today's 08:00.
•	tomorrow will represent a 24-hour span starting at 08:00 the next day and ending at 08:00 two days from today.
•	plus2days will represent a 24-hour span starting at 08:00 two days from today and ending at 08:00 three days from today.
•	twoDaysAgo will represent a 24-hour span starting at 08:00 two days ago from today and ending at 08:00 the previous day.
•	week will represent the current 2 weeks of data indexed to the most recent Sunday's 08:00 ending at Saturday 08:00, right before 2 weeks from that Sunday.
For minus2plus12hrs and next36hrs, the time period will be centered at the current time defined by the user's website timezone setting:
•	minus2plus12hrs will start capturing statistics 2 hours ago from the current time until 12 hours after the current time.
•	next36hrs will span from the current time until 36 hours from the current time.
For delay counts, when using minus2plus12hrs and next36hrs as the time period, a flight will be counted as delayed within this specified time period if any day encompassed by the time span window, centered around the user's website timezone setting, coincides with the delayed flight's origin airport local timezone day of delay.
API Key (x-apikey)
REQUEST
PATH PARAMETERS
* entity_type
enum	 
Allowed: airline ┃ origin ┃ destination
	The type of entity to get disruption statistics for.
Example: origin
QUERY-STRING PARAMETERS
time_period
enum	 
Default: today
Allowed: yesterday ┃ today ┃ tomorrow ┃ plus2days ┃ twoDaysAgo ┃ minus2plus12hrs ┃ next36hrs ┃ week
	
max_pages
integer	 
Default: 1
Min 1
	Maximum number of pages to fetch. This is an upper limit and not a guarantee of how many pages will be returned.
cursor
string	 

	Opaque value used to get the next batch of data from a paged collection.	
API Server
https://aeroapi.flightaware.com/aeroapi
Authentication
Required (None Applied)
RESPONSE
OK
EXAMPLESCHEMA
application/json; charset=UTF-8
Copy
{
"links": 
{
"next": ""
},
"num_pages": 1,
"entities": 
[
{
"cancellations": 0,
"delays": 0,
"total": 0,
"entity_name": "string",
"entity_id": "string"
}
],
"total_cancellations_national": 0,
"total_cancellations_worldwide": 0,
"total_delays_worldwide": 0
}
Get flight disruption statistics for a particular entity
GET /disruption_counts/{entity_type}/{id}
Returns flight cancellation or delay counts in the specified time period for a particular airline or airport.
Cancellation Counts
A cancelled flight will be counted if their scheduled_out (or scheduled_off if scheduled_out is missing) time falls within the specified time period. Cancellation counts are calculated at query time based on airline partner data and only count airline-confirmed cancellations.
Delay Counts
Delays are calculated based on the timezone of the origin airport and per day and are counted based on the specified time period. Delay statistics update cycles are re-calculated every 20 minutes and represent gate arrival delays (estimated or actual) of 15 minutes or more for flights that are not cancelled. If a delayed flight is eventually cancelled, it will be removed from the statistics count in the next update cycle.
Time Periods
When yesterday, today, tomorrow, plus2days, twoDaysAgo, and week are used as the time period, the current day is defined by the user's website timezone setting and starts at 08:00 and ends at 08:00 the next day. For example:
•	today will represent a 24-hour span starting at the current day at 08:00.
•	yesterday will represent a 24-hour span starting at 08:00 the previous day and ending at today's 08:00.
•	tomorrow will represent a 24-hour span starting at 08:00 the next day and ending at 08:00 two days from today.
•	plus2days will represent a 24-hour span starting at 08:00 two days from today and ending at 08:00 three days from today.
•	twoDaysAgo will represent a 24-hour span starting at 08:00 two days ago from today and ending at 08:00 the previous day.
•	week will represent the current 2 weeks of data indexed to the most recent Sunday's 08:00 ending at Saturday 08:00, right before 2 weeks from that Sunday.
For minus2plus12hrs and next36hrs, the time period will be centered at the current time defined by the user's website timezone setting:
•	minus2plus12hrs will start capturing statistics 2 hours ago from the current time until 12 hours after the current time.
•	next36hrs will span from the current time until 36 hours from the current time.
For delay counts, when using minus2plus12hrs and next36hrs as the time period, a flight will be counted as delayed within this specified time period if any day encompassed by the time span window, centered around the user's website timezone setting, coincides with the delayed flight's origin airport local timezone day of delay.
API Key (x-apikey)
REQUEST
PATH PARAMETERS
* id
string	 

	The ICAO code for the airline or ID for the airport (ICAO, IATA, or LID) for which you are fetching disruption statistics. For airport ID, ICAO is highly preferred to prevent ambiguity.
Example: KHOU ┃ HOU	
* entity_type
enum	 
Allowed: airline ┃ origin ┃ destination	
	The type of entity to get disruption statistics for.
Example: origin	
QUERY-STRING PARAMETERS
time_period
enum	 
Default: today
Allowed: yesterday ┃ today ┃ tomorrow ┃ plus2days ┃ twoDaysAgo ┃ minus2plus12hrs ┃ next36hrs ┃ week
	
API Server
https://aeroapi.flightaware.com/aeroapi
Authentication
Required (None Applied)
RESPONSE
OK
EXAMPLESCHEMA
application/json; charset=UTF-8
Copy
{
"cancellations": 0,
"delays": 0,
"total": 0,
"entity_name": "string",
"entity_id": "string"
}
Get scheduled flights
GET /schedules/{date_start}/{date_end}
Returns scheduled flights that have been published by airlines. These schedules are available for up to three months in the past as well as one year into the future.
API Key (x-apikey)
REQUEST
PATH PARAMETERS
* date_start
string	 

	Datetime or date of earliest scheduled flight departure to return. This must be no earlier than 3 months in the past and cannot be more than 3 weeks before date_end. Violating either constraint will result in an error. If using date instead of datetime, then the time will default to 00:00:00Z.
Example: 2021-12-31T19:59:59Z ┃ 2021-12-31	
* date_end
string	 

	Datetime or date of latest scheduled flight departure to return. This must be no later than 1 year in the future and cannot be more than 3 weeks after date_start. Violating either constraint will result in an error. If using date instead of datetime, then the time will default to 00:00:00Z. Thus, the next day's date should be specified if one day of data is desired when using date instead of datetime.
Example: 2021-12-31T19:59:59Z ┃ 2021-12-31	
QUERY-STRING PARAMETERS
origin
string	 

	Only return flights with this origin airport. ICAO or IATA airport codes can be provided.
Example: KIAH ┃ IAH	
destination
string	 

	Only return flights with this destination airport. ICAO or IATA airport codes can be provided.
Example: KIAH ┃ IAH	
airline
string	 

	Only return flights flown by this carrier. ICAO or IATA carrier codes can be provided.
Example: UAL ┃ UA	
flight_number
int32	 

	Only return flights with this flight number.	
include_codeshares
boolean	 
Default: true	
	Flag indicating whether ticketing codeshares should be returned as well.	
include_regional
boolean	 
Default: true	
	Flag indicating whether regional codeshares should be returned as well.	
max_pages
integer	 
Default: 1
Min 1	
	Maximum number of pages to fetch. This is an upper limit and not a guarantee of how many pages will be returned.	
cursor
string	 

	Opaque value used to get the next batch of data from a paged collection.	
API Server
https://aeroapi.flightaware.com/aeroapi
Authentication
Required (None Applied)
RESPONSE
OK
EXAMPLESCHEMA
application/json; charset=UTF-8
Copy
{
"links": 
{
"next": ""
},
"num_pages": 1,
"scheduled": 
[
{
"ident": "string",
"ident_icao": "string",
"ident_iata": "string",
"actual_ident": "string",
"actual_ident_icao": "string",
"actual_ident_iata": "string",
"aircraft_type": "string",
"scheduled_in": "2021-12-31T19:59:59Z",
"scheduled_out": "2021-12-31T19:59:59Z",
"origin": "string",
"origin_icao": "string",
"origin_iata": "string",
"origin_lid": "string",
"destination": "string",
"destination_icao": "string",
"destination_iata": "string",
"destination_lid": "string",
"fa_flight_id": "string",
"meal_service": "string",
"seats_cabin_business": 0,
"seats_cabin_coach": 0,
"seats_cabin_first": 0
}
]
}
ACCOUNT
Get AeroAPI usage statistics for account
GET /account/usage
Returns usage statistics for your AeroAPI account. Can be filtered by key and date range. Data per account is updated every 10 minutes.
API Key (x-apikey)
REQUEST
QUERY-STRING PARAMETERS
start
string	 

	Datetime or date to start gathering usage data from. If left blank, will default to 1 year into the past. Has a maximum value of 1 year into the past. If using date instead of datetime, then the time will default to 00:00:00Z. Thus, the next day's date should be specified if one day of data is desired when using date instead of datetime.
Example: 2023-12-31T19:59:59Z ┃ 2023-12-31	
end
string	 

	Datetime or date to end gathering usage data from. If left blank, will default to the current time. Has a maximum value of 1 year into the past If using date instead of datetime, then the time will default to 00:00:00Z. Thus, the next day's date should be specified if one day of data is desired when using date instead of datetime.
Example: 2023-12-31T19:59:59Z ┃ 2023-12-31	
all_keys
boolean	 
Default: false	
	Flag to determine which key(s) to get usage data for. If False, data for the key that made the request will be retrieved. If True, data for all keys associated with the account will be retrieved.	
API Server
https://aeroapi.flightaware.com/aeroapi
Authentication
Required (None Applied)
RESPONSE
OK
EXAMPLESCHEMA
application/json; charset=UTF-8
Copy
{
"total_calls": 0,
"total_pages": 0,
"total_cost": 0,
"total_discount_cost": 0,
"total_successful_calls": 0,
"total_failed_calls": 0,
"resource_details": 
[
{
"operation": "string",
"total_resource_calls": 0,
"num_pages": 0,
"resource_cost": 0,
"successful_resource_calls": 0,
"failed_resource_calls": 0
}
]
}