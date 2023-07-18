import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Api from "../../services/Api";
import TweetsResult from "./MainContent/Tweets/TweetsResult";
import Searcher from "./Sidebar/Searcher/Searcher";
import Loader from "../Accesorios/Loader";

const Search = () => {
  const [searchParams] = useSearchParams();
  const [tweets, setTweets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState(searchParams.get("text"));

  const getResults = () => {
    setIsLoading(true);
    Api.search(query)
      .then((response) => {
        setTweets(response.data.result);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getResults();
  }, [query]);

  return (
    <div>
      {isLoading && <Loader />}
      <Searcher setQuery={setQuery} />
      {!isLoading && <TweetsResult tweets={tweets} />}
    </div>
  );
};

export default Search;
