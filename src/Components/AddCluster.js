import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard
} from "react-native";

import { db } from "../Firebase/firebase-config";

export default function AddCluster({
  GlobalState,
  queryFirebase,
  chosenGroup,
  chosenExercise,
}) {
  const [setsToAdd, setSetsToAdd] = useState();
  const [repsToAdd, setRepsToAdd] = useState();
  const [weightToAdd, setWeightToAdd] = useState();

  const addCluster = async () => {
    const dbRef = collection(
      db,
      "Groups/" +
        chosenGroup.id +
        "/Exercises/" +
        chosenExercise.id +
        "/Clusters"
    );
    const data = {
      sets: setsToAdd ?? 0,
      reps: repsToAdd ?? 0,
      weight: weightToAdd ?? 0,
    };
    await addDoc(dbRef, data)
      .then(() => {
        console.log("Cluster added to firebase");
        queryFirebase(); //query the firebase to refresh the items on the page
        Keyboard.dismiss();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        onChangeText={(inp) => setSetsToAdd(inp)}
        value={setsToAdd}
        multiline={true}
        autoCapitalize="none"
        placeholder="Enter a number of sets..."
      />
      <TextInput
        style={styles.input}
        onChangeText={(inp) => setRepsToAdd(inp)}
        value={repsToAdd}
        multiline={true}
        autoCapitalize="none"
        placeholder="Enter a number of reps..."
      />
      <TextInput
        style={styles.input}
        onChangeText={(inp) => setWeightToAdd(inp)}
        value={weightToAdd}
        multiline={true}
        autoCapitalize="none"
        placeholder="Enter a weight amount..."
      />
      <TouchableOpacity style={styles.button} onPress={() => addCluster()}>
        <Text style={styles.buttonText}>Add Cluster</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "white",
    padding: 15,
    paddingTop: 10,
    paddingBottom: 10,
    margin: 10,
    // marginTop: 30,
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
