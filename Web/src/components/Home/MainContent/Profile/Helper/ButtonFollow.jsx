import React, { useContext, useState } from "react";
import Api from "../../../../../services/Api";
import AuthContext from "../../../../../context/AuthContext";

const ButtonFollow = ({ userId , profile = false}) => {
  const { loggedUser, setLoggedUser } = useContext(AuthContext);
  const isFollowed = loggedUser.followings.map((u) => u.id).includes(userId);
  const [followed, setFollowed] = useState(isFollowed);

  const follow = (id) => {
    setFollowed(!followed); 

    Api.follow(id)
      .then((response) => {
        setLoggedUser(response.data);
      })
      .catch((error) => {
        console.log("Error al realizar la acción de follow:", error);
        setFollowed(!followed); 
      });
  };

  return (
    <button className={profile ? "follow-button-profile" : "follow-button"} onClick={() => follow(userId)}>
      {followed ? "Unfollow" : "Follow"}
    </button>
  );
};

export default ButtonFollow;
