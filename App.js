/*
    Notes for running:

        - Expo CLI start metro bundler (HTTP server that compiles javascript using Babel and serves it to Expo app)
        
            npx expo start              (OR npm start)

        - Exit

            Ctrl+C
*/
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import registerNNPushToken from 'native-notify';

import Login from './src/Screens/Login';
import Home from './src/Screens/Home';
import ChosenTask from './src/Screens/ChosenTask';

const Stack = createNativeStackNavigator();

export default function App() {
    // push notifications
    registerNNPushToken(5368, '6UNQ6ckAm0sCcbBRw3DUDj');

    // globalstate managmenet
    const [toDoList, setToDoList] = useState([{ id: 1, task: 'brush your teeth'}]);
    const [task, setTask] = useState('');
    const [chosenTask, setChosenTask] = useState('');

    const GlobalState = {
        toDoList, setToDoList,
        task, setTask,
        chosenTask, setChosenTask
    }

    // navigation
    return (
        <NavigationContainer>
            <Stack.Navigator>

                <Stack.Screen name='Login' options={{ headerShown: false }}>
                    {props => <Login {...props} GlobalState = {GlobalState} />}
                </Stack.Screen>

                <Stack.Screen name='Home' options={{ headerShown: false }}>
                    {props => <Home {...props} GlobalState = {GlobalState} />}
                </Stack.Screen>

                <Stack.Screen name='ChosenTask' options={{ headerShown: false }}>
                    {props => <ChosenTask {...props} GlobalState = {GlobalState} />}
                </Stack.Screen>

            </Stack.Navigator>
        </NavigationContainer>
    );
}