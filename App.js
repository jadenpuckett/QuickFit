/*
    Notes for running:

        - Expo CLI start metro bundler (HTTP server that compiles javascript using Babel and serves it to Expo app)
        
            npx expo start              (OR npm start)

        - Exit

            Ctrl+C

            npm install -g npm@9.2.0 to UPDATE
*/
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import registerNNPushToken from "native-notify";
import { StyleSheet } from "react-native";

import Login from "./src/Screens/Login";
import Home from "./src/Screens/Home";
import GroupDetails from "./src/Screens/GroupDetails";
import ExerciseDetails from "./src/Screens/ExerciseDetails";

const Stack = createNativeStackNavigator();

export default function App() {
  // push notifications
  registerNNPushToken(5368, "6UNQ6ckAm0sCcbBRw3DUDj");

  // globalstate managmenet
  const [groups, setGroups] = useState([]);
  const [chosenGroup, setChosenGroup] = useState("");
  const [exercises, setExercises] = useState([]);
  const [chosenExercise, setChosenExercise] = useState("");
  const [clusters, setClusters] = useState([]);

  const GlobalState = {
    groups,
    setGroups,
    chosenGroup,
    setChosenGroup,
    exercises,
    setExercises,
    chosenExercise,
    setChosenExercise,
    clusters,
    setClusters,
  };

  // navigation
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" options={{ headerShown: false }}>
          {(props) => <Login {...props} GlobalState={GlobalState} />}
        </Stack.Screen>

        <Stack.Screen name="Home" options={{ headerShown: false }}>
          {(props) => <Home {...props} GlobalState={GlobalState} />}
        </Stack.Screen>

        <Stack.Screen name="GroupDetails" options={{ headerShown: false }}>
          {(props) => <GroupDetails {...props} GlobalState={GlobalState} />}
        </Stack.Screen>

        <Stack.Screen name="ExerciseDetails" options={{ headerShown: false }}>
          {(props) => <ExerciseDetails {...props} GlobalState={GlobalState} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
