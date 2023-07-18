import TwitterLogo from "../../images/logo-blanco.png";
import "animate.css";
import "./Twitter.css"

const Twitter = () => {
  return (
    <div>
      <div className="nombre-sitio">
        <h1 className="animate__animated animate__fadeInRightBig">Twitter</h1>
        <img className="logo-twitter" src={TwitterLogo} alt="a" />
      </div>
    </div>
  );
};

export default Twitter;