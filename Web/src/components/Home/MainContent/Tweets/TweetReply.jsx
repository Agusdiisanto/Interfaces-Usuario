import React from "react";
import { Link } from "react-router-dom";
import "./tweet.css";
import moment from "moment";

const TweetReply = ({ parent, type }) => {
  const formattedDate = moment(parent.tweetDate.toString()).calendar(null, {
    sameDay: "[Hoy]",
    nextDay: "[Mañana]",
    nextWeek: "D MMMM",
    lastDay: "[Ayer]",
    lastWeek: "D MMMM",
    sameElse: "D MMMM",
  });

  const clase = type === "Reply to" ? "replies" : "retweet";

  return (
    <Link to={`/home/tweet/${parent.tweetID}`}>
      <div className="parent-tweet">
        <p className={clase}>{type}</p>
        <div className="parent-header">
          <img className="parent-user-img" src={parent.userImage} alt="" />
          <p className="tweet__sign tweet__sign--bold">{parent.username}</p>
          <p className="tweet__sign tweet__sign--light whidht">
            @{parent.username} • {formattedDate}
          </p>
        </div>
        <div className="parent-body">
          {parent.tweetImage && <img className="parent-body-img" src={parent.tweetImage} />}
          <p className="tweet__sign tweet__sign">{parent.tweetContent}</p>
        </div>
      </div>
    </Link>
  );
};

export default TweetReply;
