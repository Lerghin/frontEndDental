import {  useNavigate, Link } from "react-router-dom";
import "../pages/css/Home.css";

import { MdDeleteForever } from "react-icons/md";
import { API } from "../utils/axios";
import { FaUserEdit } from "react-icons/fa";
import { generarPDFPresupuesto } from "../pages/Presupuestos/generarPDFPRESU";
import { AiOutlineFilePdf } from "react-icons/ai"; 
import { useEffect, useState } from "react";
import { LS } from "../utils/LS";
import axios from "axios";

const TablaPresupuesto = ({ data, onDelete }) => {
  const [userRole, setUserRole] = useState(null);
 
  useEffect(() => {
    const role = LS.getText("role");
    if (role) {
      setUserRole(role.trim()); // Eliminar espacios extra si los hay
    }
 
  }, []);
  const {
   
   codigo_presupuesto,
   nombre,
   apellido,
   cedula,
   detalles
   
   

   
  } = data;
  const [totalMonto, setTotalMonto] = useState(0);
  const [montoBs, setMontoBs] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://v6.exchangerate-api.com/v6/8ee293f7c8b83cfe4baa699c/latest/USD");
        const valorDollar = res.data.conversion_rates.VES;
        setMontoBs(valorDollar);
  
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);


  const handlePrint = () => {
    const totalEnBs = (parseFloat(montoBs) * totalMonto).toFixed(2);
    generarPDFPresupuesto(data, totalMonto, totalEnBs);
};
useEffect(() => {
  if (detalles) {
      const total = detalles.reduce((sum, detalle) => sum + parseFloat(detalle.monto || 0), 0);
      setTotalMonto(total);
  }
}, [detalles]);
  
  const navigate = useNavigate();

  const handleDelete = async (codigo_presupuesto) => {
    if (window.confirm("¿Seguro que quieres borrar el presupuesto?")) {
      try {
        await API.delete(`admin/presu/borrar/${codigo_presupuesto}`);
       
        onDelete(codigo_presupuesto); 
     
        navigate('/presupuesto')
       
      } catch (error) {
        alert(error)
       
      }
    }
  };

  return (    
    <tr>
        <td className="namePatient"><Link to={`/watchPresu/${codigo_presupuesto}`}>{codigo_presupuesto}</Link></td>
        <td >
        {nombre}
      </td>
    <td>{apellido}</td>
    <td>{cedula}</td>
    <td> {totalMonto.toFixed(2)}$</td>
    
    {userRole==='USER'? null:(  <td  >
    <FaUserEdit className="m-2 my-2 h-5" onClick={() => navigate(`/editPre/${codigo_presupuesto}`)}  /> 
    
      <MdDeleteForever className="m-2 "  onClick={()=>handleDelete(codigo_presupuesto) }/>
      <AiOutlineFilePdf
          className="m-2"
          onClick={handlePrint}
        />
    </td>)}
   
  </tr>


  );
};

export default TablaPresupuesto;