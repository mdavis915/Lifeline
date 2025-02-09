import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image, Linking, Alert, ScrollView, Animated } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../config";

export const HomeScreen = ({ navigation }) => {
  const [fadeAnim] = useState(new Animated.Value(0)); 

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1, 
      duration: 2000, 
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
    navigation.navigate("Vitals"); 
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
              onPress={goToVitals} 
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
    backgroundColor: "#F0F4F8", 
    alignItems: "center",
    paddingTop: 10, 
    paddingHorizontal: 20,
  },
  headerContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end", 
    alignItems: "center",
    marginBottom: 20, 
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.3, 
    shadowRadius: 6, 
  },
  headerText: {
    fontSize: 32,
    fontWeight: "700",
    color: "#2C3E50", 
    textAlign: "center", 
    width: "100%", 
    flexWrap: 'nowrap', 
  },
  logoutTextContainer: {
    padding: 10,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#E74C3C", 
  },
  welcomeTextContainer: {
    marginBottom: 20, 
    width: "100%", 
    alignItems: "center", 
    justifyContent: "center", 
    flexDirection: 'row', 
    textAlign: "center", 
    flexWrap: 'nowrap',
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: "700",
    color: "#2C3E50", 
    textAlign: "center", 
  },
  dashboardContainer: {
    width: "100%",
    alignItems: "center",
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between", 
    width: "100%",
    marginBottom: 10, 
    alignItems: "center", 
  },
  cardRowCenter: {
    flexDirection: "row",
    justifyContent: "center", 
    width: "100%",
    marginBottom: 10, 
    alignItems: "center", 
  },
  cardWrapper: {
    alignItems: "center", 
    justifyContent: "center",
    flex: 1, 
    marginHorizontal: 10, 
  },
  callCardWrapper: {
    alignItems: "center", 
    justifyContent: "center",
    marginHorizontal: 10, 
    width: "45%", 
  },
  card: {
    width: "100%", 
    aspectRatio: 1, 
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25, 
    paddingVertical: 30, 
    paddingHorizontal: 20,
    flexDirection: "column", 
    justifyContent: "center", 
    marginBottom: 15, 
    maxWidth: "90%", 
    elevation: 40, 
  },
  primaryCard: {
    backgroundColor: "#3498DB", 
    shadowColor: "#3498DB", 
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
  },
  secondaryCard: {
    backgroundColor: "#2ECC71", 
    shadowColor: "#2ECC71", 
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
  },
  emergencyCard: {
    backgroundColor: "#E74C3C", 
    shadowColor: "#E74C3C", 
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
  },
  cardIcon: {
    width: "100%", 
    height: "100%", 
  },
  cardLabel: {
    fontSize: 18, 
    color: "black", 
    marginTop: 0, 
  },
});

export default HomeScreen;
