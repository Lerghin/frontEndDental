import {Link,  useNavigate } from "react-router-dom";
import "../pages/css/Home.css";

import { MdDeleteForever } from "react-icons/md";
import { API } from "../utils/axios";
import { RiFileEditFill } from "react-icons/ri";

const TablaHorario = ({ data, onDelete }) => {
  const {
   
   horariosDoctor,

   
  } = data;

  
  const navigate = useNavigate();

  const handleDelete = async (horario_id) => {
    if (window.confirm("¿Seguro que quieres borrar el horario?")) {
      try {
        await API.delete(`/admin/horarios/borrar/${horario_id}`);
        console.log(horario_id)
        onDelete(horario_id); 
     
        navigate('/horarios')
       
      } catch (error) {
        alert(error)
       
      }
    }
  };

  return (    
    <>
    {horariosDoctor.map((horario) => (
      
      <tr key={horario.horario_id}>
        <td >
          {horario.diaSemana}
        </td>
        <td>{horario.horaInicio}</td>
        <td>{horario.horaFin}</td>
        <td> <Link to={`/watchDoctor/${data.codigo_doctor}`}>{data.codigo_doctor ? `${data.nombreDoctor} ${data.apellidoDoctor}` : "Sin asignar"}</Link></td>
        <td>
          <RiFileEditFill className="m-2 my-2 h-5" onClick={() => navigate(`/editHorario/${horario.horario_id}`)}  /> 
          <MdDeleteForever className="m-2" onClick={() => horario.horario_id && handleDelete(horario.horario_id)} />
        </td>
      </tr>
))}
  </>
  );
};

export default TablaHorario;