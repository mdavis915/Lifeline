import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';

// Google API Key
const GOOGLE_API_KEY = 'AIzaSyAMsW49vP5v6LvtGF11I4Ard_QJii3m7Rs';

const Directions = () => {
  const [directions, setDirections] = useState(null);
  const [nearestHospital, setNearestHospital] = useState(null);

  // Coordinates of University of Florida (UF)
  const ufCoordinates = {
    lat: 29.651634,  // Latitude for UF
    lng: -82.341671  // Longitude for UF
  };

  // Function to get directions
  const getDirections = async (origin, destination) => {
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${GOOGLE_API_KEY}`;
    try {
      const response = await axios.get(url);
      if (response.data.routes.length > 0) {
        const route = response.data.routes[0];
        const leg = route.legs[0];
        const distance = leg.distance.text;
        const duration = leg.duration.text;

        setDirections({
          distance,
          duration,
          steps: leg.steps.map(step => step.html_instructions.replace(/<[^>]*>/g, '')), // Remove HTML tags
        });
      } else {
        console.log('No route found.');
      }
    } catch (error) {
      console.error('Error fetching directions:', error);
    }
  };

  // Function to get nearby hospitals
  const getNearbyHospitals = async (lat, lng) => {
    // Narrow the search by area around UF's coordinates
    const query = `hospitals near University of Florida`;
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&location=${lat},${lng}&radius=3000&key=${GOOGLE_API_KEY}`;
    
    try {
      const response = await axios.get(url);
      if (response.data.results.length > 0) {
        const hospital = response.data.results[0]; // Get the first closest hospital
        setNearestHospital({
          name: hospital.name,
          location: hospital.geometry.location,
          address: hospital.vicinity,
        });
      } else {
        console.log('No nearby hospitals found.');
      }
    } catch (error) {
      console.error('Error fetching hospital data:', error);
    }
  };

  // Get directions and nearest hospital using UF coordinates
  useEffect(() => {
    const origin = `${ufCoordinates.lat},${ufCoordinates.lng}`;
    const destination = '40.7580,-73.9855'; // Example destination (Times Square)
    
    getDirections(origin, destination);
    getNearbyHospitals(ufCoordinates.lat, ufCoordinates.lng); // Fetch hospitals near UF
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text>Directions:</Text>
      {directions && (
        <View>
          <Text>Distance: {directions.distance}</Text>
          <Text>Duration: {directions.duration}</Text>
          <Text>Turn-by-turn instructions:</Text>
          {directions.steps.map((step, index) => (
            <Text key={index}>{step}</Text>
          ))}
        </View>
      )}

      <Text>Nearest Hospital:</Text>
      {nearestHospital && (
        <View>
          <Text>Name: {nearestHospital.name}</Text>
          <Text>Location: {nearestHospital.location.lat}, {nearestHospital.location.lng}</Text>
          <Text>Address: {nearestHospital.address}</Text>
        </View>
      )}
    </View>
  );
};

export default Directions;
