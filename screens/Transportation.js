import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';

// Google Maps API for location info (use UF location for simplicity)
const ufCoordinates = {
  lat: 29.651634,
  lng: -82.341671
};

const Directions = () => {
  const [hospitals, setHospitals] = useState([]);

  // Function to simulate getting nearby hospitals (using UF coordinates)
  const getNearbyHospitals = () => {
    const mockHospitals = [
      {
        name: 'Shands Hospital',
        location: { lat: 29.6518, lng: -82.3248 },
        address: '1600 SW Archer Rd, Gainesville, FL'
      },
      {
        name: 'North Florida Regional Medical Center',
        location: { lat: 29.6661, lng: -82.3500 },
        address: '6500 W Newberry Rd, Gainesville, FL'
      }
    ];
    setHospitals(mockHospitals);
  };

  // Function to create a deep link for Uber
  const openUber = (destinationLat, destinationLng) => {
    const uberDeepLink = `uber://?action=setPickup&pickup[latitude]=${ufCoordinates.lat}&pickup[longitude]=${ufCoordinates.lng}&dropoff[latitude]=${destinationLat}&dropoff[longitude]=${destinationLng}`;
    console.log('Uber Deep Link:', uberDeepLink); // log for debugging
    Linking.openURL(uberDeepLink).catch(err => console.error('Error opening Uber', err));
  };

  // Function to create a deep link for Lyft
  const openLyft = (destinationLat, destinationLng) => {
    const lyftDeepLink = `lyft://ridetype?id=standard&pickup[latitude]=${ufCoordinates.lat}&pickup[longitude]=${ufCoordinates.lng}&dropoff[latitude]=${destinationLat}&dropoff[longitude]=${destinationLng}`;
    console.log('Lyft Deep Link:', lyftDeepLink); // log for debugging
    Linking.openURL(lyftDeepLink).catch(err => console.error('Error opening Lyft', err));
  };

  // Function to create a deep link for Google Maps (directions)
  const openGoogleMaps = (destinationLat, destinationLng) => {
    const mapsDeepLink = `https://www.google.com/maps/dir/?api=1&origin=${ufCoordinates.lat},${ufCoordinates.lng}&destination=${destinationLat},${destinationLng}`;
    console.log('Google Maps Deep Link:', mapsDeepLink); // log for debugging
    Linking.openURL(mapsDeepLink).catch(err => console.error('Error opening Google Maps', err));
  };

  // Get nearby hospitals on mount
  useEffect(() => {
    getNearbyHospitals();
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text>Nearby Hospitals:</Text>
      {hospitals.length > 0 ? (
        hospitals.map((hospital, index) => (
          <View key={index} style={{ marginBottom: 20 }}>
            <Text style={{ fontWeight: 'bold' }}>{hospital.name}</Text>
            <Text>{hospital.address}</Text>
            <Text>Latitude: {hospital.location.lat}</Text>
            <Text>Longitude: {hospital.location.lng}</Text>
            <TouchableOpacity
              onPress={() => openGoogleMaps(hospital.location.lat, hospital.location.lng)}
              style={{ marginTop: 10, backgroundColor: '#f0f0f0', padding: 10, borderRadius: 5 }}
            >
              <Text>Get Directions with Google Maps</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => openUber(hospital.location.lat, hospital.location.lng)}
              style={{ marginTop: 10, backgroundColor: '#f0f0f0', padding: 10, borderRadius: 5 }}
            >
              <Text>Get Uber Ride</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => openLyft(hospital.location.lat, hospital.location.lng)}
              style={{ marginTop: 10, backgroundColor: '#f0f0f0', padding: 10, borderRadius: 5 }}
            >
              <Text>Get Lyft Ride</Text>
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <Text>Loading nearby hospitals...</Text>
      )}
    </View>
  );
};

export default Directions;
