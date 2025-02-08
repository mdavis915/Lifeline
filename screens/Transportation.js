import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking, StyleSheet, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

// Google API Key
const GOOGLE_API_KEY = 'AIzaSyAMsW49vP5v6LvtGF11I4Ard_QJii3m7Rs';

const Directions = () => {
  const [hospitals, setHospitals] = useState([]);
  const [selectedDistance, setSelectedDistance] = useState(5); // Default to 5 miles
  const [loading, setLoading] = useState(true);

  // Coordinates of University of Florida (UF)
  const ufCoordinates = {
    lat: 29.6491202,  // Latitude for UF
    lng: -82.3450583  // Longitude for UF
  };

  // Function to get nearby hospitals
  const getNearbyHospitals = async (lat, lng, radius) => {
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius * 1609.34}&type=hospital&key=${GOOGLE_API_KEY}`; // 1 mile = 1609.34 meters

    try {
      const response = await axios.get(url);
      if (response.data.results.length > 0) {
        setHospitals(response.data.results); // Store all hospital results
      } else {
        setHospitals([]);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching hospital data:', error);
      setLoading(false);
    }
  };

  // Get the nearby hospitals using UF coordinates and selected distance
  useEffect(() => {
    getNearbyHospitals(ufCoordinates.lat, ufCoordinates.lng, selectedDistance); // Fetch hospitals near UF
  }, [selectedDistance]);

  // Function to open Uber with predefined pickup location (University of Florida)
  const openUber = (address) => {
    const ufPickupLocation = 'University of Florida, 655 Reitz Union Drive, Gainesville, FL 32603';
  
    const uberUrl = `uber://?action=setPickup&pickup[formatted_address]=${ufPickupLocation}&dropoff[formatted_address]=${address}`;
    const uberWebUrl = `https://m.uber.com/ul/?action=setPickup&pickup[formatted_address]=${ufPickupLocation}&dropoff[formatted_address]=${address}`;
  
    Linking.openURL(uberUrl).catch(() => {
      // Fallback to opening Uber website if the app is not installed
      Linking.openURL(uberWebUrl);
    });
  };
  
  // Function to open Google Maps with directions
  const openGoogleMaps = (address) => {
    const ufPickupLocation = 'University of Florida, 655 Reitz Union Drive, Gainesville, FL 32603';

    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(ufPickupLocation)}&destination=${encodeURIComponent(address)}`;

    // Open Google Maps with the route
    Linking.openURL(googleMapsUrl).catch((error) => {
      console.error('Error opening Google Maps:', error);
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Nearby Hospitals</Text>

      {/* Distance Filter */}
      <View style={styles.distancePickerContainer}>
        <Text style={styles.filterLabel}>Select Distance (miles):</Text>
        <Picker
          selectedValue={selectedDistance}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedDistance(itemValue)}
        >
          <Picker.Item label="1 miles" value={1} />
          <Picker.Item label="2 miles" value={2} />
          <Picker.Item label="3 miles" value={3} />
          <Picker.Item label="4 miles" value={4} />
        </Picker>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {loading ? (
          <Text style={styles.loadingText}>Loading nearby hospitals...</Text>
        ) : (
          hospitals.length > 0 ? (
            hospitals.map((hospital, index) => (
              <View key={index} style={styles.hospitalCard}>
                <Text style={styles.hospitalName}>{hospital.name}</Text>
                <Text style={styles.hospitalAddress}>{hospital.vicinity}</Text>

                {/* Ride Share and Google Maps Buttons */}
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.iconButton}
                    onPress={() => openUber(hospital.vicinity)} // Open Uber directly
                  >
                    <Image 
                      source={require('../assets/uber-icon.png')} // Replace with your local Uber icon path
                      style={styles.iconImage}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.iconButton}
                    onPress={() => openGoogleMaps(hospital.vicinity)} // Open Google Maps directly
                  >
                    <Image 
                      source={require('../assets/maps-icon.png')} // Replace with your local Maps icon path
                      style={styles.iconImage}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.loadingText}>No hospitals found within {selectedDistance} miles.</Text>
          )
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 30,  // Increased font size
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  distancePickerContainer: {
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  filterLabel: {
    fontSize: 18,  // Increased font size
    marginBottom: 10,
    color: '#333',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  hospitalCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  hospitalName: {
    fontSize: 22,  // Increased font size
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  hospitalAddress: {
    fontSize: 16,  // Increased font size
    color: '#666',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around', // Adjust this to 'space-between' if you want them more spread out
    marginTop: 10,  // Add top margin to create some space between the hospital info and buttons
  },
  iconButton: {
    backgroundColor: 'transparent',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    backgroundColor: 'transparent',  // Ensure no background color
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 18,  // Increased font size
    color: '#888',
  },
});

export default Directions;
