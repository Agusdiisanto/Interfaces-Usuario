import React from 'react';
import Tweet from './Tweet';
import "./tweet.css";
import { useOutletContext } from 'react-router-dom';

const TweetsResult = ({tweets: propTweets}) => {
  const [{ tweets: contextTweets }] = useOutletContext();
  const [username] = useOutletContext();

  const sortedTweets = propTweets && Array.isArray(propTweets)
    ? [...propTweets].sort((a, b) => new Date(b.date) - new Date(a.date))
    : [...contextTweets].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div>
      {sortedTweets.map(tweet => (
        <Tweet
          key={tweet.id}
          tweet={tweet}
          loggedUser={username ? username.username : ''}
        />
      ))}
    </div>
  );
};

export default TweetsResult;
