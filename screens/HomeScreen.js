import React from "react";
import { View, StyleSheet, Button, Text } from "react-native"; // Import Text component

import { signOut } from "firebase/auth";
import { auth } from "../config";

export const HomeScreen = ({ navigation }) => {
  const handleLogout = () => {
    signOut(auth).catch((error) => console.log("Error logging out: ", error));
  };

  const goToTransportation = () => {
    navigation.navigate("Transportation"); // This will navigate to the Transportation screen
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
    justifyContent: "center",
    alignItems: "center",
  },
});
