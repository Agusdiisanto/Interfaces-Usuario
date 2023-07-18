import React, { useState } from "react";
import Api from "../service/Api";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "expo-router";
import Modal from "../Accessories/Modal";
import SendButton from "../Accessories/SendButton";

const Login = () => {

  const router = useRouter();
  const [modal, setModal] = useState(false)
  const [mensaje, setMensaje] = useState("")
  const [errorMensaje, setErrorMensaje] = useState(null);
  

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    Api.login(data).then((response) => {
        Api.setToken(response.headers.authorization)
        router.replace("/Home")
    }).catch((error) => {
      if (error.message === "Cannot read property 'data' of undefined") {
        
        router.replace("/Mantenimiento");
      } else {
        
        setErrorMensaje(error.message);
        setMensaje("Hubo un error al iniciar sesión:");
        setModal(true);
      }
    });
    reset();
  }

  return (
    <View style={styles.container}>
       {
        modal && ( 
                    <Modal
                        visible ={modal}
                        mensaje = {mensaje}
                        errorMensaje = {errorMensaje}
                        onClose = {()=> setModal(false)}
                    />  
                  )           
      }
      <Text style={styles.title}>Login</Text>
      <View style={styles.inputContainer}>
        {errors.username && (
          <Text style={styles.errorText}>This is required</Text>
        )}
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="#888"
              underlineColorAndroid="transparent"
              onBlur={onBlur}
              autoCapitalize="none"
              onChangeText={(text) => onChange(text)}
              value={value}
            />
          )}
          name="username"
          rules={{ required: true }}
        />

        {errors.password && (
          <Text style={styles.errorText}>This is required</Text>
        )}
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#888"
              underlineColorAndroid="transparent"
              onBlur={onBlur}
              onChangeText={(text) => onChange(text)}
              value={value}
              secureTextEntry
            />
          )}
          name="password"
          rules={{ required: true }}
        />
      </View>
      <SendButton text = "Log IN" action = {handleSubmit(onSubmit)} style = {styles.button} />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
  },
  title: {
    color: "#00aaff",
    fontSize: 25,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    width: "100%",
  },
  input: {
    height: 40,
    backgroundColor: "transparent",
    borderBottomWidth: 1,
    borderBottomColor: "#00aaff",
    marginBottom: 20,
    width: "100%",
    color: "white",
    paddingHorizontal: 10,
  },
  errorText: {
    paddingLeft: 10,
    color: "red",
    fontWeight: 700,
    marginTop: 5,
    textAlign: "left",
  },
  button: {
    backgroundColor: "#00aaff",
    width: "60%",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 2,
  },
});