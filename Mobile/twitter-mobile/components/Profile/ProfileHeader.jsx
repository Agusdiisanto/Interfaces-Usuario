import React from 'react'
import {Text,View,StyleSheet,TouchableOpacity,Image} from "react-native";

const ProfileHeader = ({user}) => {
  return (
    <View> 
        <Image
        source={{ uri: user.backgroundImage }}
        style={styles.userBackGround}
        />
        <View style={styles.userImageContainer}>
            <Image source={{ uri: user.image }} style={styles.userImage} />
        </View>
        <Text style={styles.userName}>{user.username}</Text>
        <View style={styles.followContainer}>
            <TouchableOpacity style={styles.followTouchable}>
                <Text style={styles.amountColor}>{user.followings.length}</Text>
                <Text style={styles.containerText}>Followings</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.followTouchable}>
                <Text style={styles.amountColor}>{user.followers.length}</Text>
                <Text style={styles.containerText}>Followers</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "black",
      height: "100%",
    },
    userBackGround: {
      width: "100%",
      height: 130,
    },
    userImage: {
      width: 75,
      height: 75,
      borderRadius: 50,
      borderWidth: 4,
      borderColor: "black",
      backgroundColor: "#222",
    },
    userImageContainer: {
      marginTop: -35,
      marginLeft: 20,
      justifyContent: "flex-start",
    },
    userName: {
      color: "white",
      fontSize: 20,
      fontWeight: "bold",
      marginTop: 5,
      marginLeft: 25,
    },
    followContainer: {
      flexDirection: "row",
      marginBottom: 2,
      marginTop: 7,
      marginLeft: 25,
      justifyContent: "flex-start",
      gap: 25,
    },
    followTouchable: {
      flexDirection: "row",
      gap: 5,
    },
    containerText: {
      fontSize: 15,
      color: "gray",
    },
    amountColor:{
      color: "white",
      fontSize: 15, 
      fontWeight: 700,
    },
  });

export default ProfileHeader