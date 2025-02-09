import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen";
import TransportationScreen from "../screens/Transportation";
import VitalsCheck from "../screens/VitalsCheck"; 

const Stack = createStackNavigator();

export const AppStack = () => {
  return (
    <Stack.Navigator>
      {/* */}
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Transportation" component={TransportationScreen} />
      <Stack.Screen name="Vitals" component={VitalsCheck} />
    </Stack.Navigator>
  );
};
