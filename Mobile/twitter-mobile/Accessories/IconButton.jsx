import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const IconButton = ({ icon, text, action }) => {
    return (
      <View style={styles.iconButton}>
        <TouchableOpacity onPress={action}>
            <Text>{icon}</Text>
        </TouchableOpacity>
        <Text style={styles.iconButtonText}>{text}</Text>
      </View>
    );
  };

const styles = StyleSheet.create({
    iconButton: {
        flexDirection: "row",
        alignItems: "flex-start",
      },
    iconButtonText: {
      marginLeft: 5,
      color: "white",
    },
})

export default IconButton;