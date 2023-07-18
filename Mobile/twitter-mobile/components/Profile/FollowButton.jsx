import React, { useState, useContext } from "react";
import {Text,View,StyleSheet,TouchableOpacity} from "react-native";
// Componentes 
import Api from "../../service/Api";
import AuthContext from "../../context/AuthContext";

const FollowButton = ({user,setUser}) => {

  const {loggedUser, setLoggedUser} = useContext(AuthContext);

  const beingFollowed = () =>
    loggedUser.followings.map((u) => u.id).includes(user.id);

  const [followed, setFollowed] = useState(beingFollowed);

  const toggle = followed ? "Unfollow" : "Follow";

  const follow = (id) => {
    Api.follow(id).then((response) => {
      setFollowed(!followed);
      setLoggedUser(response.data);
      if (followed) {
        setUser(
          {
            ...user,
            followers: user.followers.filter( u => u.id !== loggedUser.id )
          }
        )
      }else{
        setUser(
          {
            ...user,
            followers: user.followers.concat(loggedUser)
          }
        )
      }
    });

  }; 

  return (
    <View>
    {
        loggedUser.id != user.id && (
          <TouchableOpacity style={styles.followButton} onPress={() => follow(user.id)}>
            <Text style={styles.followButtonText}>{toggle}</Text>
          </TouchableOpacity>
        )
    }
    </View>
  )
}

const styles = StyleSheet.create({
    followButton: {
      backgroundColor: "#1C98F0",
      borderRadius: 15,
      paddingVertical: 2,
      paddingHorizontal: 10,
      marginTop: 10,
      marginRight: 20,
      alignSelf: "flex-end",
    },
    followButtonText: {
      color: "white",
      fontWeight: "bold",
      fontSize: 20,
      textAlign: "center",
    },
});

export default FollowButton