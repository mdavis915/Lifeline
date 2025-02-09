import React from "react";
import { View, StyleSheet, Button, Text } from "react-native"; // Import Text component

import { signOut } from "firebase/auth";
import { auth } from "../config";

export const HomeScreen = ({ navigation }) => {
  const handleLogout = () => {
    signOut(auth).catch((error) => console.log("Error logging out: ", error));
  };

  const goToTransportation = () => {
    navigation.navigate("Transportation");
  };

  const callEmergencyPhone = () => {
    const phoneNumber = "tel://911" || "tel:911" ; // 
    Linking.openURL(phoneNumber).catch((err) =>
      Alert.alert("Error", "Could not open dialer")
    );
  };

  return (
    <View style={styles.container}>
      <Text>Welcome to the Home Screen</Text>
      <Button title="Sign Out" onPress={handleLogout} />
      <Button title="Go to Transportation" onPress={goToTransportation} />
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
