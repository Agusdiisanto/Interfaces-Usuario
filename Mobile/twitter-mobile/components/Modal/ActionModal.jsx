import React, { useCallback, useContext, useState } from 'react'
import { useRouter } from 'expo-router';
import {View, Text, Image, TextInput,StyleSheet, Modal,KeyboardAvoidingView} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
// Componentes
import SendButton from "../../Accessories/SendButton";
import ModalClose from './HelpersModal/ModalClose';
import ModalHeader from './HelpersModal/ModalHeader';
import AuthContext from '../../context/AuthContext';

const ActionModal = ({tweet, action,closeModal, date}) => {

    const inputs = action.inputs;
    const { loggedUser } = useContext(AuthContext);
    const [ body, setBody] = useState({});
    const [error, setError] = useState("");
    const router = useRouter()

    const handleChange = (field, value) => {
        setBody((prevBody) => ({
          ...prevBody,
          [field]: value,
        }));
      };

    const execute = useCallback(() => {
        action.executeAction(tweet.id, body)
          .then((response) => {
            router.push(response);
            closeActionModal();
          })
          .catch(() => setError("Escriba un mensaje"))
            
    });
    
    const closeActionModal = useCallback(() => {
        closeModal();
    }, [closeModal])
    
    return (
        <Modal transparent animationType="fade" onRequestClose={closeActionModal}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.modalBackground}
          >
            <View style={styles.modalContainer}>
              <ModalClose action = {closeActionModal}/>
              <ModalHeader user= {tweet.user} date = {date} content = {tweet.content} text = {`${action.actionName} to`}/>
              <View style={styles.replyTweetContainer}>
                <View style={styles.imgContainer}>
                  <Image source={{ uri: loggedUser.image }} style={styles.profileImg} />
                </View>
                <View style={styles.mainTweetContainer}>
                    <TextInput
                        key={inputs[0].field}
                        value={body[inputs[0].field] || ''}
                        multiline={false}
                        style={styles.textInput}
                        placeholder={inputs[0].placeholder}
                        onChangeText={(value) => handleChange(inputs[0].field, value)}
                    />
                  <View style = {styles.line}></View>
                </View>
                </View>
              { inputs.length > 1 && 
                <View style={styles.replyImageContainer}>
                    <FontAwesome name="image" color="#00acee" size={20} />
                    <TextInput
                      style={styles.imageInput}
                      placeholder="Enter image URL"
                      onChangeText={(value) => handleChange(inputs[1].field, value)}
                    />
                </View>}
              
              <View style={styles.replyFooterContainer}>
                <SendButton text={action.actionName} action={execute} style={styles.replyButton} />
              </View>
              {error && <Text style={styles.errorMessage}>{error}</Text>}
            </View>
          </KeyboardAvoidingView>
      </Modal>
    );
}

export default ActionModal

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: "rgba(36, 45, 52, 0.7)",
        justifyContent: "center",
        alignItems: "center",
      },
      modalContainer: {
        backgroundColor: "black",
        borderRadius: 16,
        width: "90%",
        padding: 20,
      },
      line:{
        backgroundColor: "transparent",
        borderBottomColor: "rgb(255, 255, 255)",
        borderBottomWidth: 2,
        borderRadius: 5,
      },
      imgContainer: {
        width: 48,
        marginRight: 15,
        alignItems: "center",
      },
      profileImg: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: "rgb(20, 20, 20)",
      },
      imageInput:{
        marginLeft: 10,
        fontSize: 16,
        color: "white",
      },
      mainTweetContainer: {
        flex: 1,
      },
      replyTweetContainer: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 20,
      },
      replyImageContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
        marginLeft: 55,
      },
      textInput: {
        flex: 1,
        marginTop: 15,
        color: "#e7e9ea",
        fontSize: 20,
        marginBottom: 5,
        borderWidth: 0,
      },
      replyFooterContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
      },
      replyButton: {
        height: 36,
        width: 94,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 0,
        borderRadius: 20,
        backgroundColor: "rgb(0, 170, 255)",
        color: "rgb(255, 255, 255)",
        fontSize: 15,
        marginRight: 5,
      },
      errorMessage: {
        color: "red",
        marginBottom: 10,
      },
})