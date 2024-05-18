import axios from 'axios';
import  { useEffect, useState } from 'react'
import Table from "react-bootstrap/Table"; 
import TablaServicios from '../../components/TablaServicios.jsx';
import SideBarServicios from '.././../components/SideBarServicio.jsx';

const Servicios = () => {
const [servicios, setServicios]=  useState([]);
const [search, setSearch]=useState("");
const [results, setResults]= useState([]);
const [sortedDoctors, setSortedDoctors] = useState([]);
useEffect(() => {
  axios
    .get("http://localhost:8080/servicios/traer")
    .then((response) => {
      const fetchedServicios = response.data;
      setServicios(fetchedServicios); 
      setResults(fetchedServicios); // Store original data in 'doctors'
      setSortedDoctors(fetchedServicios.sort((a, b) => a.nombre.localeCompare(b.nombre))); 
    })
    .catch((error) => console.error("Error fetching doctors:", error));
}, []);
      const searcher = (e) => {
        const searchTerm= e.target.value.toLowerCase();
        setSearch(searchTerm);
        console.log(searchTerm);
        const filteredServicios= servicios.filter(serv=> 
        serv.nombre.toLowerCase().includes(searchTerm)||
        serv.descripcion.toLowerCase().includes(searchTerm)

        );
        

        setResults(searchTerm.trim === ""? servicios: filteredServicios)
      };
      const handleDelete = (codigo_servicio) => {
        setResults(prevResults => prevResults.filter(serv => serv.codigo_servicio !== codigo_servicio));
        setServicios((prevServicios) => prevServicios.filter((serv) => serv.codigo_servicio !== codigo_servicio));
      };
  return (
    <div className="home">
    <div>
      <SideBarServicios className="home-sidebar" />
    </div>

    <div className="patientsTable">
    <div>
      <input style={{textAlign:"center"}} value={search} onChange={searcher} type="text" placeholder='Buscar Servicio' className='form-control' />
    </div>
    <div className="flex-container responsive-table">
      <Table striped bordered hover>
        <thead>
          <tr>
           
            <th>Nombre del Servicio</th>
            <th>Descripción del Servicio</th>
          
            <th ></th>
          
         
            
            
          </tr>
        </thead>
        <tbody>
          {results.map((servicio) => (
            <TablaServicios key={servicio.codigo_servicio} data={servicio}  onDelete={handleDelete} />
          ))}
        </tbody>
      </Table>
      </div>
    </div>
  </div>
  )
}

export default Servicios