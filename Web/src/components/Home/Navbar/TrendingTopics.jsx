import React from "react";
import { useState, useEffect } from "react";
import Api from "../../../services/Api";
import TweetsResult from "../MainContent/Tweets/TweetsResult";
import GoBack from "../../Accesorios/GoBack";
import Loader from "../../Accesorios/Loader";

const TrendingTopics = () => {
  const [tweets, setTweets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getTrendingTopics = () => {
    setIsLoading(true);
    Api.trendingTopics()
      .then((response) => {
        setTweets(response.data.result);
        setIsLoading(false);
      })
  };

  useEffect(() => {
    getTrendingTopics();
  }, []);

  return (
    <div>
      {isLoading && <Loader />}
      {!isLoading && (
        <>
          <GoBack titulo="Trending Topics" destino="/Home" />
          <TweetsResult tweets={tweets} />
        </>
      )}
    </div>
  );
};

export default TrendingTopics;
