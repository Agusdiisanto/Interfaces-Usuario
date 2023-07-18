import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';


// Componentes 
import Tweet from './Tweet';

const TweetList = ({tweets, setRender}) => {

  const sortedTweets = [...tweets].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <View>
      <FlatList
        data={sortedTweets}
        renderItem={({ item }) => <Tweet data={item} setRender={setRender} />}
        keyExtractor={item => `${item.id}_${item.likes.length}_${item.reTweetAmount}_${item.repliesAmount}`} 
        maxToRenderPerBatch={5} 
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    paddingTop: "50%"
  },
  icon: {
    marginTop: 15,
    marginRight: 5, 
  },
  emptyText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default React.memo(TweetList);
