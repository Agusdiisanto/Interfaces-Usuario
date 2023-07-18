import React from 'react'
import { Text, View, StyleSheet,ActivityIndicator} from "react-native";

function Loader() {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0085EB" />
        <Text style={styles.text}>Cargando...</Text>
      </View>
    );
}
  
const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    height: "100%",
    width: "100%",
  },
  text: {
    color: "white",
    marginTop: 10,
  },
});


export default React.memo(Loader)