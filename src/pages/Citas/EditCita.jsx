import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { RiArrowGoBackFill } from "react-icons/ri";
import { BiSolidSave } from "react-icons/bi";
import DatePicker from "react-datepicker";

import "./../css/RegistroPaciente.css";
import "react-datepicker/dist/react-datepicker.css";
import SideBarCitas from "../../components/SideBarCitas";
import moment from 'moment';
import { API } from "../../utils/axios";

const EditCita = () => {
  const navigate = useNavigate();
  const { codigo_cita } = useParams();
  const [citas, setCitas] = useState({
    fecha_cita: new Date(),
    motivo: "",
    observaciones: "",
    estado: "",
    unPaciente: { codigoPaciente: "", cedula: "", nombre: "", apellido: "" },
    servicio: { codigo_servicio: "" },
    unDoctor: { codigo_doctor: "" },
  });
  const [servicios, setServicios] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [cedula, setCedula] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get(`http://localhost:8080/citas/traer/${codigo_cita}`);
        setCitas(response.data);
        setCedula(response.data.unPaciente.cedula);

        const responseDoctor = await API.get("http://localhost:8080/doctor/traer");
        setDoctors(responseDoctor.data);

        const responseServicios = await API.get("http://localhost:8080/servicios/traer");
        setServicios(responseServicios.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        //toast.error("Error al cargar los datos de la cita.");
      }
    };

    fetchData();

  }, [codigo_cita]);
  const handleChangeDate = (date) => {
    setCitas({ ...citas, fecha_cita: date });
  };
 

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCitas({ ...citas, [name]: value });
};
const handleServicioChange = (event) => {
  const { name, value } = event.target;
  setCitas({ ...citas, [name]: { codigo_servicio: value } });
};
const handleDoctorChange = (event) => {
  const { name, value } = event.target;
  setCitas({ ...citas, [name]:{ codigo_doctor: value } });
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const fechaCitaISO = moment(citas.fecha_cita).format('YYYY-MM-DD');
      const citaData = {
        ...citas,
        fecha_cita: fechaCitaISO,
        unPaciente: { codigoPaciente: citas.unPaciente.codigoPaciente },
        unDoctor: { codigo_doctor: citas.unDoctor.codigo_doctor },
        servicio: { codigo_servicio: citas.servicio.codigo_servicio },
      };
      await API.put("http://localhost:8080/admin/citas/editar", citaData);
      toast.success("Cita editada con éxito");
      console.log("citaData:",citaData)
      navigate("/citas");
    } catch (error) {
      console.error('Error editing cita:', error);
      toast.error("Error al editar la cita.");
    }
  };

  const handleCedulaChange = (e) => {
    const cedulaValue = e.target.value;
    setCedula(cedulaValue);

    if (cedulaValue.length >= 8) {
      API
        .get(`http://localhost:8080/pacientes/traerbycedula/${cedulaValue}`)
        .then((response) => {
          if (response.data) {
            setCitas({
              ...citas,
              unPaciente: {
                codigoPaciente: response.data.codigoPaciente,
                cedula: response.data.cedula,
                nombre: response.data.nombre,
                apellido: response.data.apellido,
              },
            });
          } else {
            setCitas({ ...citas, unPaciente: { codigoPaciente: "", cedula: "", nombre: "", apellido: "" } });
            toast.warning(
              "¡Paciente no encontrado! Debe registrar al paciente antes de crear la cita.",
              {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
              }
            );
          }
        })
        .catch((error) => {
          console.error("Error fetching paciente:", error);
          setCitas({ ...citas, unPaciente: { codigoPaciente: "", cedula: "", nombre: "", apellido: "" } });
        });
    } else {
      setCitas({ ...citas, unPaciente: { codigoPaciente: "", cedula: "", nombre: "", apellido: "" } });
    }
  };

  return (
    <>
      <div className="home">
        <div>
          <SideBarCitas className="home-sidebar" />
        </div>
        <Container>
          <h2 className="flex justify-center font-bold translate-x-4 m-10 font-">
            Editar Cita
          </h2>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formFecha_cita">
                <Form.Label>Fecha de la Cita</Form.Label>
                <DatePicker
                  selected={new Date(citas.fecha_cita)}
                  onChange={handleChangeDate}
                  dateFormat="yyyy-MM-dd"
                  placeholderText="Seleccionar fecha"
                  minDate={new Date()}
                  showYearDropdown
                  scrollableYearDropdown
                  yearDropdownItemNumber={10}
                  scrollableMonthYearDropdown
                  className="form-control text-center"
                  required
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formCedula">
                <Form.Label>Cédula del Paciente</Form.Label>
                <Form.Control
                  type="text"
                  name="cedula"
                  value={cedula}
                  onChange={handleCedulaChange}
                  required
                  readOnly
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formNombre">
                <Form.Label>Nombre del Paciente</Form.Label>
                <Form.Control
                  type="text"
                  name="nombre"
                  value={citas.unPaciente.nombre}
                  readOnly
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formApellido">
                <Form.Label>Apellido del Paciente</Form.Label>
                <Form.Control
                  type="text"
                  name="apellido"
                  value={citas.unPaciente.apellido}
                  readOnly
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formMotivo">
                <Form.Label>Motivo</Form.Label>
                <Form.Control
                  type="text"
                  name="motivo"
                  value={citas.motivo}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formObservaciones">
                <Form.Label>Observaciones</Form.Label>
                <Form.Control
                  type="text"
                  name="observaciones"
                  value={citas.observaciones}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formEstado">
                <Form.Label>Estado</Form.Label>
                <Form.Select
                  name="estado"
                  value={citas.estado}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Seleccione una opción...</option>
                  <option value="Pendiente">Pendiente</option>
                  <option value="Confirmada">Confirmada</option>
                  <option value="En curso">En curso</option>
                  <option value="Cancelada">Cancelada</option>
                  <option value="Reagendada">Reagendada</option>
                  <option value="En espera">En espera</option>
                  <option value="Atendido">Atendido</option>
                  <option value="No asistió">No asistió</option>
                </Form.Select>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} controlId="formServicio">
                <Form.Label>Servicio</Form.Label>
                <Form.Select
                  id="servicio"
                  name="servicio"
                  value={citas.servicio.codigo_servicio}
                  onChange={handleServicioChange}
                  required
                >
                  <option value="">Seleccione Servicio</option>
                  {servicios.map((serv) => (
                    <option key={serv.codigo_servicio} value={serv.codigo_servicio}>
                      {serv.nombre}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col} controlId="formUnDoctor">
                <Form.Label>Doctor</Form.Label>
                <Form.Select
                  id="doctor"
                  name="unDoctor"
                  value={citas.unDoctor.codigo_doctor}
                  onChange={handleDoctorChange}
                >
                  <option value="">Seleccionar Doctor</option>
                  {doctors.map((doc) => (
                    <option key={doc.codigo_doctor} value={doc.codigo_doctor}>
                      {doc.nombre} {doc.apellido}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Row>
            <br />
            <div className="flex justify-center gap-4">
              <Button variant="success" type="submit">
                <BiSolidSave />
              </Button>
              <Button onClick={() => navigate("/citas")} variant="secondary">
                <RiArrowGoBackFill />
              </Button>
            </div>
          </Form>
        </Container>
      </div>
    </>
  );
};

export default EditCita;
