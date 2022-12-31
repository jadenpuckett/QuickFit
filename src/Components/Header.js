import { StyleSheet, View, Text } from "react-native";
import Constants from 'expo-constants';



export default function Header() {
    return (
        <View style={styles.header}>
            <Text style={styles.text}>My To Do List</Text> 
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        paddingTop: Constants.statusBarHeight,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
        zIndex: 5
    },
    text: {
        fontSize: 18,
        fontWight: '900',
        color: ''
    }
})
