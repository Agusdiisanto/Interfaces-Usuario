import React from 'react'
import { useNavigate } from "react-router-dom";
import "./GoBack.css"

const GoBack = ({titulo, destino}) => {

    const navigate = useNavigate();

    const navigateHome = () => {
        navigate(destino);
    }
  
  return (

    <div className='goBack-page'>
        <i className="fa fa-arrow-left" onClick={navigateHome}></i>
        <h1>{titulo}</h1>
    </div>
  )
}

export default GoBack