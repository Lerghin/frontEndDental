import { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { FiPrinter } from "react-icons/fi";
import { RiArrowGoBackFill } from "react-icons/ri";
import { generarPDFPaciente } from './generarPDFPAciente';
import { API } from '../../utils/axios';


const DetailsPatients = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [patient, setPatient] = useState(null);
    const [citas, setCitas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [history, setHistory] = useState(null);
    const [debe, setDebe] = useState(null);
    const [trans, setTrans] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [patientResponse, citasResponse, historyResponse, debeResponse, transResp] = await Promise.all([
                    API.get(`/pacientesdr/traer/${params.codigo_paciente}`),
                    API.get(`/pacientescita/traer/${params.codigo_paciente}`),
                    API.get(`/pacienteshistory/traer/${params.codigo_paciente}`),
                    API.get(`/total-debe/${params.codigo_paciente}`),
                    API.get(`/trans/getbyPatient/${params.codigo_paciente}`)
                ]);

                setPatient(patientResponse.data);
                setCitas(citasResponse.data);
                setHistory(historyResponse.data);
                setDebe(debeResponse.data);
                setTrans(transResp.data);

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

    if (!patient || !history || !citas || debe === null || !trans) {
        return <p>No se encontró información del paciente.</p>;
    }

    const handlePrint = () => {
        generarPDFPaciente(patient, history, citas, debe, trans);
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
                    <p className="card-text"><b >Deuda del Paciente:</b>  <span className='text-pink-700 font-semibold'>{parseFloat(debe).toFixed(2)}$</span></p> 
                    <p className='card-text text-gray-500'>Nota: Sí el valor es negativo quiere decir que el paciente tiene saldo a favor</p>
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
                            <tbody>
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

            {trans.length > 0 ? (
                <div className="card mt-3">
                    <div className="card-body">
                        <h5 className="card-title text-center font-bold ">Control de Pagos</h5>
                        <table className="table w-70">
                            <thead>
                                <tr>
                                    <th>Nº de Recibo</th>
                                    <th>Fecha</th>
                                    <th>Saldo Deudor</th>
                                    <th>Monto Cancelado</th>
                                    <th>Metodo de Pago</th>
                                    <th>Observaciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {trans.map((tran) => (
                                    <tr key={tran.codigo_transaccion}>
                                        <td>{tran.codigo_transaccion}</td>
                                        <td>{tran.fecha}</td>
                                        <td>{tran.deuda}$</td>
                                        <td>{tran.ingreso}$</td>
                                        <td>{tran.formaPago}</td>
                                        <td>{tran.observaciones}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <p className="mt-3">No hay transacciones disponibles para este paciente.</p>
            )}

            <div id="buttons-container" className='d-flex justify-center gap-5 p-4 h-100vh'>
                <Button onClick={handlePrint} variant="success"><FiPrinter /></Button>
                <Button onClick={() => navigate('/patients')} variant="secondary"><RiArrowGoBackFill /></Button>
            </div>
        </div>
    );
};

export default DetailsPatients;
