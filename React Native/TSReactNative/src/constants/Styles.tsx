import { StyleSheet, Platform, StatusBar } from "react-native";
import Colors from "./Colors";

export const mainStyle = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  container: {
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  h1: {
    color: Colors.COLOR_BLUE,
    fontSize: 40,
    fontWeight: "bold",
  },
});
