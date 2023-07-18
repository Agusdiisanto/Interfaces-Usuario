import React, {useContext} from "react";
import { Link} from "react-router-dom";
import AuthContext from "../../../../context/AuthContext";
import "./NavUser.css";

const NavUser = () => {
  const {loggedUser, setLoggedUser} = useContext(AuthContext);

  {if(loggedUser){
    return (
      <div className="nav-user-container">
        <Link to={`profile`}>
          <div className="nav-user">
          <img className="profile-img" src={loggedUser.image} alt="" />
            <div className="nav-username">
              <p className="nav-username-bold">{loggedUser.username}</p>
              <p className="nav-username-light">@{loggedUser.username}</p>
            </div>
          </div>
        </Link>
      </div>
    );
  }}
};

export default NavUser;