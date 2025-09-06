AeroDataBox API
 1.9.0.0 
OAS 3.0 
/docs/openapi-rapidapi-v1.json
AeroDataBox API is an enthusiast-driven cost-effective aviation and flight data API tailored for small and medium businesses, individual developers, researchers, and students. It offers a wide range of data, including flight status, schedules, aircraft information, airport details, statistics, historical data, and more. Designed for seamless integration using REST and web hooks and available through major API marketplaces, it enables users to incorporate aviation information effortlessly into their systems at affordable rates.

Sign Up
Access AeroDataBox API for a price of a cup of coffee! Sign up through one of the supported API marketplaces, each offering various pricing models to suit your specific needs.

RapidAPI - most tried & tested
API.Market - free plan available
Sulu Hub - pay-per-use, no subscription, crypto accepted
Pricing details for each marketplace can be found on the pricing page.

Follow Updates
Our API constantly evolves! Visit our web-site and join our newsletter to stay in the loop. Recent updates can be found on the News & Updates page

Must-Reads
⚠️ Terms of Use <- BY SUBSCRIBING TO THE API YOU AUTOMATICALLY ACCEPT THESE TERMS
⚠️ Pricing <- CALLS ARE NOT PRICED EQUALLY
⚠️ Data Coverage <- BE AWARE OF OUR LIMITATIONS
Documentation & OpenAPI Specification
FAQ
For Students & Researchers
API Supported Response Formats
JSON (default, Accept: application/json)
XML (Accept: application/xml)
API Features
Flights API
🗓️ FIDS & Schedules (the list of current, future, and historical flights operating in a specific airport)

🗓️ Flight Status (single day) (current, future, and historical data about a specific flight operating on a specific or nearest date, found by flight number, ATC call-sign, aircraft registration, or 24-bit ICAO Mode-S address)

🗓️ Flight History & Schedule (range of dates) (the list of current, future, and historical flights operating within a specific range of dates, found by flight number, ATC call-sign, aircraft registration, or 24-bit ICAO Mode-S address)

🗓️ Flight Departure / Arrival Dates (dates when a flight operates, found by flight number, ATC call sign, aircraft registration, or 24-bit ICAO Mode-S address)

🗓️ Search Flight Numbers By Term (lookup available flight numbers by term - useful for implmenting auto-complete features)

Flight Alert API
🔔 PUSH API powered by webhooks. If you are running your own web service, you can subscribe to flights by number or airport code. After that, your HTTP endpoint will be called whenever the flight information gets updated.

Aircraft API
✈️ Get aircraft (aircraft information by aircraft tail number / registration or 24-bit ICAO Mode-S address)

✈️ Aircraft Registrations (history of current and all previous registrations of an aircraft found by aircraft tail number / registration or 24-bit ICAO Mode-S address)

✈️ Airline Fleet [BETA] - list of active aircraft of an airline

✈️ Aircraft Photo [BETA] - aircraft image by tail number (registration)

✈️ Identify an Aircraft by a Photo [BETA] - aircraft information found by uploading an aircraft photo containing a visible tail number (registration)

✈️ Search Aircraft Tail Numbers By Term (lookup active aircraft tail numbers by term - useful for implmenting auto-complete features)

Airport API
🌎 Get Airport (airport information retrieved by IATA or ICAO codes, incl. name, location, administrative information, elevation, etc.)

🌎 Airport Runways (Information about airport runways: threshold, dimensions, lighting, surface, number, heading, etc. by IATA or ICAO code)

🌎 Search of Closest Airports by Location (find airports closest to specified location)

🌎 Search of Closest Airports by IP Geolocation (geo-locate specified IP address and find airports closest to this location)

🌎 Airports Free-text Search (look up an airport by free text, useful for implementing auto-complete functionality)

Industry API
🏭 FAA LADD Aircraft Status. Easy access to the status of the aircraft in the Limiting Aircraft Displayed program of the Federal Aviation Administration of the U.S. Department of Transportation (FAA LADD)

Statistical API
📊 Airport & Global Worldwide delays. How many flights are delayed or canceled right now or in the past? Delay statistics and delay index at an airport now and back then.

📊 Airport Daily Routes Statistics. Where flights are going from this airport and how many flights a day occur in these directions?

📊 Flight Delay Statistics. How often is the flight delayed and how much? Detailed statistics grouped by hours and airport of departure/arrival, delay brackets and percentiles

Miscellaneous API
🕝 Local Time at the Airport Get local time by specifying just an IATA or ICAO code of the airport

🌅 Solar and Day Time at the Airport. Calculation of sunset, sunrise, civil, nautical and astronomical dusk / dawn times, golden and blue hours, sun elevation and azimuth.

🌎 Distance between airports. Calculate the great-circle distance between airports

⏱️ Flight Time between Airports. Calculate theoretical and realistic (🤖 machine-learning baand hsed) flight time between specified airports

🌨️Weather / Forecast at the Airport. Current weather and forecast for up to 48 hours, METARs, TAFs

🌎 List of all countries

Other Reads
🤖 Machine Learning-Based Realistic Flight Time Calculation
Airport Delays
Runway detection
FAA LADD
Is it good for my case?
AeroDataBox is a niche enthusiast-driven aviation and flights API with certain limitations that we openly communicate. We do our best to under-promise and over-deliver. But is an enthusiast-driven API good for your case anyway? That depends!

If you’re developing a small or medium business (SMB / SME) or an application developer who does not require a tough service-level agreement (SLA) or an exhaustive worldwide coverage, our API is just right for you! However, at this point we discourage (and even do not allow in some cases) using our API for mission-critical or enterprise-level products where people may be hurt or severe damage can occur if the API fails for any reason.

Having said that, we’re are working hard to improve this. We expect to implement SLAs and direct access to our API and other data services with extra stability and high availability under special premium terms soon. Read more in our FAQ.

If you need it earlier or should you have special needs, please do contact us and tell us your story! We already have a record of implementing custom solutions tailored for needs of our customers.

Support
For direct contact, please reach out to us via e-mail at info@aerodatabox.com.

Before sending a message, please take some time to review the documentation and must-read website pages (at least data coverage and FAQ). These pages address roughly 80% of the questions we receive on day-to-day basis.

API Availability
Last 7 days



Last 30 days



Uptime Status

Endpoint Labes
🤖 - endpoint uses or may use AI/ML algorithms

[TIER 1]..[TIER 4] - the tier level of the endpoint, where TIER 4 is the highest and TIER 1 is the lowest. The tier level is used to determine the pricing of the endpoint. Depending on the marketplace, different pricing models may be used, but you can expect that higher tier endpoints will be more expensive than lower tier endpoints.

[FREE TIER] - the endpoint is available for free on all marketplaces.

Pricing details can be found on the pricing page.

Terms of service
Contact the developer
Servers

https://aerodatabox.p.rapidapi.com/ - RapidAPI Gateway

Authorize
Aircraft API


GET
/aircrafts/{searchBy}/{searchParam}
Single aircraft (by tail-number, Mode-S or ID) [TIER 1]


Returns: Single aircraft, best matching specified search criteria, if found. Please note that all found aircraft will be impersonated with registration information matching the requested tail number or Mode-S even though an aircraft might be flying under a different registration right now.

Parameters
Try it out
Name	Description
searchBy *
string
(path)
Criteria to search aircraft by

Available values : Id, Reg, Icao24


Id
searchParam *
string
(path)
Value of the search criteria. If searchBy is:

id: then this field should be an ID of an aircraft (as specified in the database of this API);
reg: then this field should be a tail-number of an aircraft (with or without spaces or dashes, any case formats are acceptable, e.g.PH-BXO, DeMhJ), multiple matches are possible - see below;
icao24, then this field should be a ICAO 24-bit Mode-S address of an aircraft specified in hexadecimal format (e.g. 484161, 483EFD), multiple matches are possible - see below.
If multiple matches are possible:

There cannot be more than one aircraft actively flying with the same tail-number or ICAO 24-bit Mode-S address at any moment of time. However, historically aircraft tail-numbers or addresses may be used multiple times by different aircraft. This endpoint is supposed to return a single aircraft data. In case if multiple aircraft satisfy the search criteria, the best match will be chosen as follows:

If an active aircraft is found according to the requested critera, it is returned.
Otherwise, an aircraft that used requested tail-number/address the most recently is returned.
If usage time may not be determined, the aircraft stored in the database the most recently is returned.
searchParam
withImage
boolean
(query)
Should include aircraft image (default: false).

Default value : false


false
withRegistrations
boolean
(query)
Should include the history of aircraft registrations (default: false).

Default value : false


false
Responses
Code	Description	Links
200	
OK

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "id": 0,
  "reg": "string",
  "active": true,
  "serial": "string",
  "hexIcao": "string",
  "airlineName": "string",
  "iataType": "string",
  "iataCodeShort": "string",
  "icaoCode": "string",
  "model": "string",
  "modelCode": "string",
  "numSeats": 0,
  "rolloutDate": "2025-09-06T19:19:43.185Z",
  "firstFlightDate": "2025-09-06T19:19:43.185Z",
  "deliveryDate": "2025-09-06T19:19:43.185Z",
  "registrationDate": "2025-09-06T19:19:43.185Z",
  "typeName": "string",
  "numEngines": 0,
  "engineType": "Unknown",
  "isFreighter": true,
  "productionLine": "string",
  "ageYears": 0,
  "verified": true,
  "image": {
    "url": "string",
    "webUrl": "string",
    "author": "string",
    "title": "string",
    "description": "string",
    "license": "AllRightsReserved",
    "htmlAttributions": [
      "string"
    ]
  },
  "numRegistrations": 0,
  "registrations": [
    {
      "reg": "string",
      "active": true,
      "hexIcao": "string",
      "airlineName": "string",
      "registrationDate": "2025-09-06T19:19:43.185Z"
    }
  ]
}
No links
204	
No Content

No links
400	
Bad Request

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
401	
Unauthorized

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
451	
Unavailable For Legal Reasons

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
500	
Internal Server Error

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
503	
Service Unavailable

No links

GET
/aircrafts/{searchBy}/{searchParam}/registrations
Single aircraft registration history (by tail-number, Mode-S or ID) [TIER 1]


Returns: A list of all known registrations of a single aircraft, best matching specified search criteria, if found

Parameters
Try it out
Name	Description
searchBy *
string
(path)
Criteria to search aircraft by

Available values : Id, Reg, Icao24


Id
searchParam *
string
(path)
Value of the search criteria. If searchBy is:

id, then this field should be an ID of an aircraft (as specified in the database of this API);
reg, then this field should be a tail-number of an aircraft (with or without spaces or dashes, any case formats are acceptable, e.g.PH-BXO, DeMhJ), multiple matches are possible - see below;
icao24, then this field should be a ICAO 24-bit Mode-S address of an aircraft specified in hexadecimal format (e.g. 484161, 483EFD), multiple matches are possible - see below.
If multiple matches are possible: see similar remark to Single aircraft endpoint.

searchParam
Responses
Code	Description	Links
200	
OK

Media type

application/json
Controls Accept header.
Example Value
Schema
[
  {
    "reg": "string",
    "active": true,
    "hexIcao": "string",
    "airlineName": "string",
    "registrationDate": "2025-09-06T19:19:43.315Z"
  }
]
No links
204	
No Content

No links
400	
Bad Request

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
401	
Unauthorized

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
451	
Unavailable For Legal Reasons

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
500	
Internal Server Error

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
503	
Service Unavailable

No links

GET
/aircrafts/{searchBy}/{searchParam}/all
Aircraft by tail-number, Mode-S or ID [TIER 1]


Returns: A list of all aircraft ever matched the requested criteria. Please note that all found aircraft will be impersonated with registration information matching the requested tail number or Mode-S even though an aircraft might be flying under a different registration right now.

Parameters
Try it out
Name	Description
searchBy *
string
(path)
Criteria to search aircraft by

Available values : Id, Reg, Icao24


Id
searchParam *
string
(path)
Value of the search criteria. If searchBy is:

id, then this field should be an ID of an aircraft (as specified in the database of this API);
reg, then this field should be a tail-number of an aircraft (with or without spaces or dashes, any case formats are acceptable, e.g.PH-BXO, DeMhJ);
icao24, then this field should be a ICAO 24-bit Mode-S address of an aircraft specified in hexadecimal format (e.g. 484161, 483EFD).
searchParam
withImage
boolean
(query)
Should include aircraft image (default: false).

Default value : false


false
withRegistrations
boolean
(query)
Should include the history of aircraft registrations (default: false).

Default value : false


false
Responses
Code	Description	Links
200	
OK

Media type

application/json
Controls Accept header.
Example Value
Schema
[
  {
    "id": 0,
    "reg": "string",
    "active": true,
    "serial": "string",
    "hexIcao": "string",
    "airlineName": "string",
    "iataType": "string",
    "iataCodeShort": "string",
    "icaoCode": "string",
    "model": "string",
    "modelCode": "string",
    "numSeats": 0,
    "rolloutDate": "2025-09-06T19:19:43.527Z",
    "firstFlightDate": "2025-09-06T19:19:43.527Z",
    "deliveryDate": "2025-09-06T19:19:43.528Z",
    "registrationDate": "2025-09-06T19:19:43.528Z",
    "typeName": "string",
    "numEngines": 0,
    "engineType": "Unknown",
    "isFreighter": true,
    "productionLine": "string",
    "ageYears": 0,
    "verified": true,
    "image": {
      "url": "string",
      "webUrl": "string",
      "author": "string",
      "title": "string",
      "description": "string",
      "license": "AllRightsReserved",
      "htmlAttributions": [
        "string"
      ]
    },
    "numRegistrations": 0,
    "registrations": [
      {
        "reg": "string",
        "active": true,
        "hexIcao": "string",
        "airlineName": "string",
        "registrationDate": "2025-09-06T19:19:43.528Z"
      }
    ]
  }
]
No links
204	
No Content

No links
400	
Bad Request

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
401	
Unauthorized

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
451	
Unavailable For Legal Reasons

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
500	
Internal Server Error

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
503	
Service Unavailable

No links

GET
/airlines/{airlineCode}/aircrafts
Airline fleet / Aircraft list by airline code (BETA) [TIER 3]


Returns: A paged list of aircraft in the fleet of the specified airline.

That will include active aircraft currently flying in an active airline, verfified through more than one source. Unconfirmed sightings of an aircraft will not qualify said aircraft to be listed in the fleet.

Parameters
Try it out
Name	Description
airlineCode *
string
(path)
3-character ICAO-code of the airliner (e.g., KLM, ACA); or 2-character IATA-code of the airline (e.g., KL, AC).

Please note that more than one active airline may have the same IATA code, therefore IATA codes are not recommended for this endpoint.

airlineCode
pageSize *
integer($int32)
(query)
The number of returned records will be capped at this value. Must be a positive value and not exceed the limit stipulated by your pricing plan.

pageSize
pageOffset
integer($int32)
(query)
The number of records to skip before listing a page of records. In conjunction with pageSize effectively determines the page number (default - 0).

Default value : 0

0
withRegistrations
boolean
(query)
Should include the history of aircraft registrations (default: false).

Default value : false


false
Responses
Code	Description	Links
200	
OK

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "totalCount": 2147483647,
  "pageOffset": 2147483647,
  "pageSize": 2147483647,
  "hasNextPage": true,
  "count": 2147483647,
  "items": [
    {
      "id": 0,
      "reg": "string",
      "active": true,
      "serial": "string",
      "hexIcao": "string",
      "airlineName": "string",
      "iataType": "string",
      "iataCodeShort": "string",
      "icaoCode": "string",
      "model": "string",
      "modelCode": "string",
      "numSeats": 0,
      "rolloutDate": "2025-09-06T19:19:43.795Z",
      "firstFlightDate": "2025-09-06T19:19:43.795Z",
      "deliveryDate": "2025-09-06T19:19:43.795Z",
      "registrationDate": "2025-09-06T19:19:43.795Z",
      "typeName": "string",
      "numEngines": 0,
      "engineType": "Unknown",
      "isFreighter": true,
      "productionLine": "string",
      "ageYears": 0,
      "verified": true,
      "image": {
        "url": "string",
        "webUrl": "string",
        "author": "string",
        "title": "string",
        "description": "string",
        "license": "AllRightsReserved",
        "htmlAttributions": [
          "string"
        ]
      },
      "numRegistrations": 0,
      "registrations": [
        {
          "reg": "string",
          "active": true,
          "hexIcao": "string",
          "airlineName": "string",
          "registrationDate": "2025-09-06T19:19:43.796Z"
        }
      ]
    }
  ]
}
No links
204	
No Content

No links
400	
Bad Request

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
401	
Unauthorized

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
451	
Unavailable For Legal Reasons

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
500	
Internal Server Error

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
503	
Service Unavailable

No links

GET
/aircrafts/reg/{reg}/image/beta
Aircraft image by tail-number (BETA) [TIER 2]


What is the aircraft photo?

Aircraft images are being searched in external sources by certain criteria without any manual intervention. Therefore, false matches may be returned. Only images with licenses approved for commercial use are returned. Please be advised that you may be required to mention author attribution before using the image.

Returns: Image data with medium-sized direct image URL and licence approved for commercial use is returned.

Parameters
Try it out
Name	Description
reg *
string
(path)
Tail-number of the aircraft (full, stripped and any case formats are acceptable).

reg
Responses
Code	Description	Links
200	
OK

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "url": "string",
  "webUrl": "string",
  "author": "string",
  "title": "string",
  "description": "string",
  "license": "AllRightsReserved",
  "htmlAttributions": [
    "string"
  ]
}
No links
204	
No Content

No links
400	
Bad Request

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
401	
Unauthorized

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
451	
Unavailable For Legal Reasons

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
500	
Internal Server Error

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
503	
Service Unavailable

No links

POST
/aircrafts/recognize/beta
Aicraft image recognition (BETA) [TIER 3]


What aircrafts are depicted on this photo?

This endpoint recognizes aircrafts on uploaded image and returns information about all detected aircrafts. It is based on computer vision technology and therefore results may be imprecise. It relies on detecting aircrafts' registrations and, once detected, attempting to match these registration with records in aircrafts database.

Returns: Data about found and recognized aircrafts.

Parameters
Try it out
No parameters

Request body

multipart/form-data
photo *
string($binary)
Image containing aircraft. It should be image-type file (JPEG, PNG or BMP).

To improve results:

ensure that aircraft registration is as much as possible visible on the image;
other inscriptions are visible as least as possible or absent on the image (although algorithm strives to filter these out as much as possible, false results are still possible).
Responses
Code	Description	Links
200	
OK

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "recognized": [
    {
      "id": 0,
      "reg": "string",
      "active": true,
      "serial": "string",
      "hexIcao": "string",
      "airlineName": "string",
      "iataType": "string",
      "iataCodeShort": "string",
      "icaoCode": "string",
      "model": "string",
      "modelCode": "string",
      "numSeats": 0,
      "rolloutDate": "2025-09-06T19:19:44.028Z",
      "firstFlightDate": "2025-09-06T19:19:44.028Z",
      "deliveryDate": "2025-09-06T19:19:44.028Z",
      "registrationDate": "2025-09-06T19:19:44.028Z",
      "typeName": "string",
      "numEngines": 0,
      "engineType": "Unknown",
      "isFreighter": true,
      "productionLine": "string",
      "ageYears": 0,
      "verified": true,
      "image": {
        "url": "string",
        "webUrl": "string",
        "author": "string",
        "title": "string",
        "description": "string",
        "license": "AllRightsReserved",
        "htmlAttributions": [
          "string"
        ]
      },
      "numRegistrations": 0,
      "registrations": [
        {
          "reg": "string",
          "active": true,
          "hexIcao": "string",
          "airlineName": "string",
          "registrationDate": "2025-09-06T19:19:44.028Z"
        }
      ]
    }
  ]
}
No links
204	
No Content

No links
400	
Bad Request

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
401	
Unauthorized

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
451	
Unavailable For Legal Reasons

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
500	
Internal Server Error

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
503	
Service Unavailable

No links

GET
/aircrafts/search/term
Search active aircraft tail numbers by term [TIER 2]


Returns: List of active aircraft registrations with tail numbers starting from the term.

Parameters
Try it out
Name	Description
q *
string
(query)
Search term (min. 4 non whitespace characters length)

q
limit
integer($int32)
(query)
Maximum number of items to be returned (max. 10, defaut = 5)

Default value : 5

5
Responses
Code	Description	Links
200	
OK

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "searchBy": "string",
  "count": 2147483647,
  "items": [
    {
      "id": 0,
      "reg": "string",
      "active": true,
      "serial": "string",
      "hexIcao": "string",
      "airlineName": "string",
      "iataType": "string",
      "iataCodeShort": "string",
      "icaoCode": "string",
      "model": "string",
      "modelCode": "string",
      "numSeats": 0,
      "rolloutDate": "2025-09-06T19:19:44.069Z",
      "firstFlightDate": "2025-09-06T19:19:44.069Z",
      "deliveryDate": "2025-09-06T19:19:44.069Z",
      "registrationDate": "2025-09-06T19:19:44.069Z",
      "typeName": "string",
      "numEngines": 0,
      "engineType": "Unknown",
      "isFreighter": true,
      "productionLine": "string",
      "ageYears": 0,
      "verified": true,
      "image": {
        "url": "string",
        "webUrl": "string",
        "author": "string",
        "title": "string",
        "description": "string",
        "license": "AllRightsReserved",
        "htmlAttributions": [
          "string"
        ]
      },
      "numRegistrations": 0,
      "registrations": [
        {
          "reg": "string",
          "active": true,
          "hexIcao": "string",
          "airlineName": "string",
          "registrationDate": "2025-09-06T19:19:44.069Z"
        }
      ]
    }
  ]
}
No links
204	
No Content

No links
400	
Bad Request

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
401	
Unauthorized

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
451	
Unavailable For Legal Reasons

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
500	
Internal Server Error

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
503	
Service Unavailable

No links
Airport API


GET
/airports/{codeType}/{code}
Airport by code [TIER 1]


At the moment airports having both ICAO and IATA code are present in database only.

Returns: Single airport data, if found.

Parameters
Try it out
Name	Description
codeType *
string
(path)
Type of code to search airport by (iata or icao)

Available values : Icao, Iata


Icao
code *
string
(path)
If codeType is:

icao, then this field must be a 4-character ICAO-code of the airport (e.g.: EHAM, KLAX, UUEE, etc.);
iata, then this field must be a 3-character IATA-code of the airport (e.g.: AMS, SFO, LAX, etc.).
Full, stripped and any case formats are acceptable.

code
withRunways
boolean
(query)
Include runways data (default - false)

Default value : false


false
withTime
boolean
(query)
Include current local time (default - false)

Default value : false


false
Responses
Code	Description	Links
200	
OK

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "icao": "string",
  "iata": "string",
  "localCode": "string",
  "shortName": "string",
  "fullName": "string",
  "municipalityName": "string",
  "location": {
    "lat": 90,
    "lon": 180
  },
  "elevation": {
    "meter": 0,
    "km": 0,
    "mile": 0,
    "nm": 0,
    "feet": 0
  },
  "country": {
    "code": "string",
    "name": "string"
  },
  "continent": {
    "code": "string",
    "name": "string"
  },
  "timeZone": "string",
  "urls": {
    "webSite": "string",
    "wikipedia": "string",
    "twitter": "string",
    "liveAtc": "string",
    "flightRadar": "string",
    "googleMaps": "string"
  },
  "runways": [
    {
      "name": "string",
      "trueHdg": 0,
      "length": {
        "meter": 0,
        "km": 0,
        "mile": 0,
        "nm": 0,
        "feet": 0
      },
      "width": {
        "meter": 0,
        "km": 0,
        "mile": 0,
        "nm": 0,
        "feet": 0
      },
      "isClosed": true,
      "location": {
        "lat": 90,
        "lon": 180
      },
      "surface": "Unknown",
      "displacedThreshold": {
        "meter": 0,
        "km": 0,
        "mile": 0,
        "nm": 0,
        "feet": 0
      },
      "hasLighting": true
    }
  ],
  "currentTime": {
    "time": {
      "utc": "2025-09-06T19:19:44.118Z",
      "local": "2025-09-06T19:19:44.118Z"
    },
    "timeZoneId": "string"
  }
}
No links
204	
No Content

No links
400	
Bad Request

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
401	
Unauthorized

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
451	
Unavailable For Legal Reasons

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
500	
Internal Server Error

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
503	
Service Unavailable

No links

GET
/airports/{codeType}/{code}/runways
Airport runways [TIER 1]


Which runways does this airport have?

At the moment airports having both ICAO and IATA code are present in database only.

Returns: Collection of runway data items.

Parameters
Try it out
Name	Description
codeType *
string
(path)
Type of code to search airport by (iata or icao)

Available values : Icao, Iata


Icao
code *
string
(path)
If codeType is:

icao, then this field must be a 4-character ICAO-code of the airport (e.g.: EHAM, KLAX, UUEE, etc.);
iata, then this field must be a 3-character IATA-code of the airport (e.g.: AMS, SFO, LAX, etc.).
Full, stripped and any case formats are acceptable.

code
Responses
Code	Description	Links
200	
OK

Media type

application/json
Controls Accept header.
Example Value
Schema
[
  {
    "name": "string",
    "trueHdg": 0,
    "length": {
      "meter": 0,
      "km": 0,
      "mile": 0,
      "nm": 0,
      "feet": 0
    },
    "width": {
      "meter": 0,
      "km": 0,
      "mile": 0,
      "nm": 0,
      "feet": 0
    },
    "isClosed": true,
    "location": {
      "lat": 90,
      "lon": 180
    },
    "surface": "Unknown",
    "displacedThreshold": {
      "meter": 0,
      "km": 0,
      "mile": 0,
      "nm": 0,
      "feet": 0
    },
    "hasLighting": true
  }
]
No links
204	
No Content

No links
400	
Bad Request

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
401	
Unauthorized

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
451	
Unavailable For Legal Reasons

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
500	
Internal Server Error

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
503	
Service Unavailable

No links

GET
/airports/search/location
Search airports by location [TIER 2]


What are the airports closest to the location?

At the moment airports having both ICAO and IATA code and flight schedules are present available only.

Returns: A list of airports found within the specified radius around the specified location.

Parameters
Try it out
Name	Description
lat *
number($float)
(query)
Latitude location coordinate in decimal format (between -90 and 90)

lat
lon *
number($float)
(query)
Longitude location coordinate in decimal format (between -180 and 180)

lon
radiusKm *
integer($int32)
(query)
Radius of search around specified location in kilometers (max. 1000 km)

radiusKm
limit *
integer($int32)
(query)
Maximum number of airports to be returned (max. 250)

limit
withFlightInfoOnly
boolean
(query)
If set to true, will only return airports which have flight data (scheduled or live) available. Default = false.

Default value : false


false
Responses
Code	Description	Links
200	
OK

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "searchBy": {
    "lat": 90,
    "lon": 180
  },
  "count": 2147483647,
  "items": [
    {
      "icao": "string",
      "iata": "string",
      "localCode": "string",
      "name": "string",
      "shortName": "string",
      "municipalityName": "string",
      "location": {
        "lat": 90,
        "lon": 180
      },
      "countryCode": "string",
      "timeZone": "string"
    }
  ]
}
No links
204	
No Content

No links
400	
Bad Request

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
401	
Unauthorized

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
451	
Unavailable For Legal Reasons

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
500	
Internal Server Error

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
503	
Service Unavailable

No links

GET
/airports/search/ip
Search airports by IP address geolocation [TIER 2]


What are the airports closest to the customer, based on their IP address? What are the airports closest to the location determined (geo-located) by a IP address?

This endpoint determines the location by the IP address provided and then returns the list of the nearest airports in the same way as Search airports by location endpoint does.

Please note:

IP geo-location is not a precise method and it determines an approximate location only.
At the moment airports having both ICAO and IATA code and flight schedules are present available only.
Returns: A list of airports found within the specified radius around the location approximated (geo-located) from the specified IP address.

Parameters
Try it out
Name	Description
q *
string
(query)
A valid public IP v4 address

q
radiusKm *
integer($int32)
(query)
Radius of search around specified location in kilometers (max. 1000 km)

radiusKm
limit *
integer($int32)
(query)
Maximum number of airports to be returned (max. 250)

limit
withFlightInfoOnly
boolean
(query)
If set to true, will only return airports which have flight data (scheduled or live) available. Default = false.

Default value : false


false
Responses
Code	Description	Links
200	
OK

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "searchBy": {
    "lat": 90,
    "lon": 180
  },
  "count": 2147483647,
  "items": [
    {
      "icao": "string",
      "iata": "string",
      "localCode": "string",
      "name": "string",
      "shortName": "string",
      "municipalityName": "string",
      "location": {
        "lat": 90,
        "lon": 180
      },
      "countryCode": "string",
      "timeZone": "string"
    }
  ]
}
No links
204	
No Content

No links
400	
Bad Request

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
401	
Unauthorized

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
451	
Unavailable For Legal Reasons

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
500	
Internal Server Error

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
503	
Service Unavailable

No links

GET
/airports/search/term
Search airports by free text [TIER 2]


At the moment airports having both ICAO and IATA code and flight schedules are present available only.

Returns: List of airports with names and city names (and IATA/ICAO code, if enabled) matching the search term.

Parameters
Try it out
Name	Description
q *
string
(query)
Search query (min. 3 non whitespace characters length)

q
limit
integer($int32)
(query)
Maximum number of airports to be returned (max. 250, defaut = 10)

Default value : 10

10
withFlightInfoOnly
boolean
(query)
If set to true, will only return airports which have flight data (scheduled or live) available. Default = false.

Default value : false


false
withSearchByCode
boolean
(query)
If set to true, will attempt to interpret short words within the search query as IATA or ICAO code and prioritize exact matches by these codes (they will appear higher than others). Otherwise, the search by code will be completely excluded (only the name of an airport or its city will be searched). Default = true.

Default value : true


true
Responses
Code	Description	Links
200	
OK

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "searchBy": "string",
  "count": 2147483647,
  "items": [
    {
      "icao": "string",
      "iata": "string",
      "localCode": "string",
      "name": "string",
      "shortName": "string",
      "municipalityName": "string",
      "location": {
        "lat": 90,
        "lon": 180
      },
      "countryCode": "string",
      "timeZone": "string"
    }
  ]
}
No links
204	
No Content

No links
400	
Bad Request

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
401	
Unauthorized

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
451	
Unavailable For Legal Reasons

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
500	
Internal Server Error

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
503	
Service Unavailable

No links
Flight Alert API


POST
/subscriptions/webhook/{subjectType}/{subjectId}
Create web-hook subscription [TIER 4]


This endpoitns is a part of Flight alert PUSH API currently powered by webhooks.
If you are running your own web service, you can subscribe to flights by number or airport code. After that, your HTTP endpoint will be called (notified) whenever the flight information gets updated.

Creates a web-hook subscription on a subject (e.g., flight alerts by number or by airport code). Returns information about created subscription. Subscription ID contained in it can be used to refresh or remove it.

If subscription contains an expiration date-time, it will auto-expire automatically on this time. If you want to prevent expiration, use webhook/{subscriptionId}/refresh endpoint to refresh the subscription.

Every time a subject gets updated, a HTTP request will be sent to the URL specified in url parameter. Request will be of a POST type and contain JSON-formatted FlightNotificationContract object containing subscription and flights information in the body (see example response for status code 199 of this endpoint documentation).

All flight alerts / notifications are delivered in best-effort manner. They might be missing or delayed. If there was an error delivering a notification for any reason, there will be 2 more retries after 5 and 15 minutes (precise numbers might change).

If subscribed to a specific flight or to flights operated in a specific airport:

Ensure that the flight is within the live updates / ADS-B data coverage. There is no sense in subscribing to a flight which operates in airports having poor or no live updates or ADS-B coverage: there simply will be no updates. To check if an airport is tracked and on which level, use /health/services/airports/{icao}/feeds endpoint. You can also use /health/services/feeds/{service}/airports to get the list of covered airports. Read more about coverage here: https://www.aerodatabox.com/data-coverage.
Notifications will cover updates for flights commencing from 6 hours ago up to 72 hours in future.
Among these, notifications will contain only those flight items which were actually updated this time.
Parameters
Try it out
Name	Description
subjectType *
string
(path)
Subject type

Available values : FlightByNumber, FlightByAirportIcao


FlightByNumber
subjectId *
string
(path)
Subject ID. If subjectType is:

FlightByNumber, then this field must be a flight number (with or without spaces, IATA or ICAO, any case formats are acceptable, e.g. KL1395, Klm 1395);
FlightByAirportIcao, then this field must be a 4-character ICAO-code of the airport where flights are operated (e.g.: EHAM, KLAX, UUEE, etc.);
subjectId
Request body

application/json
Command containing parameters for web-hook subscription creation

Example Value
Schema
{
  "url": "string"
}
Responses
Code	Description	Links
199	
Information

Media type

application/json
Example Value
Schema
{
  "flights": [
    {
      "notificationSummary": "string",
      "notificationRemark": "string",
      "greatCircleDistance": {
        "meter": 0,
        "km": 0,
        "mile": 0,
        "nm": 0,
        "feet": 0
      },
      "departure": {
        "airport": {
          "icao": "string",
          "iata": "string",
          "localCode": "string",
          "name": "string",
          "shortName": "string",
          "municipalityName": "string",
          "location": {
            "lat": 90,
            "lon": 180
          },
          "countryCode": "string",
          "timeZone": "string"
        },
        "scheduledTime": {
          "utc": "2025-09-06T19:19:44.240Z",
          "local": "2025-09-06T19:19:44.240Z"
        },
        "revisedTime": {
          "utc": "2025-09-06T19:19:44.240Z",
          "local": "2025-09-06T19:19:44.240Z"
        },
        "predictedTime": {
          "utc": "2025-09-06T19:19:44.240Z",
          "local": "2025-09-06T19:19:44.240Z"
        },
        "runwayTime": {
          "utc": "2025-09-06T19:19:44.240Z",
          "local": "2025-09-06T19:19:44.240Z"
        },
        "terminal": "string",
        "checkInDesk": "string",
        "gate": "string",
        "baggageBelt": "string",
        "runway": "string",
        "quality": [
          "Basic"
        ]
      },
      "arrival": {
        "airport": {
          "icao": "string",
          "iata": "string",
          "localCode": "string",
          "name": "string",
          "shortName": "string",
          "municipalityName": "string",
          "location": {
            "lat": 90,
            "lon": 180
          },
          "countryCode": "string",
          "timeZone": "string"
        },
        "scheduledTime": {
          "utc": "2025-09-06T19:19:44.240Z",
          "local": "2025-09-06T19:19:44.240Z"
        },
        "revisedTime": {
          "utc": "2025-09-06T19:19:44.240Z",
          "local": "2025-09-06T19:19:44.240Z"
        },
        "predictedTime": {
          "utc": "2025-09-06T19:19:44.240Z",
          "local": "2025-09-06T19:19:44.240Z"
        },
        "runwayTime": {
          "utc": "2025-09-06T19:19:44.240Z",
          "local": "2025-09-06T19:19:44.240Z"
        },
        "terminal": "string",
        "checkInDesk": "string",
        "gate": "string",
        "baggageBelt": "string",
        "runway": "string",
        "quality": [
          "Basic"
        ]
      },
      "lastUpdatedUtc": "2025-09-06T19:19:44.240Z",
      "number": "string",
      "callSign": "string",
      "status": "Unknown",
      "codeshareStatus": "Unknown",
      "isCargo": true,
      "aircraft": {
        "reg": "string",
        "modeS": "string",
        "model": "string",
        "image": {
          "url": "string",
          "webUrl": "string",
          "author": "string",
          "title": "string",
          "description": "string",
          "license": "AllRightsReserved",
          "htmlAttributions": [
            "string"
          ]
        }
      },
      "airline": {
        "name": "string",
        "iata": "string",
        "icao": "string"
      },
      "location": {
        "pressureAltitude": {
          "meter": 0,
          "km": 0,
          "mile": 0,
          "nm": 0,
          "feet": 0
        },
        "altitude": {
          "meter": 0,
          "km": 0,
          "mile": 0,
          "nm": 0,
          "feet": 0
        },
        "pressure": {
          "hPa": 0,
          "inHg": 0,
          "mmHg": 0
        },
        "groundSpeed": {
          "kt": 0,
          "kmPerHour": 0,
          "miPerHour": 0,
          "meterPerSecond": 0
        },
        "trueTrack": {
          "deg": 360,
          "rad": 6.283185307179586
        },
        "reportedAtUtc": "2025-09-06T19:19:44.241Z",
        "lat": 90,
        "lon": 180
      }
    }
  ],
  "subscription": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "isActive": true,
    "activateBeforeUtc": "2025-09-06T19:19:44.241Z",
    "expiresOnUtc": "2025-09-06T19:19:44.241Z",
    "createdOnUtc": "2025-09-06T19:19:44.241Z",
    "subject": {
      "type": "FlightByNumber",
      "id": "string"
    },
    "subscriber": {
      "type": "string",
      "id": "string"
    }
  }
}
No links
200	
OK

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "isActive": true,
  "activateBeforeUtc": "2025-09-06T19:19:44.260Z",
  "expiresOnUtc": "2025-09-06T19:19:44.260Z",
  "createdOnUtc": "2025-09-06T19:19:44.260Z",
  "subject": {
    "type": "FlightByNumber",
    "id": "string"
  },
  "subscriber": {
    "type": "string",
    "id": "string"
  }
}
No links
204	
No Content

No links
400	
Bad Request

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
401	
Unauthorized

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
451	
Unavailable For Legal Reasons

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
500	
Internal Server Error

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
503	
Service Unavailable

No links

GET
/subscriptions/webhook/{subscriptionId}
Get web-hook subscription [FREE TIER]


This endpoitns is a part of Flight alert PUSH API currently powered by webhooks.
If you are running your own web service, you can subscribe to flights by number or airport code. After that, your HTTP endpoint will be called (notified) whenever the flight information gets updated.

Gets information about an existing active web-hook subscription.

Parameters
Try it out
Name	Description
subscriptionId *
string($uuid)
(path)
Subscription ID

subscriptionId
Responses
Code	Description	Links
200	
OK

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "isActive": true,
  "activateBeforeUtc": "2025-09-06T19:19:44.277Z",
  "expiresOnUtc": "2025-09-06T19:19:44.277Z",
  "createdOnUtc": "2025-09-06T19:19:44.277Z",
  "subject": {
    "type": "FlightByNumber",
    "id": "string"
  },
  "subscriber": {
    "type": "string",
    "id": "string"
  }
}
No links
204	
No Content

No links
400	
Bad Request

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
401	
Unauthorized

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
451	
Unavailable For Legal Reasons

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
500	
Internal Server Error

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
503	
Service Unavailable

No links

DELETE
/subscriptions/webhook/{subscriptionId}
Remove web-hook subscription [FREE TIER]


This endpoitns is a part of Flight alert PUSH API currently powered by webhooks.
If you are running your own web service, you can subscribe to flights by number or airport code. After that, your HTTP endpoint will be called (notified) whenever the flight information gets updated.

Removes the subscription

Parameters
Try it out
Name	Description
subscriptionId *
string($uuid)
(path)
Subscription ID

subscriptionId
Responses
Code	Description	Links
200	
OK

No links
204	
No Content

No links
400	
Bad Request

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
401	
Unauthorized

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
451	
Unavailable For Legal Reasons

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
500	
Internal Server Error

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
503	
Service Unavailable

No links

GET
/subscriptions/webhook
List web-hook subscriptions [FREE TIER]


This endpoitns is a part of Flight alert PUSH API currently powered by webhooks.
If you are running your own web service, you can subscribe to flights by number or airport code. After that, your HTTP endpoint will be called (notified) whenever the flight information gets updated.

Get the list of existing active web-hook subscriptions

Parameters
Try it out
No parameters

Responses
Code	Description	Links
200	
OK

Media type

application/json
Controls Accept header.
Example Value
Schema
[
  {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "isActive": true,
    "activateBeforeUtc": "2025-09-06T19:19:44.305Z",
    "expiresOnUtc": "2025-09-06T19:19:44.305Z",
    "createdOnUtc": "2025-09-06T19:19:44.305Z",
    "subject": {
      "type": "FlightByNumber",
      "id": "string"
    },
    "subscriber": {
      "type": "string",
      "id": "string"
    }
  }
]
No links
204	
No Content

No links
400	
Bad Request

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
401	
Unauthorized

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
451	
Unavailable For Legal Reasons

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
500	
Internal Server Error

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
503	
Service Unavailable

No links

PATCH
/subscriptions/webhook/{subscriptionId}/refresh
Refresh web-hook subscription [TIER 4]


This endpoitns is a part of Flight alert PUSH API currently powered by webhooks.
If you are running your own web service, you can subscribe to flights by number or airport code. After that, your HTTP endpoint will be called (notified) whenever the flight information gets updated.

Refreshes an existing web-hook subscription

If the subscription had an expiration date-time set when created, this endpoint will extend it by the same period of time as the one it was originally created with. E.g., if subscription was originally created for 7 days, this endpoint will add extra 7 days to the expiration date-time. Note, that web-hook subscriptions cannot be extended beyond the sliding window of 60 days from the current date-time.

If the subscription had no expiration date-time set, nothing occurs.

Parameters
Try it out
Name	Description
subscriptionId *
string($uuid)
(path)
Subscription ID

subscriptionId
Responses
Code	Description	Links
200	
OK

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "isActive": true,
  "activateBeforeUtc": "2025-09-06T19:19:44.327Z",
  "expiresOnUtc": "2025-09-06T19:19:44.327Z",
  "createdOnUtc": "2025-09-06T19:19:44.327Z",
  "subject": {
    "type": "FlightByNumber",
    "id": "string"
  },
  "subscriber": {
    "type": "string",
    "id": "string"
  }
}
No links
204	
No Content

No links
400	
Bad Request

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
401	
Unauthorized

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
451	
Unavailable For Legal Reasons

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
500	
Internal Server Error

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
503	
Service Unavailable

No links
Flight API


GET
/flights/{searchBy}/{searchParam}
Flight Status (single day) [TIER 2]


What is the status of a specific flight? What is the historical status or schedule of a specific flight on a specific date in past or in future?

This endpoint returns data about a specific flight live flight status (if the flight is within the coverage and not in distant future), or flight schedule data otherwise.

If dateLocal is specified, gets data about flight(s) departing or arriving on the day specified (local time). Otherwise, gets data about the status of flight(s) operating on the nearest date (either in past or in future).

A flight can be searched by:

flight number it's being operated under; or
ATC-callsign it's being operated under; or
tail-number of the aircraft it's being operated by; or
Mode-S 24-bit ICAO Transponder address of the aircraft it's being operated by.
Flight data may include airport of arrival and departure, scheduled and actual times, flight status, type of aircraft, tail-number and aircraft image.

Some flights may have partial data. The data may be absent for either arrival or departure airport or may not include live updates of time and status. Check quality markers inside the response to determine which data is available.

Normally, information with live status updates and estimated/actual arrival/departure times is only available for airports tracked live or with ADS-B by our system. Otherwise flight information will be with scheduled info only or absent.

To check if an airport is currently tracked and on which level, use /health/services/airports/{icao}/feeds endpoint. You can also use /health/services/feeds/{service}/airports to get the list of covered airports.

Read more about coverage and flight data limitations here: https://www.aerodatabox.com/data-coverage.

Aircraft images are being searched in external sources by certain criteria without any manual intervention. Therefore, false matches may be returned. Only images with licenses approved for commercial use are returned. Please be advised that you may be required to mention author attribution before using the image.

Parameters
Try it out
Name	Description
searchBy *
string
(path)
Criteria to search flight by

Available values : Number, Reg, CallSign, Icao24


Number
searchParam *
string
(path)
Value of the search criteria. If searchBy is:

number, then this field shoud be Flight number (with or without spaces, IATA or ICAO, any case formats are acceptable, e.g. KL1395, Klm 1395)
callsign, then this field should be ATC call-sign of the flight (with or without spaces, any case formats are acceptable, e.g.AFL1482, nca 008X);
reg, then this field should be Aircraft tail-number (with or without spaces or dashes, any case formats are acceptable, e.g.PH-BXO, DeMhJ);
icao24, then this field should be Aircraft ICAO 24-bit Mode-S address specified in hexadecimal format (e.g. 484161, 483EFD).
searchParam
dateLocalRole
string
(query)
If set to Both (default, recommended for best results) then the dateLocal parameter shall be considered as both departure and arrival date. If a flight departs OR arrives on that date (in the local timezone of the origin or destination, respectively), it will be returned.
If set to Departure then the dateLocal parameter shall be considered as departure date only. Only the flights departing on that date (in the local timezone of origin) will be returned.
If set to Arrival then the dateLocal parameter shall be considered as arrival date only. Only the flights arriving on that date (in the local timezone of destination) will be returned.
Available values : Arrival, Departure, Both

Default value : Both


Both
withAircraftImage
boolean
(query)
Should include aircraft image (default: false).

Default value : false


false
withLocation
boolean
(query)
Should include real-time positional data, e.g.: location, speed, altitude, etc., if available (default: false).

Default value : false


false
Responses
Code	Description	Links
200	
OK

Media type

application/json
Controls Accept header.
Example Value
Schema
[
  {
    "greatCircleDistance": {
      "meter": 0,
      "km": 0,
      "mile": 0,
      "nm": 0,
      "feet": 0
    },
    "departure": {
      "airport": {
        "icao": "string",
        "iata": "string",
        "localCode": "string",
        "name": "string",
        "shortName": "string",
        "municipalityName": "string",
        "location": {
          "lat": 90,
          "lon": 180
        },
        "countryCode": "string",
        "timeZone": "string"
      },
      "scheduledTime": {
        "utc": "2025-09-06T19:19:44.353Z",
        "local": "2025-09-06T19:19:44.353Z"
      },
      "revisedTime": {
        "utc": "2025-09-06T19:19:44.353Z",
        "local": "2025-09-06T19:19:44.353Z"
      },
      "predictedTime": {
        "utc": "2025-09-06T19:19:44.353Z",
        "local": "2025-09-06T19:19:44.353Z"
      },
      "runwayTime": {
        "utc": "2025-09-06T19:19:44.353Z",
        "local": "2025-09-06T19:19:44.353Z"
      },
      "terminal": "string",
      "checkInDesk": "string",
      "gate": "string",
      "baggageBelt": "string",
      "runway": "string",
      "quality": [
        "Basic"
      ]
    },
    "arrival": {
      "airport": {
        "icao": "string",
        "iata": "string",
        "localCode": "string",
        "name": "string",
        "shortName": "string",
        "municipalityName": "string",
        "location": {
          "lat": 90,
          "lon": 180
        },
        "countryCode": "string",
        "timeZone": "string"
      },
      "scheduledTime": {
        "utc": "2025-09-06T19:19:44.353Z",
        "local": "2025-09-06T19:19:44.353Z"
      },
      "revisedTime": {
        "utc": "2025-09-06T19:19:44.353Z",
        "local": "2025-09-06T19:19:44.353Z"
      },
      "predictedTime": {
        "utc": "2025-09-06T19:19:44.353Z",
        "local": "2025-09-06T19:19:44.353Z"
      },
      "runwayTime": {
        "utc": "2025-09-06T19:19:44.353Z",
        "local": "2025-09-06T19:19:44.353Z"
      },
      "terminal": "string",
      "checkInDesk": "string",
      "gate": "string",
      "baggageBelt": "string",
      "runway": "string",
      "quality": [
        "Basic"
      ]
    },
    "lastUpdatedUtc": "2025-09-06T19:19:44.353Z",
    "number": "string",
    "callSign": "string",
    "status": "Unknown",
    "codeshareStatus": "Unknown",
    "isCargo": true,
    "aircraft": {
      "reg": "string",
      "modeS": "string",
      "model": "string",
      "image": {
        "url": "string",
        "webUrl": "string",
        "author": "string",
        "title": "string",
        "description": "string",
        "license": "AllRightsReserved",
        "htmlAttributions": [
          "string"
        ]
      }
    },
    "airline": {
      "name": "string",
      "iata": "string",
      "icao": "string"
    },
    "location": {
      "pressureAltitude": {
        "meter": 0,
        "km": 0,
        "mile": 0,
        "nm": 0,
        "feet": 0
      },
      "altitude": {
        "meter": 0,
        "km": 0,
        "mile": 0,
        "nm": 0,
        "feet": 0
      },
      "pressure": {
        "hPa": 0,
        "inHg": 0,
        "mmHg": 0
      },
      "groundSpeed": {
        "kt": 0,
        "kmPerHour": 0,
        "miPerHour": 0,
        "meterPerSecond": 0
      },
      "trueTrack": {
        "deg": 360,
        "rad": 6.283185307179586
      },
      "reportedAtUtc": "2025-09-06T19:19:44.353Z",
      "lat": 90,
      "lon": 180
    }
  }
]
No links
204	
No Content

No links
400	
Bad Request

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
401	
Unauthorized

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
451	
Unavailable For Legal Reasons

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
500	
Internal Server Error

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
503	
Service Unavailable

No links

GET
/flights/{searchBy}/{searchParam}/{dateLocal}
Flight Status (single day) [TIER 2]


What is the status of a specific flight? What is the historical status or schedule of a specific flight on a specific date in past or in future?

This endpoint returns data about a specific flight live flight status (if the flight is within the coverage and not in distant future), or flight schedule data otherwise.

If dateLocal is specified, gets data about flight(s) departing or arriving on the day specified (local time). Otherwise, gets data about the status of flight(s) operating on the nearest date (either in past or in future).

A flight can be searched by:

flight number it's being operated under; or
ATC-callsign it's being operated under; or
tail-number of the aircraft it's being operated by; or
Mode-S 24-bit ICAO Transponder address of the aircraft it's being operated by.
Flight data may include airport of arrival and departure, scheduled and actual times, flight status, type of aircraft, tail-number and aircraft image.

Some flights may have partial data. The data may be absent for either arrival or departure airport or may not include live updates of time and status. Check quality markers inside the response to determine which data is available.

Normally, information with live status updates and estimated/actual arrival/departure times is only available for airports tracked live or with ADS-B by our system. Otherwise flight information will be with scheduled info only or absent.

To check if an airport is currently tracked and on which level, use /health/services/airports/{icao}/feeds endpoint. You can also use /health/services/feeds/{service}/airports to get the list of covered airports.

Read more about coverage and flight data limitations here: https://www.aerodatabox.com/data-coverage.

Aircraft images are being searched in external sources by certain criteria without any manual intervention. Therefore, false matches may be returned. Only images with licenses approved for commercial use are returned. Please be advised that you may be required to mention author attribution before using the image.

Parameters
Try it out
Name	Description
searchBy *
string
(path)
Criteria to search flight by

Available values : Number, Reg, CallSign, Icao24


Number
searchParam *
string
(path)
Value of the search criteria. If searchBy is:

number, then this field shoud be Flight number (with or without spaces, IATA or ICAO, any case formats are acceptable, e.g. KL1395, Klm 1395)
callsign, then this field should be ATC call-sign of the flight (with or without spaces, any case formats are acceptable, e.g.AFL1482, nca 008X);
reg, then this field should be Aircraft tail-number (with or without spaces or dashes, any case formats are acceptable, e.g.PH-BXO, DeMhJ);
icao24, then this field should be Aircraft ICAO 24-bit Mode-S address specified in hexadecimal format (e.g. 484161, 483EFD).
searchParam
dateLocal *
string($date-time)
(path)
Local date of departure or arrival (in format: YYYY-MM-DD, e.g.: 2019-08-29). Maximum/minimum allowable date is determined by the current data coverage limitations and your pricing plan.

dateLocal
dateLocalRole
string
(query)
If set to Both (default, recommended for best results) then the dateLocal parameter shall be considered as both departure and arrival date. If a flight departs OR arrives on that date (in the local timezone of the origin or destination, respectively), it will be returned.
If set to Departure then the dateLocal parameter shall be considered as departure date only. Only the flights departing on that date (in the local timezone of origin) will be returned.
If set to Arrival then the dateLocal parameter shall be considered as arrival date only. Only the flights arriving on that date (in the local timezone of destination) will be returned.
Available values : Arrival, Departure, Both

Default value : Both


Both
withAircraftImage
boolean
(query)
Should include aircraft image (default: false).

Default value : false


false
withLocation
boolean
(query)
Should include real-time positional data, e.g.: location, speed, altitude, etc., if available (default: false).

Default value : false


false
Responses
Code	Description	Links
200	
OK

Media type

application/json
Controls Accept header.
Example Value
Schema
[
  {
    "greatCircleDistance": {
      "meter": 0,
      "km": 0,
      "mile": 0,
      "nm": 0,
      "feet": 0
    },
    "departure": {
      "airport": {
        "icao": "string",
        "iata": "string",
        "localCode": "string",
        "name": "string",
        "shortName": "string",
        "municipalityName": "string",
        "location": {
          "lat": 90,
          "lon": 180
        },
        "countryCode": "string",
        "timeZone": "string"
      },
      "scheduledTime": {
        "utc": "2025-09-06T19:19:44.393Z",
        "local": "2025-09-06T19:19:44.393Z"
      },
      "revisedTime": {
        "utc": "2025-09-06T19:19:44.393Z",
        "local": "2025-09-06T19:19:44.393Z"
      },
      "predictedTime": {
        "utc": "2025-09-06T19:19:44.393Z",
        "local": "2025-09-06T19:19:44.393Z"
      },
      "runwayTime": {
        "utc": "2025-09-06T19:19:44.393Z",
        "local": "2025-09-06T19:19:44.393Z"
      },
      "terminal": "string",
      "checkInDesk": "string",
      "gate": "string",
      "baggageBelt": "string",
      "runway": "string",
      "quality": [
        "Basic"
      ]
    },
    "arrival": {
      "airport": {
        "icao": "string",
        "iata": "string",
        "localCode": "string",
        "name": "string",
        "shortName": "string",
        "municipalityName": "string",
        "location": {
          "lat": 90,
          "lon": 180
        },
        "countryCode": "string",
        "timeZone": "string"
      },
      "scheduledTime": {
        "utc": "2025-09-06T19:19:44.393Z",
        "local": "2025-09-06T19:19:44.393Z"
      },
      "revisedTime": {
        "utc": "2025-09-06T19:19:44.393Z",
        "local": "2025-09-06T19:19:44.393Z"
      },
      "predictedTime": {
        "utc": "2025-09-06T19:19:44.393Z",
        "local": "2025-09-06T19:19:44.393Z"
      },
      "runwayTime": {
        "utc": "2025-09-06T19:19:44.393Z",
        "local": "2025-09-06T19:19:44.393Z"
      },
      "terminal": "string",
      "checkInDesk": "string",
      "gate": "string",
      "baggageBelt": "string",
      "runway": "string",
      "quality": [
        "Basic"
      ]
    },
    "lastUpdatedUtc": "2025-09-06T19:19:44.393Z",
    "number": "string",
    "callSign": "string",
    "status": "Unknown",
    "codeshareStatus": "Unknown",
    "isCargo": true,
    "aircraft": {
      "reg": "string",
      "modeS": "string",
      "model": "string",
      "image": {
        "url": "string",
        "webUrl": "string",
        "author": "string",
        "title": "string",
        "description": "string",
        "license": "AllRightsReserved",
        "htmlAttributions": [
          "string"
        ]
      }
    },
    "airline": {
      "name": "string",
      "iata": "string",
      "icao": "string"
    },
    "location": {
      "pressureAltitude": {
        "meter": 0,
        "km": 0,
        "mile": 0,
        "nm": 0,
        "feet": 0
      },
      "altitude": {
        "meter": 0,
        "km": 0,
        "mile": 0,
        "nm": 0,
        "feet": 0
      },
      "pressure": {
        "hPa": 0,
        "inHg": 0,
        "mmHg": 0
      },
      "groundSpeed": {
        "kt": 0,
        "kmPerHour": 0,
        "miPerHour": 0,
        "meterPerSecond": 0
      },
      "trueTrack": {
        "deg": 360,
        "rad": 6.283185307179586
      },
      "reportedAtUtc": "2025-09-06T19:19:44.393Z",
      "lat": 90,
      "lon": 180
    }
  }
]
No links
204	
No Content

No links
400	
Bad Request

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
401	
Unauthorized

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
451	
Unavailable For Legal Reasons

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
500	
Internal Server Error

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
503	
Service Unavailable

No links

GET
/flights/{searchBy}/{searchParam}/{dateFromLocal}/{dateToLocal}
Flight History and Schedule (range of days) [TIER 3]


What is the history or schedule of a specific flight within a specific range of dates in past or in future?

This endpoint is the similar to the Flight status endpoint. The only difference is that instead of returning the flight data on a single date, it returns the data over a range of dates, thus allowing to get insights on the flight history or schedule within the specified range.

All limitations and considerations applicable to Flight status endpoint are applicable to this endpoint as well.

Parameters
Try it out
Name	Description
searchBy *
string
(path)
Criteria to search flight by

Available values : Number, Reg, CallSign, Icao24


Number
searchParam *
string
(path)
Value of the search criteria. If searchBy is:

number, then this field shoud be Flight number (with or without spaces, IATA or ICAO, any case formats are acceptable, e.g. KL1395, Klm 1395)
callsign, then this field should be ATC call-sign of the flight (with or without spaces, any case formats are acceptable, e.g.AFL1482, nca 008X);
reg, then this field should be Aircraft tail-number (with or without spaces or dashes, any case formats are acceptable, e.g.PH-BXO, DeMhJ);
icao24, then this field should be Aircraft ICAO 24-bit Mode-S address specified in hexadecimal format (e.g. 484161, 483EFD).
searchParam
dateFromLocal *
string($date-time)
(path)
Beginning of the range of local dates of departure or arrival (in format: YYYY-MM-DD, e.g.: 2019-08-29). Maximum/minimum allowable value is determined by the current data coverage limitations and your pricing plan.

dateFromLocal
dateToLocal *
string($date-time)
(path)
End of the range of local dates of departure or arrival (in format: YYYY-MM-DD, e.g.: 2019-08-29). Maximum/minimum allowable value is determined by the current data coverage limitations and your pricing plan. This date must be bigger than the dateFromLocal. The maximum difference between this date and dateFromLocal is limited and is determined by your pricing plan (ranging from 7 to 30 days as per moment of writing).

dateToLocal
dateLocalRole
string
(query)
If set to Both (default, recommended for best results) then the dateFromLocal and dateToLocal parameters shall be considered as both departure and arrival dates. If a flight departs OR arrives on dates within the specified range (in the local timezone of the origin or destination, respectively), it will be returned.
If set to Departure then the dateFromLocal and dateToLocal parameters shall be considered as departure dates only. Only the flights departing on dates within the specified rang(in the local timezone of origin) will be returned.
If set to Arrival then the dateFromLocal and dateToLocal parameters shall be considered as arrival dates only. Only the flights arriving on dates within the specified rangd (in the local timezone of destination) will be returned.
Available values : Arrival, Departure, Both

Default value : Both


Both
Responses
Code	Description	Links
200	
OK

Media type

application/json
Controls Accept header.
Example Value
Schema
[
  {
    "greatCircleDistance": {
      "meter": 0,
      "km": 0,
      "mile": 0,
      "nm": 0,
      "feet": 0
    },
    "departure": {
      "airport": {
        "icao": "string",
        "iata": "string",
        "localCode": "string",
        "name": "string",
        "shortName": "string",
        "municipalityName": "string",
        "location": {
          "lat": 90,
          "lon": 180
        },
        "countryCode": "string",
        "timeZone": "string"
      },
      "scheduledTime": {
        "utc": "2025-09-06T19:19:44.435Z",
        "local": "2025-09-06T19:19:44.435Z"
      },
      "revisedTime": {
        "utc": "2025-09-06T19:19:44.435Z",
        "local": "2025-09-06T19:19:44.435Z"
      },
      "predictedTime": {
        "utc": "2025-09-06T19:19:44.435Z",
        "local": "2025-09-06T19:19:44.435Z"
      },
      "runwayTime": {
        "utc": "2025-09-06T19:19:44.435Z",
        "local": "2025-09-06T19:19:44.435Z"
      },
      "terminal": "string",
      "checkInDesk": "string",
      "gate": "string",
      "baggageBelt": "string",
      "runway": "string",
      "quality": [
        "Basic"
      ]
    },
    "arrival": {
      "airport": {
        "icao": "string",
        "iata": "string",
        "localCode": "string",
        "name": "string",
        "shortName": "string",
        "municipalityName": "string",
        "location": {
          "lat": 90,
          "lon": 180
        },
        "countryCode": "string",
        "timeZone": "string"
      },
      "scheduledTime": {
        "utc": "2025-09-06T19:19:44.435Z",
        "local": "2025-09-06T19:19:44.435Z"
      },
      "revisedTime": {
        "utc": "2025-09-06T19:19:44.435Z",
        "local": "2025-09-06T19:19:44.435Z"
      },
      "predictedTime": {
        "utc": "2025-09-06T19:19:44.435Z",
        "local": "2025-09-06T19:19:44.435Z"
      },
      "runwayTime": {
        "utc": "2025-09-06T19:19:44.435Z",
        "local": "2025-09-06T19:19:44.435Z"
      },
      "terminal": "string",
      "checkInDesk": "string",
      "gate": "string",
      "baggageBelt": "string",
      "runway": "string",
      "quality": [
        "Basic"
      ]
    },
    "lastUpdatedUtc": "2025-09-06T19:19:44.435Z",
    "number": "string",
    "callSign": "string",
    "status": "Unknown",
    "codeshareStatus": "Unknown",
    "isCargo": true,
    "aircraft": {
      "reg": "string",
      "modeS": "string",
      "model": "string",
      "image": {
        "url": "string",
        "webUrl": "string",
        "author": "string",
        "title": "string",
        "description": "string",
        "license": "AllRightsReserved",
        "htmlAttributions": [
          "string"
        ]
      }
    },
    "airline": {
      "name": "string",
      "iata": "string",
      "icao": "string"
    },
    "location": {
      "pressureAltitude": {
        "meter": 0,
        "km": 0,
        "mile": 0,
        "nm": 0,
        "feet": 0
      },
      "altitude": {
        "meter": 0,
        "km": 0,
        "mile": 0,
        "nm": 0,
        "feet": 0
      },
      "pressure": {
        "hPa": 0,
        "inHg": 0,
        "mmHg": 0
      },
      "groundSpeed": {
        "kt": 0,
        "kmPerHour": 0,
        "miPerHour": 0,
        "meterPerSecond": 0
      },
      "trueTrack": {
        "deg": 360,
        "rad": 6.283185307179586
      },
      "reportedAtUtc": "2025-09-06T19:19:44.436Z",
      "lat": 90,
      "lon": 180
    }
  }
]
No links
204	
No Content

No links
400	
Bad Request

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
401	
Unauthorized

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
451	
Unavailable For Legal Reasons

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
500	
Internal Server Error

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
503	
Service Unavailable

No links

GET
/flights/{searchBy}/{searchParam}/dates
Flight departure dates [TIER 2]


On which days the flight operates? or What is the flight schedule?

Flight can be searched by:

flight number it's being operated under; or
ATC-callsign it's being operated under; or
tail-number of the aircraft it's being operated by; or
Mode-S 24-bit ICAO Transponder address of the aircraft it's being operated by.
Returns: Array of local departure dates in (YYYY-MM-DD) format for flights operated under speified call-sign and within the time range specified.

Parameters
Try it out
Name	Description
searchBy *
string
(path)
Criteria to search flight by

Available values : Number, Reg, CallSign, Icao24


Number
searchParam *
string
(path)
Value of the search criteria. If searchBy is:

number, then this field shoud be Flight number (with or without spaces, IATA or ICAO, any case formats are acceptable, e.g. KL1395, Klm 1395)
callsign, then this field should be ATC call-sign of the flight (with or without spaces, any case formats are acceptable, e.g.AFL1482, nca 008X);
reg: then this field should be Aircraft tail-number (with or without spaces or dashes, any case formats are acceptable, e.g.PH-BXO, DeMhJ);
icao24, then this field should be Aircraft ICAO 24-bit Mode-S address specified in hexadecimal format (e.g. 484161, 483EFD).
searchParam
Responses
Code	Description	Links
200	
OK

Media type

application/json
Controls Accept header.
Example Value
Schema
[
  "string"
]
No links
204	
No Content

No links
400	
Bad Request

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
401	
Unauthorized

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
451	
Unavailable For Legal Reasons

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
500	
Internal Server Error

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
503	
Service Unavailable

No links

GET
/flights/{searchBy}/{searchParam}/dates/{fromLocal}/{toLocal}
Flight departure dates [TIER 2]


On which days the flight operates? or What is the flight schedule?

Flight can be searched by:

flight number it's being operated under; or
ATC-callsign it's being operated under; or
tail-number of the aircraft it's being operated by; or
Mode-S 24-bit ICAO Transponder address of the aircraft it's being operated by.
Returns: Array of local departure dates in (YYYY-MM-DD) format for flights operated under speified call-sign and within the time range specified.

Parameters
Try it out
Name	Description
searchBy *
string
(path)
Criteria to search flight by

Available values : Number, Reg, CallSign, Icao24


Number
searchParam *
string
(path)
Value of the search criteria. If searchBy is:

number, then this field shoud be Flight number (with or without spaces, IATA or ICAO, any case formats are acceptable, e.g. KL1395, Klm 1395)
callsign, then this field should be ATC call-sign of the flight (with or without spaces, any case formats are acceptable, e.g.AFL1482, nca 008X);
reg: then this field should be Aircraft tail-number (with or without spaces or dashes, any case formats are acceptable, e.g.PH-BXO, DeMhJ);
icao24, then this field should be Aircraft ICAO 24-bit Mode-S address specified in hexadecimal format (e.g. 484161, 483EFD).
searchParam
fromLocal *
string($date-time)
(path)
Beginning of the search range (local time, format: YYYY-MM-DD)

fromLocal
toLocal *
string($date-time)
(path)
End of the search range (local time, format: YYYY-MM-DD)

toLocal
Responses
Code	Description	Links
200	
OK

Media type

application/json
Controls Accept header.
Example Value
Schema
[
  "string"
]
No links
204	
No Content

No links
400	
Bad Request

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
401	
Unauthorized

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
451	
Unavailable For Legal Reasons

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
500	
Internal Server Error

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
503	
Service Unavailable

No links

GET
/flights/airports/{codeType}/{code}/{fromLocal}/{toLocal}
FIDS (airport departures and arrivals) - by local time range [TIER 2]


What are current departures or arrivals at the airport? or What is the flight schedule at the airport? or What is flight history at the airport?

Flights may contain live updates with corresponding information related to the actual progress of the flight (including actual/estimated arrival/departure times). In this case this endpoint serves as a FIDS endpoint. Presense of live updates is subject to data coverage: not all airports have this coverage in our system.

Otherwise flight information will be limited to scheduled only and will not be updated real-time. Much more airports have this type of coverage. To check if airport is tracked and on which level, use /health/services/airports/{icao}/feeds endpoint. You can also use /health/services/feeds/{service}/airports to get the list of supported airports for this or that layer of coverage. To learn more about the data coverage, refer to https://www.aerodatabox.com/data-coverage.

Returns: the list of arriving and/or departing flights scheduled and/or planned and/or commenced within a specified time range for a specified airport.

Parameters
Try it out
Name	Description
codeType *
string
(path)
Type of code to search airport by (iata or icao)

Available values : Icao, Iata


Icao
code *
string
(path)
If codeType is:

icao, then this field must be a 4-character ICAO-code of the airport (e.g.: EHAM, KLAX, UUEE, etc.);
iata, then this field must be a 3-character IATA-code of the airport (e.g.: AMS, SFO, LAX, etc.).
Full, stripped and any case formats are acceptable.

code
fromLocal *
string($date-time)
(path)
Beginning of the search range (local time, format: YYYY-MM-DDTHH:mm)

fromLocal
toLocal *
string($date-time)
(path)
End of the search range (local time, format: YYYY-MM-DDTHH:mm). Must be more than beginning of the search range by no more than 12 hours.

toLocal
direction
string
(query)
Direction of flights: Arrival, Departure or Both (default)

Available values : Arrival, Departure, Both

Default value : Both


Both
withLeg
boolean
(query)
If set to true, the result will include movement information from airport opposite in this flight leg (airport of origin for arriving flight or airport of destination for departing flight). In this case, Movement property will be replaced with Departure and Arrival properties for each flight. Default: false.

Default value : false


false
withCancelled
boolean
(query)
If set to true, result will include cancelled, divered, likely cancelled (CanceledUncertain) flights. Default: true.

Default value : true


true
withCodeshared
boolean
(query)
If set to true, the result will include flights with all code-shared statuses. Otherwise, code-sharing flights will be exclued. For airports, where no information about code-share statuses of flights are supplied (all flights are CodeshareStatus=Unknown), complex filtering will be applied to determine which flights are likely to be operational (caution: false results are possible).

Default value : true


true
withCargo
boolean
(query)
If set to true, the result will include cargo flights (subject to availability).

Default value : true


true
withPrivate
boolean
(query)
If set to true, the result will include private flights (subject to availability).

Default value : true


true
withLocation
boolean
(query)
If set to true, each currently active flight within the result will be populated with its present real-time location, altitude, speed and track (subject to availability).

Default value : false


false
Responses
Code	Description	Links
200	
OK

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "departures": [
    {
      "departure": {
        "airport": {
          "icao": "string",
          "iata": "string",
          "localCode": "string",
          "name": "string",
          "shortName": "string",
          "municipalityName": "string",
          "location": {
            "lat": 90,
            "lon": 180
          },
          "countryCode": "string",
          "timeZone": "string"
        },
        "scheduledTime": {
          "utc": "2025-09-06T19:19:44.549Z",
          "local": "2025-09-06T19:19:44.549Z"
        },
        "revisedTime": {
          "utc": "2025-09-06T19:19:44.549Z",
          "local": "2025-09-06T19:19:44.549Z"
        },
        "predictedTime": {
          "utc": "2025-09-06T19:19:44.549Z",
          "local": "2025-09-06T19:19:44.549Z"
        },
        "runwayTime": {
          "utc": "2025-09-06T19:19:44.549Z",
          "local": "2025-09-06T19:19:44.549Z"
        },
        "terminal": "string",
        "checkInDesk": "string",
        "gate": "string",
        "baggageBelt": "string",
        "runway": "string",
        "quality": [
          "Basic"
        ]
      },
      "arrival": {
        "airport": {
          "icao": "string",
          "iata": "string",
          "localCode": "string",
          "name": "string",
          "shortName": "string",
          "municipalityName": "string",
          "location": {
            "lat": 90,
            "lon": 180
          },
          "countryCode": "string",
          "timeZone": "string"
        },
        "scheduledTime": {
          "utc": "2025-09-06T19:19:44.549Z",
          "local": "2025-09-06T19:19:44.549Z"
        },
        "revisedTime": {
          "utc": "2025-09-06T19:19:44.549Z",
          "local": "2025-09-06T19:19:44.549Z"
        },
        "predictedTime": {
          "utc": "2025-09-06T19:19:44.549Z",
          "local": "2025-09-06T19:19:44.549Z"
        },
        "runwayTime": {
          "utc": "2025-09-06T19:19:44.549Z",
          "local": "2025-09-06T19:19:44.549Z"
        },
        "terminal": "string",
        "checkInDesk": "string",
        "gate": "string",
        "baggageBelt": "string",
        "runway": "string",
        "quality": [
          "Basic"
        ]
      },
      "number": "string",
      "callSign": "string",
      "status": "Unknown",
      "codeshareStatus": "Unknown",
      "isCargo": true,
      "aircraft": {
        "reg": "string",
        "modeS": "string",
        "model": "string",
        "image": {
          "url": "string",
          "webUrl": "string",
          "author": "string",
          "title": "string",
          "description": "string",
          "license": "AllRightsReserved",
          "htmlAttributions": [
            "string"
          ]
        }
      },
      "airline": {
        "name": "string",
        "iata": "string",
        "icao": "string"
      },
      "location": {
        "pressureAltitude": {
          "meter": 0,
          "km": 0,
          "mile": 0,
          "nm": 0,
          "feet": 0
        },
        "altitude": {
          "meter": 0,
          "km": 0,
          "mile": 0,
          "nm": 0,
          "feet": 0
        },
        "pressure": {
          "hPa": 0,
          "inHg": 0,
          "mmHg": 0
        },
        "groundSpeed": {
          "kt": 0,
          "kmPerHour": 0,
          "miPerHour": 0,
          "meterPerSecond": 0
        },
        "trueTrack": {
          "deg": 360,
          "rad": 6.283185307179586
        },
        "reportedAtUtc": "2025-09-06T19:19:44.549Z",
        "lat": 90,
        "lon": 180
      }
    }
  ],
  "arrivals": [
    {
      "departure": {
        "airport": {
          "icao": "string",
          "iata": "string",
          "localCode": "string",
          "name": "string",
          "shortName": "string",
          "municipalityName": "string",
          "location": {
            "lat": 90,
            "lon": 180
          },
          "countryCode": "string",
          "timeZone": "string"
        },
        "scheduledTime": {
          "utc": "2025-09-06T19:19:44.549Z",
          "local": "2025-09-06T19:19:44.549Z"
        },
        "revisedTime": {
          "utc": "2025-09-06T19:19:44.549Z",
          "local": "2025-09-06T19:19:44.549Z"
        },
        "predictedTime": {
          "utc": "2025-09-06T19:19:44.549Z",
          "local": "2025-09-06T19:19:44.549Z"
        },
        "runwayTime": {
          "utc": "2025-09-06T19:19:44.549Z",
          "local": "2025-09-06T19:19:44.549Z"
        },
        "terminal": "string",
        "checkInDesk": "string",
        "gate": "string",
        "baggageBelt": "string",
        "runway": "string",
        "quality": [
          "Basic"
        ]
      },
      "arrival": {
        "airport": {
          "icao": "string",
          "iata": "string",
          "localCode": "string",
          "name": "string",
          "shortName": "string",
          "municipalityName": "string",
          "location": {
            "lat": 90,
            "lon": 180
          },
          "countryCode": "string",
          "timeZone": "string"
        },
        "scheduledTime": {
          "utc": "2025-09-06T19:19:44.549Z",
          "local": "2025-09-06T19:19:44.549Z"
        },
        "revisedTime": {
          "utc": "2025-09-06T19:19:44.549Z",
          "local": "2025-09-06T19:19:44.549Z"
        },
        "predictedTime": {
          "utc": "2025-09-06T19:19:44.549Z",
          "local": "2025-09-06T19:19:44.549Z"
        },
        "runwayTime": {
          "utc": "2025-09-06T19:19:44.549Z",
          "local": "2025-09-06T19:19:44.549Z"
        },
        "terminal": "string",
        "checkInDesk": "string",
        "gate": "string",
        "baggageBelt": "string",
        "runway": "string",
        "quality": [
          "Basic"
        ]
      },
      "number": "string",
      "callSign": "string",
      "status": "Unknown",
      "codeshareStatus": "Unknown",
      "isCargo": true,
      "aircraft": {
        "reg": "string",
        "modeS": "string",
        "model": "string",
        "image": {
          "url": "string",
          "webUrl": "string",
          "author": "string",
          "title": "string",
          "description": "string",
          "license": "AllRightsReserved",
          "htmlAttributions": [
            "string"
          ]
        }
      },
      "airline": {
        "name": "string",
        "iata": "string",
        "icao": "string"
      },
      "location": {
        "pressureAltitude": {
          "meter": 0,
          "km": 0,
          "mile": 0,
          "nm": 0,
          "feet": 0
        },
        "altitude": {
          "meter": 0,
          "km": 0,
          "mile": 0,
          "nm": 0,
          "feet": 0
        },
        "pressure": {
          "hPa": 0,
          "inHg": 0,
          "mmHg": 0
        },
        "groundSpeed": {
          "kt": 0,
          "kmPerHour": 0,
          "miPerHour": 0,
          "meterPerSecond": 0
        },
        "trueTrack": {
          "deg": 360,
          "rad": 6.283185307179586
        },
        "reportedAtUtc": "2025-09-06T19:19:44.549Z",
        "lat": 90,
        "lon": 180
      }
    }
  ]
}
No links
204	
No Content

No links
400	
Bad Request

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
401	
Unauthorized

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
451	
Unavailable For Legal Reasons

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
500	
Internal Server Error

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
503	
Service Unavailable

No links

GET
/flights/airports/{codeType}/{code}
FIDS (airport departures and arrivals) - by relative time / by current time [TIER 2]


What are current departures or arrivals at the airport? or What is the flight schedule at the airport? or What is flight history at the airport?

Flights may contain live updates with corresponding information related to the actual progress of the flight (including actual/estimated arrival/departure times). In this case this endpoint serves as a FIDS endpoint. Presense of live updates is subject to data coverage: not all airports have this coverage in our system.

Otherwise flight information will be limited to scheduled only and will not be updated real-time. Much more airports have this type of coverage. To check if airport is tracked and on which level, use /health/services/airports/{icao}/feeds endpoint. You can also use /health/services/feeds/{service}/airports to get the list of supported airports for this or that layer of coverage. To learn more about the data coverage, refer to https://www.aerodatabox.com/data-coverage.

Returns: the list of arriving and/or departing flights scheduled and/or planned and/or commenced within a time range specified relatively to the current local time at the airport.

Parameters
Try it out
Name	Description
codeType *
string
(path)
Type of code to search airport by (iata or icao)

Available values : Icao, Iata


Icao
code *
string
(path)
If codeType is:

icao, then this field must be a 4-character ICAO-code of the airport (e.g.: EHAM, KLAX, UUEE, etc.);
iata, then this field must be a 3-character IATA-code of the airport (e.g.: AMS, SFO, LAX, etc.).
Full, stripped and any case formats are acceptable.

code
offsetMinutes
integer($int64)
(query)
Beginning of the search range expressed in minutes relative to the current time at the airport (default: -120)

Default value : -120

-120
durationMinutes
integer($int64)
(query)
Length (duration) of the search range expressed in minutes (default: 720)

Default value : 720

720
direction
string
(query)
Direction of flights: Arrival, Departure or Both (default)

Available values : Arrival, Departure, Both

Default value : Both


Both
withLeg
boolean
(query)
If set to true, the result will include movement information from airport opposite in this flight leg (airport of origin for arriving flight or airport of destination for departing flight). In this case, Movement property will be replaced with Departure and Arrival properties for each flight. Default: false.

Default value : false


false
withCancelled
boolean
(query)
If set to true, result will include cancelled, divered, likely cancelled (CanceledUncertain) flights. Default: true.

Default value : true


true
withCodeshared
boolean
(query)
If set to true, the result will include flights with all code-shared statuses. Otherwise, code-sharing flights will be exclued. For airports, where no information about code-share statuses of flights are supplied (all flights are CodeshareStatus=Unknown), complex filtering will be applied to determine which flights are likely to be operational (caution: false results are possible).

Default value : true


true
withCargo
boolean
(query)
If set to true, the result will include cargo flights (subject to availability).

Default value : true


true
withPrivate
boolean
(query)
If set to true, the result will include private flights (subject to availability).

Default value : true


true
withLocation
boolean
(query)
If set to true, each currently active flight within the result will be populated with its present real-time location, altitude, speed and track (subject to availability).

Default value : false


false
Responses
Code	Description	Links
200	
OK

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "departures": [
    {
      "departure": {
        "airport": {
          "icao": "string",
          "iata": "string",
          "localCode": "string",
          "name": "string",
          "shortName": "string",
          "municipalityName": "string",
          "location": {
            "lat": 90,
            "lon": 180
          },
          "countryCode": "string",
          "timeZone": "string"
        },
        "scheduledTime": {
          "utc": "2025-09-06T19:19:44.625Z",
          "local": "2025-09-06T19:19:44.625Z"
        },
        "revisedTime": {
          "utc": "2025-09-06T19:19:44.625Z",
          "local": "2025-09-06T19:19:44.625Z"
        },
        "predictedTime": {
          "utc": "2025-09-06T19:19:44.625Z",
          "local": "2025-09-06T19:19:44.625Z"
        },
        "runwayTime": {
          "utc": "2025-09-06T19:19:44.625Z",
          "local": "2025-09-06T19:19:44.625Z"
        },
        "terminal": "string",
        "checkInDesk": "string",
        "gate": "string",
        "baggageBelt": "string",
        "runway": "string",
        "quality": [
          "Basic"
        ]
      },
      "arrival": {
        "airport": {
          "icao": "string",
          "iata": "string",
          "localCode": "string",
          "name": "string",
          "shortName": "string",
          "municipalityName": "string",
          "location": {
            "lat": 90,
            "lon": 180
          },
          "countryCode": "string",
          "timeZone": "string"
        },
        "scheduledTime": {
          "utc": "2025-09-06T19:19:44.625Z",
          "local": "2025-09-06T19:19:44.625Z"
        },
        "revisedTime": {
          "utc": "2025-09-06T19:19:44.625Z",
          "local": "2025-09-06T19:19:44.625Z"
        },
        "predictedTime": {
          "utc": "2025-09-06T19:19:44.625Z",
          "local": "2025-09-06T19:19:44.625Z"
        },
        "runwayTime": {
          "utc": "2025-09-06T19:19:44.625Z",
          "local": "2025-09-06T19:19:44.625Z"
        },
        "terminal": "string",
        "checkInDesk": "string",
        "gate": "string",
        "baggageBelt": "string",
        "runway": "string",
        "quality": [
          "Basic"
        ]
      },
      "number": "string",
      "callSign": "string",
      "status": "Unknown",
      "codeshareStatus": "Unknown",
      "isCargo": true,
      "aircraft": {
        "reg": "string",
        "modeS": "string",
        "model": "string",
        "image": {
          "url": "string",
          "webUrl": "string",
          "author": "string",
          "title": "string",
          "description": "string",
          "license": "AllRightsReserved",
          "htmlAttributions": [
            "string"
          ]
        }
      },
      "airline": {
        "name": "string",
        "iata": "string",
        "icao": "string"
      },
      "location": {
        "pressureAltitude": {
          "meter": 0,
          "km": 0,
          "mile": 0,
          "nm": 0,
          "feet": 0
        },
        "altitude": {
          "meter": 0,
          "km": 0,
          "mile": 0,
          "nm": 0,
          "feet": 0
        },
        "pressure": {
          "hPa": 0,
          "inHg": 0,
          "mmHg": 0
        },
        "groundSpeed": {
          "kt": 0,
          "kmPerHour": 0,
          "miPerHour": 0,
          "meterPerSecond": 0
        },
        "trueTrack": {
          "deg": 360,
          "rad": 6.283185307179586
        },
        "reportedAtUtc": "2025-09-06T19:19:44.625Z",
        "lat": 90,
        "lon": 180
      }
    }
  ],
  "arrivals": [
    {
      "departure": {
        "airport": {
          "icao": "string",
          "iata": "string",
          "localCode": "string",
          "name": "string",
          "shortName": "string",
          "municipalityName": "string",
          "location": {
            "lat": 90,
            "lon": 180
          },
          "countryCode": "string",
          "timeZone": "string"
        },
        "scheduledTime": {
          "utc": "2025-09-06T19:19:44.625Z",
          "local": "2025-09-06T19:19:44.625Z"
        },
        "revisedTime": {
          "utc": "2025-09-06T19:19:44.625Z",
          "local": "2025-09-06T19:19:44.625Z"
        },
        "predictedTime": {
          "utc": "2025-09-06T19:19:44.625Z",
          "local": "2025-09-06T19:19:44.625Z"
        },
        "runwayTime": {
          "utc": "2025-09-06T19:19:44.625Z",
          "local": "2025-09-06T19:19:44.625Z"
        },
        "terminal": "string",
        "checkInDesk": "string",
        "gate": "string",
        "baggageBelt": "string",
        "runway": "string",
        "quality": [
          "Basic"
        ]
      },
      "arrival": {
        "airport": {
          "icao": "string",
          "iata": "string",
          "localCode": "string",
          "name": "string",
          "shortName": "string",
          "municipalityName": "string",
          "location": {
            "lat": 90,
            "lon": 180
          },
          "countryCode": "string",
          "timeZone": "string"
        },
        "scheduledTime": {
          "utc": "2025-09-06T19:19:44.625Z",
          "local": "2025-09-06T19:19:44.625Z"
        },
        "revisedTime": {
          "utc": "2025-09-06T19:19:44.625Z",
          "local": "2025-09-06T19:19:44.625Z"
        },
        "predictedTime": {
          "utc": "2025-09-06T19:19:44.625Z",
          "local": "2025-09-06T19:19:44.625Z"
        },
        "runwayTime": {
          "utc": "2025-09-06T19:19:44.625Z",
          "local": "2025-09-06T19:19:44.625Z"
        },
        "terminal": "string",
        "checkInDesk": "string",
        "gate": "string",
        "baggageBelt": "string",
        "runway": "string",
        "quality": [
          "Basic"
        ]
      },
      "number": "string",
      "callSign": "string",
      "status": "Unknown",
      "codeshareStatus": "Unknown",
      "isCargo": true,
      "aircraft": {
        "reg": "string",
        "modeS": "string",
        "model": "string",
        "image": {
          "url": "string",
          "webUrl": "string",
          "author": "string",
          "title": "string",
          "description": "string",
          "license": "AllRightsReserved",
          "htmlAttributions": [
            "string"
          ]
        }
      },
      "airline": {
        "name": "string",
        "iata": "string",
        "icao": "string"
      },
      "location": {
        "pressureAltitude": {
          "meter": 0,
          "km": 0,
          "mile": 0,
          "nm": 0,
          "feet": 0
        },
        "altitude": {
          "meter": 0,
          "km": 0,
          "mile": 0,
          "nm": 0,
          "feet": 0
        },
        "pressure": {
          "hPa": 0,
          "inHg": 0,
          "mmHg": 0
        },
        "groundSpeed": {
          "kt": 0,
          "kmPerHour": 0,
          "miPerHour": 0,
          "meterPerSecond": 0
        },
        "trueTrack": {
          "deg": 360,
          "rad": 6.283185307179586
        },
        "reportedAtUtc": "2025-09-06T19:19:44.625Z",
        "lat": 90,
        "lon": 180
      }
    }
  ]
}
No links
204	
No Content

No links
400	
Bad Request

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
401	
Unauthorized

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
451	
Unavailable For Legal Reasons

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
500	
Internal Server Error

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
503	
Service Unavailable

No links

GET
/flights/search/term
Search flight numbers by term [TIER 2]


Returns: Distinct list of available flight numbers which start with the search query.

Parameters
Try it out
Name	Description
q *
string
(query)
Search query (min. 2 non whitespace characters length)

q
limit
integer($int32)
(query)
Maximum number of items to be returned (max. 100, defaut = 10)

Default value : 10

10
Responses
Code	Description	Links
200	
OK

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "searchBy": "string",
  "count": 2147483647,
  "items": [
    {
      "number": "string"
    }
  ]
}
No links
204	
No Content

No links
400	
Bad Request

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
401	
Unauthorized

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
451	
Unavailable For Legal Reasons

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
500	
Internal Server Error

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
503	
Service Unavailable

No links
Healthcheck API


GET
/health/services/feeds/{service}
General status of data feed services [FREE TIER]


Which is the general health of the data feed service?

Returns: Status of the service in general, regardless of the airports

Parameters
Try it out
Name	Description
service *
string
(path)
Data feed service name

Available values : FlightSchedules, FlightLiveUpdates, AdsbUpdates


FlightSchedules
withHttpCode
boolean
(query)
If true, reflect status of the service in the HTTP code of the response (if the service is down, HTTP code will be 503).

Default value : false


false
Responses
Code	Description	Links
200	
OK

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "service": "FlightSchedules",
  "status": "Down"
}
No links
204	
No Content

No links
400	
Bad Request

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
401	
Unauthorized

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
451	
Unavailable For Legal Reasons

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
500	
Internal Server Error

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
503	
Service Unavailable

Media type

application/json
Example Value
Schema
{
  "service": "FlightSchedules",
  "status": "Down"
}
No links

GET
/health/services/airports/{icao}/feeds
Data feed services status by ICAO code [FREE TIER]


What is the status of data updates for the airport?

At the moment airports having both ICAO and IATA code are present in database only.

Returns: Current status of airport data feed services (live flight updates, flight schedules, etc.) for requested airport.

Parameters
Try it out
Name	Description
icao *
string
(path)
4-digit ICAO-code of the airport (e.g.: EHAM, KLAX, UUEE, etc.). Full, stripped and any case formats are acceptable.

icao
Responses
Code	Description	Links
200	
OK

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "flightSchedulesFeed": {
    "service": "FlightSchedules",
    "status": "Down"
  },
  "liveFlightUpdatesFeed": {
    "service": "FlightSchedules",
    "status": "Down"
  },
  "adsbUpdatesFeed": {
    "service": "FlightSchedules",
    "status": "Down"
  },
  "generalAvailability": {
    "minAvailableLocalDate": "2025-09-06T19:19:44.697Z",
    "maxAvailableLocalDate": "2025-09-06T19:19:44.697Z"
  }
}
No links
204	
No Content

No links
400	
Bad Request

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
401	
Unauthorized

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
451	
Unavailable For Legal Reasons

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
500	
Internal Server Error

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
503	
Service Unavailable

No links

GET
/health/services/feeds/{service}/airports
Airports supporting data feed service [FREE TIER]


Which airports support flight schedules? or Which airports support live flight updates?

At the moment airports having both ICAO and IATA code are present in database only.

Returns: Collection ICAO codes of airports supporting specified airport data feed service.

Parameters
Try it out
Name	Description
service *
string
(path)
Airport data feed service name

Available values : FlightSchedules, FlightLiveUpdates, AdsbUpdates


FlightSchedules
Responses
Code	Description	Links
200	
OK

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "count": 2147483647,
  "items": [
    "string"
  ]
}
No links
204	
No Content

No links
400	
Bad Request

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
401	
Unauthorized

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
451	
Unavailable For Legal Reasons

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
500	
Internal Server Error

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
503	
Service Unavailable

No links
Industry API


GET
/industry/faa-ladd/{id}/status
FAA LADD Aircraft Status [TIER 3]


Returns: The current status of the specified aircraft in the Limiting Aircraft Displayed program of the Federal Aviation Administration of the U.S. Department of Transportation (FAA LADD). The industry list of blocked aircraft is synchrornized weekly with the FAA. More information about FAA LADD: https://www.faa.gov/pilots/ladd

DISCLAIMER. This endpoint is designed to provide easy access to verification against the FAA LADD industry list. Even though it is based on the official data distributed weekly by the FAA, this is NOT the official source of the FAA LADD data. For the official sources, always contact the FAA directly.

Parameters
Try it out
Name	Description
id *
string
(path)
Callsign or aircraft tail number

id
Responses
Code	Description	Links
200	
OK

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "id": "string",
  "isBlocked": true
}
No links
204	
No Content

No links
400	
Bad Request

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
401	
Unauthorized

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
451	
Unavailable For Legal Reasons

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
500	
Internal Server Error

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
503	
Service Unavailable

No links
Miscellaneous API


GET
/airports/{codeType}/{code}/time/local
Current local time at the airport [TIER 1]


What is the current local time at the airport?

At the moment airports having both ICAO and IATA code are present in database only.

Returns: Local time at the airport, if airport is found.

Parameters
Try it out
Name	Description
codeType *
string
(path)
Type of code to search airport by (iata or icao)

Available values : Icao, Iata


Icao
code *
string
(path)
If codeType is:

icao, then this field must be a 4-character ICAO-code of the airport (e.g.: EHAM, KLAX, UUEE, etc.);
iata, then this field must be a 3-character IATA-code of the airport (e.g.: AMS, SFO, LAX, etc.).
Full, stripped and any case formats are acceptable.

code
Responses
Code	Description	Links
200	
OK

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "time": {
    "utc": "2025-09-06T19:19:44.739Z",
    "local": "2025-09-06T19:19:44.739Z"
  },
  "timeZoneId": "string"
}
No links
204	
No Content

No links
400	
Bad Request

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
401	
Unauthorized

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
451	
Unavailable For Legal Reasons

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
500	
Internal Server Error

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
503	
Service Unavailable

No links

GET
/airports/{codeType}/{code}/time/solar
Solar and day time at the airport [TIER 1]


What is the sun position in the sky now at a specific time at the airport? or When does the sun rise and set at the airport today or on the other day at the airport? or Is it dark now or is it day at the airport?

At the moment airports having both ICAO and IATA code are present in database only.

Returns: If airport is found, returns various solar-related information: sun position in the sky, daytime (day, night, twilight: civil, nautical, astronomical, golden/blue hours), sunrise and sunset times, etc.

Parameters
Try it out
Name	Description
codeType *
string
(path)
Type of code to search airport by (iata or icao)

Available values : Icao, Iata


Icao
code *
string
(path)
If codeType is:

icao, then this field must be a 4-character ICAO-code of the airport (e.g.: EHAM, KLAX, UUEE, etc.);
iata, then this field must be a 3-character IATA-code of the airport (e.g.: AMS, SFO, LAX, etc.).
Full, stripped and any case formats are acceptable.

code
Responses
Code	Description	Links
200	
OK

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "location": {
    "lat": 90,
    "lon": 180
  },
  "sunElevation": {
    "deg": 180,
    "rad": 3.141592653589793
  },
  "sunAzimuth": {
    "deg": 360,
    "rad": 6.283185307179586
  },
  "dayTime": [
    "Night"
  ],
  "dawnAstronomical": {
    "utc": "2025-09-06T19:19:44.756Z",
    "local": "2025-09-06T19:19:44.756Z"
  },
  "dawnNautical": {
    "utc": "2025-09-06T19:19:44.756Z",
    "local": "2025-09-06T19:19:44.756Z"
  },
  "dawnCivil": {
    "utc": "2025-09-06T19:19:44.756Z",
    "local": "2025-09-06T19:19:44.756Z"
  },
  "sunrise": {
    "utc": "2025-09-06T19:19:44.756Z",
    "local": "2025-09-06T19:19:44.756Z"
  },
  "noonTrue": {
    "utc": "2025-09-06T19:19:44.756Z",
    "local": "2025-09-06T19:19:44.756Z"
  },
  "sunset": {
    "utc": "2025-09-06T19:19:44.756Z",
    "local": "2025-09-06T19:19:44.756Z"
  },
  "duskCivil": {
    "utc": "2025-09-06T19:19:44.756Z",
    "local": "2025-09-06T19:19:44.756Z"
  },
  "duskNautical": {
    "utc": "2025-09-06T19:19:44.756Z",
    "local": "2025-09-06T19:19:44.756Z"
  },
  "duskAstronomical": {
    "utc": "2025-09-06T19:19:44.756Z",
    "local": "2025-09-06T19:19:44.756Z"
  }
}
No links
204	
No Content

No links
400	
Bad Request

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
401	
Unauthorized

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
451	
Unavailable For Legal Reasons

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
500	
Internal Server Error

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
503	
Service Unavailable

No links

GET
/airports/{codeType}/{code}/time/solar/{dateLocal}
Solar and day time at the airport [TIER 1]


What is the sun position in the sky now at a specific time at the airport? or When does the sun rise and set at the airport today or on the other day at the airport? or Is it dark now or is it day at the airport?

At the moment airports having both ICAO and IATA code are present in database only.

Returns: If airport is found, returns various solar-related information: sun position in the sky, daytime (day, night, twilight: civil, nautical, astronomical, golden/blue hours), sunrise and sunset times, etc.

Parameters
Try it out
Name	Description
codeType *
string
(path)
Type of code to search airport by (iata or icao)

Available values : Icao, Iata


Icao
code *
string
(path)
If codeType is:

icao, then this field must be a 4-character ICAO-code of the airport (e.g.: EHAM, KLAX, UUEE, etc.);
iata, then this field must be a 3-character IATA-code of the airport (e.g.: AMS, SFO, LAX, etc.).
Full, stripped and any case formats are acceptable.

code
dateLocal *
string($date-time)
(path)
The moment of time which solar data is request for (local time, format: YYYY-MM-DDTHH:mm). Default - current time.

dateLocal
Responses
Code	Description	Links
200	
OK

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "location": {
    "lat": 90,
    "lon": 180
  },
  "sunElevation": {
    "deg": 180,
    "rad": 3.141592653589793
  },
  "sunAzimuth": {
    "deg": 360,
    "rad": 6.283185307179586
  },
  "dayTime": [
    "Night"
  ],
  "dawnAstronomical": {
    "utc": "2025-09-06T19:19:44.797Z",
    "local": "2025-09-06T19:19:44.797Z"
  },
  "dawnNautical": {
    "utc": "2025-09-06T19:19:44.797Z",
    "local": "2025-09-06T19:19:44.797Z"
  },
  "dawnCivil": {
    "utc": "2025-09-06T19:19:44.797Z",
    "local": "2025-09-06T19:19:44.797Z"
  },
  "sunrise": {
    "utc": "2025-09-06T19:19:44.797Z",
    "local": "2025-09-06T19:19:44.797Z"
  },
  "noonTrue": {
    "utc": "2025-09-06T19:19:44.797Z",
    "local": "2025-09-06T19:19:44.797Z"
  },
  "sunset": {
    "utc": "2025-09-06T19:19:44.797Z",
    "local": "2025-09-06T19:19:44.797Z"
  },
  "duskCivil": {
    "utc": "2025-09-06T19:19:44.797Z",
    "local": "2025-09-06T19:19:44.797Z"
  },
  "duskNautical": {
    "utc": "2025-09-06T19:19:44.797Z",
    "local": "2025-09-06T19:19:44.797Z"
  },
  "duskAstronomical": {
    "utc": "2025-09-06T19:19:44.797Z",
    "local": "2025-09-06T19:19:44.797Z"
  }
}
No links
204	
No Content

No links
400	
Bad Request

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
401	
Unauthorized

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
451	
Unavailable For Legal Reasons

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
500	
Internal Server Error

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
503	
Service Unavailable

No links

GET
/airports/{codeType}/{codeFrom}/distance-time/{codeTo}
🤖 Distance and flight time between airports [TIER 2]


What is the great circle distance between airports? What is approximate flight time between airports? ** What is the flight time between airports based on history of flights and/or aircraft type?** (machine-learning based)

Use flightTimeModel = ML01 to get more accurate results based on historical performance of flights on a specific route and aircraft type.

Returns: Distance and approximate flight time between airports, if both airports found.

Parameters
Try it out
Name	Description
codeType *
string
(path)
Type of code to search airport by (iata or icao)

Available values : Icao, Iata


Icao
codeFrom *
string
(path)
If codeType is:

icao, then this field must be a 4-character ICAO-code of the origin airport (e.g.: EHAM, KLAX, UUEE, etc.);
iata, then this field must be a 3-character IATA-code of the origin airport (e.g.: AMS, SFO, LAX, etc.).
Full, stripped and any case formats are acceptable.

codeFrom
codeTo *
string
(path)
If codeType is:

icao, then this field must be a 4-character ICAO-code of the destination airport (e.g.: EHAM, KLAX, UUEE, etc.);
iata, then this field must be a 3-character IATA-code of the destination airport (e.g.: AMS, SFO, LAX, etc.);
local, then the format of this field is subject to specific standards of relevant national or local airport codification systems.
Full, stripped and any case formats are acceptable.

codeTo
aircraftName
string
(query)
Aircraft type name (free text). If specified, the aircraft type will be attempted to be taken into account to provide more accurate result.

aircraftName
flightTimeModel
string
(query)
Model of calculation of the flight time. Default is More advanced model(s) is available, including machine learning-based models. See ModelFlightTimeEnum for details.

Available values : Standard, ML01

Default value : Standard


Standard
Responses
Code	Description	Links
200	
OK

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "from": {
    "icao": "string",
    "iata": "string",
    "localCode": "string",
    "name": "string",
    "shortName": "string",
    "municipalityName": "string",
    "location": {
      "lat": 90,
      "lon": 180
    },
    "countryCode": "string",
    "timeZone": "string"
  },
  "to": {
    "icao": "string",
    "iata": "string",
    "localCode": "string",
    "name": "string",
    "shortName": "string",
    "municipalityName": "string",
    "location": {
      "lat": 90,
      "lon": 180
    },
    "countryCode": "string",
    "timeZone": "string"
  },
  "greatCircleDistance": {
    "meter": 0,
    "km": 0,
    "mile": 0,
    "nm": 0,
    "feet": 0
  },
  "approxFlightTime": "string"
}
No links
204	
No Content

No links
400	
Bad Request

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
401	
Unauthorized

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
451	
Unavailable For Legal Reasons

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
500	
Internal Server Error

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
503	
Service Unavailable

No links

GET
/airports/{codeType}/{code}/weather
Weather / forecast at the airport [TIER 2]


What is the current weather at the airport? and What the the weather forecast for the airport?

Please note: this endpoint is designed to give a brief simplified weather overview for the airport on-demand. This miscellaneous endpoint is currently not designed to provide extensive weather information and is in no way replacement for specialized weather APIs.

Returns: Collection of a single or multiple weather records for the airport, if airport is found and weather information could be retrieved.

Parameters
Try it out
Name	Description
codeType *
string
(path)
Type of code to search airport by (iata or icao)

Available values : Icao, Iata


Icao
code *
string
(path)
If codeType is:

icao, then this field must be a 4-character ICAO-code of the origin airport (e.g.: EHAM, KLAX, UUEE, etc.);
iata, then this field must be a 3-character IATA-code of the origin airport (e.g.: AMS, SFO, LAX, etc.).
Full, stripped and any case formats are acceptable.

code
Responses
Code	Description	Links
200	
OK

Media type

application/json
Controls Accept header.
Example Value
Schema
[
  {
    "location": {
      "lat": 90,
      "lon": 180
    },
    "airTemperature": {
      "c": 0,
      "f": 0,
      "k": 0
    },
    "dewPoint": {
      "c": 0,
      "f": 0,
      "k": 0
    },
    "pressure": {
      "hPa": 0,
      "inHg": 0,
      "mmHg": 0
    },
    "wind": {
      "speed": {
        "kt": 0,
        "kmPerHour": 0,
        "miPerHour": 0,
        "meterPerSecond": 0
      },
      "direction": {
        "deg": 360,
        "rad": 6.283185307179586
      },
      "gusts": {
        "kt": 0,
        "kmPerHour": 0,
        "miPerHour": 0,
        "meterPerSecond": 0
      }
    },
    "visibility": {
      "meter": 0,
      "km": 0,
      "mile": 0,
      "nm": 0,
      "feet": 0
    },
    "report": "string",
    "cloudBase": {
      "meter": 0,
      "km": 0,
      "mile": 0,
      "nm": 0,
      "feet": 0
    },
    "cloudCover": "Unknown",
    "phenomenaGroups": [
      "None"
    ],
    "validFrom": {
      "utc": "2025-09-06T19:19:44.853Z",
      "local": "2025-09-06T19:19:44.853Z"
    },
    "validTo": {
      "utc": "2025-09-06T19:19:44.853Z",
      "local": "2025-09-06T19:19:44.853Z"
    }
  }
]
No links
204	
No Content

No links
400	
Bad Request

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
401	
Unauthorized

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
451	
Unavailable For Legal Reasons

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
500	
Internal Server Error

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
503	
Service Unavailable

No links

GET
/airports/{codeType}/{code}/weather/{fromLocal}/{toLocal}
Weather / forecast at the airport [TIER 2]


What is the current weather at the airport? and What the the weather forecast for the airport?

Please note: this endpoint is designed to give a brief simplified weather overview for the airport on-demand. This miscellaneous endpoint is currently not designed to provide extensive weather information and is in no way replacement for specialized weather APIs.

Returns: Collection of a single or multiple weather records for the airport, if airport is found and weather information could be retrieved.

Parameters
Try it out
Name	Description
codeType *
string
(path)
Type of code to search airport by (iata or icao)

Available values : Icao, Iata


Icao
code *
string
(path)
If codeType is:

icao, then this field must be a 4-character ICAO-code of the origin airport (e.g.: EHAM, KLAX, UUEE, etc.);
iata, then this field must be a 3-character IATA-code of the origin airport (e.g.: AMS, SFO, LAX, etc.).
Full, stripped and any case formats are acceptable.

code
fromLocal *
string($date-time)
(path)
Beginning of the search range (local time, format: YYYY-MM-DDTHH:mm). Must be in range from current time up to 48 hours in future. Default - current time.

fromLocal
toLocal *
string($date-time)
(path)
End of the search range (local time, format: YYYY-MM-DDTHH:mm). Must be equal to or more than beginning of the search range specified in fromLocal, up to 48 hours in future. Default equal to fromLocal.

toLocal
Responses
Code	Description	Links
200	
OK

Media type

application/json
Controls Accept header.
Example Value
Schema
[
  {
    "location": {
      "lat": 90,
      "lon": 180
    },
    "airTemperature": {
      "c": 0,
      "f": 0,
      "k": 0
    },
    "dewPoint": {
      "c": 0,
      "f": 0,
      "k": 0
    },
    "pressure": {
      "hPa": 0,
      "inHg": 0,
      "mmHg": 0
    },
    "wind": {
      "speed": {
        "kt": 0,
        "kmPerHour": 0,
        "miPerHour": 0,
        "meterPerSecond": 0
      },
      "direction": {
        "deg": 360,
        "rad": 6.283185307179586
      },
      "gusts": {
        "kt": 0,
        "kmPerHour": 0,
        "miPerHour": 0,
        "meterPerSecond": 0
      }
    },
    "visibility": {
      "meter": 0,
      "km": 0,
      "mile": 0,
      "nm": 0,
      "feet": 0
    },
    "report": "string",
    "cloudBase": {
      "meter": 0,
      "km": 0,
      "mile": 0,
      "nm": 0,
      "feet": 0
    },
    "cloudCover": "Unknown",
    "phenomenaGroups": [
      "None"
    ],
    "validFrom": {
      "utc": "2025-09-06T19:19:44.888Z",
      "local": "2025-09-06T19:19:44.888Z"
    },
    "validTo": {
      "utc": "2025-09-06T19:19:44.888Z",
      "local": "2025-09-06T19:19:44.888Z"
    }
  }
]
No links
204	
No Content

No links
400	
Bad Request

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
401	
Unauthorized

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
451	
Unavailable For Legal Reasons

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
500	
Internal Server Error

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
503	
Service Unavailable

No links

GET
/countries
Get all countries [TIER 1]


Returns: The list of all countries in the database

Parameters
Try it out
No parameters

Responses
Code	Description	Links
200	
OK

Media type

application/json
Controls Accept header.
Example Value
Schema
[
  {
    "code": "string",
    "name": "string"
  }
]
No links
204	
No Content

No links
400	
Bad Request

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
401	
Unauthorized

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
451	
Unavailable For Legal Reasons

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
500	
Internal Server Error

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
503	
Service Unavailable

No links
Statistical API


GET
/airports/{codeType}/{code}/delays
Airport delays (current or historical moment) [TIER 3]


What is the current or historical average delay in the airport? or What is the delay index of the airport right now or at a moment in past?

Please read more about airport delays on here: https://aerodatabox.com/api-airport-delays/

Returns: Statistical delay information about delays (median delay, delay index, cancelled flights) of arrivals and departures for the requested airport, represented by:

a single AirportDelayContract item displaying the delay information based on flight movements within the 2 hours prior to the current moment, if no dateLocal is specified;
a single AirportDelayContract item displaying the delay information based on flight movements within the 2 hours prior to the moment requested in dateLocal, if dateLocal is specified;
Parameters
Try it out
Name	Description
codeType *
string
(path)
Type of code to search airport by (iata or icao)

Available values : Icao, Iata


Icao
code *
string
(path)
If codeType is:

icao, then this field must be a 4-character ICAO-code of the airport (e.g.: EHAM, KLAX, UUEE, etc.);
iata, then this field must be a 3-character IATA-code of the airport (e.g.: AMS, SFO, LAX, etc.).
Full, stripped and any case formats are acceptable.

code
Responses
Code	Description	Links
200	
OK

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "airportIcao": "string",
  "from": {
    "utc": "2025-09-06T19:19:44.934Z",
    "local": "2025-09-06T19:19:44.934Z"
  },
  "to": {
    "utc": "2025-09-06T19:19:44.934Z",
    "local": "2025-09-06T19:19:44.934Z"
  },
  "departuresDelayInformation": {
    "numTotal": 0,
    "numQualifiedTotal": 0,
    "numCancelled": 0,
    "medianDelay": "string",
    "delayIndex": 0
  },
  "arrivalsDelayInformation": {
    "numTotal": 0,
    "numQualifiedTotal": 0,
    "numCancelled": 0,
    "medianDelay": "string",
    "delayIndex": 0
  }
}
No links
204	
No Content

No links
400	
Bad Request

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
401	
Unauthorized

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
451	
Unavailable For Legal Reasons

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
500	
Internal Server Error

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
503	
Service Unavailable

No links

GET
/airports/{codeType}/{code}/delays/{dateLocal}
Airport delays (current or historical moment) [TIER 3]


What is the current or historical average delay in the airport? or What is the delay index of the airport right now or at a moment in past?

Please read more about airport delays on here: https://aerodatabox.com/api-airport-delays/

Returns: Statistical delay information about delays (median delay, delay index, cancelled flights) of arrivals and departures for the requested airport, represented by:

a single AirportDelayContract item displaying the delay information based on flight movements within the 2 hours prior to the current moment, if no dateLocal is specified;
a single AirportDelayContract item displaying the delay information based on flight movements within the 2 hours prior to the moment requested in dateLocal, if dateLocal is specified;
Parameters
Try it out
Name	Description
codeType *
string
(path)
Type of code to search airport by (iata or icao)

Available values : Icao, Iata


Icao
code *
string
(path)
If codeType is:

icao, then this field must be a 4-character ICAO-code of the airport (e.g.: EHAM, KLAX, UUEE, etc.);
iata, then this field must be a 3-character IATA-code of the airport (e.g.: AMS, SFO, LAX, etc.).
Full, stripped and any case formats are acceptable.

code
dateLocal *
string($date-time)
(path)
The moment of time for / from which delay data is requested (local time, format: YYYY-MM-DDTHH:mm). Default - current time.

dateLocal
Responses
Code	Description	Links
200	
OK

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "airportIcao": "string",
  "from": {
    "utc": "2025-09-06T19:19:44.962Z",
    "local": "2025-09-06T19:19:44.962Z"
  },
  "to": {
    "utc": "2025-09-06T19:19:44.962Z",
    "local": "2025-09-06T19:19:44.962Z"
  },
  "departuresDelayInformation": {
    "numTotal": 0,
    "numQualifiedTotal": 0,
    "numCancelled": 0,
    "medianDelay": "string",
    "delayIndex": 0
  },
  "arrivalsDelayInformation": {
    "numTotal": 0,
    "numQualifiedTotal": 0,
    "numCancelled": 0,
    "medianDelay": "string",
    "delayIndex": 0
  }
}
No links
204	
No Content

No links
400	
Bad Request

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
401	
Unauthorized

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
451	
Unavailable For Legal Reasons

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
500	
Internal Server Error

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
503	
Service Unavailable

No links

GET
/airports/{codeType}/{code}/delays/{dateFromLocal}/{dateToLocal}
Airport delays (historical period) [TIER 3]


What were the delays within a specific period of time? or How the delays changed within a specific period of time?

Please read more about airport delays on here: https://aerodatabox.com/api-airport-delays/

Returns: Statistical delay information about delays (median delay, delay index, cancelled flights) of arrivals and departures for the requested airport, represented by a collection of AiportDelayContract items displaying the delay information at multiple moments within the period between dateLocal and dateToLocal.

Parameters
Try it out
Name	Description
codeType *
string
(path)
Type of code to search airport by (iata or icao)

Available values : Icao, Iata


Icao
code *
string
(path)
If codeType is:

icao, then this field must be a 4-character ICAO-code of the airport (e.g.: EHAM, KLAX, UUEE, etc.);
iata, then this field must be a 3-character IATA-code of the airport (e.g.: AMS, SFO, LAX, etc.).
Full, stripped and any case formats are acceptable.

code
dateFromLocal *
string($date-time)
(path)
The beginning of the period of time for which delay data is requested (local time, format: YYYY-MM-DDTHH:mm).

dateFromLocal
dateToLocal *
string($date-time)
(path)
The end of the period of time for which delay data is requested (local time, format: YYYY-MM-DDTHH:mm).

dateToLocal
Responses
Code	Description	Links
200	
OK

Media type

application/json
Controls Accept header.
Example Value
Schema
[
  {
    "airportIcao": "string",
    "from": {
      "utc": "2025-09-06T19:19:44.989Z",
      "local": "2025-09-06T19:19:44.989Z"
    },
    "to": {
      "utc": "2025-09-06T19:19:44.989Z",
      "local": "2025-09-06T19:19:44.989Z"
    },
    "departuresDelayInformation": {
      "numTotal": 0,
      "numQualifiedTotal": 0,
      "numCancelled": 0,
      "medianDelay": "string",
      "delayIndex": 0
    },
    "arrivalsDelayInformation": {
      "numTotal": 0,
      "numQualifiedTotal": 0,
      "numCancelled": 0,
      "medianDelay": "string",
      "delayIndex": 0
    }
  }
]
No links
204	
No Content

No links
400	
Bad Request

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
401	
Unauthorized

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
451	
Unavailable For Legal Reasons

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
500	
Internal Server Error

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
503	
Service Unavailable

No links

GET
/airports/{codeType}/{code}/stats/routes/daily
Airport routes and daily flight destinations [TIER 3]


What are the most popular routes from an airport? or Where I can fly from an airport? or How many daily flights to different destinations from an airport?

The data will only be available for airports which have at least schedules information available. If the airport is also covered with live or ADS-B coverage, the quality will improve greatly as it will be based on real data rather than on static scheduled data. To check if an airport is tracked and on which level, use /health/services/airports/{icao}/feeds endpoint. You can also use /health/services/feeds/{service}/airports to get the list of covered airports.

At the moment airports having both ICAO and IATA code and flight schedules are present available only.

Returns: List of routes and daily flights amount departing from an airport.

Parameters
Try it out
Name	Description
codeType *
string
(path)
Type of code to search airport by (iata or icao)

Available values : Icao, Iata


Icao
code *
string
(path)
If codeType is:

icao, then this field must be a 4-character ICAO-code of the airport (e.g.: EHAM, KLAX, UUEE, etc.);
iata, then this field must be a 3-character IATA-code of the airport (e.g.: AMS, SFO, LAX, etc.).
Full, stripped and any case formats are acceptable.

code
Responses
Code	Description	Links
200	
OK

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "routes": [
    {
      "destination": {
        "icao": "string",
        "iata": "string",
        "localCode": "string",
        "name": "string",
        "shortName": "string",
        "municipalityName": "string",
        "location": {
          "lat": 90,
          "lon": 180
        },
        "countryCode": "string",
        "timeZone": "string"
      },
      "averageDailyFlights": 0,
      "operators": [
        {
          "name": "string",
          "iata": "string",
          "icao": "string"
        }
      ]
    }
  ]
}
No links
204	
No Content

No links
400	
Bad Request

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
401	
Unauthorized

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
451	
Unavailable For Legal Reasons

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
500	
Internal Server Error

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
503	
Service Unavailable

No links

GET
/airports/{codeType}/{code}/stats/routes/daily/{dateLocal}
Airport routes and daily flight destinations [TIER 3]


What are the most popular routes from an airport? or Where I can fly from an airport? or How many daily flights to different destinations from an airport?

The data will only be available for airports which have at least schedules information available. If the airport is also covered with live or ADS-B coverage, the quality will improve greatly as it will be based on real data rather than on static scheduled data. To check if an airport is tracked and on which level, use /health/services/airports/{icao}/feeds endpoint. You can also use /health/services/feeds/{service}/airports to get the list of covered airports.

At the moment airports having both ICAO and IATA code and flight schedules are present available only.

Returns: List of routes and daily flights amount departing from an airport.

Parameters
Try it out
Name	Description
codeType *
string
(path)
Type of code to search airport by (iata or icao)

Available values : Icao, Iata


Icao
code *
string
(path)
If codeType is:

icao, then this field must be a 4-character ICAO-code of the airport (e.g.: EHAM, KLAX, UUEE, etc.);
iata, then this field must be a 3-character IATA-code of the airport (e.g.: AMS, SFO, LAX, etc.).
Full, stripped and any case formats are acceptable.

code
dateLocal *
string($date-time)
(path)
Local date at the airport (default = null). If specified, returns statistics based on 7 days prior to the date specified. Otherwise, returns statistics based on 7 days prior to the current local date at the airport.

dateLocal
Responses
Code	Description	Links
200	
OK

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "routes": [
    {
      "destination": {
        "icao": "string",
        "iata": "string",
        "localCode": "string",
        "name": "string",
        "shortName": "string",
        "municipalityName": "string",
        "location": {
          "lat": 90,
          "lon": 180
        },
        "countryCode": "string",
        "timeZone": "string"
      },
      "averageDailyFlights": 0,
      "operators": [
        {
          "name": "string",
          "iata": "string",
          "icao": "string"
        }
      ]
    }
  ]
}
No links
204	
No Content

No links
400	
Bad Request

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
401	
Unauthorized

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
451	
Unavailable For Legal Reasons

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
500	
Internal Server Error

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
503	
Service Unavailable

No links

GET
/airports/delays
Global delays (current or historical moment) [TIER 3]


What is the current or historical delay situation in all airports? or What is the delay index of all airports globally right now or at a moment in past?

Please read more about airport delays on here: https://aerodatabox.com/api-airport-delays/

Returns: Statistical delay information about delays (median delay, delay index, cancelled flights) of arrivals and departures for all known airports, represented by a collection of items sorted by the average of arrival and departure index, descending order (from worst to best). Only qualifying and recent enough delay statistics records are returned.

Parameters
Try it out
No parameters

Responses
Code	Description	Links
200	
OK

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "airportIcao": "string",
  "from": {
    "utc": "2025-09-06T19:19:45.054Z",
    "local": "2025-09-06T19:19:45.054Z"
  },
  "to": {
    "utc": "2025-09-06T19:19:45.054Z",
    "local": "2025-09-06T19:19:45.054Z"
  },
  "departuresDelayInformation": {
    "numTotal": 0,
    "numQualifiedTotal": 0,
    "numCancelled": 0,
    "medianDelay": "string",
    "delayIndex": 0
  },
  "arrivalsDelayInformation": {
    "numTotal": 0,
    "numQualifiedTotal": 0,
    "numCancelled": 0,
    "medianDelay": "string",
    "delayIndex": 0
  }
}
No links
204	
No Content

No links
400	
Bad Request

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
401	
Unauthorized

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
451	
Unavailable For Legal Reasons

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
500	
Internal Server Error

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
503	
Service Unavailable

No links

GET
/airports/delays/{dateUtc}
Global delays (current or historical moment) [TIER 3]


What is the current or historical delay situation in all airports? or What is the delay index of all airports globally right now or at a moment in past?

Please read more about airport delays on here: https://aerodatabox.com/api-airport-delays/

Returns: Statistical delay information about delays (median delay, delay index, cancelled flights) of arrivals and departures for all known airports, represented by a collection of items sorted by the average of arrival and departure index, descending order (from worst to best). Only qualifying and recent enough delay statistics records are returned.

Parameters
Try it out
Name	Description
dateUtc *
string($date-time)
(path)
The moment of time for / from which delay data is requested (UTC time, format: YYYY-MM-DDTHH:mm). Default - current time.

dateUtc
Responses
Code	Description	Links
200	
OK

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "airportIcao": "string",
  "from": {
    "utc": "2025-09-06T19:19:45.077Z",
    "local": "2025-09-06T19:19:45.077Z"
  },
  "to": {
    "utc": "2025-09-06T19:19:45.077Z",
    "local": "2025-09-06T19:19:45.077Z"
  },
  "departuresDelayInformation": {
    "numTotal": 0,
    "numQualifiedTotal": 0,
    "numCancelled": 0,
    "medianDelay": "string",
    "delayIndex": 0
  },
  "arrivalsDelayInformation": {
    "numTotal": 0,
    "numQualifiedTotal": 0,
    "numCancelled": 0,
    "medianDelay": "string",
    "delayIndex": 0
  }
}
No links
204	
No Content

No links
400	
Bad Request

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
401	
Unauthorized

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
451	
Unavailable For Legal Reasons

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
500	
Internal Server Error

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
503	
Service Unavailable

No links

GET
/flights/{number}/delays
Flight delay statistics by flight number [TIER 3]


By how much the flight is delayed in average?

Information is only available for flights which were tracked with live updates at least at origin or at destination within the last 90 days.

Returns: delay statistics for the flight with specified number.

Parameters
Try it out
Name	Description
number *
string
(path)
Flight number (with or without spaces, IATA or ICAO, any case formats are acceptable, e.g. KL1395, Klm 1395)

number
Responses
Code	Description	Links
200	
OK

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "number": "string",
  "origins": [
    {
      "airportIcao": "string",
      "class": "Flight",
      "scheduledHourUtc": 0,
      "medianDelay": "string",
      "delayPercentiles": [
        {
          "percentile": 95,
          "delay": "string"
        }
      ],
      "numConsideredFlights": 0,
      "numFlightsDelayedBrackets": [
        {
          "delayedFrom": "string",
          "delayedTo": "string",
          "num": 0,
          "percentage": 0
        }
      ],
      "fromUtc": "2025-09-06T19:19:45.114Z",
      "toUtc": "2025-09-06T19:19:45.114Z"
    }
  ],
  "destinations": [
    {
      "airportIcao": "string",
      "class": "Flight",
      "scheduledHourUtc": 0,
      "medianDelay": "string",
      "delayPercentiles": [
        {
          "percentile": 95,
          "delay": "string"
        }
      ],
      "numConsideredFlights": 0,
      "numFlightsDelayedBrackets": [
        {
          "delayedFrom": "string",
          "delayedTo": "string",
          "num": 0,
          "percentage": 0
        }
      ],
      "fromUtc": "2025-09-06T19:19:45.114Z",
      "toUtc": "2025-09-06T19:19:45.114Z"
    }
  ]
}
No links
204	
No Content

No links
400	
Bad Request

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
401	
Unauthorized

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
451	
Unavailable For Legal Reasons

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
500	
Internal Server Error

Media type

application/json
Example Value
Schema
{
  "message": "string"
}
No links
503	
Service Unavailable