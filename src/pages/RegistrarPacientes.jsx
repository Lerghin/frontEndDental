import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { API } from "../utils/axios"
import { toast } from "react-toastify"
import SideBarPacientes from "../components/SideBarPacientes"
import axios from "axios"
import  '../pages/css/RegistroPaciente.css'
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

const RegistrarPacientes = () => {

    const [doctor, setDoctor]= useState([]);
    const [userData, setUserData]= useState({
        nombre:'',
        apellido:'',
        sexo:'',
        cedula:'',
        edad: '',
        direccion: '',
        telefono: '',
        correoElectronico: '',
        codigo_doctor:'',
        fecha_nacimiento: new Date(),
    })
    const navigate= useNavigate()

    useEffect(() => {

        axios.get('http://localhost:8080/doctor/traer')
          .then(response => {
           
            setDoctor(response.data);
            //console.log(response.data)
          })
          .catch(error => {
            console.error('Error fetching options:', error);
          });
      }, []); 
    
      const handleChangeDate = (date) => {
        setUserData({ ...userData, fecha_nacimiento: date });
      };
    const handleChange= (e)=>{
        setUserData({...userData, [e.target.name]:e.target.value})
    
    }
    const handleSubmit= async()=>{
        try{
          console.log(userData.fecha_nacimiento);
            const {data}= await API.post('/pacientes/crear/', userData)
            console.log(data)
            toast.success(data.message)
            alert("Paciente Registrado con éxito")
            navigate('/patients')
        }catch (error){
            const {message}=error.response.data
            console.log(error)
            toast.error(message)
        }
    }
  return (
    <>
    <div className="home">
      <div>
        <SideBarPacientes />
      </div>
   
    <div className="registrar"> 
        
    <div className="sign-container">
  
    <div className="sign-card">
      <form className="sign-form" onSubmit={(e) => e.preventDefault()}>
        <h2 className="form-heading">Registrar Paciente</h2>

        <div className="form-group">
          <label htmlFor="nombre" className="form-label">Nombre</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={userData.nombre}
            onChange={handleChange}
            className="form-input"
            placeholder="Ingresa nombre"
            autoComplete="off"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="apellido" className="form-label">Apellido</label>
          <input
            type="text"
            id="apellido"
            name="apellido"
            value={userData.apellido}
            onChange={handleChange}
            className="form-input"
            placeholder="Ingresa apellido"
            autoComplete="off"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="sexo" className="form-label">Sexo</label>
          <select  id="sexo" name="sexo" value={userData.sexo} onChange={handleChange}>
        <option  type="text" value="">Seleccione una opción...</option>
        <option type="text" value="Masculino">Masculino</option>
        <option  type="text" value="Femenino">Femenino</option>
        </select>
        </div>

        <div className="form-group">
          <label htmlFor="cedula" className="form-label">Cedula</label>
          <input
            type="text"
            id="cedula"
            name="cedula"
            value={userData.cedula}
            onChange={handleChange}
            className="form-input"
            placeholder="Ingrese su Cedula"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="edad" className="form-label">Edad</label>
          <input
            type="text"
            id="edad"
            name="edad"
            value={userData.edad}
            onChange={handleChange}
            className="form-input"
            placeholder="Ingrese su Edad"
            required
          />
        </div>
        <div className="form-group">
                  <label htmlFor="fecha_nacimiento" className="form-label">
                    Fecha de Nacimiento
                  </label>
                  
                  <DatePicker
          id="fecha_nacimiento"
          selected={userData.fecha_nacimiento}
          onChange={handleChangeDate}
          dateFormat="yyyy-MM-dd"
          placeholderText="Seleccionar fecha"
          showYearDropdown
          scrollableYearDropdown
          yearDropdownItemNumber={100}
          scrollableMonthYearDropdown
          className="form-control text-center"
        />
                </div>
        <div className="form-group">
          <label htmlFor="direccion" className="form-label">Dirección</label>
          <textarea
            type="text"
            id="direccion"
            name="direccion"
            value={userData.direccion}
            onChange={handleChange}
            className="form-input"
            placeholder="Ingrese su Dirección"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="telefono" className="form-label">Teléfono</label>
          <input
            type="text"
            id="telefono"
            name="telefono"
            value={userData.telefono}
            onChange={handleChange}
            className="form-input"
            placeholder="Ingrese num teléfono"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="correo" className="form-label">Correo</label>
          <input
            type="email"
            id="correo"
            name="correoElectronico"
            value={userData.correoElectronico}
            onChange={handleChange}
            className="form-input"
            placeholder="Ingrese su email"
            required
          />
        </div>
        <label htmlFor="doctor">Doctor Asignado:</label>
      <select id="doctor" name="codigo_doctor" value={userData.codigo_doctor} onChange={handleChange}>
        <option value="">Seleccione una opción...</option>
        {doctor.map(doc => (
          <option key={doc.codigo_doctor} value={doc.codigo_doctor}>{doc.nombre} {doc.apellido}</option>
        ))}
      </select>

        <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={handleSubmit}>
            Registrar
          </button>
          
        </div>
      </form>
    </div>
  </div>
  </div>
  
  </div>
  </>
  )
}

export default RegistrarPacientes