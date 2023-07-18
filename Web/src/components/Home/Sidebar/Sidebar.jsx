import React from "react";
import "./Sidebar.css";
import WhoToFollow from "./WhoToFollow";
("./WhoToFollow/WhoToFollow");

const SideBar = () => {

  return (
    <div className="sidebar">
      <div className="who-to-follow">
        <h1 className="title">Who to follow</h1>
        <WhoToFollow/>
      </div>
    </div>
  );
};

export default SideBar;
