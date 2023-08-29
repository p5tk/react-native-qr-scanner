import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const Logo = ({ result }) => {
  console.log("Result", result);
  return (
    <View style={styles.logoContainer}>
      {result === "Normal Text" && (
        <Ionicons name="text" size={50} color="#fff" />
      )}
      {result === "Link" && <MaterialIcons name="web" size={50} color="#fff" />}
      {result === "Phone Number" && (
        <Feather name="phone-call" size={50} color="#fff" />
      )}
      {result === "Email" && (
        <MaterialIcons name="email" size={50} color="#fff" />
      )}
    </View>
  );
};

export default Logo;

const styles = StyleSheet.create({
  logoContainer: {
    height: 90,
    width: 90,
    backgroundColor: "#000",
    alignSelf: "center",
    borderRadius: 15,
    marginBottom: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});
