import requests
import re  # Regular expression module to remove HTML tags
import json

#google API
google_KEY = 'AIzaSyAMsW49vP5v6LvtGF11I4Ard_QJii3m7Rs'


def get_dire(origin,destination,google_KEY):
    # Construct the URL for the Directions API
    url = f"https://maps.googleapis.com/maps/api/directions/json?origin={origin}&destination={destination}&key={google_KEY}"

    # Send the GET request to the Directions API
    response = requests.get(url)

    # Check if the request was successful
    if response.status_code == 200:
        directions_data = response.json()  # Parse the JSON response

        # Extract details like distance, duration, and the route
        if directions_data["routes"]:
            route = directions_data["routes"][0]
            leg = route["legs"][0]
            distance = leg["distance"]["text"]
            duration = leg["duration"]["text"]

            print(f"Distance: {distance}")
            print(f"Duration: {duration}")

            # Print detailed steps (turn-by-turn instructions)
            print("\nTurn-by-turn instructions:")
            for step in leg["steps"]:
                instruction = step["html_instructions"]

                # Remove HTML tags using regular expressions
                instruction_cleaned = re.sub(r'<.*?>', '', instruction)

                print(instruction_cleaned)

        else:
            print("No route found.")
    else:
        print(f"Request failed with status code {response.status_code}")


def get_cur_loc(google_key):
    url = f'https://www.googleapis.com/geolocation/v1/geolocate?key={google_key}'


    response = requests.post(url)

    if response.status_code == 200:
        data = response.json()
        lat = data['location']['lat']
        lng = data['location']['lng']
        print(lat, lng)
    else:
        print("Error:", response.status_code)


def get_nearest_hos(google_key,origin,radius = 5000):
        """
        Fetches the nearest hospital's latitude and longitude using Google Places API.

        Parameters:
            api_key (str): Google API key.
            origin (tuple), lat, long
            radius (int): Search radius in meters (default: 5000m).

        Returns:
            tuple: (latitude, longitude) of the nearest hospital, or None if not found.
        """

        url = f"https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={origin}&radius={radius}&type=hospital&key={google_key}"

        response = requests.get(url)
        data = response.json()

        if "results" in data and len(data["results"]) > 0:
            hospital_location = data["results"][0]["geometry"]["location"]

            # print(f"Nearest Hospital: {name}")
            # print(f"Location: {location['lat']}, {location['lng']}")
            # print(f"Address: {address}")
            
            return hospital_location["lat"], hospital_location["lng"]
        else:
            return None


origin = '40.785091,-73.968285'  # Central Park, New York
hospital_latlng = get_nearest_hos(google_KEY,origin,5000)
print(hospital_latlng[0], hospital_latlng[1])


#get_cur_loc(google_KEY)




#destination = "Times Square, New York, NY"  # Times Square, New York

# destination = '40.7580,-73.9855'  # Times Square, New York


#get_dire(origin,destination,google_KEY)



# # URL for the Geocoding API
# url = f"https://maps.googleapis.com/maps/api/geocode/json?address={address}&key={API_KEY}"
#
# # Send the GET request to the Geocoding API
# response = requests.get(url)
#
# # Check if the request was successful
# if response.status_code == 200:
#     geocode_data = response.json()  # Parse the JSON response
#
#     # Extract latitude and longitude
#     if geocode_data['results']:
#         location = geocode_data['results'][0]['geometry']['location']
#         latitude = location['lat']
#         longitude = location['lng']
#
#         print(f"Latitude: {latitude}")
#         print(f"Longitude: {longitude}")
#     else:
#         print("No results found for the address.")
# else:
#     print(f"Request failed with status code {response.status_code}")

# import geocoder
#
# # Get my current geolocation
# g = geocoder.ip('me')
#
# print(g.latlng[0],g.latlng[1])

import requests

# Replace with your actual API key
#API_KEY = ""

# Replace with your current latitude & longitude
latitude = 29.6516
longitude = -82.3248

# Google Places API request URL
url = f"https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={latitude},{longitude}&radius=5000&type=hospital&key={google_KEY}"

# Make the request
response = requests.get(url)
data = response.json()

# Process the response
if "results" in data:
    hospitals = data["results"]
    if hospitals:
        nearest_hospital = hospitals[0]  # The first result is usually the closest
        name = nearest_hospital["name"]
        location = nearest_hospital["geometry"]["location"]
        address = nearest_hospital.get("vicinity", "Address not available")

        print(f"Nearest Hospital: {name}")
        print(f"Location: {location['lat']}, {location['lng']}")
        print(f"Address: {address}")
    else:
        print("No hospitals found nearby.")
else:
    print("Error fetching hospital data.")

