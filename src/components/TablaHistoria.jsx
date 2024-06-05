import { Link, useNavigate } from "react-router-dom";
import "../pages/css/Home.css";
import { FaUserEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { API } from "../utils/axios";
import { useEffect, useState } from "react";
import { LS } from "../utils/LS";


const TablaHistoria = ({ data, onDelete }) => {
  const {
   codigo_historia,
 
   diagnostico,
   secuenciaTratamiento,

   paciente,
  } = data;
  
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const role = LS.getText("role");
    if (role) {
      setUserRole(role.trim()); // Eliminar espacios extra si los hay
    }
   
  }, []);
  
  const navigate = useNavigate();

  const handleDelete = async (codigo_historia) => {
    if (window.confirm("¿Seguro que quieres  borrar la Historia?")) {
      try {
        await API.delete(`admin/historias/borrar/${codigo_historia}`);
        onDelete(codigo_historia); 
        navigate('/histories')
       
      } catch (error) {
        alert(error)
       
      }
    }
  };

  return (    
    <tr>
      <td className="hover:bg-sky-100" >
       {codigo_historia}
      </td>
     <td className="namePatient hover:bg-sky-100"><Link to={`/watchPatient/${paciente.codigoPaciente}`}>{paciente.nombre}{paciente.apellido}  </Link></td>
   
    <td>{diagnostico}</td>
    <td>{secuenciaTratamiento}</td>
   
     
     
    
      
    {userRole==='USER'? null :(<td  >

<FaUserEdit className="m-2 my-2 h-5" onClick={() => navigate(`/editHistory/${codigo_historia}`)}  /> 
  <MdDeleteForever className="m-2 "  onClick={()=>handleDelete(codigo_historia) }/>

</td>)}  
    </tr>
  );
};

export default TablaHistoria;