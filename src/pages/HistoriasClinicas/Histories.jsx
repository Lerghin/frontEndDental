
import { useState, useEffect } from "react";



import Table from "react-bootstrap/Table"; // Asegúrate de importar la tabla
import "../css/Home.css";
import TablaHistoria from "../../components/TablaHistoria";
import SideBarHistorias from "../../components/SideBarHistorias";
import { API } from "../../utils/axios";
import { LS } from "../../utils/LS";


const Histories = () => {
  const [histories, setHistories] = useState([]);
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
    hist.codigo_historia.toString().includes(searchTerm)||
    hist.diagnostico.toLowerCase().includes(searchTerm)||
    hist.paciente.nombre.toLowerCase().includes(searchTerm)
  

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
        <input style={{textAlign:"center"}} value={search} onChange={searcher} type="text" placeholder='Buscar historia' className='form-control' />
      </div>
      <div className="flex-container responsive-table">
        <Table striped bordered hover>
          <thead>
            <tr>
             
              <th>Codigo_Historia</th>
              <th>Paciente</th>
              <th>Diagnostico</th>
              <th>Secuencia_Tratamiento</th>
        
           
             {userRole==="USER"? null :(<th ></th>)} 
            
           
              
              
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