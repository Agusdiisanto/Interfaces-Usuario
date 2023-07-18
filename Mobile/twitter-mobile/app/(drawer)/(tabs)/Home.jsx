import React, { useContext, useEffect, useState} from 'react';
import { View, StyleSheet, Text} from 'react-native';

// Componentes
import NewTweet from '../../../components/Modal/NewTweet';
import AuthContext from '../../../context/AuthContext';
import Loader from '../../../Accessories/Loader';
import TweetList from '../../../components/TweetList';
import Api from '../../../service/Api';
import FloatingButton from '../../../Accessories/FloatingButton';
import { useRouter } from 'expo-router';
import { useIsFocused } from '@react-navigation/native';


const Home = () => {
  const router = useRouter();
  const [tweets, setTweets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { loggedUser, setLoggedUser } = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [render, setRender] = useState(true)
  const isFocused = useIsFocused();
  
  useEffect(() => {
    setIsLoading(true);
    if(isFocused && render){
      Api.followingTweets()
      .then((response) => {
        setTweets(response.data.result);
        setIsLoading(false);
      })
      .catch((error) => router.replace("/Mantenimiento"))
    }
  },[loggedUser, isFocused, render])

  useEffect(()=> {
    Api.loggedUser()
      .then((response) => {
        setLoggedUser(response.data)
      })
      .catch((error) => {
       router.replace("/Mantenimiento");
      })
  }, [])

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      {isLoading && <Loader />}
      <NewTweet visible={modalVisible} closeModal={() => setModalVisible(false)} />  
      <TweetList tweets={tweets} setRender={setRender} />
      <FloatingButton action={handleOpenModal} />
      {tweets.length === 0 && !isLoading && (
            <Text style={styles.text}>No se han encontrado resultados</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    height: '100%',
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

export default Home;
