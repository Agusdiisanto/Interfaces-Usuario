import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Modal, TouchableWithoutFeedback} from 'react-native';
import { EvilIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from 'expo-router';
import SendButton from '../../Accessories/SendButton';
import Api from '../../service/Api';

const NewTweet = ({ visible, closeModal }) => {
  const [body, setBody] = useState({ content: "", image: "" });
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

  const handleTweet = () => {
    if (body.content.trim() === "") {
      setErrorMessage("Rellene el campo para twittear");
    } else {
      Api.tweet(body)
        .then((response) => {
          router.push(`Tweet/${response.data.id}`);
          closeModal();
          setBody({ content: "", image: "" });
          setErrorMessage("")
        })
        .catch((error) => {router.replace("/Mantenimiento")});
    }
  };

  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <View style={styles.headerContainer}>
              <FontAwesome
                name="close"
                color="#1C9BF0"
                size={24}
                onPress={closeModal}
              />
            </View>
            <View style={styles.bodyContainer}>
              <Text style={styles.titleText}>New Tweet</Text>
              <TextInput
                onChangeText={text => setBody({ ...body, content: text })}
                placeholder="What's happening?"
                placeholderTextColor="gray"
                style={styles.input}
                multiline={false}
                numberOfLines={3}
              />
            </View>
            <View style={styles.modalFooterContainer}>
              <FontAwesome name="globe" color="#1C9BF0" size={15} />
              <Text style={styles.modalFooterText}>Everyone can reply</Text>
            </View>
            <View style={styles.insertImgContainer}>
              <EvilIcons name={"image"} size={24} color="#1C9BF0" />
              <TextInput
                onChangeText={(text) => setBody({ ...body, image: text })}
                placeholder="Share an image (Optional)"
                placeholderTextColor="gray"
                style={styles.inputUrl}
                multiline={false}
                numberOfLines={1}
              />
              <SendButton text="Tweet" action={handleTweet} style={styles.button} />
            </View>
            {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "black",
    padding: 20,
    maxHeight: 550,
    minHeight: 300,
    width: "90%",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "gray",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 10,
  },
  bodyContainer: {
    marginBottom: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    borderRadius: 10,
    padding: 10,
    fontSize:18,
    color: "white",
  },
  modalFooterContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: "rgba(0, 153, 255, 0.4)",
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  titleText: {
    color: "white",
    marginBottom: 25,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  modalFooterText: {
    color: "#1C9BF0",
    marginLeft: 5,
  },
  insertImgContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    borderTopColor: "#ddd",
    borderTopWidth: 1,
  },
  inputUrl: {
    color: "white",
    flex: 1,
    height: 30,
    marginLeft: 10,
    fontSize:14,
  },
  button: {
    backgroundColor: "#1C9BF0",
    marginTop: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 50,
    marginBottom: 20,
    alignSelf: "flex-end",
  },
  error: {
    color: "red",
    marginBottom: 10,
    alignSelf: "center",
  },
});

export default React.memo(NewTweet);
