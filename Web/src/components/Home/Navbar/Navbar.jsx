import { useContext } from "react";
import navegacionFoto from "./Images/navegacion-foto.png";
import NavItem from "./Nav-Item/NavItem";
import NavUser from "./Nav-User/NavUser";
import "./Navbar.css";
import AuthContext from "../../../context/AuthContext";

const Navbar = () => {

  const {logout} = useContext(AuthContext)

  return (
    <>
      <div className="nav">
        <img
          src={navegacionFoto}
          alt="fotoNavegacion"
          className="nav-img"
        />
        <NavItem text="Home"            icon="fas fa-home"        linkTo="" weight="bold"/>
        <NavItem text="Explore"         icon="fa  fa-hashtag"     linkTo="search" />
        <NavItem text="Trending Topics" icon="fa  fa-users"       linkTo="trendingTopics" />
        <NavItem text="Bookmarks"       icon="fa  fa-bookmark"    linkTo="commingSoon" />
        <NavItem text="Twitter Blue"    icon="fa  fa-reply"       linkTo="commingSoon" />
        <NavItem text="Profile"         icon="fa  fa-user"        linkTo="profile" />
        <NavItem text="Log Out"         icon="fas fa-sign-in-alt" logout= {logout}/>
        <NavUser/>
      </div>
    </>
  );
};

export default Navbar;
