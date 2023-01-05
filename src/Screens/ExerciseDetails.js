import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";

import WorkoutHeader from "../Components/WorkoutHeader";
import Footer from "../Components/Footer";
import { db } from "../Firebase/firebase-config";
import { getDocs, collection } from "firebase/firestore";
import AddCluster from "../Components/AddCluster";

export default function ExerciseDetails({ route, navigation, GlobalState }) {
  const { chosenGroup, chosenExercise, clusters, setClusters } = GlobalState;
  const { path } = route.params;

  useEffect(() => {
    queryFirebase();
  }, []);

  const queryFirebase = async () => {
    console.log("Reading clusters from firebase");
    const ref = collection(db, path);
    const data = await getDocs(ref);
    setClusters(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
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

        <Text style={styles.text}>{chosenExercise.name}</Text>

        <AddCluster
          GlobalState={GlobalState}
          queryFirebase={queryFirebase}
          chosenGroup={chosenGroup}
          chosenExercise={chosenExercise}
        />

        <Text style={styles.label}>Clusters</Text>

        {clusters.map((cluster) => {
          return (
            <TouchableOpacity style={styles.cluster} key={cluster.id}>
              <Text>Sets: {cluster.sets}</Text>
              <Text>Reps: {cluster.reps}</Text>
              <Text>Weight: {cluster.weight}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <Footer navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
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
  cluster: {
    backgroundColor: "white",
    padding: 10,
    marginHorizontal: 20,
    marginTop: 10,
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
    color: "blue",
    fontWeight: "bold",
    marginHorizontal: 20,
    fontSize: 32,
  },
  button: {
    width: "25%",
    alignItems: "center",
    backgroundColor: "black",
    padding: 15,
    paddingTop: 10,
    paddingBottom: 10,
    margin: 20,
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
    marginLeft: 20,
  },
});
