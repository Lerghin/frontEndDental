import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import '../pages/css/Signup.css';
import { LS } from "../utils/LS";
import { useDispatch } from 'react-redux';
import { login } from "./Store/Actions/authActions";
import { API } from "../utils/axios";

const Signin = () => {
  const navigate = useNavigate();
  const inputUsername = useRef();
  const inputPass = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = LS.getText('token');
    if (token) {
      dispatch(login({ token }));
      navigate('/homeadmin');
    }
  }, [dispatch, navigate]); // <- Se pasa un array vacío como segundo argumento

  const handleSubmit = async (event) => {
    event.preventDefault(); // Evita el comportamiento predeterminado del formulario

    const userData = {
      username: inputUsername.current.value,
      password: inputPass.current.value,
    };

    try {
      const res = await API.post('/auth/login', userData);
     
      dispatch(login(res.data));

      if (res.status === 200) {
        toast.success('You are logged in successfully');
        const { token, role } = res.data;
        LS.set('token', token);
        LS.set('role', role);
        if (role === 'ADMIN') {
          navigate('/homeadmin');
        } else {
          navigate('/homeuser');
        }
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <form className="signup-form" onSubmit={handleSubmit}>
          <h2 className="form-heading">Iniciar Sesion</h2>

          <div className="form-group">
            <label htmlFor="username" className="form-label">Usuario</label>
            <input
              type="text"
              id="username"
              name="username"
              ref={inputUsername}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              ref={inputPass}
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-secondary">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
