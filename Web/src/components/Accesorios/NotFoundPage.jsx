import "./NotFoundPage.css"
import { useNavigate } from "react-router-dom";


function NotFoundPage() {
  
  const navigate = useNavigate();

  const navigateHome = () => {
    navigate("/home");
  }

  return (
      <div className="not-found-page">
          <h1>404</h1>
          <p>Oops! Página no encontrada.</p>
          <button onClick={navigateHome}>Volver al inicio</button>
      </div>
  );
}

export default NotFoundPage;