import React, { useContext } from 'react'
import {useForm } from 'react-hook-form'
import {useState } from 'react'
import Mensaje from './Mensaje'
import Modal from '../Accesorios/Modal'
import Api from '../../services/Api'
import "./Login.css"
import { useNavigate } from 'react-router-dom'

const Login = () => {

    
    const {register,formState:{errors},handleSubmit,reset} = useForm()
    const [modal, setModal] = useState(false)
    const navigate = useNavigate()
    
    const [username, setUsername] = useState("")
    const [mensaje, setMensaje] = useState("")
    const [errorMensaje, setErrorMensaje] = useState(null);


    const onSubmit = (data) => {
      Api.login(data).then((response) => {
          Api.setToken(response.headers.authorization)
          setUsername(data.username)
          navigate("home")
      }).catch((error) => {
          setErrorMensaje(error.message);
          setMensaje("Hubo un error al iniciar sesión:")
          setModal(true);
      });
      reset();
    }
  
    return (
    <div>
    {
      modal && ( 
            <Modal
                mensaje = {mensaje}
                nombre = {username}
                errorMensaje = {errorMensaje}
            />  
            )  
    }

    <form onSubmit={handleSubmit(onSubmit)} className='formulario'>
        <h2 className= "titulo-login">Login</h2>
        <div className='campo'>
                <div className='label-error'>
                    <label htmlFor="Nombre">Usuario</label>
                    {errors.nombre?.type === 'required' && <Mensaje tipo="error">Añade el usuario</Mensaje>}
                </div>
                <input type="text" placeholder='Coloque un Usuario' {...register('username', {
                    required: true 
                })}/>
            </div>
            <div className='campo'>
            <div className="label-error">
                    <label htmlFor="password">Contraseña:</label>
                    {errors.password?.type === 'required' && <Mensaje tipo= "error">Añade la contraseña</Mensaje>}
                </div>
                <input type="password" placeholder='Ingrese una contraseña' {...register('password',{
                    required: true
                })}/>
            </div>
        <input type="submit" value={"Iniciar sesion"} />
    </form>
  </div>
  )
}

export default Login