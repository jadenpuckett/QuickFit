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
    <View style={styles.addCluster}>
      <Text style={styles.label}>Add a Cluster</Text>
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          onChangeText={(inp) => setSetsToAdd(inp)}
          value={setsToAdd}
          multiline={true}
          autoCapitalize="none"
          placeholder="Sets..."
        />
        <TextInput
          style={styles.input}
          onChangeText={(inp) => setRepsToAdd(inp)}
          value={repsToAdd}
          multiline={true}
          autoCapitalize="none"
          placeholder="Reps..."
        />
        <TextInput
          style={styles.input}
          onChangeText={(inp) => setWeightToAdd(inp)}
          value={weightToAdd}
          multiline={true}
          autoCapitalize="none"
          placeholder="Weight..."
        />
        <TouchableOpacity style={styles.button} onPress={() => addCluster()}>
          <Text style={styles.buttonText}>Add Cluster</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  addCluster: {
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
