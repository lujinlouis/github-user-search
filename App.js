/**
 * This the the root app function.
 * It contains the routing information.
 */

import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Screens/Home";
import Profile from "./Screens/Profile";
import FollowInfo from "./Screens/FollowInfo";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Followers" component={FollowInfo} />
        <Stack.Screen name="Following" component={FollowInfo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
