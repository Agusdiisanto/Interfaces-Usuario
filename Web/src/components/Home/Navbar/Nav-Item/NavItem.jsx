import { Link } from "react-router-dom";
import "./NavItem.css";
import "./TwitterBlue.css";

const NavItem = ({ text, icon, linkTo, weight, logout }) => {
  const navItemClass = weight === "bold" ? "nav-item nav-item-bold" : "nav-item";
  
  const handleClick = () => {
    logout()
  };

  return (
    <div className={navItemClass}>
      <i className={icon}></i>
      {logout ? (
        <>
          <div onClick={handleClick}>{text}</div> 
        </>
      ) : (
        <Link to={linkTo}>{text}</Link>
      )}
    </div>
  );
};

export default NavItem;
