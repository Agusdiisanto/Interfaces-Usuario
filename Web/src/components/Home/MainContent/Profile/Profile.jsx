import React from "react";
import { useState, useEffect } from "react";
import "./Profile.css";
import Api from "../../../../services/Api";
import { Outlet, useNavigate, useOutletContext, useParams } from "react-router-dom";
import ButtonFollow from "../Profile/Helper/ButtonFollow";

function Profile() {

  const { id } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate()
  const [foreignUser, setForeignUser] = useState(false);
  const [loggedUser, setLoggedUser] = useOutletContext();
 

  if (id === loggedUser.id) {
    navigate("/home/profile")
  }


  useEffect(() => {
    if (id) {
      Api.getUser(id)
        .then((response) => {
          setUser(response.data);
          setForeignUser(true);
        })
        .catch((error) => {
          navigate("/*")
        });

    } else {
      setUser(loggedUser)
      setForeignUser(false);
    }
  }, [id, loggedUser]);

  if (!user) {
    return (
      <div className="espera-carga">
        <div className="cargando"></div>
      </div>
    );
  }

  const handleTweetsClick = () => {
    navigate("")
  };

  const handleFollowingClick = () => {
    navigate("followings")
  };

  const handleFollowersClick = () => {
    navigate("followers")
  };

  

  return (
    <div className="profile-container">
      <div className="bg-container">
        <img src={user.backgroundImage} className="bg-image" alt="bg image" />
      </div>
      <img src={user.image} className="profile-image" alt="profile image" />
      <div className="contenedor-usuario">
        <h1> {user.username} </h1>
        <h4> @{user.username} </h4>
      </div>
      <div className="contenedor-seguidores">
        <h4>
          <span>{user.followers.length}</span>Followers
        </h4>
        <h4>
          <span>{user.followings.length}</span>Following
        </h4>
        {foreignUser && (<ButtonFollow userId={id} profile = {true}/>)}
      </div>
      <div className="contenedor-perfil">
        <h3 tabIndex="0" onClick={handleFollowersClick}>
          Followers
        </h3>
        <h3 tabIndex="0" onClick={handleTweetsClick}>
          Tweets
        </h3>
        <h3 tabIndex="0" onClick={handleFollowingClick}>
          Following
        </h3>
      </div>
      <div>
        <Outlet context={[user, loggedUser, setLoggedUser]} />
      </div>
    </div>
  );
}


export default Profile;
