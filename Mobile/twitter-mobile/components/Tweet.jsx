import React, { useContext, useState, useCallback } from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";
// Components
import Api from "../service/Api";
import IconButton from "../Accessories/IconButton";
import AuthContext from "../context/AuthContext";
// Services
import { FontAwesome } from "@expo/vector-icons";
import moment from "moment";
import QuoteTweet from "./QuoteTweet";
import ReplyAction from "./Modal/ReplyAction";
import RetweetAction from "./Modal/RetweetAction";
import ActionModal from "./Modal/ActionModal";

const Tweet = ({ data, setRender }) => {
  const tweet = data;
  const { id, content, date, repliesAmount, reTweetAmount, user } = tweet;
  const { type, image, parent } = tweet.type;
  const { loggedUser } = useContext(AuthContext);

  const [likes, setLikes] = useState(tweet.likes);
  const likedAlready = likes
    .map((l) => l.username)
    .includes(loggedUser.username);
  const [isLiked, setIsliked] = useState(likedAlready);

  const replies = tweet.replies ? tweet.replies.length : repliesAmount
  
  const retweets = tweet.reTweet ? tweet.reTweet.length : reTweetAmount
  
  const likesAmount = likes ? likes.length : likes;

  const router = useRouter();

  const tweetType = type === "reply" ? "Reply to" : "Retweet to";

  const [showActionModal, setShowActionModal] = useState(false);
  const [action, setAction] = useState({});

  const openReplyModal = () => {
    setAction(ReplyAction);
    setShowActionModal(true);
    setRender(false);
  };

  const openRetweetModal = () => {
    setAction(RetweetAction);
    setShowActionModal(true);
    setRender(false);
  };

  const closeActionModal = () => {
    setRender(true);
    setShowActionModal(false);
  };

  const formattedDate = useCallback(
    moment(date).calendar(null, {
      sameDay: "[Hoy]",
      nextDay: "[Mañana]",
      nextWeek: "D MMMM",
      lastDay: "[Ayer]",
      lastWeek: "D MMMM",
      sameElse: "D MMMM",
    }),
    [date]
  );

  const like = useCallback(
    (id) => {
      Api.like(id)
        .then((response) => {
          setLikes(response.data.likes);
          setIsliked(!isLiked);
        })
        .catch((error) => router.replace("/Mantenimiento"));
    },
    [isLiked]
  );

  return (
    <View style={styles.container}>
      {showActionModal && (
        <ActionModal
          tweet={tweet}
          action={action}
          closeModal={closeActionModal}
          date={formattedDate}
        />
      )}
      <TouchableOpacity onPress={() => router.push(`User/${user.id}`)}>
        <Image src={user.image} style={styles.userImage} />
      </TouchableOpacity>

      <View style={styles.mainContainer}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => router.push(`User/${user.id}`)}>
            <Text style={styles.name}>{user.username}</Text>
          </TouchableOpacity>
          <Text style={styles.username}> @{user.username}</Text>
          <Text style={styles.username}> · {formattedDate}</Text>
        </View>

        <Pressable
          style={styles.content}
          onPress={() => router.push(`Tweet/${id}`)}
        >
          <Text style={styles.textContent}>{content}</Text>
          {tweet.type.image && <Image src={image} style={styles.image} />}
        </Pressable>

        {parent && (
          <>
            <Text
              style={tweetType === "Reply to" ? styles.reply : styles.retweet}
            >
              {" "}
              {tweetType} {parent.username}
            </Text>
            <QuoteTweet quotedTweet={parent} />
          </>
        )}

        <View style={styles.footer}>
          <TouchableOpacity
            onPress={() => openReplyModal()}
            style={styles.iconButton}
            hitSlop={26}
          >
            <IconButton
              icon={<FontAwesome name="comment" size={20} color="grey" />}
              text={replies}
            />
          </TouchableOpacity>

          {loggedUser.id !== tweet.user.id && (
            <TouchableOpacity
              onPress={() => openRetweetModal()}
              style={styles.iconButton}
              hitSlop={26}
            >
              <IconButton
                icon={<FontAwesome name="retweet" size={20} color="grey" />}
                text={retweets}
              />
            </TouchableOpacity>
          )}

          <Pressable style={styles.iconButton} hitSlop={26}>
            <IconButton
              icon={
                <FontAwesome
                  name="heart"
                  size={20}
                  color={isLiked ? "red" : "gray"}
                />
              }
              text={likesAmount}
              action={() => like(id)}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "grey",
    backgroundColor: "black",
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderColor: "#666",
    borderWidth: 1,
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
  reply: {
    color: "rgba(0, 125, 228, 0.7)",
    fontWeight: 700,
  },
  retweet: {
    color: "rgba(1, 183, 123, 0.7)",
    fontWeight: 700,
  },
});

export default React.memo(Tweet);
