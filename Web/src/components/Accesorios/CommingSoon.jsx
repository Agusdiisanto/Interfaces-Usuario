import React from 'react'
import { useNavigate } from "react-router-dom";
import GoBack from './GoBack';
import "./CommingSoon.css"

const CommingSoon = () => {

  return (
    <div>
        <GoBack titulo="Home" destino="/Home" />
        <div className='comming-soon'>
        <h1>Comming Soon...</h1>
        <p>We are designing these new implementations</p>
        </div>
    </div>
  )
}

export default CommingSoon