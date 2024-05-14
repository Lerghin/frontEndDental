import { Link, useNavigate } from "react-router-dom";
import "../pages/css/Home.css";
import { FaUserEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { API } from "../utils/axios";


const TablaHistoria = ({ data, onDelete }) => {
  const {
   codigo_historia,
   debe,
   diagnostico,
   secuenciaTratamiento,
   doctor,
   paciente,
  } = data;
  

  
  const navigate = useNavigate();

  const handleDelete = async (codigo_historia) => {
    if (window.confirm("¿Seguro que quieres  borrar la Historia?")) {
      try {
        await API.delete(`/historia/borrar/${codigo_historia}`);
        onDelete(codigo_historia); 
        navigate('/histories')
       
      } catch (error) {
        alert(error)
       
      }
    }
  };

  return (    
    <tr>
      <td className="namePatient">
        <Link to={`/watchHistory/${codigo_historia}`}>{codigo_historia} </Link>
      </td>
     <td className="hover:bg-sky-200"><Link to={`/watchPatient/${paciente.codigoPaciente}`}>{paciente.nombre}{paciente.apellido}  </Link></td>
    <td className="hover:bg-sky-100"><Link to={`/watchDoctor/${doctor.codigo_doctor}`}>{doctor.nombre}{doctor.apellido }  </Link></td>
    <td>{diagnostico}</td>
    <td>{secuenciaTratamiento}</td>
    <td>{debe}$</td>
     
     
    
      
      <td  >

      <FaUserEdit className="m-2 my-2 h-5" onClick={() => navigate(`/editHistory/${codigo_historia}`)}  /> 
        <MdDeleteForever className="m-2 "  onClick={()=>handleDelete(codigo_historia) }/>
  
      </td>
    </tr>
  );
};

export default TablaHistoria;