import { useState, useEffect } from "react";
import SideBarPacientes from ".././../components/SideBarPacientes";
import axios from "axios";
import TablaPaciente from "../../components/TablaPaciente";
import Table from "react-bootstrap/Table"; // Asegúrate de importar la tabla
import "../css/Home.css";

const Pacientes = () => {
  const [pacientes, setPacientes] = useState([]);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [sortedPacientes, setSortedPacientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try{
    axios
      .get("http://localhost:8080/pacientesdr/traer")
      .then((response) => {
        const fetchedPat = response.data;
        setPacientes(fetchedPat);
        console.log(fetchedPat);
        setResults(fetchedPat);
        setSortedPacientes(fetchedPat.sort((a, b) => a.nombre.localeCompare(b.nombre)));
      })
     } catch (error) {
        setError(error.message);
    } finally {
        setLoading(false);
    }
  }, []);
  if (loading) {
    return <p>Cargando...</p>;
}

if (error) {
    return <p>Error: {error}</p>;
}

if (!pacientes || !results) {
    return <p>No se encontró información del paciente.</p>;
}
  const searcher = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearch(searchTerm);
    console.log(searchTerm);

    const filteredPatients = pacientes.filter(
      (pat) =>
        pat.nombre.toLowerCase().includes(searchTerm) ||
        pat.apellido.toLowerCase().includes(searchTerm) ||
        pat.nombreDoctor.toLowerCase().includes(searchTerm) ||
        pat.cedula.toString().includes(searchTerm)
    );
    setResults(searchTerm.trim() === "" ? pacientes : filteredPatients);
  };

  const handleDelete = (codigo_paciente) => {
    setResults((prevResults) => prevResults.filter((paciente) => paciente.codigo_paciente !== codigo_paciente));
    setPacientes((prevPacientes) => prevPacientes.filter((paciente) => paciente.codigo_paciente !== codigo_paciente));
  };

  return (
    <div className="home">
      <div>
        <SideBarPacientes className="home-sidebar" />
      </div>

      <div className="patientsTable">
        <div>
          <input
            style={{ textAlign: "center" }}
            value={search}
            onChange={searcher}
            type="text"
            placeholder="Buscar Paciente"
            className="form-control"
          />
        </div>
        <div className="flex-container responsive-table">
          {results.length > 0 ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Nombre y Apellido</th>
                  <th>Sexo</th>
                  <th>Edad</th>
                  <th>Cédula</th>
                  <th>Correo Electrónico</th>
                  <th>Dirección</th>
                  <th>Teléfono</th>
                  <th>Doctor Asignado</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {results.map((paciente) => (
                  <TablaPaciente key={paciente.codigo_paciente} data={paciente} onDelete={handleDelete} />
                ))}
              </tbody>
            </Table>
          ) : (
            <p>No se encontró</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pacientes;
