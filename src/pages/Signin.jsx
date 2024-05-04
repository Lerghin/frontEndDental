import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../utils/axios";
import { toast } from 'react-toastify';
import './Signup.css';
const Signin = () => {
  const navigate = useNavigate();
  const inputUsername = useRef();
  const inputPass = useRef();

  const handleSubmit = async () => {
    try {
        const userData={
            username: inputUsername.current.value,
            password: inputPass.current.value,
        } 
        const {data}= await API.post('/auth/login', userData)
        console.log(data);
       toast.success(data.message)
       navigate('/')
    

    } catch (error) {
        const {message}= error.response.data
        console.log(error)
        toast.error(message)
    }
  };
  return (
    <div className="signup-container">
      <div className="signup-card">
        <form className="signup-form" >
          <h2 className="form-heading">Iniciar Sesion</h2>

          <div className="form-group">
            <label htmlFor="username" className="form-label">Usuario</label>
            <input
              type="text"
              id="username"
              name="username"
              // ... other input attributes (autoComplete, required)
              ref={inputUsername}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              // ... other input attributes (required)
              ref={inputPass}
            />
          </div>

          <div className="form-actions">
            <button onClick={handleSubmit} type="submit" className="btn btn-secondary">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
