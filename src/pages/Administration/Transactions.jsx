import { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import "../css/Home.css";


import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import TablaTransactions from "../../components/TablaTransactiosn.jsx";
import SideBarTrans from "../../components/SideBarTrans.jsx";

const Transactions = () => {
  const [trans, setTrans] = useState([]);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/trans/traer")
      .then((response) => {
        const fetchedCitas = response.data;
     
      
        setTrans(fetchedCitas);
        setResults(fetchedCitas);
      })
      .catch((error) => console.error("Error fetching citas:", error));
  }, []);

  const searcher = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearch(searchTerm);

    const filteredCitas = trans.filter(
      (pat) =>
        pat.fecha.toString().includes(searchTerm) ||
    
        pat.paciente.nombre.toLowerCase().includes(searchTerm) ||
        pat.paciente.apellido.toLowerCase().includes(searchTerm) ||
        pat.paciente.cedula.toString().includes(searchTerm)

    );
    setResults(searchTerm.trim() === "" ? trans : filteredCitas);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);

    if (date) {
      const formattedDate = date.toISOString().split("T")[0];

      const filteredCitas = trans.filter((trans) => {
        return trans.fecha.includes(formattedDate);
      });

      setResults(filteredCitas);
    } else {
      setResults(trans);
    }
  };

  const handleDelete = (codigo_transaccion) => {
    
    setResults((prevResults) =>
      prevResults.filter((trans) => trans.codigo_transaccion !== codigo_transaccion)
    );
    setTrans((prevCitas) =>
      prevCitas.filter((cita) => cita.codigo_transaccion !== codigo_transaccion)
    );
  };

  return (
    <div className="home">
      <div>
        <SideBarTrans />
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
            Recuerda: Puedes buscar por fecha, por nombre del paciente, por cedula
          </span>
          <br />
        </div>
        <div className="flex-container responsive-table">
          {results.length > 0 ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                 <th>Nº de Recibo</th>
                  <th>Fecha</th>
                  <th>Nombre y Apellido del Paciente</th>
                  <th>Cedula</th>
                  <th>Saldo Deudor</th>
                  <th>Monto Cancelado</th>
                  <th>Met. de Pago</th>
                  <th>Observaciones</th>
                  <th>% Doctor</th>
                  <th>% Clínica</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {results.map((trans) => (
                  < TablaTransactions
                    key={trans.codigo_transaccion}
                    data={trans}
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

export default Transactions;
