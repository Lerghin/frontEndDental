import { useState, useEffect } from "react";
import SideBarPacientes from "../../components/SideBarPacientes";

import TablaPaciente from "../../components/TablaPaciente";
import Table from "react-bootstrap/Table";
import "../css/Home.css";
import { API } from "../../utils/axios";
import { LS } from "../../utils/LS";

const Pacientes = () => {
  const [pacientes, setPacientes] = useState([]);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [sortedPacientes, setSortedPacientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const role = LS.getText("role");
    if (role) {
      setUserRole(role.trim()); // Eliminar espacios extra si los hay
    }

  }, []);

  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const response = await API.get("/pacientesdr/traer");
        const fetchedPat = response.data;
        setPacientes(fetchedPat);
        setResults(fetchedPat);
        setSortedPacientes(fetchedPat.sort((a, b) => a.nombre.localeCompare(b.nombre)));
      } catch (error) {
        console.error('Error fetching patients:', error); // Log de error
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPacientes();
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
                 {userRole==='USER'? null:( <th></th>)}
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
