import { useState, useEffect } from 'react';
import SideBarPacientes from '../components/SideBarPacientes';
import axios from 'axios';
import TablaPaciente from '../components/TablaPaciente';
import Table from 'react-bootstrap/Table'; // Asegúrate de importar la tabla
import '../pages/Home.css'
const Pacientes = () => {
  const [pacientes, setPacientes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/pacientes/traer')
      .then((response) => {
        setPacientes(response.data);
        console.log(response.data);
      })
      .catch((error) => console.error('Error fetching pacientes:', error));
  }, []);

  return (
    <div className="home">
   
      <div>
      <SideBarPacientes />
     
      </div >
      
      <div className="patientsTable">
      
        <Table striped bordered hover> 
          <thead>
            <tr>
              <th>Código</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Sexo</th>
              <th>Cédula</th>
              <th>Correo Electrónico</th>
              <th>Dirección</th>
              <th>Teléfono</th>
            </tr>
          </thead>
          <tbody>
            {pacientes.map((paciente) => (
              <TablaPaciente key={paciente.codigo_paciente} data={paciente} />
            ))}
          </tbody>
        </Table> 
      </div>
    </div>
  );
};

export default Pacientes;
