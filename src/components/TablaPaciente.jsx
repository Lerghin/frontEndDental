import { Link } from "react-router-dom";
import "../pages/css/Home.css";


const TablaPaciente = ({ data }) => {
  const {
    
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

  return (
    
      
    <tr>
  
    <td className="namePatient"> <Link to="/"> {nombre} {apellido}</Link></td>
    <td>{sexo}</td>
    <td>{cedula}</td>
    <td>{correoElectronico}</td>
    <td>{direccion}</td>
    <td>{telefono}</td>
    <td>{nombreDoctor} {apellidoDoctor}</td>
  </tr>
 
  );
};

export default TablaPaciente;
