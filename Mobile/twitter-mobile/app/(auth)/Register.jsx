import React, {useState} from "react";
import {View,Text,StyleSheet,TextInput} from "react-native";
import { useForm, Controller } from "react-hook-form";
import Api from "../../service/Api";
import Modal from "../../Accessories/Modal";
import SendButton from "../../Accessories/SendButton";
import { useRouter } from "expo-router";

const Register = () => {

  const router = useRouter();
  const [modal, setModal] = useState(false)
  const [mensaje, setMensaje] = useState("")
  const [errorMensaje, setErrorMensaje] = useState(null);


  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();


  const onSubmit = (data) => {
    Api.register(data)
      .then((response) => {
        Api.setToken(response.headers.authorization);
        router.replace("/Home")
      })
      .catch((error) => {
        if (error.message === "Cannot read property 'data' of undefined") {
          router.replace("/Mantenimiento");
        } else {
          setErrorMensaje(error.message);
          setMensaje("Hubo un error al Registrarse:");
          setModal(true);
        }
      });
    reset();
  };


  return (
    <View style={styles.container}>
       {
        modal && ( 
                    <Modal
                        visible ={modal}
                        mensaje = {mensaje}
                        errorMensaje = {errorMensaje}
                        onClose = {() => setModal(false)}
                    />  
                  )           
      }
      <View style={styles.inputContainer}>
        <View style={styles.fieldContainer}>
          {errors.username && (
            <Text style={styles.errorText}>Add the username</Text>
          )}
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor="#888"
                onBlur={onBlur}
                onChangeText={(text) => onChange(text)}
                value={value}
              />
            )}
            name="username"
            rules={{ required: true }}
          />
        </View>

        <View style={styles.fieldContainer}>
          {errors.email && <Text style={styles.errorText}>Add the email</Text>}
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#888"
                onBlur={onBlur}
                onChangeText={(text) => onChange(text)}
                value={value}
              />
            )}
            name="email"
            rules={{ required: true }}
          />
        </View>

        <View style={styles.fieldContainer}>
          {errors.password && (
            <Text style={styles.errorText}>Add the password</Text>
          )}
          {errors.password?.type === "minLength" && (
            <Text style={styles.errorText}>It's not secure enough</Text>
          )}
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#888"
                onBlur={onBlur}
                onChangeText={(text) => onChange(text)}
                value={value}
                secureTextEntry
              />
            )}
            name="password"
            rules={{ required: true, minLength: 10 }}
          />
        </View>

        <View style={styles.fieldContainer}>
          {errors.image && <Text style={styles.errorText}>Add an image</Text>}
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Image Profile URL"
                placeholderTextColor="#888"
                onBlur={onBlur}
                onChangeText={(text) => onChange(text)}
                value={value}
              />
            )}
            name="image"
            rules={{ required: true }}
          />
        </View>
        <View style={styles.fieldContainer}>
          {errors.backgroundImage && (
            <Text style={styles.errorText}>Add a cover image</Text>
          )}
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Cover Image URL"
                placeholderTextColor="#888"
                onBlur={onBlur}
                onChangeText={(text) => onChange(text)}
                value={value}
              />
            )}
            name="backgroundImage"
            rules={{ required: true }}
          />
        </View>
      </View>
      <SendButton text = "Register" action = {handleSubmit(onSubmit)} style = {styles.button}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    backgroundColor: "#000",
    width: "100%",
    paddingBottom: "30%",
  },
  inputContainer: {
    width: "80%",
  },
  fieldContainer: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    backgroundColor: "transparent",
    borderBottomWidth: 1,
    borderBottomColor: "#00aaff",
    color: "#fff",
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#00aaff",
    width: "50%",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  errorText: {
    color: "red",
    textAlign: "left",
  },
});

export default Register
//export default React.memo(Register);