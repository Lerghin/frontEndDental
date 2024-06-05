import { Link, useNavigate } from "react-router-dom";
import "../pages/css/Home.css";

import { MdDeleteForever } from "react-icons/md";
import { API } from "../utils/axios";
import { FaUserEdit } from "react-icons/fa";
import { useEffect, useState } from "react";
import { LS } from "../utils/LS";

const TablaCitas = ({ data, onDelete }) => {
  const {
    codigo_cita,
    fecha_cita,
    estado,
    motivo,
    observaciones,

    servicio,
    unDoctor,
    unPaciente,
  } = data;

  const navigate = useNavigate();

  const handleDelete = async (codigo_cita) => {
    if (window.confirm("¿Segur@ que quieres borrar la Cita?")) {
      try {
        await API.delete(`admin/citas/borrar/${codigo_cita}`);

        onDelete(codigo_cita);

        navigate("/citas");
      } catch (error) {
        alert(error);
      }
    }
  };
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const role = LS.getText("role");
    if (role) {
      setUserRole(role.trim()); // Eliminar espacios extra si los hay
    }
    setLoading(false); // Marcar la carga como completada
  }, []);

  if (loading) {
    return <div>Loading...</div>; // O un spinner de carga
  }


  return (
    <tr>
      <td>{fecha_cita}</td>
      <td className="namePatient">
        <Link to={`/watchPatient/${unPaciente.codigoPaciente}`}>
          {unPaciente.nombre} {unPaciente.apellido}
        </Link>
      </td>
      <td>{unPaciente.cedula}</td>
   
      <td className="namePatient">
        <Link to={`/watchDoctor/${unDoctor.codigo_doctor}`}>
          {unDoctor.nombre} {unDoctor.apellido}
        </Link>
      </td>
      <td>{servicio.nombre}</td>
      <td>{motivo}</td>
      <td>{observaciones}</td>
      <td>{estado}</td>
     {userRole==='USER'? null: (<td>
        <FaUserEdit
          className="m-2 my-2 h-5"
          onClick={() => navigate(`/editCita/${codigo_cita}`)}
        />

        <MdDeleteForever
          className="m-2 "
          onClick={() => handleDelete(codigo_cita)}
        />
      </td>
      )}
    </tr>
  );
};

export default TablaCitas;
