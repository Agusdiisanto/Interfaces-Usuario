import { Tabs } from "expo-router";
import {View,Text, StyleSheet,Image} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useContext } from "react";
import AuthContext from "../../../context/AuthContext"
import { useRouter } from 'expo-router';
import { TouchableOpacity } from "react-native-gesture-handler";

const UserHeader = () => {
  const {loggedUser} = useContext(AuthContext)
  const router = useRouter();

  return (
    <View style={styles.userHeaderContainer}>
      {
        loggedUser && <TouchableOpacity style = {styles.header} onPress={() => router.push(`User/${loggedUser.id}`)}>
                <Image source={{ uri: loggedUser.image }} style={styles.userPhoto} />  
                <Text style={styles.userName}>{loggedUser.username}</Text>
                </TouchableOpacity>
      }
      
    </View>
  );
};


export default function RootLayoutNac() {
  return (
      <Tabs screenOptions=
        {{ 
          tabBarShowLabel: false,
          headerTitleAlign: "left",
          headerTitleStyle: styles.headerTitle,
          headerRight: () => <UserHeader/>
        }}
      >
      <Tabs.Screen
        name="Home"
        options={{
          headerStyle: styles.headerStyle,
          tabBarIcon: () => (
            <FontAwesome name="home" size={30} color="#00acee" />
          ),
        }}
      />
      <Tabs.Screen
        name="Search"
        options={{
          headerStyle: styles.headerStyle,
          tabBarIcon: () => (
            <FontAwesome name="search" size={30} color="#00acee" />
          ),
        }}
      />
      <Tabs.Screen
        name="TrendingTopics"
        options={{
          headerStyle: styles.headerStyle,
          tabBarIcon: () => (
            <FontAwesome name="hashtag" size={30} color="#00acee" />
          ),
        }}
      />
      </Tabs>
    
  );
}


const styles = StyleSheet.create({
  header:{
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  headerStyle: {
    backgroundColor: "black",
  },
  headerTitle: {
    color: "white",
    fontFamily: "System",
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 10, // Espacio entre el título y los iconos de la pestaña
  },
  userHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10, // Espacio a la derecha para el componente UserHeader
  },
  userPhoto: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
