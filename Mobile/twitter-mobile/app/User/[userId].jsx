import { useSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import Api from "../../service/Api";
import ProfileHeader from "../../components/Profile/ProfileHeader";
import FollowButton from "../../components/Profile/FollowButton";
import TweetList from "../../components/TweetList";
import { useIsFocused } from "@react-navigation/native";
import Loader from "../../Accessories/Loader";
import { useRouter } from 'expo-router';

const UserPage = () => {
  const { userId } = useSearchParams();
  const [user, setUser] = useState(null);
  const [tweets, setTweets] = useState([]);
  const [render, setRender] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const isFocused = useIsFocused();
  const router = useRouter();


  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await Api.getUser(userId);
        setUser(response.data);
        setTweets(response.data.tweets);
        setRender(true);
      } catch (error) {
        router.replace("/Mantenimiento")
      } finally {
        setIsLoading(false);
      }
    };

    if (isFocused) {
      fetchData();
    }
  }, [userId, isFocused]);

  if (!user) {
    return (
      <View style={styles.container}>
        <Loader />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isLoading && isFocused && <Loader />}
      <ProfileHeader user={user} />
      <FollowButton user={user} setUser={setUser} />
      <View style={styles.separator} />
      <TweetList tweets={tweets} setRender={setRender} render={render} />
      {tweets.length === 0 && (
        <Text style={styles.text}>No se han encontrado resultados</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    height: "100%",
  },
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
  separator: {
    width: "100%",
    height: 1,
    backgroundColor: "#333",
    marginVertical: 20,
  },
  text: {
    color: "white",
    fontSize: 20,
    opacity: 0.5,
    justifyContent: "center",
    padding: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 25,
  },
});

export default UserPage;
