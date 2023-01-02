import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";

import Header from "../Components/Header";
import Footer from "../Components/Footer";

export default function ExerciseDetail({ navigation, GlobalState }) {
  const { chosenExercise } = GlobalState;

  return (
    <View style={styles.screen}>
      <Header />
      <View style={styles.body}>
        <Text>{chosenExercise.name}</Text>
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
    alignItems: "center",
    justifyContent: "center",
  },
});
