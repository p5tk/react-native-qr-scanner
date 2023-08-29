import React, { useState } from "react";
import { View, Text, StyleSheet, Linking } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Logo from "../components/logo";
import Button from "../components/button";
import { AntDesign } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import Toast from "react-native-root-toast";

const ScanResult = ({ navigation, route }) => {
  const [scannedData, setScannedData] = useState("");
  const [result, setResult] = useState("");

  const checkString = (inputText) => {
    const phoneRegex = /^\d{10}$/;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const linkRegex = /^(http|https):\/\/[^ "]+$/;

    if (phoneRegex.test(inputText)) {
      return "Phone Number";
    } else if (emailRegex.test(inputText)) {
      return "Email";
    } else if (linkRegex.test(inputText)) {
      return "Link";
      ``;
    } else {
      return "Normal Text";
    }
  };

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(scannedData);
    showToast();
  };

  const showToast = () => {
    Toast.show("Text Copied", {
      duration: Toast.durations.SHORT,
      position: -120,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
      backgroundColor: "#fff",
      textColor: "#000",
    });
  };

  const openLink = () => {
    Linking.openURL(scannedData).catch((error) =>
      console.error(`Error opening link: ${error}`)
    );
  };

  const openEmail = () => {
    const url = `mailto:${scannedData}`;
    Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          console.log(`Email client is not supported on this device`);
        } else {
          return Linking.openURL(url);
        }
      })
      .catch((error) => console.error(`Error opening email client: ${error}`));
  };

  const openPhone = () => {
    const url = `tel:${scannedData}`;
    Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          console.log(`Dial pad is not supported on this device`);
        } else {
          return Linking.openURL(url);
        }
      })
      .catch((error) => console.error(`Error opening dial pad: ${error}`));
  };

  useFocusEffect(
    React.useCallback(() => {
      const { scannedData } = route.params;
      setScannedData(scannedData);
      setResult(checkString(scannedData));
    }, [route.params])
  );

  return (
    <View style={styles.container}>
      <AntDesign
        name="arrowleft"
        size={24}
        color="black"
        style={styles.backIcon}
        onPress={() => navigation.goBack()}
      />
      <Text style={styles.titleText}>Result</Text>

      <Logo result={result} />

      <Text style={styles.subTitleText}>QR Code Details:</Text>

      <View style={{ height: 400 }}>
        <Text>{scannedData}</Text>
      </View>

      {result === "Normal Text" && (
        <Button text="Copy to Clipboard" onPress={() => copyToClipboard()} />
      )}
      {result === "Link" && (
        <Button text="Go to Website" onPress={() => openLink()} />
      )}
      {result === "Phone Number" && (
        <Button text="Call Now" onPress={() => openPhone()} />
      )}
      {result === "Email" && (
        <Button text="Send Mail" onPress={() => openEmail()} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 50,
  },
  backIcon: {
    marginBottom: 20,
  },
  titleText: {
    fontSize: 30,
    marginBottom: 40,
  },
  subTitleText: {
    color: "rgba(0,0,0,0.3)",
    marginBottom: 40,
  },
  btn: {
    alignSelf: "flex-end",
  },
});

export default ScanResult;
