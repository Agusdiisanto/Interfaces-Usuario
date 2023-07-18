import Api from "../../../../services/Api";
import { useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import TweetReply from "./TweetReply";
import ModalRetweet from "./ModalRetweet";
import Stats from "./Stats";
import "./tweet.css";
import ModalReply from "./ModalReply";

const Tweet = ({ tweet, loggedUser, showParent = true , showReplyNotAnimation = true}) => {
  const { id, content, date, repliesAmount, reTweetAmount, user } = tweet;
  const { tweetType, image } = tweet.type;

  const likedAlready = tweet.likes
    .map((l) => l.username)
    .includes(loggedUser.username);

  const [likes, setLikes] = useState(tweet.likes);
  const [isLiked, setIsliked] = useState(likedAlready);

  const replies = tweet.replies ? tweet.replies.length : repliesAmount;
  const retweets = tweet.reTweet ? tweet.reTweet.length : reTweetAmount;

  const parent = tweet.type.parent;
  const type = tweet.type.type == "reply" ? "Reply to" : "Retweet to";

  const [showModalRetweet, setShowModalRetweet] = useState(false);
  const [showModalReply, setShowModalReply] = useState(false)

  const like = (id) => {
    Api.like(id)
      .then((response) => {
        setIsliked(!isLiked), setLikes(response.data.likes);
      })
  };

  const handleRetweet = () => {
    setShowModalRetweet(!showModalRetweet);
  };

  const handleReply = () => {
    setShowModalReply(!showModalReply)
  }

  const formattedDate = moment(date).calendar(null, {
    sameDay: "[Hoy]",
    nextDay: "[Mañana]",
    nextWeek: "D MMMM",
    lastDay: "[Ayer]",
    lastWeek: "D MMMM",
    sameElse: "D MMMM",
  });

  return (
    <div> 
      {showModalReply && showReplyNotAnimation && 
        <ModalReply tweet = {tweet} closeModal={handleReply}/>
      }
      {showModalRetweet && 
        <ModalRetweet tweetId = {id} usuario={tweet.user.username} setShowModalRetweet={setShowModalRetweet}/>
      }
      <Link to={`/home/tweet/${tweet.id}`}>
        <div className="tweet">
          <div className="img-container">
            <img className="profile-img" src={tweet.user.image} alt="" />
          </div>
          <div className="tweet-container">
            <div className="header-container">
              <header className="tweet__header">
                <Link
                  className="tweet__sign tweet__sign--bold"
                  onClick={(e) => {e.stopPropagation();}}
                  to={`/home/profile/${tweet.user.id}`}
                >
                  @{tweet.user.username}
                </Link>
                <p className="tweet__sign--light">• {formattedDate}</p>
              </header>
              <p>{content}</p>
            </div>
            <section className="tweet__body">
              {image && <img className="tweet__img" src={image} alt="img" />}
            </section>
            {parent && showParent && <TweetReply parent={parent} type={type} />}
            <footer className="tweet__footer" onClick={(e) => e.preventDefault()}>
              <Stats clase = {"stats_reply"} animation = {showReplyNotAnimation} icon={`fa fa-comment ${showModalRetweet ? "retweet" : ""}`} stat={replies} action={handleReply}></Stats>
              {
                user.id !== loggedUser.id && (
                  <Stats clase = {"stats_retweet"} icon={`fa fa-retweet ${showModalRetweet ? "retweet" : ""}`} stat={retweets} action={handleRetweet}></Stats>
                )
              }
              <Stats clase = {"stats_like"} icon={`fas fa-heart ${isLiked ? "tweet__liked" : ""}`} stat={likes.length} action={() => like(id)}></Stats>
            </footer>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Tweet;
