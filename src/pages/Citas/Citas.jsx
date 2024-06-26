import { useState, useEffect } from "react";

import Table from "react-bootstrap/Table";
import "../css/Home.css";
import SideBarCitas from "../../components/SideBarCitas.jsx";
import TablaCitas from "../../components/TablaCitas.jsx";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { API } from "../../utils/axios.js";
import { LS } from "../../utils/LS.js";

const Citas = () => {
  const [citas, setCitas] = useState([]);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const role = LS.getText("role");
    if (role) {
      setUserRole(role.trim()); // Eliminar espacios extra si los hay
    }
    setLoading(false); // Marcar la carga como completada
  }, []);

  

  useEffect(() => {
     API
      .get("/citas/traer")
      .then((response) => {
        const fetchedCitas = response.data;
        // Sort by date from today to the past
        const sortedCitas = fetchedCitas.sort((a, b) => new Date(b.fecha_cita) - new Date(a.fecha_cita));
        setCitas(sortedCitas);
        setResults(sortedCitas);
      })
      .catch((error) => console.error("Error fetching citas:", error));
  }, []);

  const searcher = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearch(searchTerm);

    const filteredCitas = citas.filter(
      (pat) =>
        pat.fecha_cita.toString().includes(searchTerm) ||
        pat.motivo.toLowerCase().includes(searchTerm) ||
        pat.unPaciente.nombre.toLowerCase().includes(searchTerm) ||
        pat.unPaciente.apellido.toLowerCase().includes(searchTerm) ||
        pat.unPaciente.cedula.toString().includes(searchTerm) ||
        pat.unDoctor.nombre.toLowerCase().includes(searchTerm) ||
        pat.unDoctor.apellido.toLowerCase().includes(searchTerm) ||
        pat.servicio.nombre.toLowerCase().includes(searchTerm) ||
        pat.estado.toLowerCase().includes(searchTerm)
    );
    setResults(searchTerm.trim() === "" ? citas : filteredCitas);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);

    if (date) {
      const formattedDate = date.toISOString().split("T")[0];

      const filteredCitas = citas.filter((cita) => {
        return cita.fecha_cita.includes(formattedDate);
      });

      setResults(filteredCitas);
    } else {
      setResults(citas);
    }
  };

  const handleDelete = (codigo_cita) => {
    setResults((prevResults) =>
      prevResults.filter((cita) => cita.codigo_cita !== codigo_cita)
    );
    setCitas((prevCitas) =>
      prevCitas.filter((cita) => cita.codigo_cita !== codigo_cita)
    );
  };

  return (
    <div className="home">
      <div>
        <SideBarCitas />
      </div>

      <div className="patientsTable">
        <div>
          <input
            style={{ textAlign: "center" }}
            value={search}
            onChange={searcher}
            type="text"
            placeholder="Buscar Cita"
            className="form-control"
          />
          <br />
          <div className="date-picker-container">
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="yyyy-MM-dd"
              className="form-control text-center"
              placeholderText="Seleccionar Fecha"
            />
          </div>
          <br />
          <span
            className="font-bold"
            data-toggle="tooltip"
            data-placement="top"
            title="Opciones de búsqueda: Fecha, Doctor, Motivo, Paciente"
          >
            Recuerda: Puedes buscar por fecha, por doctor, por motivo y por
            paciente
          </span>
          <br />
        </div>
        <div className="flex-container responsive-table">
          {results.length > 0 ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Fecha Cita</th>
                  <th>Nombre y Apellido del Paciente</th>
                  <th>Cedula</th>
                  <th>Doctor Asignado a la Cita</th>
                  <th>Tipo de Servicio</th>
                  <th>Motivo</th>
                  <th>Observaciones</th>
                  <th>Estado</th>
                 {userRole==='USER'? null:( <th></th>)} 
                </tr>
              </thead>
              <tbody>
                {results.map((cita) => (
                  <TablaCitas
                    key={cita.codigo_cita}
                    data={cita}
                    onDelete={handleDelete}
                  />
                ))}
              </tbody>
            </Table>
          ) : (
            <p>No se encontró.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Citas;
