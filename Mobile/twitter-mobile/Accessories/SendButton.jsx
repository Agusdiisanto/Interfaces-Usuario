import React from 'react'
import {Text,StyleSheet,TouchableOpacity} from "react-native";


const SendButton = ({text, action, style}) => {
  return (
    <TouchableOpacity style = {style} onPress={action}>
        <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  )
}

export default SendButton

const styles = StyleSheet.create({
      buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "700",
        textAlign: "center",
    },
})

