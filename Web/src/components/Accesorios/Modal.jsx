import React, { useContext } from 'react'
import {useNavigate } from "react-router-dom";
import 'animate.css';
import './Modal.css'

const Modal = ({mensaje, nombre, errorMensaje}) => {

  const navigate = useNavigate()
  const goToHome = () => navigate("Home") 

  return (
    <div className='modal'>
        {errorMensaje ? (
          <div>
            <h1 className='animate__animated animate__zoomInDown'>{mensaje}</h1>
            <h3>{errorMensaje}</h3>
            <div className='botones-modal'>
              <a href="http://localhost:5173/" className='volver'>Volver</a>
            </div>
          </div>
        ) : (
          <div>
            <h1 className='animate__animated animate__zoomInDown'>Bienvenido {nombre} a Twitter</h1>
            <div className='botones-modal'>
              <button onClick = {goToHome} >Aceptar</button>
            </div>
          </div>
        )}
    </div>    
  )
}

export default Modal
