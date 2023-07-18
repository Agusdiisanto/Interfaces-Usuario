import React, { useContext } from "react";
import Navbar from "./Navbar/Navbar";
import { Outlet } from "react-router-dom";
import SideBar from "../Home/Sidebar/Sidebar"
import AuthContext from "../../context/AuthContext";
import "./MainContent.css";

const MainContent = () => {
  
  const {loggedUser, setLoggedUser} = useContext(AuthContext);

  {if(loggedUser){
    return (
      <div className="home-elems-container">
        <Navbar/>
        <div className="mainContent">
          <Outlet context={[loggedUser, setLoggedUser]} />
        </div>
        <SideBar/>
      </div>
    );
  }}
  
};

export default MainContent;
