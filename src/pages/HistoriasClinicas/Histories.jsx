
import { useState, useEffect } from "react";

import axios from "axios";

import Table from "react-bootstrap/Table"; // Asegúrate de importar la tabla
import "../css/Home.css";
import TablaHistoria from "../../components/TablaHistoria";
import SideBarHistorias from "../../components/SideBarHistorias";


const Histories = () => {
  const [histories, setHistories] = useState([]);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8080/historias/traer")
      .then((response) => {
        setHistories(response.data);
        console.log(response.data)
        setResults(response.data)
        
      })
      .catch((error) => console.error("Error fetching historia:", error));
  }, []);

  const searcher = (e) => {
    const searchTerm= e.target.value.toLowerCase();
    setSearch(searchTerm);
    console.log(searchTerm);
    const filteredHistories= histories.filter(hist=> 
    hist.codigo_historia.toLowerCase().includes(searchTerm)||
    hist.diagnotico.toLowerCase().includes(searchTerm)||
    hist.nombrePaciente.toString().includes(searchTerm)
  

    );
    setResults(searchTerm.trim === ""? histories: filteredHistories)
  };

  
  const handleDelete = (codigo_historia) => {
    setResults(prevResults => prevResults.filter(history => history.codigo_historia !== codigo_historia));
    setHistories((prevHistories) => prevHistories.filter((history) => history.codigo_historia !== codigo_historia));
  };
  return (
    <div className="home">
      <div>
        <SideBarHistorias className="home-sidebar" />
      </div>

      <div className="patientsTable">
      <div>
        <input style={{textAlign:"center"}} value={search} onChange={searcher} type="text" placeholder='Buscar Paciente' className='form-control' />
      </div>
      <div className="flex-container responsive-table">
        <Table striped bordered hover>
          <thead>
            <tr>
             
              <th>Codigo_Historia</th>
              <th>Paciente</th>
              <th>Doctor</th>
              <th>Diagnostico</th>
              <th>Secuencia_Tratamiento</th>
              <th>Debe</th>
           
              <th ></th>
            
           
              
              
            </tr>
          </thead>
          <tbody>
            {results.map((history) => (
              <TablaHistoria key={history.codigo_historia} data={history}  onDelete={handleDelete} />
            ))}
          </tbody>
        </Table>
        </div>
      </div>
    </div>
  );
};

export default Histories;