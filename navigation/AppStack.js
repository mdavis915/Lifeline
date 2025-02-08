import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// Import the HomeScreen and TransportationScreen
import { HomeScreen } from "../screens";
import TransportationScreen from "../screens/Transportation";

const Stack = createStackNavigator();

export const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Transportation" component={TransportationScreen} />
    </Stack.Navigator>
  );
};
