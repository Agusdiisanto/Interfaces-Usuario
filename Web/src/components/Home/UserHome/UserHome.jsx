import React, { useEffect, useState } from "react";
import Api from "../../../services/Api";
import TweetsResult from "../MainContent/Tweets/TweetsResult";
import Twittear from "./Twittear";
import "./UserHome.css"
import Loader from "../../Accesorios/Loader";


const UserHome = () => {
  const [tweets, setTweets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [tweetsLoaded, setTweetsLoaded] = useState(false);

  const getFollowingTweets = () => {
    setIsLoading(true);
    Api.followingTweets()
        .then((response) => {
          setTweets(response.data.result);
          setTweetsLoaded(true);
          setIsLoading(false);
        })
  }

  useEffect(() => {
      getFollowingTweets();
  },[]);

  return (
    <div>
      {isLoading && (
        <Loader />
      )}
      {!isLoading && (
        <div>
          <Twittear />
          <TweetsResult tweets={tweets} />
        </div>
      )}
      {tweets.length === 0 && tweetsLoaded && (
        <div className="contenedor-noSigues">
          <h1>No tienes seguidos!</h1>
          <h3>Empiece a seguir para que se muestren los tweets</h3>
        </div>
      )}
    </div>
  );
};

export default UserHome;