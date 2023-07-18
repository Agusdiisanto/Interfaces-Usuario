import React from "react";
import { View, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";

const ModalClose = ({ action}) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={action}>
        <FontAwesome name="close" color="#00acee" size={25} />
      </TouchableOpacity>
    </View>
  );
};

export default ModalClose;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    position: "absolute",
    top: -15,
    right: -10,
    marginTop: 10,
  },
  buttonText: {
    color: "rgb(0, 170, 255)",
  },
});
