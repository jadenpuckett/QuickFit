import React, { useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

import WorkoutHeader from "../Components/WorkoutHeader";
import Footer from "../Components/Footer";
import { db, auth } from "../Firebase/firebase-config";
import AddGroup from "../Components/AddGroup";
import { getDocs, collection } from "firebase/firestore";

export default function Profile({ navigation, GlobalState }) {
  useEffect(() => {}, []);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View style={styles.screen}>
      <WorkoutHeader />
      {/* MAKE A NEW PROFILE HEADER LATER */}
      <View style={styles.body}>
        <Text style={styles.text}>Email: {auth.currentUser?.email}</Text>
        <TouchableOpacity style={styles.button} onPress={() => handleSignOut()}>
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
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
    flex: 9,
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
  text: {
    textAlign: "center",
    paddingTop: 20,
  },
});
