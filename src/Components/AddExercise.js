import React, {useState} from 'react';
import { v4 as uuidv4 } from "uuid";
import { collection, addDoc } from 'firebase/firestore';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from "react-native";

import { db } from '../Firebase/firebase-config';



export default function AddExercise() {
    const [exerciseToAdd, setExerciseToAdd] = useState('');

    const addExercise = async () => {
        if (exerciseToAdd && exerciseToAdd.length > 0) {
            const dbRef = collection(db, "Exercises");
            const data = {
                id: uuidv4(),
                name: exerciseToAdd
            };
            await addDoc(dbRef, data)
            .then(() => {
                console.log("Document has been added to db");
            })
            .catch(error => {
                console.log(error);
            })
        }
    }

    return (
        <View>
            <TextInput 
                style={styles.input}
                onChangeText={(inp) => setExerciseToAdd(inp)}
                value={exerciseToAdd}
                multiline={true}
                autoCapitalize='none'
                placeholder='Enter a new workout name...'
            />
            <TouchableOpacity 
                style={styles.button}
                onPress={() => addExercise()}
            >
                <Text style={styles.buttonText}>Add Exercise</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: 'white',
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
        alignItems: 'center',
        backgroundColor: '#4a9eff',
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
        color: 'white',
        font: '900',
    },
})