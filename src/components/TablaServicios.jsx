import {  useNavigate } from "react-router-dom";
import "../pages/css/Home.css";

import { MdDeleteForever } from "react-icons/md";
import { API } from "../utils/axios";
import { FaUserEdit } from "react-icons/fa";
import { useEffect, useState } from "react";
import { LS } from "../utils/LS";

const TablaServicios = ({ data, onDelete }) => {
  const [userRole, setUserRole] = useState(null);
 
  useEffect(() => {
    const role = LS.getText("role");
    if (role) {
      setUserRole(role.trim()); // Eliminar espacios extra si los hay
    }
   
  }, []); 
  const {
   
   codigo_servicio,
   nombre,
   descripcion

   
  } = data;

  
  const navigate = useNavigate();

  const handleDelete = async (codigo_servicio) => {
    if (window.confirm("¿Seguro que quieres borrar el servicio?")) {
      try {
        await API.delete(`/admin/servicios/borrar/${codigo_servicio}`);
       
        onDelete(codigo_servicio); 
     
        navigate('/services')
       
      } catch (error) {
        alert(error)
       
      }
    }
  };

  return (    
    <tr>
    <td >
    {nombre} 
    </td>
    <td>{descripcion}</td>
    {userRole==='USER'? null:(  <td  >
    <FaUserEdit className="m-2 my-2 h-5" onClick={() => navigate(`/editService/${codigo_servicio}`)}  /> 
    
      <MdDeleteForever className="m-2 "  onClick={()=>handleDelete(codigo_servicio) }/>

    </td>)}
   
  </tr>


  );
};

export default TablaServicios;