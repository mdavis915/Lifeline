import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import axios from 'axios';

// Google API Key
const GOOGLE_API_KEY = 'AIzaSyAMsW49vP5v6LvtGF11I4Ard_QJii3m7Rs';

const Directions = () => {
  const [hospitals, setHospitals] = useState([]);

  // Coordinates of University of Florida (UF)
  const ufCoordinates = {
    lat: 29.651634,  // Latitude for UF
    lng: -82.341671  // Longitude for UF
  };

  // Function to get nearby hospitals
  const getNearbyHospitals = async (lat, lng) => {
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&type=hospital&key=${GOOGLE_API_KEY}`;

    try {
      const response = await axios.get(url);
      if (response.data.results.length > 0) {
        setHospitals(response.data.results); // Store all hospital results
      } else {
        console.log('No nearby hospitals found.');
      }
    } catch (error) {
      console.error('Error fetching hospital data:', error);
    }
  };

  // Get the nearby hospitals using UF coordinates
  useEffect(() => {
    getNearbyHospitals(ufCoordinates.lat, ufCoordinates.lng); // Fetch hospitals near UF
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text>Nearby Hospitals:</Text>
      <ScrollView>
        {hospitals.length > 0 ? (
          hospitals.map((hospital, index) => (
            <View key={index} style={{ marginBottom: 20 }}>
              <Text><Text style={{ fontWeight: 'bold' }}>Name:</Text> {hospital.name}</Text>
              <Text><Text style={{ fontWeight: 'bold' }}>Location:</Text> {hospital.geometry.location.lat}, {hospital.geometry.location.lng}</Text>
              <Text><Text style={{ fontWeight: 'bold' }}>Address:</Text> {hospital.vicinity}</Text>
            </View>
          ))
        ) : (
          <Text>Loading nearby hospitals...</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default Directions;
