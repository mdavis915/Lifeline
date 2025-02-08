import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../config";

export const HomeScreen = ({ navigation }) => {
  const handleLogout = () => {
    signOut(auth).catch((error) => console.log("Error logging out: ", error));
  };

  const goToTransportation = () => {
    navigation.navigate("Transportation");
  };

  return (
    <View style={styles.container}>
      {/* Header with welcome message */}
      <View style={styles.header}>
        <Image source={require('../assets/welcome-image.png')} style={styles.headerImage} />
        <Text style={styles.headerText}>Carely</Text>
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={goToTransportation}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Explore Transportation</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, styles.logoutButton]} 
          onPress={handleLogout} 
          activeOpacity={0.8}
        >
          <Text style={[styles.buttonText, styles.logoutButtonText]}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFAF3",  // Soft light cream background for a homely feel
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  headerText: {
    fontSize: 32,  // Slightly larger for warmth
    fontWeight: "700",  // Bold text for better visibility
    color: "#5A5A5A",  // Warm gray text
    marginTop: 20,
    textAlign: "center",  // Center the text
  },
  headerImage: {
    width: 160,  // Slightly bigger image for a friendlier feel
    height: 160,
    borderRadius: 80,  // Circular image
    marginBottom: 20, 
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#FF7F50",  // Warm coral color for a cozy feel
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,  // Larger rounded corners for softness
    marginBottom: 20,
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,  // Light shadow effect for depth
  },
  logoutButton: {
    backgroundColor: "#FF6347",  // Soft red for the sign-out button
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 1.2,  // Slight letter spacing for a clean look
  },
  logoutButtonText: {
    color: "#fff",
  },
});
