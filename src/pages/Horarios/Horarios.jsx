import { useState, useEffect } from "react";


import Table from "react-bootstrap/Table"; // Asegúrate de importar la tabla
import "../css/Home.css";
import TablaHorario from "../../components/TablaHorario";
import SideBarHorarios from "../../components/SideBarHorarios";
import { API } from "../../utils/axios";
import { LS } from "../../utils/LS";


const Horarios = () => {
  const [horarios, setHorarios] = useState([]);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  const [userRole, setUserRole] = useState(null);
  
  useEffect(() => {
    const role = LS.getText("role");
    if (role) {
      setUserRole(role.trim()); // Eliminar espacios extra si los hay
    }

  }, []);

  useEffect(() => {
    API
      .get("http://localhost:8080/horarios/traer")
      .then((response) => {
 
        setHorarios(response.data);
        setResults(response.data)
       
        
      })
      .catch((error) => console.error("Error fetching pacientes:", error));
  }, []);

  const searcher = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearch(searchTerm);
  
    const filteredHorarios = horarios.filter((hor) => {

      const doctorFullName = `${hor.nombreDoctor} ${hor.apellidoDoctor}`.toLowerCase();
  
      return (
        doctorFullName.includes(searchTerm) ||
        hor.horariosDoctor.some((doctor) =>
          doctor.diaSemana.toLowerCase().includes(searchTerm) ||
          doctor.horaInicio.toString().includes(searchTerm) ||
          doctor.horaFin.toString().includes(searchTerm)
        )
      );
    });
  
    setResults(filteredHorarios); 
  };
  const handleDelete = (horario_id) => {
    
    setResults(prevResults => prevResults.map(data => ({
      ...data,
      horariosDoctor: data.horariosDoctor.filter(horario => horario.horario_id !== horario_id)
    })));
  
    setHorarios(prevHorarios => prevHorarios.map(data => ({
      ...data,
      horariosDoctor: data.horariosDoctor.filter(horario => horario.horario_id !== horario_id)
    })));
  };
  return (
    <div className="home">
      <div>
        <SideBarHorarios className="home-sidebar" />
      </div>

      <div className="patientsTable  ">
      <div>
        <input style={{textAlign:"center"}} value={search} onChange={searcher} type="text" placeholder='Buscar Horario' className='form-control' />
      </div>
      <div className="flex-container responsive-table">
        <Table  striped bordered hover>
          <thead>
            <tr>
             
              <th>Dia de la Semana</th>
              <th>Hora de Inicio</th>
              <th>Hora Final</th>
              <th>Doctor Asignado</th>
              
             {userRole==='USER'? null :(<th ></th>)} 
            
           
              
              
            </tr>
          </thead>
          <tbody>
            {results.map((hor) =>
            (
              <TablaHorario key={hor.horario_id} data={hor}  onDelete={handleDelete} />
            ))}
          </tbody>
        </Table>
        </div>
      </div>
    </div>
  );
};

export default Horarios;