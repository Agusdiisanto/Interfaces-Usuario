import { useState} from 'react'
import {set, useForm } from 'react-hook-form'
import Mensaje from './Mensaje'
import Modal from '../Accesorios/Modal'
import Api from '../../services/Api'
import "./Register.css"


const Register = () => {

    const {register, formState:{errors} , handleSubmit, reset} = useForm()
    const [modal, setModal] = useState(false)
    const [nombre, setNombre] = useState("")
    const [mensaje, setMensaje] = useState("")
    const [errorMensaje, setErrorMensaje] = useState(null);
    
    const onSubmit = (data) => {
        Api.register(data).then((response) => {
            Api.setToken(response.headers.authorization)
            setNombre(data.username)
            setModal(true)
        }).catch((error) => {
            setErrorMensaje(error.message);
            setMensaje("Hubo un error al registrarse:")
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
                        nombre = {nombre}
                        errorMensaje = {errorMensaje}
                    />  
                    )           
            }
        <form onSubmit= {handleSubmit(onSubmit)} className='formulario'>
            <h2 className='titulo-register'>Register</h2>
            <div className='campo'>
                <div className='label-error'>
                    <label htmlFor="Nombre">Usuario</label>
                    {errors.nombre?.type === 'required' && <Mensaje tipo="error">Añade el usuario</Mensaje>}
                </div>
                <input type="text" placeholder='Registre su usuario' {...register('username', {
                    required: true 
                })}/>
            </div>
            <div className='campo'>
                <div className="label-error">
                    <label htmlFor="Email">E-Mail:</label>
                    {errors.email?.type === 'required' &&<Mensaje tipo= "error">Añade el Email</Mensaje>}
                </div>
                <input type="email" placeholder='Añade un email' {...register('email' , {
                    required: true,
                })}/>
            </div>
            <div className='campo'>
                <div className="label-error">
                    <label htmlFor="password">Contraseña:</label>
                    {errors.password?.type === 'required' && <Mensaje tipo= "error">Añade la contraseña</Mensaje>}
                    {errors.password?.type === 'minLength' && <Mensaje tipo= "error">Es poco segura</Mensaje>}
                </div>
                <input type="password" placeholder='Añade una contraseña' {...register('password',{
                    required: true,
                    minLength: 10
                })}/>
            </div>
            <div className='campo'>
                <div className="label-error">
                    <label htmlFor="imagen">Imagen de perfil: </label>
                    {errors.imagen?.type === 'required' && <Mensaje tipo= "error">Añade una imagen</Mensaje>}
                </div>
                <input type="url" placeholder='Añade una imagen en URL: '{...register('image', {
                    required:true
                })}/>
            </div>
            <div className='campo'>
                <div className="label-error">
                    <label htmlFor="backimagen">Imagen de portada: </label>
                    {errors.backimagen?.type === 'required' && <Mensaje tipo= "error">Añade un color</Mensaje>}
                </div>
                <input type="url" placeholder='Añade imagen de portada en URL: '{...register('backgroundImage',{
                    required: true
                })}/>
            </div>
            <input type="submit" className="button" value={"Registrar"}/>
        </form>
        </div>
    )
}

export default Register;