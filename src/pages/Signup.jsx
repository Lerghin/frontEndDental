
import { useNavigate } from 'react-router-dom'
import { API } from '../utils/axios'
import { toast } from 'react-toastify'
import { useState } from 'react'
import '../pages/css/Signup.css';
import { LS } from "../utils/LS";
const Signup = () => {

    const [userData, setUserData]= useState({
        firstname:'',
        lastname:'',
        country:'',
        username:'',
        password: ''
    })
    const navigate= useNavigate()
    const handleChange= (e)=>{
        setUserData({...userData, [e.target.name]:e.target.value})
    }
    const handleSubmit= async()=>{
        try{
            const res= await API.post('register/admin', userData)
            console.log(res)
            toast.success(res.message)
            const { token, role } = res.data;
        LS.set('token', token);
        LS.set('role', role);
        if (role === 'ADMIN') {
          navigate('/homeadmin');
        } else {
          navigate('/homeuser');
        }
        }catch (error){
            const {message}=error.response.data
            console.log(error)
            toast.error(message)
        }

    }

  return (
    <div className="signup-container">
    <div className="signup-card">
      <form className="signup-form" onSubmit={(e) => e.preventDefault()}>
        <h2 className="form-heading">Registrar Usuario</h2>

        <div className="form-group">
          <label htmlFor="firstname" className="form-label">Nombre</label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={userData.firstname}
            onChange={handleChange}
            className="form-input"
            placeholder="Ingresa tu nombre"
            autoComplete="off"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastname" className="form-label">Apellido</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={userData.lastname}
            onChange={handleChange}
            className="form-input"
            placeholder="Ingresa tu apellido"
            autoComplete="off"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="country" className="form-label">País</label>
          <input
            type="text"
            id="country"
            name="country"
            value={userData.country}
            onChange={handleChange}
            className="form-input"
            placeholder="Ingresa tu país"
            autoComplete="off"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="username" className="form-label">Email</label>
          <input
            type="email"
            id="username"
            name="username"
            value={userData.username}
            onChange={handleChange}
            className="form-input"
            placeholder="Ingrese su email"
            autoComplete="off"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            className="form-input"
            placeholder="Ingrese una contraseña"
            required
          />
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/signin')}>
            Login
          </button>
          <button onClick={handleSubmit} type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  </div>
  )
}

export default Signup