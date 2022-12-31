import React, { useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { db, auth } from '../Firebase/firebase-config';
import AddExercise from '../Components/AddExercise';
import { getDocs, collection, onSnapshot, query, doc } from 'firebase/firestore';



export default function Home({ navigation, GlobalState }) {
    const { exercises, setExercises } = GlobalState;

    // function to make API call to firebase (do not make useEffect ansync - bad practice)
    const exercisesCollectionRef = collection(db, 'Exercises');
    useEffect(() => {

        const getExercises = async () => {
            const data = await getDocs(exercisesCollectionRef);
            setExercises(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        };

        getExercises();

    }) // repeated calls

    const handleSignOut = () => {
        auth
            .signOut()
            .then(() => {
                navigation.replace('Login')
            })
            .catch(error => alert(error.message))
    }

    return (
        <View style={styles.screen}>
            <Header />
            <View style={styles.body}>

                <Text style={styles.text}>Email: {auth.currentUser?.email}</Text>
                <TouchableOpacity 
                    style={styles.button}
                    onPress={() => handleSignOut()}
                >
                    <Text style={styles.buttonText}>Sign Out</Text>
                </TouchableOpacity>
            
                <AddExercise/>
                
                {exercises.map((exercise) => {
                    return (
                        <TouchableOpacity style={styles.task} key={exercise.id}>
                            <Text>Name: {exercise.name}</Text> 
                        </TouchableOpacity>
                    )
                })}

            </View>
            <Footer navigation={navigation}/>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    body: {
        flex: 8,
        width: '100%',
        backgroundColor: '#14141410',
    },
    task: {
        backgroundColor: 'white',
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
    text: {
        textAlign: 'center',
        paddingTop: 30
    }
})