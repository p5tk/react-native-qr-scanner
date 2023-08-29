import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

const Button = ({ text, onPress }) => {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      <Text style={styles.btnText}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  btn: {
    borderWidth: 1,
    borderColor: "#000",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },
  btnText: {
    textAlign: "center",
  },
});
