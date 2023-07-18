import React, { useRef } from "react";
import { useState } from "react";
import {useOutletContext, Link} from "react-router-dom";
import Api from "../../../services/Api";
import ImagenModal from "./ImagenModal"; 
import EmojiPicker from "emoji-picker-react";
import "./Twittear.css";

const Twittear = () => {
  const textareaRef = useRef(null);
  const [body, setBody] = useState({ content: "", image: "" });
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [twitteado, setTwitteado] = useState(null);
  const [imagenModal, setImagenModal] = useState(false);

  const [loggedUser, setLoggedUser] = useOutletContext();
  const [errorMessage, setErrorMessage] = useState("")
  
  const tweet = () => {
     Api.tweet(body)
       .then((response) => {
         textareaRef.current.value = "";
         setBody({ content: "", image: "" });
         setTwitteado(response.data.id);
         setErrorMessage("")
         setTimeout(() => {
          setTwitteado(false);
        }, 4000);
       })
       .catch((error) => setErrorMessage(error.message) );
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

  const handleEmojiSelect = ({ emoji }) => {
    textareaRef.current.value += emoji;
    setShowEmojiPicker(false);
    setBody({ content: body.content + emoji });
  };

  const handleImageClick = () => {
    setImagenModal(true);
  };
  
  const handleImageSubmit = (imageUrl) => {
    setBody({ ...body, image: imageUrl })
  };

  return (
    <div className="home">
      {
        imagenModal && (
          <ImagenModal setImagenModal = {setImagenModal} 
                       handleImageSubmit = {handleImageSubmit}
                       />
        )
      }
      <h1>Home</h1>
      <div className="twitter-box">
        <div>
          <img src={loggedUser.image} alt="" />
        </div>
        <div className="twittear">
          <textarea
            id="content"
            ref={textareaRef}
            type="text"
            rows="4"
            placeholder="What's happening?"
            onChange={handleChange}
          />
          <div className="informacion">
            <i className="fa fa-globe"></i>
            <p>Everyone can reply</p>
          </div>
          <div className="new-tweet-footer">
            <div className="new-tweet-icons">
              <i className="fa fa-image" onClick={handleImageClick}></i>
              <i className="fas fa-smile" onClick={handleSmileClick}></i>
              {showEmojiPicker && (
                <EmojiPicker onEmojiClick={handleEmojiSelect} />
              )}
            </div>
            <button className="button-twittear" onClick={tweet}>
              Tweet
            </button>
          </div>
          {errorMessage && (<h2 className="error-mensaje">{errorMessage}</h2>)}
          {!!twitteado && (
            <div className="animate__animated animate__bounceIn aviso">
              <h2>Tweeted successfully 
                <Link to = {`/home/tweet/${twitteado}`} className="click-here">click here</Link> to see the tweet
              </h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Twittear;
