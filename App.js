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

import Login from "./src/Screens/Login";
import Home from "./src/Screens/Home";
import ExerciseDetail from "./src/Screens/ExerciseDetail";

import { db } from "./src/Firebase/firebase-config";
import { collection, doc, getDocs } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";

const Stack = createNativeStackNavigator();

export default function App() {
  // push notifications
  registerNNPushToken(5368, "6UNQ6ckAm0sCcbBRw3DUDj");

  // globalstate managmenet
  const [exercises, setExercises] = useState([]);
  const [chosenExercise, setChosenExercise] = useState('');
  const [readFromFirebase, setReadFromFirebase] = useState(false);

  // function to make API call to firebase (do not make useEffect ansync - bad practice)
  const exercisesCollectionRef = collection(db, "Exercises");
  useEffect(() => {
    const getExercises = async () => {
      const data = await getDocs(exercisesCollectionRef);
      setExercises(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getExercises();
  }, []); // one call only

  const GlobalState = {
    exercises,
    setExercises,
    chosenExercise,
    setChosenExercise,
    readFromFirebase,
    setReadFromFirebase
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

        <Stack.Screen name="ExerciseDetail" options={{ headerShown: false }}>
          {(props) => <ExerciseDetail {...props} GlobalState={GlobalState} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
