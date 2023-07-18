import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Constants from "expo-constants";
import { Link, Stack} from "expo-router";
import Login from "../../components/Login";

const Verification = () => {

  return (
    <View style={styles.container}>
      <Stack.Screen options={{headerShown: false}}/>
      <View style={styles.header}>
        <Text style={styles.text}>Twitter</Text>
      </View>
      <View style={styles.loginContainer}>
        <Login />
      </View>
      <View style={styles.alertContainer}>
        <Text style={styles.alertText}>
          Are you not logged in? Press here to register
        </Text>
        <TouchableOpacity >
          <Link href="/Register" style={styles.alertLink}>Sign In</Link>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 20,
    paddingBottom: "40%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: Constants.statusBarHeight,
    marginRight: 15,
  },
  logo: {
    height: 36,
    width: 42,
    marginRight: 5,
  },
  text: {
    fontSize: 30,
    fontWeight: "700",
    color: "white",
  },
  loginContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  alertContainer: {
    alignItems: "center",
  },
  alertText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  alertLink: {
    color: "#00aaff",
    fontSize:16,
    fontWeight: "700",
    textAlign: "center",
  },
});

export default React.memo(Verification);