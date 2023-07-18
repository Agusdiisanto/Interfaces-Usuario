import React from 'react'
import { View, Text, Image, StyleSheet} from "react-native";


const ModalHeader = ({user, date, content, text}) => {
  return (
    <View style={styles.mainTweet}>
        <View style={styles.imgContainer}>
            <Image source={{ uri: user.image }} style={styles.profileImg} />
            <View style={styles.imgLine} />
        </View>
        <View style={styles.mainTweetContainer}>
            <View style={styles.header}>
            <Text style={styles.signBold}>@{user.username}</Text>
            <Text style={styles.signLight}>•</Text>
            <Text style={styles.signLight}>{date}</Text>
            </View>
            <Text style={styles.tweetContent}>{content}</Text>
            <View style={styles.mainTweetFooter}>
            <Text style={styles.signLight}>{text}</Text>
            <Text style={styles.footerUsername}>@{user.username}</Text>
            </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mainTweet: {
    alignItems: "flex-start",
    marginBottom: 20,
    flexDirection: "row",
    borderColor: "gray",
    borderWidth: 0.4,
    borderStyle: "solid",
    borderRadius: 16,
    padding: 10,
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
  imgLine: {
    borderStyle: "solid",
    borderWidth: 3,
    borderRadius:10,
    borderColor: "#333639",
    width: 2,
    marginTop: 5,
  },
  mainTweetContainer: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  signBold: {
    fontWeight: "bold",
    marginRight: 5,
    color: "white",
  },
  signLight: {
    color: "grey",
  },
  tweetContent: {
    color: "white",
    marginBottom: 10,
  },
  mainTweetFooter: {
    flexDirection: "row",
  },
  footerUsername: {
    marginLeft: 5,
    color: "#1a8cd9",
  },
});

export default ModalHeader