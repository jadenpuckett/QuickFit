import { StyleSheet, View, Text } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

export default function Footer({ navigation }) {
  return (
    <View style={styles.footer}>
      <Icon
        name="home"
        size={30}
        color="white"
        onPress={() => navigation.navigate("Home")}
      />
      <Icon
        name="user"
        size={30}
        color="white"
        onPress={() => navigation.navigate("Profile")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    paddingHorizontal: 50,
    flexDirection: "row",
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "black",
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 6,
    // },
    // shadowOpacity: 0.37,
    // shadowRadius: 7.49,
    elevation: 12,
    zIndex: 5,
    borderTopWidth: 1,
    borderTopColor: "#14141410",
  },
  text: {
    fontSize: 18,
    fontWight: "900",
  },
});
