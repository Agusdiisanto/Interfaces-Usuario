import React from "react";
import { useState, useEffect, useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import Api from "../../../services/Api";
import UsersResult from "../MainContent/Profile/UsersResult";
import "./WhoToFollow.css";

const WhoToFollow = () => {
  const {loggedUser} = useContext(AuthContext)
  const [users, setUsers] = useState([]);

  const getUserToFollow = () => {
    Api.usersToFollow()
      .then((response) => {
        setUsers(response.data.result);
      })
  };
  
  useEffect(() => {
    getUserToFollow();
  }, [loggedUser]); 

  return <UsersResult users={users}/>;
};

export default WhoToFollow;
