import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// Import screens
import HomeScreen from "../screens/HomeScreen";
import TransportationScreen from "../screens/Transportation";
import VitalsCheck from "../screens/VitalsCheck"; // Corrected import

const Stack = createStackNavigator();

export const AppStack = () => {
  return (
    <Stack.Navigator>
      {/* Explicitly pass the component using the 'component' prop */}
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Transportation" component={TransportationScreen} />
      <Stack.Screen name="Vitals" component={VitalsCheck} />
    </Stack.Navigator>
  );
};
