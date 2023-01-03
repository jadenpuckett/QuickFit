import { StyleSheet, View, Text, Image } from "react-native";
import Constants from "expo-constants";
import QuickFitLogo from "../../assets/QuickFit-App.png";
import Icon from "react-native-vector-icons/AntDesign";

export default function WorkoutHeader() {
  return (
    <View style={styles.header}>
      <Image style={styles.qfLogo} source={QuickFitLogo} />
      <Text style={styles.text}>My Workout</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    paddingTop: Constants.statusBarHeight,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
    zIndex: 5,
  },
  text: {
    fontSize: 18,
    fontWight: "900",
    color: "white",
  },
  qfLogo: {
    width: 50,
    height: 50,
  },
});
