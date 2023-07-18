import React from "react";
import Api from "../../../../services/Api";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useState, useRef } from "react";
import EmojiPicker from "emoji-picker-react";
import "./ModalRetweet.css";

const ModalRetweet = ({ tweetId, usuario, setShowModalRetweet }) => {
  const textareaRef = useRef(null);
  const navigate = useNavigate();
  const [loggedUser] = useOutletContext();
  const [body, setBody] = useState({ content: "", image: "" });
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;

    setBody({ content: event.target.value });
  };

  const retweet = () => {
    Api.retweet(tweetId, body)
      .then((response) => {
        const newTweet = response.data.reTweet.at(-1);
        navigate(`/home/tweet/${newTweet.id}`);
      })
      .catch((error) => setErrorMessage(error.message));
  };

  const closeModal = () => {
    setShowModalRetweet(false);
  };

  const handleEmojiSelect = ({ emoji }, event) => {
    textareaRef.current.value += emoji;
    setBody({ content: body.content + emoji });
  };

  const handleSmileClick = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  return (
    <div className="modal-retweet-overlay">
      <div className="modal-retweet">
        <i className="fa fa-times icon" onClick={closeModal}></i>
        <div class="retweet-tweet-container">
          <header className="header-retweet">
            <img class="profile-img" src={loggedUser.image} alt="" />
            <p class="tweet__sign tweet__sign--bold">@{loggedUser.username}</p>
          </header>
          <textarea
            id="content"
            ref={textareaRef}
            type="text"
            rows="4"
            placeholder={`Retweet the user @${usuario}`}
            onChange={handleChange}
          ></textarea>
          {errorMessage && <h2 className="error-mensaje">{errorMessage}</h2>}
          <footer className="retweet-footer">
            <div className="retweet-icons">
              <i className="fas fa-smile" onClick={handleSmileClick} title= {showEmojiPicker ? "Cerrar" : "Abrir"}></i>
            </div>
            <button onClick={retweet}>Retweet</button>
          </footer>
          {showEmojiPicker && (
            <EmojiPicker onEmojiClick={handleEmojiSelect} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalRetweet;
