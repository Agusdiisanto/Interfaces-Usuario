import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text} from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import Api from "../../../service/Api";
import Searcher from "../../../components/Searcher";
import TweetList from "../../../components/TweetList";
import Loader from "../../../Accessories/Loader";

const Search = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [tweets, setTweets] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getResults = () => {
    setIsLoading(true);
    Api.search(query).then((response) => {
      setTweets(response.data.result);
    }).finally(() => {
    setIsLoading(false);
    });
  };

  useEffect(() => {
    if (isFocused && query !== "") {
      getResults();
    }
  }, [isFocused]);

  const handleSearch = () => {
    navigation.setParams({ text: query });
    setTweets([]); 
    getResults();
  };

  return (
    <View style={styles.container}>
      <Searcher value={query} onChangeText={setQuery} onSearch={handleSearch} /> 
      <TweetList tweets={tweets} />
      {isLoading && <Loader />}
      {tweets.length === 0 && !isLoading && (
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
  text: {
    color: "white",
    fontSize: 20,
    opacity: 0.5,
    justifyContent: 'center',
    padding: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 25,
  },
});

export default React.memo(Search);