import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";

import { db } from "../Firebase/firebase-config";

export default function AddExercise({
  GlobalState,
  queryFirebase,
  chosenGroup,
}) {
    const { email } = GlobalState;
  const [exerciseToAdd, setExerciseToAdd] = useState("");

  const addExercise = async () => {
    if (exerciseToAdd && exerciseToAdd.length > 0) {
      const dbRef = collection(
        db,
        "Users/" + email + "/Groups/" + chosenGroup.id + "/Exercises"
      );
      const data = {
        name: exerciseToAdd,
      };
      await addDoc(dbRef, data)
        .then(() => {
          console.log("Exercise added to firebase");
          queryFirebase(); //query the firebase to refresh the items on the page
          Keyboard.dismiss();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <View style={styles.addExercise}>
      <Text style={styles.label}>Add an Exercise</Text>
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          onChangeText={(inp) => setExerciseToAdd(inp)}
          value={exerciseToAdd}
          multiline={true}
          autoCapitalize="none"
          placeholder="Exercise name..."
        />
        <TouchableOpacity style={styles.button} onPress={() => addExercise()}>
          <Text style={styles.buttonText}>Add Exercise</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  addExercise: {
    marginVertical: 20,
    marginHorizontal: 20,
  },
  row: {
    flexDirection: "row",
    height: 40,
    marginTop: 10,
  },
  input: {
    width: "75%",
    backgroundColor: "white",
    padding: 10,
    marginRight: 10,
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
  button: {
    width: "25%",
    alignItems: "center",
    backgroundColor: "black",
    padding: 10,
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
  label: {
    fontWeight: "bold",
  },
});
