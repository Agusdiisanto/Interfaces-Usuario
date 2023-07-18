import { useRouter } from "expo-router";
import React from "react";
import moment from "moment";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const ReplyTweet = ({ data }) => {
  const tweet = data;
  const { id, content, date, user } = tweet;
  const { type, image, parent } = tweet.type;
  const router = useRouter();
  const formattedDate = moment(date).calendar(null, {
    sameDay: "[Hoy]",
    nextDay: "[Mañana]",
    nextWeek: "D MMMM",
    lastDay: "[Ayer]",
    lastWeek: "D MMMM",
    sameElse: "D MMMM",
  });

  return (
    <View style={type === "reply" ? styles.replyContainer : styles.container}>
      <TouchableOpacity onPress={() => router.push(`Tweet/${id}`)}>
        <Image src={user.image} style={styles.userImage} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push(`Tweet/${id}`)}>
        <View style={styles.mainContainer}>
          <View style={styles.header}>
            <Text style={styles.name}>{user.username}</Text>
            <Text style={styles.username}>@{user.username}</Text>
            <Text style={styles.date}>{formattedDate}</Text>
          </View>
          {parent && (
            <View style={styles.replyInfo}>
              <Text style={styles.replyText}>Replying to</Text>
              <Text style={styles.replyTextUser}>{parent.username}</Text>
            </View>
          )}
          <Text style={styles.content}>{content}</Text>
          {tweet.type.image && <Image src={image} style={styles.image} />}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "black",
    gap: 10,
  },
  replyContainer: {
    flexDirection: "row",
    paddingTop:0,
    paddingBottom:10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(0, 172, 238, 0.5)',
    backgroundColor: "black",
    gap: 10,
    marginBottom:20,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#555",
  },
  mainContainer: {
    gap: 5,
    flexDirection: "column",
    width: "95%",
  },
  header: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  name: {
    color: "white",
    fontWeight: "bold",
  },
  username: {
    color: "grey",
  },
  date: {
    color: "grey",
  },
  replyInfo: {
    flexDirection: "row",
    gap: 5,
  },
  replyText: {
    color: "grey",
  },
  replyTextUser: {
    color: "#00acee",
  },
  content: {
    color: "white",
    lineHeight: 20,
    overflow: "hidden",
    // width: "60%",
  },
  image: {
    width: "95%",
    aspectRatio: 16 / 9,
    borderRadius: 15,
  },
  replyContent: {
    color: "white",
    lineHeight: 20,
  },
});

export default ReplyTweet;
