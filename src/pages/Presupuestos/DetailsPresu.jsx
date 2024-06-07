import { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { FiPrinter } from "react-icons/fi";
import { RiArrowGoBackFill } from "react-icons/ri";

import { generarPDFPresupuesto } from './generarPDFPRESU';
import { API } from '../../utils/axios';

const DetailsPatients = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [presu, setPresu] = useState(null);
    const [totalMonto, setTotalMonto] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const presuResponse = await API.get(`/presu/traer/${params.codigo_presupuesto}`);
                setPresu(presuResponse.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [params.codigo_presupuesto]);

    useEffect(() => {
        if (presu) {
            const total = presu.detalles.reduce((sum, detalle) => sum + parseFloat(detalle.monto || 0), 0);
            setTotalMonto(total);
        }
    }, [presu]);

    const handlePrint = () => {
        generarPDFPresupuesto(presu, totalMonto);
    };

    if (loading) {
        return <p>Cargando...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!presu) {
        return <p>No se encontró información del presupuesto</p>;
    }

    return (
        <div className="container p-4">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title font-bold">Detalles del Presupuesto Nº {presu.codigo_presupuesto}</h5>
                    <p className="card-text"><b>Nombre Completo:</b> {presu.nombre} {presu.apellido}</p>
                    <p className="card-text"><b>Cédula:</b> {presu.cedula}</p>
                </div>
            </div>

            {presu.detalles.length > 0 ? (
                <div className="card mt-3">
                    <div className="card-body">
                        <h5 className="card-title text-center font-bold">Detalles</h5>
                        <table className="table w-70">
                            <thead>
                                <tr>
                                    <th>Descripción</th>
                                    <th>Monto</th>
                                </tr>
                            </thead>
                            <tbody>
                                {presu.detalles.map((pre, index) => (
                                    <tr key={index}>
                                        <td>{pre.descripcion}</td>
                                        <td>{pre.monto}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <h4 className="text-center">Total: {totalMonto.toFixed(2)}</h4>
                    </div>
                </div>
            ) : (
                <p className="mt-3">No hay detalles disponibles para este cliente</p>
            )}

            <div id="buttons-container" className='d-flex justify-center gap-5 p-4 h-100vh'>
                <Button onClick={handlePrint} variant="success"><FiPrinter /></Button>
                <Button onClick={() => navigate('/presupuesto')} variant="secondary"><RiArrowGoBackFill /></Button>
            </div>
        </div>
    );
};

export default DetailsPatients;
