import axios from 'axios';
import  { useEffect, useState } from 'react'

const Servicios = () => {
    const [servicios, setServicios]=  useState([]);
const [results, setResults]= useState([]);
    useEffect(() => {
        axios
          .get("http://localhost:8080/servicios/traer")
          .then((response) => {
     
            setServicios(response.data);
            setResults(response.data)
           console.log(response.data)
            
          })
          .catch((error) => console.error("Error fetching pacientes:", error));
      }, []);
  return (
    <div>hola</div>
  )
}

export default Servicios