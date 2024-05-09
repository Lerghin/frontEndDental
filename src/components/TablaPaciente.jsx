import { Link, useNavigate } from "react-router-dom";
import "../pages/css/Home.css";
import { FaUserEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
const TablaPaciente = ({ data }) => {
  const {
    codigo_paciente,
    nombre,
    apellido,
    sexo,
    cedula,
    correoElectronico,
    direccion,
    telefono,
    nombreDoctor,
    apellidoDoctor
  } = data;
 const navigate= useNavigate();
  return (
    
      
    <tr  >
  
    <td className="namePatient"> <Link to={`/watchPatient/${codigo_paciente}`}> {nombre} {apellido}</Link></td>
    <td>{sexo}</td>
    <td>{cedula}</td>
    <td>{correoElectronico}</td>
    <td>{direccion}</td>
    <td>{telefono}</td>
    <td>{nombreDoctor} {apellidoDoctor}</td>
    <td  className="flex justify-center "  onClick={() => navigate(`/editPatient/${codigo_paciente}`)}><FaUserEdit /></td>
    <td className="flex justify-center"><MdDeleteForever /></td>
  </tr>
 
  );
};

export default TablaPaciente;
