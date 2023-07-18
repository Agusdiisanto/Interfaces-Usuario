import React, { useState, useRef } from "react";
import {useNavigate, useOutletContext } from "react-router-dom";
import Api from "../../../../services/Api";
import moment from "moment";
import EmojiPicker from "emoji-picker-react";
import "./ModalReply.css";


const ModalReply = ({ tweet, closeModal, date }) => {
  const textareaRef = useRef(null);
  const navigate = useNavigate();

  const [loggedUser] = useOutletContext();
  const { id, content } = tweet;
  const [body, setBody] = useState({ content: "", image: "" });
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [imagen, setImagen] = useState(false);
  const [imageURL, setImageURL] = useState("");
  const [error, setError] = useState("")

 
  
  const reply = () => {
    Api.reply(id, body)
    .then((response) => {
      closeModal();
      navigate(`/home/tweet/${id}`);
    })
    .catch((error) => {
      setError(error.message)
    });
  };

  const handleChange = (event) => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
    setBody({ ...body, content: event.target.value });
  };

  const handleSmileClick = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiSelect = ({ emoji }, event) => {
    textareaRef.current.value += emoji;
    setBody({ content: body.content + emoji });
  };

  const handleImage = (event) => {
    const url = event.target.value
    setBody({ ...body, image: url });
    setImageURL(url)
  };
  
  const handleImageClick = () => {
    setImagen(true);
  };
  
  const closeModalUrl = () => {
    setImagen(false)
  }

  const formattedDate = moment(date).fromNow();


  return (
    <div>
      <div className="modal-reply-overlay"></div>
      <div className="animate__animated animate__backInLeft modal-reply">
        <div className="icon-container">
          <i className="fa fa-times icon" onClick={closeModal}></i>
        </div>
        <div className="main-tweet">
          <div className="img-container">
            <img className="profile-img" src={tweet.user.image} alt="" />
            <div className="img-line"></div>
          </div>
          <div className="main-tweet-container">
            <header>
              <p className="tweet__sign tweet__sign--bold">
                @{tweet.user.username}
              </p>
              <p className="tweet__sign tweet__sign--light">•</p>
              <p className="tweet__sign tweet__sign--light">{formattedDate}</p>
            </header>
            <p>{content}</p>
            <div className="main-tweet-footer">
              <p className="tweet__sign--light">Replying to</p>
              <p className="footer-username">@{tweet.user.username}</p>
            </div>
          </div>
        </div>
        <div className="reply-tweet-container">
          <div className="img-container">
            <img className="profile-img" src={loggedUser.image} alt="" />
          </div>
          <textarea
            id="content"
            ref={textareaRef}
            type="text"
            rows="4"
            placeholder="Tweet your reply!"
            onChange={handleChange}
          />
        </div>
        {
          error && (<h3 className="error-mensaje">{error}</h3>)
        }
        <div className="reply-footer-container">
          <div className="reply-tweet-icons">
            <i className="fa fa-image" onClick={handleImageClick}></i>
            <i className="fas fa-smile" onClick={handleSmileClick} title= {showEmojiPicker ? "Cerrar" : "Abrir"}></i>
            {showEmojiPicker && (
              <EmojiPicker onEmojiClick={handleEmojiSelect}/>
            )}
          </div>
          <button className="reply-button" onClick={reply}>
            Reply
          </button>
        </div>
      </div>
      {imagen && (
          <div className=" animate__animated animate__fadeIn modal-reply-url">
            <i className="fa fa-times icon" onClick={closeModalUrl}></i>
            <h1>URL:</h1>
            <input 
            type="url" 
            placeholder="Inserte un URL de imagen"
            onChange={handleImage}
            value={imageURL}
            />
          </div>
        )}
    </div>
  );
};

export default ModalReply;
