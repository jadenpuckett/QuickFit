import React, { useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

import WorkoutHeader from "../Components/WorkoutHeader";
import Footer from "../Components/Footer";
import { db, auth } from "../Firebase/firebase-config";
import AddGroup from "../Components/AddGroup";
import { getDocs, collection } from "firebase/firestore";

export default function Home({ navigation, GlobalState }) {
  const { groups, setGroups, setChosenGroup, email } = GlobalState;

  useEffect(() => {
    queryFirebase();
  }, []);

  const queryFirebase = async () => {
    console.log("Reading groups from firebase");
    const ref = collection(db, "Users/" + email + "/Groups");
    const data = await getDocs(ref);
    setGroups(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const handleChooseGroup = (group) => {
    setChosenGroup(group);
    navigation.navigate("GroupDetails", {
      path: "Users/" + email + "/Groups/" + group.id + "/Exercises",
    });
  };

  return (
    <View style={styles.screen}>
      <WorkoutHeader />

      <View style={styles.body}>
        <AddGroup GlobalState={GlobalState} queryFirebase={queryFirebase} />

        <Text style={styles.label}>Groups</Text>

        {groups.map((group) => {
          return (
            <TouchableOpacity
              style={styles.item}
              key={group.id}
              onPress={() => handleChooseGroup(group)}
            >
              <Text>{group.name}</Text>
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
    flex: 9,
    width: "100%",
    backgroundColor: "#14141410",
  },
  item: {
    justifyContent: "center",
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
  button: {
    alignItems: "center",
    backgroundColor: "black",
    padding: 15,
    paddingTop: 10,
    paddingBottom: 10,
    margin: 20,
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
  label: {
    fontWeight: "bold",
    marginLeft: 20,
  },
});
