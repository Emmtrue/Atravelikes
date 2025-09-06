Overview
Welcome to the LiteAPI Developer Documentation. This guide provides all the information you need to integrate LiteAPI into your applications. Whether you are building a simple website or a complex booking system, our APIs offer flexible and powerful tools to meet your needs.

LiteAPI is designed to be easy to use and highly efficient, ensuring that you can focus on building great features for your users. Our API provides seamless access to a wide range of hotel data, including availability, rates, and booking options, making it the perfect choice for travel and hospitality applications.

🌎
The fastest way to build travel apps!

Launch your hospitality product in minutes. Effortlessly monetize by selling accommodations at over 2 million properties worldwide.

Key Features
Extensive Hotel Database: Access detailed information about thousands of hotels worldwide, including descriptions, amenities, and photos.
Real-Time Availability and Rates: Get up-to-date information on hotel availability and rates to ensure your users see the most current options.
Secure Payments: Use our integrated payment solutions to process transactions securely and efficiently.
Comprehensive API Reference: Our documentation covers all available endpoints, providing clear examples and detailed descriptions to help you implement our API quickly.
Getting Started With liteAPI
Learn how to quickly get up and running with LiteAPI. Follow these steps to start making API calls in minutes.

Step 1: Sign up

Create an account on the LiteAPI platform.
Obtain your API key from the dashboard.
Step 2: Authentication

Use your API key to authenticate your requests. See the Authentication section for more details.
Step 3: Making your first API call

Example code to fetch hotels by city:

JavaScript
Python
Go
PHP
Node

const apiKey = 'YOUR_API_KEY';

fetch('https://api.liteapi.travel/v3.0/data/hotels?countryCode=IT&cityName=Rome', {
    headers: {
        'X-API-Key': apiKey
    }
})
.then(response => response.json())
.then(data => console.log(data));
Step 4: Explore the API

Browse the API Reference and Booking workflow to see all available endpoints and their functionalities.
Standard Authentication
All requests to LiteAPI must be authenticated using an API key. You can find your API key in the LiteAPI dashboard. An account provides analytics and management for all bookings through the attached API keys.

To authenticate against LiteAPI's REST APIs, include the X-API-Key header in your HTTP requests, setting its value to your personal API key.

This API key grants access to the API and must be kept confidential to prevent unauthorized use. Ensure you securely store the API key and avoid exposing it in public or client-side code repositories. This header ensures that your requests are authenticated and authorized to interact with LiteAPI's services.

Shell
Python
Go
PHP
Node

curl -X GET "https://api.liteapi.travel/v3.0/data/hotels?countryCode=IT&cityName=Rome" -H "X-API-Key: YOUR_API_KEY"
Sample Sandbox API Key:

To help you get started quickly, we provide a sandbox API key that you can use for testing purposes. Note that this key has limited permissions and can only be used for sandbox testing. Sandbox API Key:


sand_c0155ab8-c683-4f26-8f94-b5e92c5797b9
Example Request Using Sandbox API Key:

Shell

curl -X GET "https://api.liteapi.travel/v3.0/data/hotels?countryCode=IT&cityName=Rome" -H "X-API-Key: sand_c0155ab8-c683-4f26-8f94-b5e92c5797b9"
Security Best Practices:

Keep your API key secure. Do not expose it in client-side code.
Rotate your API keys regularly.
Use environment variables to manage your API keys.
Secure Authentication
LiteAPI also provides a secure method for authenticating requests without directly transmitting your private API key. Instead, you can sign your request using HMAC SHA-512 and include the signature along with a public key in the request headers. This ensures better security by preventing your private key from being exposed in transit.

Why Use Secure Authentication?
When using API keys directly, they can be intercepted in transit, stored insecurely, or inadvertently exposed in logs. Instead, using a signed request ensures:

Enhanced Security: Your private API key never leaves your system.
Replay Attack Prevention: Each request includes a timestamp to prevent reuse of old signatures.
Integrity Assurance: The server verifies that the request has not been tampered with.
How It Works
Instead of sending your private API key, you generate a unique signature using your API key, a shared secret, and a timestamp. The server then verifies the signature to authenticate the request.

Steps:
Generate a UNIX timestamp.
Create a signature using HMAC SHA-512, combining your API key, shared secret, and timestamp.
Include the public key, signature, and timestamp in the request headers.
The server validates the signature and processes the request.
Example Implementation (JavaScript/Node.js)
JavaScript

const crypto = require("crypto");

const privateApiKey = "prod_123";
const publicApiKey = "prod_public_456";

const timestamp = Math.floor(Date.now() / 1000);
const signature = crypto.SHA512(`${privateApiKey}${publicApiKey}${timestamp}`).toString(crypto.enc.Hex);

const authHeaderValue = `PublicKey=${publicKey},Signature=${signature},Timestamp=${timestamp}`;

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: authHeaderValue
};

console.log(headers);
Example HTTP Request
HTTP

GET /v1/data/hotels HTTP/1.1
Host: api.liteapi.com
Content-Type: application/json
Accept: application/json
Authorization: PublicKey=123,Signature=abcdef123456789,Timestamp=1610000000
Error handling
LiteAPI uses standard HTTP status codes to indicate the success or failure of an API request.

Here are the common status codes and their meanings:

200 OK: The request was successful.
400 Bad Request: The request was invalid or cannot be served.
401 Unauthorized: Authentication failed or API key is missing.
403 Forbidden: You do not have access to the requested resource.
404 Not Found: The requested resource could not be found.
500 Internal Server Error: An error occurred on the server.

Example Error Response:

JSON

{
  "error": {
    "code": 400,
    "message": "Invalid city name."
  }
}
Handling Errors in Code:

Here's an example JavaScript script to handle errors when using our API endpoints.

JavaScript

fetch('https://api.liteapi.travel/v3.0/data/hotels?city=InvalidCity', {
    headers: {
        'X-API-Key': 'YOUR_API_KEY'
    }
})
.then(response => {
    if (!response.ok) {
        return response.json().then(error => Promise.reject(error));
    }
    return response.json();
})
.catch(error => {
    console.error('Error:', error);
});
Rate Limiting
To ensure fair use of resources, LiteAPI enforces rate limits on API requests. If you exceed the rate limits, you will receive a "429 Too Many Requests" response.

Rate Limit Details:

Sandbox API keys:
5 requests per second
Production API keys:
250 requests per second

Handling Rate Limit Responses:

JSON

{
  "error": {
    "code": 429,
    "message": "Too many requests. Please try again later."
  }
}
Contact us about custom rate limits if you need a higher rate limit.

Best Practices:

Implement exponential backoff when retrying requests.
Monitor your usage in the LiteAPI dashboard.
API Endpoints Overview
The provided diagram visually outlines the API endpoints available in LiteAPI v3, categorized into four main sections: Hotel Data API, Search API, and Booking API, Loyalty API.



Endpoints breakdown
Hotel Data API:

Hotels:
GET /data/hotels: Retrieve a list of hotels.
GET /data/hotel: Get detailed information about a specific hotel.
GET /data/reviews: Access reviews for a specific hotel.
Cities:
GET /data/cities: Fetch a list of cities within a specified country.
Countries:
GET /data/countries: Obtain a list of all countries.
Currencies:
GET /data/currencies: Retrieve a list of supported currencies.
IATA codes:
GET /data/iataCodes: Get IATA codes for airports and cities.
Hotel Facilities
GET /data/facilities: List the Hotel facilities
Hotel Types
GET /data/hotelTypes: List of the Hotel types
Hotel Chains
GET /data/chains: List of Hotel chains
Search API:

Room Rates:
POST /hotels/rates: Request room rates for a list of hotel IDs.
Booking API:

Create Checkout Session:
POST /rates/prebook: Initiate a prebooking session and obtain a transaction ID.
Confirm Booking:
POST /rates/book: Confirm a booking with the transaction ID.
List Bookings:
GET /bookings: Retrieve a list of all bookings.
Retrieve a Booking:
GET /bookings/{bookingId}: Get details of a specific booking.
Cancel a Booking:
PUT /bookings/{bookingId}: Cancel a specific booking.
Loyalty API:

Fetch all guests
GET /guests: Fetches a list of all guests along with their loyalty program information, including accumulated points and booking history.
Fetch a specific guest
GET /guests/{guestId}: Fetches detailed information about a guest, including personal data, loyalty points, and booking history.
Fetch all guest's bookings
GET /guests/{guestId}/bookings: Retrieves a list of all bookings associated with a specific guest, including details about the points earned and cashback applied for each booking.
Enable the loyalty program
POST /loyalties: Enables or disables the loyalty program with the specified cashback rate (e.g. use “0.03” for 3% cashback).
Update the loyalty program
PUT /loyalties: Updates the loyalty program settings, including status and cashback rates.
Get the loyalty program settings
GET /loyalties: Retrieves information about current loyalty program settings, including status and cashback rates.
This structured layout facilitates easy navigation and use of the API for tasks ranging from fetching basic hotel data to managing detailed booking operations.
Booking Workflow
The LiteAPI product streamlines the process of fetching and booking hotel accommodations through a series of well-defined steps. Have a read at the flow chart below to understand how you should be interacting with our API endpoints when building your application.



Build a fully-fledged web application to book hotels
We have created an open-source example web app using the LiteAPI Node.js SDK, available on GitHub. This example demonstrates the complete process of building a hotel booking website, including checkout, payment, and booking confirmation. Explore the source code here: https://github.com/liteapi-travel/build-website-example
Implementing Payment
Ready to handle payments with liteAPI? We’ve got you covered with four built-in payment options, plus the flexibility to add your own payment layer if needed. Let’s dive into the options and how to get started with each one.

1. User Payment
Use liteAPI's payment SDK to accept user payment. User Payment Guide

This is the most common option, allowing liteAPI to handle all the payment processing on your behalf.

2. Account Credit Card
Pay directly from the account’s credit card. Account Credit Card Guide

This is the easiest method to implement, especially for sandbox testing. It's also used when an application wants to be the merchant of record or to bundle services or goods.

3. Account Wallet
Prepay to top up the wallet and then use the wallet funds for bookings. Account Wallet Guide

It is very similar to the Account Credit Card but offers the option to prepay for future bookings.
Search for a list of places
get
https://api.liteapi.travel/v3.0/data/places
Look up for a list of places and areas, given a search query. Places can be used to search for hotels within a location and restrict the list to results within the boundaries of a selected place.

Log in to see full request history
time	status	user agent	
Make a request to see history.
0 Requests This Month

Query Params
textQuery
string
required
Search query. e.g. 'Manhattan'

type
string
Restricts the results to places matching the specified type. e.g. 'hotel'

language
string
The language code, indicating in which language the results should be returned. e.g. 'en'

clientIP
string
The IP address of the client making the request.

Responses

200
OK

Response body
object
data
array of objects
object
placeId
string
A unique identifier for the place, typically used in further requests or lookups.

displayName
string
A human-friendly name or label for the place.

formattedAddress
string
The full address for the place, including street, city, country, etc.

types
string
A list of categories or designations describing the place (e.g. 'hotel', 'lodging').

language
string
The language code in which the place details are returned.

Headers
object
Content-Type
string
Content-Encoding
string
400
Bad request

Response body
object
error
object
code
integer
Numeric error code representing the type of issue

description
string
Brief explanation of the error type

message
string
Message providing context about the error

Headers
object
Content-Type
string
Content-Encoding
string
Search for a specific place
get
https://api.liteapi.travel/v3.0/data/places/{placeId}
Look up for a specific place, given a search query. Places can be used to search for hotels within a location and restrict the list to results within the boundaries of a selected place.

Log in to see full request history
time	status	user agent	
Make a request to see history.
0 Requests This Month

Path Params
placeId
string
required
Unique identifier of the place to retrieve.

Responses

200
OK

Response body
object
data
object
addressComponents
array of objects
A list of address components, each representing a part of the address such as country, city, or postal code.

object
languageCode
string
The language code for the address component (e.g., 'en', 'en-US').

longText
string
The full text of the address component (e.g., 'France').

shortText
string
The abbreviated or short text for the address component (e.g., 'FR').

types
array of strings
A list of types describing the address component (e.g., 'country', 'political').

location
object
The geographic coordinates of the place.


location object
viewport
object
The recommended viewport for displaying the place, defined by high and low latitude/longitude bounds.


viewport object
Headers
object
Content-Type
string
Content-Encoding
string
400
Bad request

Response body
object
error
object
code
integer
Numeric error code representing the type of issue

description
string
Brief explanation of the error type

message
string
Message providing context about the error

Headers
object
Content-Type
string
Content-Encoding
string
Retrieve a list of hotels
get
https://api.liteapi.travel/v3.0/data/hotels
This API endpoint returns a list of hotels available based on different search criterion.

The API supports additional search criteria such as city name, geo coordinates, and radius.

This endpoint provides detailed hotel metadata, including names, addresses, ratings, amenities, and images, facilitating robust hotel search and display features within applications.

Log in to see full request history
time	status	user agent	
Make a request to see history.
0 Requests This Month

Query Params
countryCode
string
Country code ISO-2 code - example (SG)

cityName
string
Name of the city

hotelName
string
Name of the hotel (loose match, case-insensitive, e.g. 'hilton')

offset
integer
Specifies the number of rows to skip before starting to return rows

limit
integer
Specifies the maximum number of results to return. By default, this is set to 200, even if not explicitly defined. If a higher limit is specified, the maximum allowed is 5000 results

lastUpdatedAt
string
Retrieve only the hotels that have been updated since the provided date and time (using the RFC3339 format)

longitude
number
Longitude geo coordinates

latitude
number
Latitude geo coordinates

radius
integer
radius in meters (min 1000m)

aiSearch
string
Search term for AI search

timeout
float
request timeout in seconds

zip
string
ZIP code of the location

minRating
float
Minimum rating of the hotel. e.g. 8.6

minReviewsCount
number
Minimum number of reviews. e.g. 100

facilityIds
string
Comma-separated list of facilities. e.g. '1,2,3'

hotelTypeIds
string
Comma-separated list of hotel types. e.g. '201,204,208'

chainIds
string
Comma-separated list of hotel chain ids. e.g. '14675,14677'

strictFacilitiesFiltering
boolean
If true, only hotels with all the specified facilities will be returned


starRating
string
Comma-separated list of star ratings. Note: star ratings have 2 allowed decimals '.0' and '.5' from 1 to 5. e.g. '3.5,4.0,5.0'

placeId
string
Unique ID of a place retrieved from the places endpoint

language
string
The language code, indicating in which language the results should be returned. e.g. 'fr'

advancedAccessibilityOnly
boolean
If true, only hotels with advanced accessibility will be returned


true
Responses

200
OK

Response body
object
data
array of objects
object
id
string
Unique identifier of the hotel

name
string
Name of the hotel

hotelDescription
string
A brief description of the hotel and its facilities

currency
string
The currency code used for hotel pricing (e.g., USD, EUR)

country
string
The country where the hotel is located

city
string
The city where the hotel is situated

latitude
number
The latitude coordinate of the hotel's location

longitude
number
The longitude coordinate of the hotel's location

address
string
The street address of the hotel

zip
string
The postal code of the hotel

main_photo
string
The main image representing the hotel

thumbnail
string
A smaller version of the main photo used for previews

stars
number
The hotel's star rating (e.g., 3, 4, 5 stars)

hotelTypeId
number
The unique identifier for the hotel's category or type

chainId
number
The unique identifier of the hotel chain

chain
string
The name of the hotel chain, if applicable (e.g., Hilton, Marriott).

accessibilityAttributes
object
A compact representation of the hotel's accessibility features.


accessibilityAttributes object
deletedAt
string
Timestamp indicating when hotel is deleted in our system

hotelIds
array of strings
An array of unique hotel identifiers that match the specified filters or query parameters, allowing quick reference to specific hotels.

total
integer
The total number of hotels retrieved based on the applied filters or query parameters.

Headers
object
Content-Type
string
Content-Encoding
string
400
Bad Request

Response body
object
error
object
code
integer
Numeric error code representing the type of issue

description
string
Brief explanation of the error type

message
string
Message providing context about the error

Headers
object
Content-Type
string
Content-Encoding
string
401
Unauthorized

Response body
object
error
object
code
integer
Numeric error code representing the type of issue

message
string
Message providing context about the error

Headers
object
Content-Type
string
Content-Length
string
Get the details of a hotel
get
https://api.liteapi.travel/v3.0/data/hotel
The "Get Hotel Details" endpoint allows developers to retrieve detailed information about a specific hotel using its unique identifier. This endpoint provides extensive data, including the hotel's name, address, rating, amenities, images, and a detailed description. By making a GET request to /v3.0/data/hotel?hotelId={id}, developers can access this comprehensive information, which is crucial for displaying detailed hotel profiles in their applications.

This endpoint ensures that users have access to all necessary details to make informed decisions about their hotel stays, enhancing the overall user experience.

Log in to see full request history
time	status	user agent	
Make a request to see history.
0 Requests This Month

Query Params
hotelId
string
required
Unique ID of a hotel

timeout
float
Defaults to 4
request timeout in seconds

4
language
string
The language code, indicating in which language the results should be returned. e.g. 'fr'

advancedAccessibilityOnly
boolean
If true, accessibility section will be returned


true
Responses

200
OK

Response body
object
data
object
id
string
Unique identifier for the hotel.

name
string
Name of the hotel.

hotelDescription
string
Detailed description of the hotel.

hotelImportantInformation
string
Critical information and important details about the hotel.

checkinCheckoutTimes
object
Check-in and check-out timing details for the hotel.


checkinCheckoutTimes object
hotelImages
array of objects
List of images representing the hotel.

object
url
string
URL of the hotel image.

urlHd
string
High definition URL of the hotel image.

caption
string
Caption or description for the image.

order
integer
Display order of the image.

defaultImage
boolean
Indicates if this image is the default for the hotel.

main_photo
string
URL of the main photo for the hotel.

thumbnail
string
URL of the hotel's thumbnail image.

country
string
Country where the hotel is located.

city
string
City where the hotel is located.

starRating
integer
Star rating of the hotel.

location
object
Geographical coordinates of the hotel.


location object
address
string
Physical address of the hotel.

hotelFacilities
array of strings
List of facilities offered by the hotel.

chain
string
Name of the hotel chain, if applicable.

facilities
array of objects
Detailed list of facilities provided by the hotel.

object
facilityId
integer
Unique identifier for the facility.

name
string
Name of the facility.

rooms
array of objects
List of room objects available in the hotel.

object
id
integer
Unique identifier for the room.

roomName
string
Name or type designation of the room.

description
string
Detailed description of the room and its features.

roomSizeSquare
number
Size of the room in square meters.

roomSizeUnit
string
Unit of measurement for room size (e.g., 'm2').

hotelId
string
Identifier of the hotel this room belongs to.

maxAdults
integer
Maximum number of adults that can be accommodated.

maxChildren
integer
Maximum number of children that can be accommodated.

maxOccupancy
integer
Overall maximum occupancy of the room.

bedTypes
array of objects
List of bed configurations available in the room.

object
quantity
integer
Number of beds of this type available in the room.

bedType
string
Type of the bed (e.g., 'King size', 'Double bed').

bedSize
string
Dimensions or size description of the bed.

Id
integer
Unique identifier for the bed type.

roomAmenities
array of objects
List of amenities provided in the room.

object
amenitiesId
integer
Unique identifier for the amenity.

name
string
Name of the amenity.

sort
integer
Sort order for displaying the amenity.

photos
array of objects
List of photos associated with the room.

object
url
string
URL of the room photo.

imageDescription
string
Description or caption for the photo.

imageClass1
string
Additional classification or tag for the image.

imageClass2
string
Secondary classification or tag for the image.

failoverPhoto
string
Backup URL for the photo in case the primary URL fails.

mainPhoto
boolean
Indicates if this is the main photo for the room.

score
number
Relevance score or ranking for the photo.

classId
integer
Identifier for the photo's classification.

classOrder
integer
Order of appearance for the photo based on its classification.

hd_url
string
High definition URL of the room photo.

accessibility
object
Accessibility information and certifications for the hotel.


accessibility object
phone
string
Contact phone number for the hotel.

fax
string
Fax number for the hotel.

email
string
Contact email address for the hotel.

hotelType
string
Type or category of the hotel.

hotelTypeId
number
Identifier for the hotel type.

chainId
number
Identifier for the hotel chain.

airportCode
string
IATA code of the nearest airport.

rating
number
Overall rating of the hotel.

reviewCount
integer
Total number of reviews received for the hotel.

parking
boolean | null
Indicates whether parking is available (nullable).

groupRoomMin
number | null
Minimum number of rooms required for group bookings (nullable).

childAllowed
boolean | null
Indicates if children are allowed at the hotel (nullable).

petsAllowed
boolean | null
Indicates if pets are allowed at the hotel (nullable).

policies
array of objects
List of policies and guidelines applicable to the hotel.

object
policy_type
string
Specifies the category or classification of the policy.

name
string
The official title or identifier of the policy, providing a concise summary of its purpose.

description
string
A comprehensive explanation of the policy, outlining its terms, conditions, and operational details.

child_allowed
string
Details regarding the hotel's policy on children, including any age restrictions, complimentary services, or special provisions.

pets_allowed
string
Describes the pet policy, including whether pets are allowed, any applicable restrictions or fees, and specific guidelines for pet owners.

parking
string
Provides information on parking facilities, including availability, any associated fees, and usage guidelines.

sentiment_analysis
object
Sentiment analysis data derived from guest reviews.


sentiment_analysis object
sentiment_updated_at
string
Timestamp indicating when the sentiment analysis was last updated.

deletedAt
string
Timestamp indicating when hotel is deleted in our system

Headers
object
Content-Type
string
Content-Encoding
string
400
Bad Request

Response body
object
error
object
code
integer
Numeric error code representing the type of issue

description
string
Brief explanation of the error type

message
string
Detailed message providing context about the error

Headers
object
Content-Type
string
Content-Encoding
string
401
Unauthorized

Response body
object
error
object
code
integer
Numeric error code representing the type of issue

description
string
Brief explanation of the error type

message
string
Detailed message providing context about the error

Headers
object
Content-Type
string
Content-Length
string
Get the reviews of a hotel
get
https://api.liteapi.travel/v3.0/data/reviews
The "Get Hotel Reviews" endpoint allows developers to fetch reviews for a specific hotel using its unique identifier. This endpoint provides valuable feedback from previous guests, including ratings, review text, and the date of the review. By making a GET request to /v3.0/data/reviews?hotelId={id}, developers can integrate authentic user reviews into their applications, helping potential guests make informed decisions based on real experiences.

This feature enhances the user experience by providing transparent and detailed insights into hotel quality and guest satisfaction, which is crucial for building trust and credibility.

Log in to see full request history
time	status	user agent	
Make a request to see history.
0 Requests This Month

Query Params
hotelId
string
required
Unique ID of a hotel

limit
integer
Specifies the maximum number of results to return. By default, this is set to 200, even if not explicitly defined. If a higher limit is specified, the maximum allowed is 5000 results

offset
integer
Specifies the number of reviews to skip, defaults to 0

timeout
float
Defaults to 4
request timeout in seconds

4
getSentiment
boolean
Defaults to false
If set to true, an AI sentiment analysis of the last 1000 reviews will be returned


false
Responses

200
A list of hotel reviews

Response body
object
data
array of objects
object
averageScore
number
Average score of the review

country
string
Country of the reviewer

type
string
Type of traveler (e.g., business, solo)

name
string
Name of the reviewer

date
string
Date and time of the review

headline
string
Headline of the review

language
string
Language of the review

pros
string
Pros mentioned in the review

cons
string
Cons mentioned in the review

source
string
The source of the review

total
integer
400
Bad Request

Response body
object
error
object
code
integer
description
string
message
string
401
Unauthorized

Response body
object
error
object
code
integer
message
string
Semantic hotel search by text query
get
https://api.liteapi.travel/v3.0/data/hotel/search
Search for a hotel using a semantic text query. Returns the best-matching hotel with basic details and a relevance score.

Log in to see full request history
time	status	user agent	
Make a request to see history.
0 Requests This Month

Query Params
query
string
required
The semantic search query (e.g. 'Burj Jumeirah Dubai').

Responses

200
OK

Response body
object
data
object
id
string
LiteAPI hotel ID

name
string
Hotel name

hotelDescription
string
Hotel description

city
string
City

country
string
Country code

latitude
number
Latitude

longitude
number
Longitude

address
string
Address

zip
string
ZIP code

score
number
Semantic search relevance score (0-1)
400
Bad Request

Response body
object
error
object
code
integer
description
string
message
string
404
No match found

Response body
object
error
object
code
integer
description
string
message
string
List the cities of a country
get
https://api.liteapi.travel/v3.0/data/cities
The "Get Cities" endpoint allows developers to retrieve a list of city names within a specified country. The country code must be provided in ISO-2 format. By making a GET request to /v3.0/data/cities with the appropriate country code, developers can access a comprehensive list of cities in that country. If you need the ISO-2 country codes, you can use the Get Country List endpoint.

This endpoint is essential for applications that require location-specific data, enhancing user experiences by providing accurate and relevant city information.

Log in to see full request history
time	status	user agent	
Make a request to see history.
0 Requests This Month

Query Params
countryCode
string
required
Country code in iso-2 format (example: SG)

timeout
float
Defaults to 4
request timeout in seconds

4
Responses

200
OK

Response body
object
data
array of objects
object
city
string
Headers
object
Date
string
Content-Type
string
Content-Length
integer
Connection
string
x-amzn-RequestId
string
Access-Control-Allow-Origin
string
Content-Encoding
string
Access-Control-Allow-Headers
string
x-amz-apigw-id
string
Access-Control-Allow-Methods
string
Access-Control-Expose-Headers
string
x-amzn-Remapped-Date
string
Access-Control-Max-Age
integer
Access-Control-Allow-Credentials
boolean
400
Bad Request

Response body
object
error
object
code
integer
description
string
message
string
Headers
object
Date
string
Content-Type
string
Content-Length
integer
Connection
string
x-amzn-RequestId
string
Access-Control-Allow-Origin
string
Content-Encoding
string
Access-Control-Allow-Headers
string
x-amz-apigw-id
string
Access-Control-Allow-Methods
string
Access-Control-Expose-Headers
string
x-amzn-Remapped-Date
string
Access-Control-Max-Age
integer
Access-Control-Allow-Credentials
boolean
401
Unauthorized

Response body
object
error
object
code
integer
message
string
Headers
object
Date
string
Content-Type
string
Content-Length
integer
Connection
string
x-amzn-RequestId
string
Access-Control-Allow-Origin
string
Content-Encoding
string
Access-Control-Allow-Headers
string
x-amz-apigw-id
string
Access-Control-Allow-Methods
string
Access-Control-Expose-Headers
string
x-amzn-Remapped-Date
string
Access-Control-Max-Age
integer
Access-Control-Allow-Credentials
boolean
List all countries
get
https://api.liteapi.travel/v3.0/data/countries
The API returns the list of countries available along with its ISO-2 code.

Recipes
Display the countries list
Open Recipe
Log in to see full request history
time	status	user agent	
Make a request to see history.
0 Requests This Month

Query Params
timeout
float
Defaults to 4
request timeout in seconds

4
Responses

200
OK

Response body
object
data
array of objects
object
code
string
name
string
Headers
object
Date
string
Content-Type
string
Content-Length
integer
Connection
string
x-amzn-RequestId
string
Access-Control-Allow-Origin
string
Content-Encoding
string
Access-Control-Allow-Headers
string
x-amz-apigw-id
string
Access-Control-Allow-Methods
string
Access-Control-Expose-Headers
string
x-amzn-Remapped-Date
string
Access-Control-Max-Age
integer
Access-Control-Allow-Credentials
boolean
401
Unauthorized

Response body
object

View Additional Properties
Headers
object
Date
string
Content-Type
string
Content-Length
integer
Connection
string
x-amzn-RequestId
string
Access-Control-Allow-Origin
string
Content-Encoding
string
Access-Control-Allow-Headers
string
x-amz-apigw-id
string
Access-Control-Allow-Methods
string
Access-Control-Expose-Headers
string
x-amzn-Remapped-Date
string
Access-Control-Max-Age
integer
Access-Control-Allow-Credentials
boolean
List all currencies
get
https://api.liteapi.travel/v3.0/data/currencies
The API returns all available currency codes along with its name and the list of supported countries that the currency applies to.

Log in to see full request history
time	status	user agent	
Make a request to see history.
0 Requests This Month

Query Params
timeout
float
Defaults to 4
request timeout in seconds

4
Responses

200
OK

Response body
object
data
array of objects
object
code
string
currency
string
countries
array of strings
Headers
object
Date
string
Content-Type
string
Content-Length
integer
Connection
string
x-amzn-RequestId
string
Access-Control-Allow-Origin
string
Content-Encoding
string
Access-Control-Allow-Headers
string
x-amz-apigw-id
string
Access-Control-Allow-Methods
string
Access-Control-Expose-Headers
string
x-amzn-Remapped-Date
string
Access-Control-Max-Age
integer
Access-Control-Allow-Credentials
boolean
401
Unauthorized

Response body
object
value
object
error
object

error object
Headers
object
Date
string
Content-Type
string
Content-Length
integer
Connection
string
x-amzn-RequestId
string
Access-Control-Allow-Origin
string
Content-Encoding
string
Access-Control-Allow-Headers
string
x-amz-apigw-id
string
Access-Control-Allow-Methods
string
Access-Control-Expose-Headers
string
x-amzn-Remapped-Date
string
Access-Control-Max-Age
integer
Access-Control-Allow-Credentials
boolean
List the IATA codes
get
https://api.liteapi.travel/v3.0/data/iataCodes
The API returns the IATA (International Air Transport Association) codes for all available airports along with the name of the airport, geographical coordinates and country code in ISO-2 format.

Log in to see full request history
time	status	user agent	
Make a request to see history.
0 Requests This Month

Query Params
timeout
float
Defaults to 4
request timeout in seconds

4
Responses

200
OK

Response body
object
data
array of objects
object
code
string
name
string
latitude
number
longitude
number
countryCode
string
Headers
object
Date
string
Content-Type
string
Content-Length
integer
Connection
string
x-amzn-RequestId
string
Access-Control-Allow-Origin
string
Content-Encoding
string
Access-Control-Allow-Headers
string
x-amz-apigw-id
string
Access-Control-Allow-Methods
string
Access-Control-Expose-Headers
string
x-amzn-Remapped-Date
string
Access-Control-Max-Age
integer
Access-Control-Allow-Credentials
boolean
401
Unauthorized

Response body
object
error
object
code
integer
message
string
Headers
object
Date
string
Content-Type
string
Content-Length
integer
Connection
string
x-amzn-RequestId
string
Access-Control-Allow-Origin
string
Content-Encoding
string
Access-Control-Allow-Headers
string
x-amz-apigw-id
string
Access-Control-Allow-Methods
string
Access-Control-Expose-Headers
string
x-amzn-Remapped-Date
string
Access-Control-Max-Age
integer
Access-Control-Allow-Credentials
boolean
List the Hotel facilities
get
https://api.liteapi.travel/v3.0/data/facilities
The API returns the list of hotel facilities available in the system.

Log in to see full request history
time	status	user agent	
Make a request to see history.
0 Requests This Month

Response

200
OK

Response body
object
data
array of objects
object
facility
string
Name of the facility in English by default.

facility_id
number
Numeric identifier of the facility.

sort
number
Numeric sort order used for display.

translation
array of objects
Array of translated facility names by language.

object
lang
string
ISO language code (e.g., 'en', 'es').

facility
string
Facility name in the given language.

Headers
object
Content-Type
string
Content-Encoding
string
List of hotel types
get
https://api.liteapi.travel/v3.0/data/hotelTypes
The API returns a list of available hotel types

Log in to see full request history
time	status	user agent	
Make a request to see history.
0 Requests This Month

Response

200
OK

Response body
object
data
array of objects
object
id
number
A numeric identifier for the hotel or property type.

name
string
The name or category of the hotel or property type.

Headers
object
Content-Type
string
Content-Encoding
string
List of hotel chains
get
https://api.liteapi.travel/v3.0/data/chains
The API returns a list of available hotel chains

Log in to see full request history
time	status	user agent	
Make a request to see history.
0 Requests This Month

Response

200
OK

Response body
object
data
array of objects
An array containing objects for each hotel chain.

object
id
number
Numeric field representing the unique identifier of the hotel chain.

name
string
String field representing the hotel chain's name.

Headers
object
Content-Type
string
Content-Encoding
string
Retrieve rates for hotels
post
https://api.liteapi.travel/v3.0/hotels/rates
This endpoint allows developers to retrieve detailed rate information for hotels, supporting multi-room bookings. By making a POST request with the required parameters, you receive an array of offers, each containing comprehensive rate details. This endpoint is essential for providing users with detailed booking options, including pricing and room specifications.

The default request limit is 200 hotels per request. However, the limit parameter can be increased to accommodate up to 5,000 hotel IDs if needed. The recommended timeout is 6 seconds, but we recommend setting it to 12 when you have a high load. The required parameters include check-in and check-out dates, currency, guestNationality, and a location specified either by hotel-id, city, country, (latitude, longitude, radius), or placeId/iataCode, as well as an array of occupancy objects. Each occupancy object defines the number of adults and the ages of any children for each room requested, allowing for flexible booking scenarios.

Log in to see full request history
time	status	user agent	
Make a request to see history.
0 Requests This Month

Body Params
hotelIds
array of strings
An array of hotel IDs to search for availability and pricing. These are usually pulled from https://docs.liteapi.travel/reference/get_data-hotels.


ADD string
occupancies
array of objects
required
An array of objects specifying the number of guests per room. Required.


ADD object
currency
string
required
The currency in which the prices will be displayed.

guestNationality
string
required
The guest's nationality in ISO 2-letter country code format.

checkin
string
required
The check-in date in YYYY-MM-DD format (ISO 8601).

checkout
string
required
The check-out date in YYYY-MM-DD format (ISO 8601).

timeout
integer
The maximum time in seconds before the request times out. This is when the live request for rates will cut off responses; it will take a few more ms to return the value.

maxRatesPerHotel
integer
The number of room rates to return per hotel, sorted by price (cheapest first). Set to 1 to just get the cheapest rate for each hotel, this is helpful for listing pages.

boardType
string
Filter results by board type. Example values: RO (Room Only), BB (Bed & Breakfast), HB (Half Board), etc.

refundableRatesOnly
boolean
If true, only refundable rates (RFN) will be included in the response.


true
sort
array of objects
Sorting criteria for the results. Multiple criteria can be provided, processed in order. The default sorting is by top picks. You can sort by price in ascending or descending order.


ADD object
roomMapping
boolean
Enable room mapping to retrieve the mappedRoomId for each room. This allows you to link a rate to its specific room by combining it with hotel details, providing access to room images and additional information


true
hotelName
string
A case-insensitive search for a hotel's name (e.g., 'Hilton').

countryCode
string
The country code in ISO 2-letter format (e.g., 'SG' for Singapore). Instead of using hotel IDs, you can search by country/city. This is a valid main query.

cityName
string
The name of the city to search for hotels in. Pairs with countryCode to do a country/city search.

latitude
number
The latitude coordinate for location-based hotel searches. Instead of using hotel IDs, you can search by lat/long and a radius around that spot. This is a valid main query.

longitude
number
The longitude coordinate for location-based hotel searches. Pairs with latitude to do a lat/long search.

radius
integer
The search radius in meters for location-based searches. Pairs with latitude to do a lat/long search.

iataCode
string
The IATA code of the search location, typically an airport code. Instead of using hotel IDs, you can search by IATA code. This is a valid main query.

limit
integer
The maximum number of results to return. Defaults to 200, max allowed is 5000.

offset
integer
The number of results to skip for pagination. This paginates the passed hotels not the results returned so the actual returned results will vary.

aiSearch
string
AI-powered hotel search based on a natural language query (e.g., 'hotels near Paris'). This is a valid main query.

minReviewsCount
integer
The minimum number of reviews a hotel must have to be included in results. This is a filter on top of the main query.

minRating
number
The minimum rating (on a scale of 0-5) required for hotels in search results. This is a filter on top of the main query.

zip
string
The zip code of the search location. This is a filter on top of the main query.

placeId
string
The unique Place ID of the search location. Instead of using hotel IDs, pass a Google Places ID or use our Places wrapper to get all the hotels in the specified region. This is a valid main query.

starRating
array of numbers
An array of hotel star ratings to include. Ratings are rounded to the nearest half-star (e.g., [3.5, 4.0, 4.5, 5.0]). This is a filter on top of the main query.


ADD number
hotelTypeIds
array of numbers
An array of hotel type IDs to filter the search results. This is a filter on top of the main query.


ADD number
chainIds
array of numbers
An array of hotel chain IDs to filter the search results. This is a filter on top of the main query.


ADD number
facilities
array of numbers
An array of facility IDs. Results will include hotels with at least one of these facilities by default. This is a filter on top of the main query.


ADD number
strictFacilityFiltering
boolean
If enabled, only hotels with all specified facilities will be returned.


true
stream
boolean
If true, enables streaming mode where response data is sent incrementally instead of as a single payload.


false
advancedAccessibilityOnly
boolean
If true, only hotels with advanced accessibility features will be returned.


true
weatherInfo
boolean
If true, weather information for the hotel will be included. If check-in is within 8 days, the data is highly detailed; otherwise, less detailed.


true
Responses

200
OK

Response body
object
data
array of objects
object
hotelId
string
The unique identifier for the hotel related to this pre-booking. Used along with the hotel content endpoint.

roomTypes
array of objects
An array of objects containing all the requested rooms/rates. This is not the type of room being booked.

object
roomTypeId
string
Unique identifier for the room type

name
string
The name of the room type booked, including key attributes.

offerId
string
The offer ID passed during the prebook call, provided again here for reference.

supplier
string
The supplier providing the inventory for this booking. By default this will always be Nuitee.

supplierId
integer
The numerical identifier of the supplier. By default Nuitee's ID is always 2.

rates
array of objects
An array of objects detailing the pricing and availability of the selected room rates. There will be a number of rates equal to the occupancies request.

object
rateId
string
The unique identifier for a specific rate within the offer.

occupancyNumber
integer
The number identifying which guest is associated with each room in a multi-room booking.

name
string
The name of the room type booked, including key attributes.

maxOccupancy
integer
The maximum number of guests allowed in this room.

adultCount
integer
The number of adults included in this booking.

childCount
integer
The number of children included in this booking.

boardType
string
A short code representing the meal plan included with the booking.

boardName
string
The full name of the meal plan included in the booking.

remarks
string
Any special remarks related to the booking or room type.

priceType
string
The pricing model applied to this rate (e.g., commission)

commission
array of objects
Defines how pricing is structured. Only commission currently used. It can be set to 0 for net rates. The markup is not going to be applied in case of paymentTypes PROPERTY_PAY.

object
amount
number
The amount of commission included in the total price.

currency
string
The currency the commission is in.

retailRate
object

retailRate object
cancellationPolicies
object
An object containing the cancellation rules and conditions for the booking.


cancellationPolicies object
paymentTypes
array of strings
An array of payment types supported for this booking request.

offerRetailRate
array of objects
Total offer price derived from summing the final prices (including base rate, taxes, fees, and adjustments) of each rate in the offer.

object
amount
number
Final price at the offer level

currency
string
Currency of the offer price

suggestedSellingPrice
array of objects
The minimum public selling price for all the rooms combined. This is used for pricing control.

object
amount
number
The minmum amount the room can be sold for publicly.

currency
string
The currency the SSP is in.

source
string
The source of the SSP if we have it.

offerInitialPrice
array of objects
Combined original price for the offer, calculated by adding the initial prices (inclusive of taxes and commission) of each rate before any discounts or modifications.

object
amount
number
Initial price

currency
string
Currency of the initial price

priceType
string
The pricing model applied to this offer (e.g., commission)

rateType
string
The rate type, either 'standard' or 'package'

guestLevel
integer
Used with loyalty programs to determine the guests level of cost reduction.

sandbox
boolean
Indicates if the request was made in a sandbox (test) environment

weather
object
Contains detailed weather forecast data.

dailyWeather
array of objects
An array of weather data objects for each day.

object
date
string
The date of the forecast in ISO format (YYYY-MM-DD).

units
string
The measurement units for the forecast (e.g., metric).

cloud_cover
array of objects
Array of objects detailing the cloud cover information.

object
afternoon
number
Percentage of cloud cover during the afternoon.

humidity
array of objects
Array of objects providing humidity details.

object
afternoon
number
Humidity percentage recorded in the afternoon.

precipitation
array of objects
Array of objects representing precipitation amounts.

object
total
number
Total precipitation amount (e.g., in millimeters or inches).

temperature
array of objects
Array of objects that detail temperature measurements throughout the day.

object
min
number
The minimum temperature of the day.

max
number
The maximum temperature of the day.

afternoon
number
Temperature during the afternoon.

night
number
Temperature during the night.

evening
number
Temperature during the evening.

morning
number
Temperature during the morning.

pressure
array of objects
Array of objects describing atmospheric pressure data.

object
afternoon
number
Atmospheric pressure measured during the afternoon.

wind
array of objects
Array of objects providing wind condition details.

object
max
array of objects
Array of objects representing maximum wind measurements.

object
speed
number
Maximum wind speed (units correspond to the 'units' field).

direction
number
Wind direction in degrees.

Headers
object
Content-Type
string
Content-Encoding
string
204
No Content

Response body
object
error
object
code
integer
Numeric error code representing the type of issue

message
string
Message providing context about the error

Headers
object
Content-Type
string
Content-Encoding
string
400
Bad Request

Response body
object
error
object
code
integer
Numeric error code representing the type of issue

description
string
Brief explanation of the error type

message
string
Message providing context about the error

Headers
object
Content-Type
string
Content-Encoding
string
Retrieve minimum rate for hotels
post
https://api.liteapi.travel/v3.0/hotels/min-rates
Returns the minimum room rates available for a list of hotel IDs on specific dates.

Log in to see full request history
time	status	user agent	
Make a request to see history.
0 Requests This Month

Body Params
hotelIds
array of strings
required
List of hotel IDs


ADD string
occupancies
array of objects
required

ADD object
checkin
string
required
Check in date in YYYY-MM-DD (ISO 8601) format

checkout
string
required
Check out date in YYYY-MM-DD (ISO 8601) format

currency
string
required
Booking currency

guestNationality
string
required
Guest nationality (ISO 2-code)

timeout
number
Request timeout in seconds

Responses

200
Successful response with hotel minimum rates

Response body
object
data
array of objects
object
hotelId
string
price
number
suggestedSellingPrice
integer
sandbox
boolean
401
Bad Request

Response body
object
error
object
code
integer
description
string
message
string
1. Create a checkout session (PREBOOK)
post
https://book.liteapi.travel/v3.0/rates/prebook
This endpoint is used to generate a checkout session for a specific offerId. The input to the endpoint is the specific offerId coming from Retrieve rates for hotels endpoint.

The response will include a prebookId which is used to confirm the booking in the next step.

The usePaymentSdk parameter is used to determine if the payment form will be displayed using the client-side Payment SDK or not.

Log in to see full request history
time	status	user agent	
Make a request to see history.
0 Requests This Month

Query Params
timeout
integer
includeCreditBalance
boolean
Optional flag to include credit line information in the response. When set to true, credit line details will be returned if the user has a credit line available.


Body Params
offerId
string
required
The unique identifier of the selected offer from the search results.

usePaymentSdk
boolean
required
Specifies whether the fields needed to call the payment processing SDK are returned. Set to true if using the SDK for payment processing.


true
voucherCode
string
An optional voucher code to apply discounts to the booking. The vouchers API allows creation of these discounts

addons
array of objects
A list of additional services or extras that can be added to the booking. For example, adding an Uber voucher or an esim card. The final booking amount is the sum of the offer's total price and the cost of any addons. Each addon's price is added individually to reflect all extras in the billed total.


ADD object
bedTypeIds
array of integers
An optional array of bed type IDs to specify preferred bed configurations for the rooms being booked. The availability of specific bed types depends on the hotel's inventory.


ADD integer
Responses

200
OK

Response body
object
data
object
prebookId
string
The pre-booking ID is required to confirm a booking and is reusable for multiple bookings. It's the only required field unless using our payment SDK, which also requires transactionId and secretKey.

offerId
string
The offer ID passed during the prebook call, provided again here for reference.

hotelId
string
The unique identifier for the hotel related to this pre-booking. Used along with the hotel content endpoint.

currency
string
The currency in which prices and fees are displayed.

termsAndConditions
string
The terms and conditions that apply to this booking, provided as a string.

roomTypes
array of objects
An array of objects containing all the requested rooms/rates. This is not the type of room being booked.

object
rates
array of objects
An array of objects detailing the pricing and availability of the selected room rates. There will be a number of rates equal to the occupancies request.

object
rateId
string
The unique identifier for a specific rate within the offer.

occupancyNumber
integer
The number identifying which guest is associated with each room in a multi-room booking.

name
string
The name of the room type booked, including key attributes.

maxOccupancy
integer
The maximum number of guests allowed in this room.

adultCount
integer
The number of adults included in this booking.

childCount
integer
The number of children included in this booking.

boardType
string
A short code representing the meal plan included with the booking.

boardName
string
The full name of the meal plan included in the booking.

remarks
string
Any special remarks related to the booking or room type.

priceType
string
Defines how pricing is structured. Only commission currently used. It can be set to 0 for net rates.

commission
array of objects
An array of objects specifying commission details for the booking.

object
amount
number
The amount of commission included in the total price.

currency
string
The currency the commission is in.

retailRate
object
An object containing details of the final price, including taxes and fees.


retailRate object
cancellationPolicies
object
An object containing the cancellation rules and conditions for the booking.


cancellationPolicies object
suggestedSellingPrice
object
The minimum public selling price for all the rooms combined. This is used for pricing control.


suggestedSellingPrice object
commission
number
The total commission earned for all rooms being booked.

price
number
The final price of the booking for all rooms after applicable calculations.

priceType
string
Defines how pricing is structured. Only commission currently used. It can be set to 0 for net rates.

priceDifferencePercent
integer
This is one of the three important fields to check. This should be 0. But if a rate has sold out, a similar alternate rate may be found and this field tells how much is the percentage difference between the original and final price.

cancellationChanged
boolean
This is one of the three important fields to check. Boolean indicating if cancellation policies have changed since the initial offer.

boardChanged
boolean
This is one of the three important fields to check. Boolean indicating if the board (meal plan) has changed since the initial offer.

supplier
string
The supplier providing the inventory for this booking. By default this will always be Nuitee.

supplierId
integer
The numerical identifier of the supplier. By default Nuitee's ID is always 2.

transactionId
string
A unique transaction identifier for this booking request. Only returned is using the payment SDK.

paymentTypes
array of strings
An array of payment types supported for this booking request.

mappedRoomId
integer | null
The mapped room ID, or null if the room has not been mapped

secretKey
string
A key used for calling the paymentSDK to secure booking-related payments. Only returned is using the payment SDK.

voucherCode
string
Represents the unique code used to redeem a voucher during the transaction.

voucherTotalAmount
string
Specifies the total monetary value or discount amount provided by the voucher.

addonsRequest
array of objects
An array of objects specifying additional services or extras requested for the booking.

object
addon
string
The name or type of the additional service requested.

value
number
The price of the addon in the specified currency.

currency
string
The currency in which the addon is priced.

addonDetails
object
An object containing additional details about the requested addon.


addonDetails object
creditLine
object
Credit line information returned when includeCreditBalance is set to true and the user has a credit line available.


creditLine object
guestLevel
integer
Used with loyalty programs to determine the guests level of cost reduction.

Headers
object
Content-Type
string
Content-Encoding
string
400
Bad Request

Response body
object
error
object
code
integer
Numeric error code representing the type of issue

description
string
Brief explanation of the error type

message
string
Detailed message providing context about the error

Headers
object
Content-Type
string
Content-Encoding
string
401
Unauthorized

Response body
object
error
object
code
integer
Numeric error code representing the type of issue

description
string
Brief explanation of the error type

message
string
Detailed message providing context about the error

Headers
object
Content-Type
string
Content-Length
string
2. Complete a booking
post
https://book.liteapi.travel/v3.0/rates/book
This API confirms a booking when the prebookId from the prebook stage along with the guest and payment information are passed.

The guest information is an object that should include the guest first name, last name and email.

The payment information can be two different options:

TRANSACTION method: when using the Payment SDK, you should use this method and provide the relevant transactionId to confirm.
ACC_CREDIT_CARD, WALLET, CREDIT for all other usages. See our docs for more details.
The response will confirm the booking along with a booking Id and a hotel confirmation code. It will also include the booking details including the dates, price and the cancellation policies.

Log in to see full request history
time	status	user agent	
Make a request to see history.
0 Requests This Month

Query Params
timeout
integer
Body Params
prebookId
string
required
This identifier from the pre-booking step is used to confirm a booking rate

clientReference
string
An optional client-defined reference ID acts as an idempotency key to prevent duplicate bookings

holder
object
required
Information on the person responsible for making the payment. This may not necessarily be the traveler


holder object
guests
array of objects
required
This represents a list of all individuals included in the hotel reservation


ADD object
metadata
object
Encapsulates essential metadata for fraud detection and compliance, including IP, location, language, device details, and marketing parameters.


metadata object
guestPayment
object
The payment method used for the transaction. This determines where the money for the booking comes from


guestPayment object
payment
required
Specifies the payment method for completing the booking


object

object
Responses

200
Successful response

Response body
object
data
object
bookingId
string
The unique identifier for the confirmed booking. This is used to reference the booking later via the API or calls for support.

clientReference
string
A reference ID provided by the client (you) for tracking purposes.

supplierBookingId
string
The booking ID assigned by the supplier. Not needed, use bookingId instead.

supplierBookingName
string
The name associated with the booking in the supplier's system. By default, Nuitee.

supplier
string
The supplier handling this booking. By default, Nuitee.

supplierId
integer
The unique numerical identifier for the supplier. By default, 2 for Nuitee.

status
string
The current status of the booking. At this point it will be CONFIRMED, the other option for this field is CANCELED.

hotelConfirmationCode
string
The confirmation code issued by the hotel for the booking. Not available at booking time. Nuitee performs a manual process to to contact the hotel and get the confirmation number.

checkin
date
The check-in date for the booking (ISO format).

checkout
date
The check-out date for the booking (ISO format).

hotel
object
An object containing details about the booked hotel.


hotel object
bookedRooms
array of objects
object
roomType
object
An object containing details about the booked room type.


roomType object
boardType
string
A short code representing the meal plan included with the booking.

boardName
string
The full name of the meal plan included in the booking.

adults
integer
Number of adults in this room.

children
integer
Number of children in this room.

rate
object
An object containing rate information for the booked room.


rate object
firstName
string
The first name of the person responsible for the booking.

lastName
string
The last name of the person responsible for the booking.

childrenAges
array of integers | null
Ages of children in this room.

board
string
The full name of the meal plan included in the booking.

boardCode
string
A short code representing the meal plan included with the booking.

cancellationPolicies
object
An object containing the cancellation rules and conditions for the booking.


cancellationPolicies object
room_id
string
Unique identifier for the room.

occupancy_number
integer
Occupancy number within this booking.

amount
number
Room price for this booking.

currency
string
Currency code for the room cost.

children_count
integer
Number of children in this room.

remarks
string
Additional remarks for this room.

guests
array of objects
Guest details for this room.

object
firstName
string
Guest's first name.

lastName
string
Guest's last name.

email
string
Guest's email address.

phone
string
Guest's phone number.

remarks
string
Remarks specific to this guest.

occupancyNumber
integer
Occupancy number for this guest.

holder
object
An object containing details of the person responsible for the booking.


holder object
createdAt
date-time
The timestamp when the booking was created.

updatedAt
date-time
The timestamp when the booking was last updated.

cancellationPolicies
object
An object detailing the cancellation rules and penalties for the booking.


cancellationPolicies object
price
number
The final total price of all rooms on the booking.

commission
number
The total commission amount associated with all rooms on the booking.

currency
string
The currency in which the booking price is displayed.

guestId
integer
Guest ID associated with the booking.

trackingId
string
The tracking identifier for the booking.

prebookId
string
The identifier from the pre-booking step.

sellingPrice
string
The total selling price of the booking.

exchangeRate
number
The exchange rate used for currency conversion.

exchangeRateUsd
number
The USD exchange rate for the booking.

tag
string
Indicates if the booking is refundable ('RFN' for refundable, 'NRFN' for non-refundable).

lastFreeCancellationDate
string
The latest date/time when the booking can be canceled without penalties (ISO 8601 format).

apiCommission
number
The commission amount received by the API for this booking.

userId
integer
The ID of the user who made the booking.

nationality
string
The nationality of the guest.

loyaltyGuestId
integer
The loyalty or membership ID of the guest.

cancelledAt
date-time
The timestamp when the booking was cancelled.

refundedAt
date-time
The timestamp when the booking was refunded.

cancelledBy
integer
The ID of who cancelled the booking, empty in this step.

remarks
string
Any additional notes related to the booking.

addonsTotalAmount
number
The total amount charged for any additional services or extras.

addon
array of objects
An array of objects specifying additional services or extras included in the booking.

object
addon
string
The name or type of the additional service or extra.

value
number
The price of the addon in the specified currency.

currency
string
The currency in which the addon is priced.

originalValue
number
The original price of the addon before any discounts.

originalCurrency
string
The original currency of the addon price.

expiryDate
string
The expiration date of the addon, if applicable.

addonVoucherCode
string
A code associated with the addon voucher, if applicable.

addonVoucherId
integer
A unique identifier for the addon voucher.

status
string
The current status of the addon (e.g., active, expired).

guestLevel
integer
The guest's loyalty or membership level, if applicable.

sandbox
boolean
Indicates whether this booking is in a test/sandbox environment (true/false).

Headers
object
Content-Type
string
Content-Encoding
string
400
Bad request errors

Response body
object
error
object
Contains details about the encountered error

code
integer
Numeric error code representing the type of issue

description
string
Brief explanation of the error type

message
string
Detailed message providing context about the error

Headers
object
Content-Type
string
Content-Encoding
string
401
Unauthorized

Response body
object
error
object
Contains details about the encountered error

code
integer
Numeric error code representing the type of issue

description
string
Brief explanation of the error type

message
string
Detailed message providing context about the error

Headers
object
Content-Type
string
Content-Length
string
List bookings
get
https://book.liteapi.travel/v3.0/bookings
The API returns a list of bookings for a given guest ID or client reference. It provides detailed information about each booking including check-in/out dates, guest information, payment status, and booking details.

Log in to see full request history
time	status	user agent	
Make a request to see history.
0 Requests This Month

Query Params
clientReference
string
guestId
string
timeout
float
Defaults to 4
request timeout in seconds

4
Responses

200
OK


401
Unauthorized

Response body
object
error
object
Contains details about the encountered error

code
integer
Numeric error code representing the type of issue

description
string
Brief explanation of the error type

message
string
Detailed message providing context about the error

Headers
object
Content-Type
string
Content-Length
string
Retrieve a booking
get
https://book.liteapi.travel/v3.0/bookings/{bookingId}
The API returns the status and the details for the a specific booking Id.

Log in to see full request history
time	status	user agent	
Make a request to see history.
0 Requests This Month

Path Params
bookingId
string
required
(Required) The unique identifier of the booking you would like to update.

Query Params
timeout
float
Defaults to 4
request timeout in seconds

4
Responses

200
OK

Response body
object
data
object
bookingId
string
The unique identifier for the confirmed booking. This is used to reference the booking later via the API or calls for support.

clientReference
string
A reference ID provided by the client (you) for tracking purposes.

supplierBookingId
string
The booking ID assigned by the supplier. Not needed, use bookingId instead.

supplierBookingName
string
The name associated with the booking in the supplier's system. By default, Nuitee.

supplier
string
The supplier handling this booking. By default, Nuitee.

supplierId
integer
The unique numerical identifier for the supplier. By default, 2 for Nuitee.

status
string
The current status of the booking. At this point it will be CONFIRMED, the other option for this field is CANCELED.

hotelConfirmationCode
string
The confirmation code issued by the hotel for the booking. Not available at booking time. Nuitee performs a manual process to to contact the hotel and get the confirmation number.

checkin
string
The check-in date for the booking (ISO format).

checkout
string
The check-out date for the booking (ISO format).

hotel
object

hotel object
bookedRooms
array of objects
object
roomType
object
An object containing details about the booked room type.


roomType object
boardType
string
A short code representing the meal plan included with the booking.

boardName
string
The full name of the meal plan included in the booking.

adults
integer
Number of adults in this room.

children
integer
Number of children in this room.

rate
object
An object containing rate information for the booked room.


rate object
firstName
string
The first name of the person responsible for the booking.

lastName
string
The last name of the person responsible for the booking.

childrenAges
array of integers | null
Ages of children in this room.

board
string
The full name of the meal plan included in the booking.

boardCode
string
A short code representing the meal plan included with the booking.

cancellationPolicies
object
An object containing the cancellation rules and conditions for the booking.


cancellationPolicies object
room_id
string
Unique identifier for the room.

occupancy_number
integer
Occupancy number within this booking.

amount
number
Room price for this booking.

currency
string
Currency code for the room cost.

children_count
integer
Number of children in this room.

remarks
string
Additional remarks for this room.

guests
array of objects
Guest details for this room.

object
firstName
string
Guest's first name.

lastName
string
Guest's last name.

email
string
Guest's email address.

phone
string
Guest's phone number.

remarks
string
Remarks specific to this guest.

occupancyNumber
integer
Occupancy number for this guest.

holder
object
An object containing details of the person responsible for the booking.


holder object
createdAt
string
Timestamp when the booking was created.

updatedAt
string
Timestamp when the booking was last updated.

cancellationPolicies
object
An object containing the cancellation rules and conditions for the booking.


cancellationPolicies object
specialRemarks
string
Special requests or remarks for the booking.

optionalFees
string
Optional fees associated with the booking.

mandatoryFees
string
Mandatory fees associated with the booking.

knowBeforeYouGo
string
Important information for the guest.

price
number
The final total price of all rooms on the booking.

commission
number
The total commission amount associated with all rooms on the booking.

addonsTotalAmount
number
The total amount charged for any additional services or extras.

currency
string
The currency in which the booking price is displayed.

remarks
string
Any additional notes related to the booking.

voucherCode
string
A code associated with the addon voucher, if applicable.

voucherTotalAmount
number
Total amount covered by a voucher.

addons
array of objects
A list of additional services or extras that can be added to the booking. For example, adding an Uber voucher or an esim card. The final booking amount is the sum of the offer's total price and the cost of any addons. Each addon's price is added individually to reflect all extras in the billed total.

object
addon
string
The type of addon service (e.g., uber, esimply).

value
number
The monetary cost of the addon service

currency
string
The currency in which the addon service is charged

addonDetails
object

addonDetails object
guestId
integer
Guest ID associated with the booking.

distributorCommission
number
Commission amount for the distributor.

distributorPrice
number
Price after distributor commission.

trackingId
string
Tracking identifier for the booking.

firstName
string
The first name of the person responsible for the booking.

lastName
string
The last name of the person responsible for the booking.

adults
integer
The number of adult guests in the booking.

children
string
A comma delimited string of children's ages included in the booking. Can be empty if no children are included.

childrenCount
integer
Number of children in the booking.

prebookId
string
Identifier from the pre-booking step.

paymentStatus
string
Status of the payment for the booking.

paymentTransactionId
string
Transaction identifier for the payment.

sellingPrice
string
Total selling price of the booking.

exchangeRate
number
Exchange rate used for currency conversion.

exchangeRateUsd
number
USD exchange rate for the booking.

email
string
Email of the guest or booking holder.

tag
string
Indicates if the booking is refundable ('RFN' for refundable, 'NRFN' for non-refundable).

lastFreeCancellationDate
string
The latest date/time when the booking can be canceled without penalties (ISO 8601 format).

apiCommission
number
The commission amount received by the API for this booking.

userId
integer
ID of the user who made the booking.

nationality
string
Nationality of the guest.

holderTitle
string
Title of the main guest/holder.

hotelId
string
The unique identifier for the hotel associated with this booking.

hotelName
string
The name of the hotel associated with this booking.

cancelledAt
string
Timestamp when the booking was cancelled.

refundedAt
string
Timestamp when the booking was refunded.

loyaltyGuestId
object
Loyalty or membership ID of the guest.

Has additional fields
sandbox
integer
Indicates if this booking is in sandbox mode (0 or 1).

clientCommission
number
Commission amount for the client.

voucherId
integer
ID of any voucher used.

voucherTransationId
string
Transaction ID associated with the voucher.

processingFee
number
Processing fee for the booking.

amountRefunded
number
Total amount refunded for this booking.

refundType
string
Type of refund (e.g., full, partial).

paymentScheduledAt
string
Scheduled time for the payment process.

addonsRedemptions
object
Details of any add-on redemptions.

Has additional fields
rebookFrom
string
Original booking ID if this booking was rebooked.

agentId
object
ID of the agent who made the booking, if applicable.

Has additional fields
cancelledBy
object
User ID or agent ID who cancelled the booking.

Has additional fields
Headers
object
Date
string
Content-Type
string
Content-Length
integer
Connection
string
x-amzn-RequestId
string
Access-Control-Allow-Origin
string
Content-Encoding
string
Access-Control-Allow-Headers
string
x-amzn-Remapped-Content-Length
integer
x-amz-apigw-id
string
Access-Control-Allow-Methods
string
Access-Control-Expose-Headers
string
x-amzn-Remapped-Date
string
Access-Control-Max-Age
integer
Access-Control-Allow-Credentials
boolean
204
No Content

Response body
object
data
array of objects
object
bookingId
string
status
string
hotelConfirmationCode
string
start
string
end
string
bookedRooms
array of objects
object
roomType
object

roomType object
adults
integer
childCount
integer
rate
object

rate object
guestInfo
object

guestInfo object
createdAt
string
cancellationPolicies
object

cancellationPolicies object
Headers
object
Access-Control-Allow-Credentials
boolean
Access-Control-Allow-Headers
string
Access-Control-Allow-Methods
string
Access-Control-Allow-Origin
string
Access-Control-Expose-Headers
string
Access-Control-Max-Age
integer
Content-Type
string
Date
string
Content-Length
integer
401
Unauthorized

Response body
object
error
object
code
integer
message
string
Headers
object
Access-Control-Allow-Credentials
boolean
Access-Control-Allow-Headers
string
Access-Control-Allow-Methods
string
Access-Control-Allow-Origin
string
Access-Control-Expose-Headers
string
Access-Control-Max-Age
integer
Content-Type
string
Date
string
Content-Length
integer
Cancel a booking
put
https://book.liteapi.travel/v3.0/bookings/{bookingId}
This API is used to request a cancellation of an existing confirmed booking. Cancellation policies and conditions will be used to determine the success of the cancellation. Non-refundable bookings will be cancelled with status CANCELLED_WITH_CHARGES to indicate they will still be invoiced. For example a booking with a cancellation policy that was requested past the cancellation date will result in charges being applied upon cancellation.

Log in to see full request history
time	status	user agent	
Make a request to see history.
0 Requests This Month

Path Params
bookingId
string
required
Query Params
timeout
float
Defaults to 4
request timeout in seconds

4
Responses

200
OK

Response body
object
data
object
bookingId
string
status
string
cancellation_fee
number
refund_amount
number
currency
string
sandbox
boolean
Headers
object
Content-Type
string
Content-Length
integer
Connection
string
Access-Control-Allow-Origin
string
Access-Control-Allow-Headers
string
Access-Control-Allow-Methods
string
204
No Content

Response body
object
data
object
bookingId
string
status
string
cancellation_fee
number
refund_amount
number
currency
string
sandbox
boolean
Headers
object
Content-Type
string
Content-Length
integer
Connection
string
Access-Control-Allow-Origin
string
Access-Control-Allow-Headers
string
Access-Control-Allow-Methods
string
304
Not Modified

Response body
object
error
object
code
integer
message
string
Headers
object
Content-Type
string
Content-Length
integer
Connection
string
Access-Control-Allow-Origin
string
Access-Control-Allow-Headers
string
Access-Control-Allow-Methods
string
401
Unauthorized

Response body
object
error
object
code
integer
message
string
Headers
object
Content-Type
string
Content-Length
integer
Connection
string
Access-Control-Allow-Origin
string
Access-Control-Allow-Headers
string
Access-Control-Allow-Methods
string
Retrieve all bookings
get
https://book.liteapi.travel/v3.0/bookings/
Provides a list of bookings linked to a specific API key.

Log in to see full request history
time	status	user agent	
Make a request to see history.
0 Requests This Month

Query Params
startDate
date
Start date of the stay period. Returns bookings where the stay (check-in to check-out) overlaps with this date range.

endDate
date
End date of the stay period. Returns bookings where the stay (check-in to check-out) overlaps with this date range.

bookingStartDate
date
Start date of the booking creation period. Only bookings that were created on or after this date will be included.

bookingEndDate
date
End date of the booking creation period. Only bookings that were created on or before this date will be included.

status
string
enum
Status of the bookings.


confirmed
Allowed:
confirmed
cancelled
paymentStatus
string
enum
Filter by payment status.


succeeded
Allowed:
succeeded
requires_capture
Sandbox
string
enum
Indicates if the request was made in a sandbox (test) environment


1
Allowed:
0
1
Responses

200
The total number of bookings retrieved

Response body
object
count
integer
The total number of bookings returned in the response.

data
array of objects
object
id
integer
The unique identifier for the booking record.

checkin
string
The check-in date for the booking (YYYY-MM-DD).

checkout
string
The check-out date for the booking (YYYY-MM-DD).

firstName
string
The first name of the person responsible for the booking.

lastName
string
The last name of the person responsible for the booking.

adults
integer
The number of adult guests in the booking.

children
string
A comma delimited string of children's ages included in the booking. Can be empty if no children are included.

hotel_confirmation_code
string
A unique confirmation code issued by the hotel.

bookingId
string
The unique identifier for this booking

prebook_Id
string
The prebook ID used to confirm the booking.

status
string
The current status of the booking (e.g., CONFIRMED, CANCELED).

payment_status
string
The status of the payment for this booking.

payment_transaction_id
string
The transaction ID for the payment processed for this booking.

retail_rate
string
The total cost of the booking in the specified currency.

exchange_rate
number
The exchange rate used for converting to EUR

exchange_rate_usd
number
The exchange rate used for converting to USD.

email
string
The email address associated with the booking.

cancelPolicies
string
A JSON string containing the cancellation policy details, including penalties and deadlines.

tag
string
Indicates if the booking is refundable ('RFN' for refundable, 'NRFN' for non-refundable).

last_free_cancellation_date
string
The latest date/time when the booking can be canceled without penalties (ISO 8601 format).

currency
string
The currency in which the booking was processed.

api_commission
number
The commission amount received by the API for this booking.

nationality
string
The nationality of the primary guest, represented in ISO 2-letter country code format.

holder_title
string
The title (Mr, Ms, Dr, etc.) of the person holding the booking. Can be empty.

hotelId
string
The unique identifier for the hotel associated with this booking.

Hotel_name
string
The name of the hotel associated with this booking.

payment_data
string
A JSON string containing additional payment details. Can be empty.

created_at
string
The timestamp when the booking was created (ISO 8601 format).

updated_at
string
The timestamp when the booking details were last updated (ISO 8601 format).

cancelled_at
string
The timestamp when the booking was canceled. Null if not canceled.

refunded_at
string
The timestamp when the booking was refunded. Null if not refunded.

amount_refunded
number
The total amount refunded for this booking, if applicable.

refund_type
string
The type of refund issued, if applicable.

guestId
string
The unique identifier for the guest associated with the booking.

reqId
string
The request ID associated with this booking request.

remarks
string
Any additional remarks or notes related to the booking.

client_reference
string
A reference string provided by the client for tracking the booking.

IP
number
The IP address from which the booking request was made.

sandbox
number
Indicates if this booking was made in a test/sandbox environment (0 for false, 1 for true).

version
number
The API version used for this booking request.

link
number
A tracking or reference link related to the booking. Can be 0 if not applicable.

client_commission
number
The commission amount received by the client for this booking.

voucher_id
string
The unique identifier for any voucher applied to this booking.

voucher_total_amount
number
The total amount covered by the voucher, if applicable.

voucher_transation_id
string
The transaction ID associated with the voucher used for payment.

processing_fee
number
The processing fee charged for this booking.

supplier_Booking_Id
string
The unique booking ID assigned by the supplier.

tracking_id
string
The campaign ID passed in from the client.

Headers
object
Content-Type
string
Content-Encoding
string
400
Bad request, missing or invalid parameters.

Response body
object
error
object
code
integer
Numeric error code representing the type of issue

message
string
Message providing context about the error

Headers
object
Content-Type
string
Content-Length
string
401
Unauthorized access.

Response body
object
error
object
code
integer
Numeric error code representing the type of issue

message
string
Message providing context about the error

Headers
object
Content-Type
string
Content-Encoding
string
Amend guest name on a booking
put
https://book.liteapi.travel/v3.0/bookings/{bookingId}/amend
This endpoint allows updating the guest's name (holder) for an existing booking. Only the holder's first name, last name, and email can be amended. Remarks can also be provided.

Log in to see full request history
time	status	user agent	
Make a request to see history.
0 Requests This Month

Path Params
bookingId
string
required
(Required) The unique identifier of the booking to amend.

Body Params
holder
object
required

holder object
remarks
string
Optional remarks for the amendment request.

Responses

200
Amendment request created successfully.

Response body
object
id
integer
Amendment request ID.

bookingId
string
Booking ID being amended.

userId
integer
User ID who owns the booking.

type
string
Type of amendment (e.g., UPDATE).

subType
string
Subtype of amendment (e.g., UPDATE_NAME_CHANGE).

status
string
Status of the amendment request (e.g., PENDING).

prebookId
string
Prebook ID if applicable.

holderEmail
string
Holder's email after amendment.

holderFirstName
string
Holder's first name after amendment.

holderLastName
string
Holder's last name after amendment.

holderPhone
string
Holder's phone after amendment.

remarks
string
Remarks for the amendment.

guests
array
List of guests (if any).

createdBy
integer
User ID who created the amendment request.

createdAt
string
Timestamp when the amendment was created.

updatedAt
string
Timestamp when the amendment was last updated.
400
Bad request. Invalid input or missing required fields.

Response body
object
error
object
code
integer
message
string
401
Unauthorized. Invalid or missing API key.

Response body
object
error
object
code
integer
message
string

Retrieve weekly analytics
post
https://da.liteapi.travel/analytics/weekly
Fetch weekly analytics data for the specified date range.

Log in to see full request history
time	status	user agent	
Make a request to see history.
0 Requests This Month

Body Params
from
date
required
Start date for the analytics data YYYY-MM-DD (ISO 8601)

to
date
required
End date for the analytics data YYYY-MM-DD (ISO 8601)

Response

200
Weekly analytics data retrieved successfully

Response body
json