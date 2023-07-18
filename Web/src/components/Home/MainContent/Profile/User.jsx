import React, { useContext } from "react";
import "./User.css";
import AuthContext from "../../../../context/AuthContext";
import ButtonFollow from "../Profile/Helper/ButtonFollow";

const User = ({ user }) => {
  const { id, username, image } = user;
  const { loggedUser } = useContext(AuthContext);

  return (
    <div className="user-container">
      <div className="user">
        <img className="profile-img" src={image} alt="" />
        <p>@{username}</p>
      </div>
      {id !== loggedUser.id && <ButtonFollow userId={id} />}
    </div>
  );
};

export default User;
