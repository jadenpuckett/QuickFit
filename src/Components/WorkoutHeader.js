import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import Constants from "expo-constants";
import QuickFitLogo from "../../assets/QuickFit-App.png";
import Icon from "react-native-vector-icons/AntDesign";

export default function WorkoutHeader({ navigation }) {
  return (
    <View style={styles.header}>
      <View style={styles.titleBox}>
        <Image style={styles.qfLogo} source={QuickFitLogo} />
        <Text style={styles.text}>My Workout</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingLeft: 20,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    paddingTop: Constants.statusBarHeight,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 6,
    // },
    // shadowOpacity: 0.37,
    // shadowRadius: 7.49,
    elevation: 12,
    zIndex: 5,
  },
  text: {
    fontSize: 25,
    fontWight: "900",
    color: "white",
  },
  qfLogo: {
    width: 50,
    height: 50,
  },
});
