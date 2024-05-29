import { useState, useEffect } from "react";



import Table from "react-bootstrap/Table"; // Asegúrate de importar la tabla
import "../css/Home.css";
import TablaDoctores from "../../components/TablaDoctores.jsx";
import SideBarDoctores from "../../components/SidebarDoctores.jsx";
import { API } from "../../utils/axios.js";


const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [sortedDoctors, setSortedDoctors] = useState([]);
  useEffect(() => {
    API
      .get("http://localhost:8080/doctor/traer")
      .then((response) => {
        const fetchedDoctors = response.data;
        setDoctors(fetchedDoctors); 
        setResults(fetchedDoctors); // Store original data in 'doctors'
        setSortedDoctors(fetchedDoctors.sort((a, b) => a.nombre.localeCompare(b.nombre))); 
      })
      .catch((error) => console.error("Error fetching doctors:", error));
  }, []);

  const searcher = (e) => {
    const searchTerm= e.target.value.toLowerCase();
    setSearch(searchTerm);
  
    const filteredPatients= doctors.filter(pat=> 
    pat.nombre.toLowerCase().includes(searchTerm)||
    pat.apellido.toLowerCase().includes(searchTerm)||
    pat.cedula.toString().includes(searchTerm)
  

    );
    setResults(searchTerm.trim === ""? doctors: filteredPatients)
  };

  
  const handleDelete = (codigo_doctor) => {
    setResults(prevResults => prevResults.filter(paciente => paciente.codigo_doctor !== codigo_doctor));
    setDoctors((prevDoctor) => prevDoctor.filter((doctor) => doctor.codigo_doctor !== codigo_doctor));
  };
  return (
    <div className="home">
      <div>
        <SideBarDoctores />
      </div>

      <div className="patientsTable">
      <div>
        <input style={{textAlign:"center"}} value={search} onChange={searcher} type="text" placeholder='Buscar Doctor' className='form-control' />
      </div>
      <div className="flex-container responsive-table">
        <Table striped bordered hover>
          <thead>
            <tr>
             
              <th>Nombre y Apellido</th>
              <th>Sexo</th>
              <th>Edad</th>
              <th>Cédula</th>
              <th>Especialidad</th>
              <th>Correo Electrónico</th>
              <th>Dirección</th>
              <th>Teléfono</th>
            
              <th></th>
            
              
            
           
              
              
            </tr>
          </thead>
          <tbody>
            {results.map((doctor) => (
              <TablaDoctores key={doctor.codigo_doctor} data={doctor}  onDelete={handleDelete} />
            ))}
          </tbody>
        </Table>
        </div>
      </div>
    </div>
  );
};

export default Doctors;