import React from "react";
import Twitter from "./Login-Register/Twitter";
import Login from "./Login-Register/Login";
import Register from "./Login-Register/Register";
import "./LoginRegister.css"

const LoginRegister = () => {

  return (
    <div className="contenedor">
      <div>
        <Twitter />
      </div>
      <div className="register-login">
        <div>
          <h3>¿Ya tienes una cuenta?</h3>
          <p>Inicia session para entrar en la pagina</p>
          <Login />
        </div>
        <div>
          <h3>¿Aun no tienes una cuenta?</h3>
          <p>Registrate para que puedas iniciar session</p>
          <Register />
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;