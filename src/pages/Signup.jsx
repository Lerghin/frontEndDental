import { useNavigate } from 'react-router-dom';
import { API } from '../utils/axios';
import { toast } from 'react-toastify';
import { useState } from 'react';
import '../pages/css/Signup.css';


const Signup = () => {
  const [userData, setUserData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    cedula: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await API.post('/auth/admin/register', userData);
      console.log(res);
      toast.success("Administrador registrado con exito");
  
     
      navigate('/homeadmin');
    
    } catch (error) {
      const { message } = error.response.data;
      console.log(error);
      toast.error(message);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <form className="signup-form" onSubmit={(e) => e.preventDefault()}>
          <h2 className="form-heading">Registrar Usuario</h2>

          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="username"
              name="username"
              value={userData.username}
              onChange={handleChange}
              className="form-input"
              placeholder="Ingresa tu email"
              autoComplete="off"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="firstName" className="form-label">
              Nombre
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={userData.firstName}
              onChange={handleChange}
              className="form-input"
              placeholder="Ingresa tu nombre"
              autoComplete="off"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastName" className="form-label">
              Apellido
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={userData.lastName}
              onChange={handleChange}
              className="form-input"
              placeholder="Ingresa tu apellido"
              autoComplete="off"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="cedula" className="form-label">
              Cédula
            </label>
            <input
              type="text"
              id="cedula"
              name="cedula"
              value={userData.cedula}
              onChange={handleChange}
              className="form-input"
              placeholder="Ingresa tu cédula"
              autoComplete="off"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
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
           
            <button onClick={handleSubmit} type="submit" className="btn btn-primary">
              Registrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
