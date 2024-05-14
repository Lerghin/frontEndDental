import { Link, useNavigate } from "react-router-dom";
import "../pages/css/Home.css";
import { FaUserEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { API } from "../utils/axios";


const TablaDoctores = ({ data, onDelete }) => {
  const {
    codigo_doctor,
    nombre,
    apellido,
    sexo,
   especialidad,
    edad,
    cedula,
    correoElectronico,
    direccion,
    telefono,
  } = data;
  

  
  const navigate = useNavigate();

  const handleDelete = async (codigo_doctor) => {
    if (window.confirm("¿Seguro que quieres borrar el paciente?")) {
      try {
        await API.delete(`/doctor/borrar/${codigo_doctor}`);
        onDelete(codigo_doctor); 
        navigate('/doctors')
       
      } catch (error) {
        alert(error)
       
      }
    }
  };

  return (    
    <tr>
      <td className="namePatient">
        <Link to={`/watchDoctor/${codigo_doctor}`}>{nombre} {apellido}</Link>
      </td>

      <td>{sexo}</td>
      <td>{edad}</td>
      <td>{cedula}</td>
      <td>{especialidad}</td>
      <td>{correoElectronico}</td>
      <td >{direccion}</td>
      <td>{telefono}</td>
     
    
      
      <td  >

      <FaUserEdit className="m-2 my-2 h-5" onClick={() => navigate(`/editDoctor/${codigo_doctor}`)}  /> 
        <MdDeleteForever className="m-2 "  onClick={()=>handleDelete(codigo_doctor) }/>
  
      </td>
    </tr>
  );
};

export default TablaDoctores;