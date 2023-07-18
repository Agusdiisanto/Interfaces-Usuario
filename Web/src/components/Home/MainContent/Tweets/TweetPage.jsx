import React, { useState, useEffect } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import Api from '../../../../services/Api';
import GoBack from '../../../Accesorios/GoBack';
import ImagenModal from '../../UserHome/ImagenModal';
import Tweet from './Tweet';
import './TweetPage.css';

const TweetPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tweet, setTweet] = useState(null);
  const [username] = useOutletContext();
  const [showReplies, setShowReplies] = useState(false);
  const [imagenModal, setImagenModal] = useState(false);
  const [comment, setComment] = useState({ content: '', image: '' });
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    Api.getTweet(id)
      .then((response) => {
        setTweet(response.data);
      })
      .catch(() => {
        navigate('/*');
      });
  }, [id, navigate]);

  const handleComment = (event) => {
    setComment({ ...comment, content: event.target.value });
  };

  const showComments = () => {
    setShowReplies(!showReplies);
  };

  const doReply = () => {
    Api.reply(tweet.id, comment)
      .then((response) => {
        setTweet(response.data);
        setComment({ content: '', image: '' });
        setErrorMessage('');
      })
      .catch((error) => setErrorMessage(error.message));
  };

  const handleImageClick = () => {
    setImagenModal(true);
  };

  const handleImageSubmit = (imageUrl) => {
    setComment({ ...comment, image: imageUrl })
  };

  if (tweet) {
    const sortedReplies = [...tweet.replies].sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
      <div>
        {imagenModal && (
          <ImagenModal
            setImagenModal={setImagenModal}
            handleImageSubmit={handleImageSubmit}
          />
        )}
        <GoBack titulo="Tweet" destino="/Home" />
        <div className="comentar-tweet">
          <Tweet tweet={tweet} loggedUser={username} handleReply={showComments} showReplyNotAnimation = {false} />
          <div className="reply-box-container">
            <img className='user-profile-img' src={username.image} alt="profile image" />
            <div className="reply-box">
              <input
                type="text"
                placeholder="Responder Tweet"
                value={comment.content}
                onChange={handleComment}
                />
              <div className="reply-box-footer">
                <i className="fa fa-image" onClick={handleImageClick}></i>
                <button className='comment-button' onClick={doReply}>Reply</button>
              </div>
              {errorMessage && <h2 className="error-mensaje">{errorMessage}</h2>}
            </div>
          </div>
          {sortedReplies.map((reply) => (
            <Tweet
              key={reply.id}
              tweet={reply}
              loggedUser={username}
              handleReply={showComments}
              showParent={false}
            />
          ))}
        </div>
      </div>
    );
  }

  return null;
};

export default TweetPage;
