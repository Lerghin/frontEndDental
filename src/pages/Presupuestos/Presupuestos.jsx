

import  { useEffect, useState } from 'react'
import Table from "react-bootstrap/Table"; 

import TablaPresupuesto from '../../components/TablaPresupuesto.jsx';
import SideBarPresupuesto from '../../components/SideBarPresupuesto.jsx';
import { API } from '../../utils/axios.js';
import { LS } from '../../utils/LS.js';

const  Presupuestos = () => {
const [presu, setPresu]=  useState([]);
const [search, setSearch]=useState("");
const [results, setResults]= useState([]);
const [userRole, setUserRole] = useState(null);

useEffect(() => {
  const role = LS.getText("role");
  if (role) {
    setUserRole(role.trim()); // Eliminar espacios extra si los hay
  }

}, []); 
useEffect(() => {
  API
    .get("/presu/traer")
    .then((response) => {
      const fetchedPresu = response.data;
    
      setPresu(fetchedPresu); 
      setResults(fetchedPresu); 
    
    })
    .catch((error) => console.error("Error fetching doctors:", error));
}, []);
      const searcher = (e) => {
        const searchTerm= e.target.value.toLowerCase();
        setSearch(searchTerm);
       
        const filteredPresu= presu.filter(pre=> 
        pre.nombre.toLowerCase().includes(searchTerm)||
        pre.cedula.toString().includes(searchTerm)||
        pre.apellido.toLowerCase().includes(searchTerm)||
        pre.codigo_presupuesto.toString().includes(searchTerm)
      
        );
        

        setResults(searchTerm.trim === ""? presu: filteredPresu)
      };
      const handleDelete = (codigo_presupuesto) => {
        setResults(prevResults => prevResults.filter(pre => pre.codigo_presupuesto !== codigo_presupuesto));
        setPresu((prevPresu) => prevPresu.filter((pre) => pre.codigo_presupuesto !== codigo_presupuesto));
      };
  return (
    <div className="home">
    <div>
      <SideBarPresupuesto className="home-sidebar" />
    </div>

    <div className="patientsTable">
    <div>
      <input style={{textAlign:"center"}} value={search} onChange={searcher} type="text" placeholder='Buscar Presupuesto' className='form-control' />
    </div>
    <div className="flex-container responsive-table">
      <Table striped bordered hover>
        <thead>
          <tr>
          <th>Nº de Presupuesto</th>
            <th>Nombre del Paciente</th>
            <th>Apellido del Paciente</th>
            <th>Cedula de Identidad</th>
            <th >Total a Pagar</th>
            {userRole==='USER'? null:( <th></th>)}
          
         
            
            
          </tr>
        </thead>
        <tbody>
          {results.map((pre) => (
            <TablaPresupuesto key={pre.codigo_presupuesto} data={pre}  onDelete={handleDelete} />
          ))}
        </tbody>
      </Table>
      </div>
    </div>
  </div>
  )
}

export default Presupuestos