import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image, Linking, Alert, ScrollView, Animated } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../config";

export const HomeScreen = ({ navigation }) => {
  const [fadeAnim] = useState(new Animated.Value(0)); // Initial opacity is 0

  useEffect(() => {
    // Fade in the "Welcome to Carely" text on component mount
    Animated.timing(fadeAnim, {
      toValue: 1, // Target opacity is 1 (fully visible)
      duration: 2000, // Duration of the fade effect (in ms)
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleLogout = () => {
    signOut(auth).catch((error) => console.log("Error logging out: ", error));
  };

  const goToTransportation = () => {
    navigation.navigate("Transportation");
  };

  const goToVitals = () => {
    navigation.navigate("Vitals"); // Navigate to the Vitals screen
  };

  const callEmergencyPhone = () => {
    const phoneNumber = "tel://911" || "tel:911";
    Linking.openURL(phoneNumber).catch((err) =>
      Alert.alert("Error", "Could not open dialer")
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity 
          style={styles.logoutTextContainer} 
          onPress={handleLogout}
        >
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>

      <Animated.View style={[styles.welcomeTextContainer, { opacity: fadeAnim }]}>
        <Text style={styles.headerText}>How Can We Help?</Text>
      </Animated.View>

      <View style={styles.dashboardContainer}>
        <View style={styles.cardRow}>
          <View style={styles.cardWrapper}>
            <TouchableOpacity 
              style={[styles.card, styles.primaryCard]} 
              onPress={goToTransportation}
              activeOpacity={0.8}
            >
              <Image source={require('../assets/hospital-icon.png')} style={styles.cardIcon} />
            </TouchableOpacity>
            <Text style={styles.cardLabel}>Find Care</Text>
          </View>

          <View style={styles.cardWrapper}>
            <TouchableOpacity 
              style={[styles.card, styles.secondaryCard]} 
              onPress={goToVitals} // Navigate to Vitals
              activeOpacity={0.8}
            >
              <Image source={require('../assets/vitals-icon.png')} style={styles.cardIcon} />
            </TouchableOpacity>
            <Text style={styles.cardLabel}>Check Vitals</Text>
          </View>
        </View>

        <View style={styles.cardRowCenter}>
          <View style={styles.callCardWrapper}>
            <TouchableOpacity 
              style={[styles.card, styles.emergencyCard]} 
              onPress={callEmergencyPhone} 
              activeOpacity={0.8}
            >
              <Image source={require('../assets/call-icon.png')} style={styles.cardIcon} />
            </TouchableOpacity>
            <Text style={styles.cardLabel}>Emergeny Call</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F0F4F8", // Light gray background for a professional look
    alignItems: "center",
    paddingTop: 10, // Reduced padding at the top to move content up
    paddingHorizontal: 20,
  },
  headerContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end", // Align text and sign out button to the right
    alignItems: "center",
    marginBottom: 20, // Reduced margin to bring content closer
    shadowColor: "#000", // Dark shadow color
    shadowOffset: { width: 0, height: 4 }, // Light shadow offset for header
    shadowOpacity: 0.3, // Slight opacity for a soft shadow
    shadowRadius: 6, // Soft blur for the shadow
  },
  headerText: {
    fontSize: 32,
    fontWeight: "700",
    color: "#2C3E50", // Dark gray for header text
    textAlign: "center", // Ensure the text stays centered
    width: "100%", // Take the full width of the container
    flexWrap: 'nowrap', // Prevent wrapping of the text within the container
  },
  logoutTextContainer: {
    padding: 10,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#E74C3C", // Red color for sign out text to make it noticeable
  },
  welcomeTextContainer: {
    marginBottom: 20, // Reduced margin
    width: "100%", // Ensure the container takes the full width
    alignItems: "center", // Center content horizontally
    justifyContent: "center", // Center content vertically
    flexDirection: 'row', // Make sure the text behaves as a row (doesn't wrap)
    textAlign: "center", // Align text in the center
    flexWrap: 'nowrap', // Prevent wrapping to the next line
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: "700",
    color: "#2C3E50", // Dark gray for header text
    textAlign: "center", // Center the text horizontally
  },
  dashboardContainer: {
    width: "100%",
    alignItems: "center",
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between", // Space cards evenly
    width: "100%",
    marginBottom: 10, // Reduced space between rows
    alignItems: "center", // Align text and card properly
  },
  cardRowCenter: {
    flexDirection: "row",
    justifyContent: "center", // Center the emergency card
    width: "100%",
    marginBottom: 10, // Reduced margin
    alignItems: "center", // Align text and card properly
  },
  cardWrapper: {
    alignItems: "center", // Center the card and label together
    justifyContent: "center",
    flex: 1, // Ensures cards take equal space
    marginHorizontal: 10, // Added some margin between the cards
  },
  callCardWrapper: {
    alignItems: "center", // Center the call card and label together
    justifyContent: "center",
    marginHorizontal: 10, // Ensure the call card has some margin
    width: "45%", // Fixed width for the call card to prevent expansion
  },
  card: {
    width: "100%", // Make the cards take full space of their container
    aspectRatio: 1, // Maintain square shape (1:1 ratio)
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25, // Increased border radius for rounded corners
    paddingVertical: 30, // Increased padding for better text fit
    paddingHorizontal: 20,
    flexDirection: "column", // Align text and icon vertically
    justifyContent: "center", // Center items vertically
    marginBottom: 15, // Increased margin to place text closer to card
    maxWidth: "90%", // Prevent cards from getting too wide
    elevation: 40, // Android shadow support
  },
  primaryCard: {
    backgroundColor: "#3498DB", // Soft blue for the primary card
    shadowColor: "#3498DB", // Blue shadow to match the card color
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
  },
  secondaryCard: {
    backgroundColor: "#2ECC71", // Calming green for secondary card
    shadowColor: "#2ECC71", // Green shadow to match the card color
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
  },
  emergencyCard: {
    backgroundColor: "#E74C3C", // Attention-grabbing red for emergency card
    shadowColor: "#E74C3C", // Red shadow to match the card color
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
  },
  cardIcon: {
    width: "100%", // Increased icon size to 80% of the card width
    height: "100%", // Adjust height proportionally
  },
  cardLabel: {
    fontSize: 18, // Increased font size for the label
    color: "black", // Black text color for the label
    marginTop: 0, // Space between the icon and the label
  },
});

export default HomeScreen;
