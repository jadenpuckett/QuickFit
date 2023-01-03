import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Button } from "react-native";

import WorkoutHeader from "../Components/WorkoutHeader";
import Footer from "../Components/Footer";
import { db } from "../Firebase/firebase-config";
import { getDocs, collection } from "firebase/firestore";
import AddExercise from "../Components/AddExercise";

export default function GroupDetails({ route, navigation, GlobalState }) {
  const {
    chosenGroup,
    exercises,
    setExercises,
    setChosenExercise,
    setWorkoutHeaderText,
  } = GlobalState;
  const { path } = route.params;

  useEffect(() => {
    queryFirebase();
  }, []);

  const queryFirebase = async () => {
    console.log("Reading exercises from firebase");
    const ref = collection(db, path);
    const data = await getDocs(ref);
    setExercises(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const handleChooseExercise = (exercise) => {
    setChosenExercise(exercise);
    navigation.navigate("ExerciseDetails", {
      path:
        "Groups/" + chosenGroup.id + "/Exercises/" + exercise.id + "/Clusters",
    });
  };

  return (
    <View style={styles.screen}>
      <WorkoutHeader />
      <View style={styles.body}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>

        <Text style={styles.text}>{chosenGroup.name}</Text>

        <AddExercise
          GlobalState={GlobalState}
          queryFirebase={queryFirebase}
          chosenGroup={chosenGroup}
        />

        {exercises.map((exercise) => {
          return (
            <TouchableOpacity
              style={styles.item}
              key={exercise.id}
              onPress={() => handleChooseExercise(exercise)}
            >
              <Text>Name: {exercise.name}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <Footer navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  body: {
    flex: 8,
    width: "100%",
    backgroundColor: "#14141410",
  },
  item: {
    backgroundColor: "white",
    padding: 10,
    margin: 10,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  text: {
    textAlign: "center",
    paddingTop: 30,
  },
  button: {
    alignItems: "center",
    backgroundColor: "black",
    padding: 15,
    paddingTop: 10,
    paddingBottom: 10,
    margin: 10,
    marginBottom: 30,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  buttonText: {
    color: "white",
    font: "900",
  },
});
