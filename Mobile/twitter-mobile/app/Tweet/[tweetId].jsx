import {useSearchParams} from 'expo-router';
import React, { useEffect, useState } from 'react'
import {ScrollView, StyleSheet, View} from 'react-native';
//Componentes
import Api from '../../service/Api';
import Tweet from '../../components/Tweet';
import ReplyTweet from '../../components/ReplyTweet';
import { useIsFocused } from '@react-navigation/native';
import { useRouter } from 'expo-router';

const TweetPage = () => {
    const { tweetId } = useSearchParams();
    const [tweet, setTweet] = useState(null);
    const [render, setRender] = useState(true);
    const isFocused = useIsFocused();
    const router = useRouter();

    useEffect(() => {
      Api.getTweet(tweetId)
        .then((response) => {
          setTweet(response.data);
        })
        .catch((error) => {router.replace("/Mantenimiento")});
    }, [render, isFocused]);

    if (tweet) {
      const sortedReplies = [...tweet.replies].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );

      return (
        <ScrollView style={styles.container}>
          <View style={styles.tweetContainer}>
            <Tweet data={tweet} setTweet={setTweet} setRender={setRender}/>
          </View>
          <View style={styles.repliesContainer}>
            {sortedReplies.map((item) => (
              <ReplyTweet key={item.id} data={item} />
            ))}
          </View>
        </ScrollView>
      );
    }
    return null;
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "black",
      paddingHorizontal: 10,
    },
    tweetContainer: {
      padding: 1,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: "grey",
      marginBottom: 20,
      marginTop:20,
    },
    repliesContainer: {
      backgroundColor: "black",
      borderRadius: 10,
      padding: 10,
    },
    repliesTitle: {
      color: "white",
      fontWeight: "bold",
      fontSize: 18,
      marginBottom: 5,
    },
  });
  
  export default TweetPage;
  