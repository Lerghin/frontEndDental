import { Link, useNavigate } from "react-router-dom";
import "../pages/css/Home.css";
import { FaUserEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { API } from "../utils/axios";


const TablaPaciente = ({ data, onDelete }) => {
  const {
    codigo_paciente,
    nombre,
    apellido,
    sexo,
    cedula,
    edad,
    correoElectronico,
    direccion,
    telefono,
    nombreDoctor,
    apellidoDoctor
  } = data;
  

  
  const navigate = useNavigate();

  const handleDelete = async (codigo_paciente) => {
    if (window.confirm("¿Seguro que quieres borrar el paciente?")) {
      try {
        await API.delete(`/admin/pacientes/borrar/${codigo_paciente}`);
        onDelete(codigo_paciente); 
        navigate('/patients')
       
      } catch (error) {
        alert(error)
       
      }
    }
  };

  

  return (    
    <tr>
      <td className="namePatient">
        <Link to={`/watchPatient/${codigo_paciente}`}>{nombre} {apellido}</Link>
      </td>
      <td>{sexo}</td>
      <td>{edad}</td>
      <td>{cedula}</td>
      <td>{correoElectronico}</td>
      <td >{direccion}</td>
      <td>{telefono}</td>
      <td>{nombreDoctor} {apellidoDoctor}</td>
      <td  >
      <FaUserEdit className="m-2 my-2 h-5" onClick={() => navigate(`/editPatient/${codigo_paciente}`)}  /> 
      
        <MdDeleteForever className="m-2 "  onClick={()=>handleDelete(codigo_paciente) }/>
       
      </td>
    </tr>
  );
};

export default TablaPaciente;