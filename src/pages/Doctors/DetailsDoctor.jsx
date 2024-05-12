import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { FiPrinter } from "react-icons/fi";
import { RiArrowGoBackFill } from "react-icons/ri";
const DetailsDoctor = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [doctor, setDoctor] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [doctorResponse] = await Promise.all([
          axios.get(
            `http://localhost:8080/doctor/traer/${params.codigo_doctor}`
          ),
        ]);
        console.log(doctorResponse.data);
        setDoctor(doctorResponse.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.codigo_doctor]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!doctor) {
    return <p>No se encontró información del Doctor.</p>;
  }

  const handlePrint = () => {
    window.print();
  };
  return (
    <div className="container p-4">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title font-bold">Detalles del Doctor:</h5>
          <p className="card-text">
            <b>Nombre Completo:</b> {doctor.nombre} {doctor.apellido}
          </p>
          <p className="card-text">
            <b>Sexo:</b> {doctor.sexo}{" "}
          </p>
          <p className="card-text">
            <b>Cedula:</b> {doctor.cedula}{" "}
          </p>
          <p className="card-text">
            <b>Fecha de Nacimiento:</b> {doctor.fecha_nacimiento}{" "}
          </p>
          <p className="card-text">
            <b>Edad:</b> {doctor.edad}{" "}
          </p>
          <p className="card-text">
            <b>especialidad:</b> {doctor.especialidad}{" "}
          </p>
          <p className="card-text">
            <b>Dirección:</b> {doctor.direccion}{" "}
          </p>
          <p className="card-text">
            <b>Email:</b> {doctor.correoElectronico}{" "}
          </p>
          <p className="card-text">
            <b>Teléfono:</b> {doctor.telefono}{" "}
          </p>
         
        

        </div>


        <div className="card mt-3">
                    <div className="card-body">
                        <h5 className="card-title text-center font-bold ">Horario Asignado</h5>
                        <table className="table w-70">
                            <thead>
                                <tr>
                                    <th>Día</th>
                                    <th>Hora de Inicio</th>
                                    <th>Hora de Finalización</th>
                                   
                                </tr>
                            </thead>
                            <tbody  >
                                {doctor.horarios.map((horario) => (
                                    <tr key={horario.codigo_horario}>
                                        <td>{horario.diaSemana}</td>
                                        <td>{horario.horaInicio}</td>
                                        <td>{horario.horaFin}</td>
                                      

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
      </div>

      <div
        id="buttons-container"
        className="d-flex  justify-center gap-5 p-4 h-100vh"
      >
        <Button onClick={handlePrint} variant="success">
          <FiPrinter />
        </Button>
        <Button onClick={() => navigate("/patients")} variant="secondary">
          <RiArrowGoBackFill />
        </Button>
      </div>
    </div>
  );
};

export default DetailsDoctor;
