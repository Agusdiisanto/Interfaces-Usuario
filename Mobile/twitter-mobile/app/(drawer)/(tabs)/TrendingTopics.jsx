import React from "react";
import { View, StyleSheet} from "react-native";
import { useState, useEffect } from "react";
import Api from "../../../service/Api";
import Loader from "../../../Accessories/Loader"
import TweetList from "../../../components/TweetList";
import { useRouter } from 'expo-router';
const TrendingTopics = () => {

  const [tweets, setTweets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const getTrendingTopics = () => {
    setIsLoading(true);
    Api.trendingTopics()
    .then((response) => {
      if (response.data && response.data.result) {
        setTweets(response.data.result);
        setIsLoading(false);
      }
    })
    .catch((error) => {router.replace("/Mantenimiento");});
  };

  useEffect(() => {
    getTrendingTopics();
  }, []);

  return (
    <View style={styles.container}>
     {isLoading ? (
        <Loader />
      ) : (
        <TweetList tweets = {tweets}/>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignContent: "center",
  },
});

export default React.memo(TrendingTopics);