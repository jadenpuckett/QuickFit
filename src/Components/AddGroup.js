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

export default function AddGroup({ GlobalState, queryFirebase }) {
  const [groupToAdd, setGroupToAdd] = useState("");

  const addGroup = async () => {
    if (groupToAdd && groupToAdd.length > 0) {
      const dbRef = collection(db, "Groups");
      const data = {
        name: groupToAdd,
      };
      await addDoc(dbRef, data)
        .then(() => {
          console.log("Group added to firebase");
          queryFirebase(); //query the firebase to refresh the items on the page
          Keyboard.dismiss();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <View style={styles.addgroup}>
      <Text style={styles.label}>Add a Group</Text>
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          onChangeText={(inp) => setGroupToAdd(inp)}
          value={groupToAdd}
          multiline={true}
          autoCapitalize="none"
          placeholder="Group name..."
        />
        <TouchableOpacity style={styles.button} onPress={() => addGroup()}>
          <Text style={styles.buttonText}>Add Group</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  addgroup: {
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
