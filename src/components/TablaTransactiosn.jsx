import { Link, useNavigate } from "react-router-dom";
import "../pages/css/Home.css";

import { MdDeleteForever } from "react-icons/md";
import { API } from "../utils/axios";
import { FaUserEdit } from "react-icons/fa";

const TablaTransactions = ({ data, onDelete }) => {
  const {
    codigo_transaccion,
    fecha,
    paciente,
    deuda,
    ingreso,
    ingresoDoctor,
    ingresoClinica,
    observaciones,
    formaPago
  } = data;

  const navigate = useNavigate();

  const handleDelete = async (codigo_transaccion) => {
    if (window.confirm("¿Seguro que quieres borrar la transacción?")) {
      try {
        await API.delete(`/trans/borrar/${codigo_transaccion}`);

        onDelete(codigo_transaccion);

        navigate("/transaction");
      } catch (error) {
        alert(error);
      }
    }
  };

  return (
    <tr>
       <td>{codigo_transaccion}</td>
      <td>{fecha}</td>
      <td className="namePatient">
        <Link to={`/watchPatient/${paciente.codigoPaciente}`}>
          {paciente.nombre} {paciente.apellido}
        </Link>
      </td>
      <td>{paciente.cedula}</td>
      <td>{parseFloat(deuda).toFixed(2)}$</td>
      <td>{parseFloat(ingreso).toFixed(2)}$</td>
      <td>{formaPago}</td>
      <td>{observaciones}</td>
      <td>{parseFloat(ingresoDoctor).toFixed(2)}$</td>
      <td>{parseFloat(ingresoClinica).toFixed(2)}$</td>
      <td>
        <FaUserEdit
          className="m-2 my-2 h-5"
          onClick={() => navigate(`/editTrans/${codigo_transaccion}`)}
        />
        <MdDeleteForever
          className="m-2"
          onClick={() => handleDelete(codigo_transaccion)}
        />
      </td>
    </tr>
  );
};

export default TablaTransactions;
