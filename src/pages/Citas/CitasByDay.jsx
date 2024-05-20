import { useEffect, useState } from "react";
import SideBarCitas from "../../components/SideBarCitas";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from 'react-bootstrap/Button';
import { FiPrinter } from "react-icons/fi";
import { RiArrowGoBackFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
const CitasByDay = () => {
  const [citas, setCitas] = useState([]);
  const [message, setMessage] = useState('');
 const navigate=useNavigate();
  useEffect(() => {
    axios.get('http://localhost:8080/citas/hoy')
      .then(response => {
        setCitas(response.data.citas);
        setMessage(response.data.message);
      })
      .catch(error => {
        console.error('Error fetching citas:', error);
        setMessage('Error al obtener las citas.');
      });
  }, []);

  const handlePrint = () => {
      
    window.print( );
   
    
  };
  return (
    <div className="home">
      <div>
        <SideBarCitas className="home-sidebar" />
      </div>
      <div className="patientsTable">
        <div  className="flex-container responsive-table">
        {message && <p className="noHay"><b>{message}</b></p>}
        <br></br>
        {citas.length > 0 ? (
          
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Paciente</th>
                <th>Teléfono</th>
                <th>Motivo</th>
                <th>Observaciones</th>
                <th>Estado</th>
                <th>Doctor Asignado</th>

              </tr>
            </thead>
            <tbody>
              {citas.map(cita => (
                <tr key={cita.codigo_cita}>
                  <td>{cita.fecha_cita}</td>
                  <td>{`${cita.unPaciente.nombre} ${cita.unPaciente.apellido}`}</td>
                  <td>{cita.unPaciente.telefono}</td>
                  <td>{cita.motivo}</td>
                  <td>{cita.observaciones}</td>
                  <td>{cita.estado}</td>
                  <td>{cita.unDoctor.nombre}{cita.unDoctor.apellido}</td>
               
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
         
          <p ></p>
         
        )}
        </div>
        <div  id="buttons-container" className='d-flex  justify-center gap-5 p-4 h-100vh'>
             <Button   onClick={ handlePrint} variant="success"><FiPrinter /></Button>
              <Button  onClick={() => navigate('/citas')} variant="secondary"><RiArrowGoBackFill /></Button>

            </div>
      </div>
     
    </div>
  );
};

export default CitasByDay;