import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Pressable} from "react-native";
import moment from "moment";
import { useRouter } from "expo-router";

const QuoteTweet = ({ quotedTweet }) => {
  const router = useRouter();
  const { username, userId, userImage, tweetID, tweetDate, tweetContent, tweetImage, } = quotedTweet;
  const formattedDate = moment(tweetDate).calendar(null, {
    sameDay: "[Hoy]",
    nextDay: "[Mañana]",
    nextWeek: "D MMMM",
    lastDay: "[Ayer]",
    lastWeek: "D MMMM",
    sameElse: "D MMMM",
  });
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.push(`User/${userId}`)}>
        <Image src={userImage} style={styles.userImage} />
      </TouchableOpacity>

      <View style={styles.mainContainer}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => router.push(`User/${userId}`)}>
            <Text style={styles.name}>{username}</Text>
          </TouchableOpacity>
          <Text style={styles.username}> @{username}</Text>
          <Text style={styles.username}> · {formattedDate}</Text>
        </View>

        <Pressable
          style={styles.content}
          onPress={() => router.push(`Tweet/${tweetID}`)}
        >
          <Text style={styles.textContent}>{tweetContent}</Text>
          {tweetImage && <Image src={tweetImage} style={styles.image} />}
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "black",
    borderWidth: 1.5,
    borderColor: "#444",
    borderRadius: 10,
    marginBottom: 5,
    marginTop: 5,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  mainContainer: {
    marginLeft: 10,
    flex: 1,
  },
  content: {
    color: "grey",
    lineHeight: 20,
    marginTop: 5,
    paddingTop: 20,
  },
  image: {
    width: "100%",
    aspectRatio: 16 / 9,
    marginVertical: 10,
    borderRadius: 15,
  },
  footer: {
    flexDirection: "row",
    marginVertical: 5,
    justifyContent: "space-around",
  },
  iconButton: {
    padding: 2,
  },
  username: {
    color: "grey",
  },
  name: {
    color: "white",
    fontWeight: 700,
  },
  textContent: {
    color: "white",
    marginTop: -20,
  },
});

export default QuoteTweet;
