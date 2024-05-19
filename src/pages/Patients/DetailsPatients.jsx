import  { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { FiPrinter } from "react-icons/fi";
import { RiArrowGoBackFill } from "react-icons/ri";
const DetailsPatients = () => {
    const navigate=useNavigate();
    const params = useParams();
    const [patient, setPatient] = useState(null);
    const [citas, setCitas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [history, setHistory]= useState(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const [patientResponse, citasResponse, historyResponse] = await Promise.all([
                    axios.get(`http://localhost:8080/pacientesdr/traer/${params.codigo_paciente}`),
                    axios.get(`http://localhost:8080/pacientescita/traer/${params.codigo_paciente}`),
                    axios.get(`http://localhost:8080/pacienteshistory/traer/${params.codigo_paciente}`)
                ]);

                setPatient(patientResponse.data);
                setCitas(citasResponse.data);
                setHistory(historyResponse.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [params.codigo_paciente]);

    if (loading) {
        return <p>Cargando...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!patient || !history || !citas) {
        return <p>No se encontró información del paciente.</p>;
    }

    const handlePrint = () => {
      
        window.print( );
       
        
      };
    return (
        <div className="container p-4">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title font-bold">Detalles del Paciente:</h5>
                    <p className="card-text"><b>Nombre Completo:</b> {patient.nombre} {patient.apellido}</p>
                    <p className="card-text"><b>Cedula:</b> {patient.cedula}</p>
                    <p className="card-text"><b>Sexo:</b>{patient.sexo}</p>
                    <p className="card-text"><b>Edad:</b>{patient.edad}</p>
                    <p className="card-text"><b>Fecha de Nacimeinto:</b>{patient.fecha_nacimiento}</p>
                    <p className="card-text"><b>Dirección</b>: {patient.direccion}</p>
                    <p className="card-text"><b> Teléfono:</b> {patient.telefono}</p>
                    <p className="card-text"><b>Email:</b> {patient.correoElectronico}</p>
                    <p className="card-text"><b>Medico Tratante:</b> {patient.nombreDoctor} {patient.apellidoDoctor}</p>
                    <p className="card-text"><b>Nº de Historia Clínica:</b> {history.codigo_historia}</p>
                    <p className="card-text"><b>Diagnóstico:</b> {history.diagnostico}</p>
                    <p className="card-text"><b>Secuencia de Tratamiento:</b> {history.secuenciaTratamiento}</p>
                   
                </div>
            </div>

            {citas.length > 0 ? (
                <div className="card mt-3">
                    <div className="card-body">
                        <h5 className="card-title text-center font-bold ">Control de Citas</h5>
                        <table className="table w-70">
                            <thead>
                                <tr>
                                    <th>Fecha</th>
                                    <th>Motivo</th>
                                    <th>Estado</th>
                                    <th>Observaciones</th>
                                    <th>Doctor</th>
                                    <th>Servicio</th>
                                </tr>
                            </thead>
                            <tbody  >
                                {citas.map((cita) => (
                                    <tr key={cita.codigo_cita}>
                                        <td>{cita.fecha_cita}</td>
                                        <td>{cita.motivo}</td>
                                        <td>{cita.estado}</td>
                                        <td>{cita.observaciones}</td>
                                        <td>{cita.unDoctor.nombre} {cita.unDoctor.apellido}</td>
                                        <td>{cita.servicio.nombre}</td>
                                        

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <p className="mt-3">No hay citas disponibles para este paciente.</p>
            )}


            <div  id="buttons-container" className='d-flex  justify-center gap-5 p-4 h-100vh'>
             <Button   onClick={ handlePrint} variant="success"><FiPrinter /></Button>
              <Button  onClick={() => navigate('/patients')} variant="secondary"><RiArrowGoBackFill /></Button>

            </div>
        </div>
        

    );
};

export default DetailsPatients;