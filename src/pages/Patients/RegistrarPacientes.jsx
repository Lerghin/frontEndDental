import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SideBarPacientes from "../../components/SideBarPacientes";
import axios from "axios";
import DatePicker from "react-datepicker";
import { API } from "../../utils/axios";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import "../css/RegistroPaciente.css";

const RegistrarPacientes = () => {
  const [doctor, setDoctor] = useState([]);
  const [userData, setUserData] = useState({
    nombre: "",
    apellido: "",
    sexo: "",
    cedula: "",
    direccion: "",
    telefono: "",
    correoElectronico: "",
    codigo_doctor: "",
    fecha_nacimiento: new Date(),
  });
  const navigate = useNavigate();

  useEffect(() => {
    API
      .get("http://localhost:8080/doctor/traer")
      .then((response) => {
        setDoctor(response.data);
      })
      .catch((error) => {
        console.error("Error fetching options:", error);
      });
  }, []);

  const handleChangeDate = (date) => {
    setUserData({ ...userData, fecha_nacimiento: date });
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const { data } = await API.post("/pacientes/crear/", userData);
      toast.success(data.message);
      alert("Paciente Registrado con éxito");
      navigate("/patients");
    } catch (error) {
      const { message } = error.response.data;
      toast.error(message);
    }
  };

  return (
    <div className="home">
      <div>
        <SideBarPacientes className="home-sidebar" />
      </div>
      <Container className="registrar p-8">
        <div className="sign-container">
          <div className="sign-card">
            <Form className="sign-form" onSubmit={(e) => e.preventDefault()}>
              <h2 className="form-heading">Registrar Paciente</h2>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formNombre">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    name="nombre"
                    value={userData.nombre}
                    onChange={handleChange}
                    placeholder="Ingresa nombre"
                    required
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formApellido">
                  <Form.Label>Apellido</Form.Label>
                  <Form.Control
                    type="text"
                    name="apellido"
                    value={userData.apellido}
                    onChange={handleChange}
                    placeholder="Ingresa apellido"
                    required
                  />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formSexo">
                  <Form.Label>Sexo</Form.Label>
                  <Form.Select name="sexo" value={userData.sexo} onChange={handleChange} required>
                    <option value="">Seleccione</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group as={Col} controlId="formCedula">
                  <Form.Label>Cédula</Form.Label>
                  <Form.Control
                    type="text"
                    name="cedula"
                    value={userData.cedula}
                    onChange={handleChange}
                    placeholder="Ingrese su Cédula"
                    required
                  />
                </Form.Group>
              </Row>

              <Form.Group className="mb-3" controlId="formFechaNacimiento">
                <Form.Label>Fecha de Nacimiento</Form.Label>
                <DatePicker
                  selected={userData.fecha_nacimiento}
                  onChange={handleChangeDate}
                  dateFormat="yyyy-MM-dd"
                  maxDate={new Date()}
                  placeholderText="Seleccionar fecha"
                  showYearDropdown
                  scrollableYearDropdown
                  yearDropdownItemNumber={100}
                  scrollableMonthYearDropdown
                  className="form-control"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formDireccion">
                <Form.Label>Dirección</Form.Label>
                <Form.Control
                  as="textarea"
                  name="direccion"
                  value={userData.direccion}
                  onChange={handleChange}
                  placeholder="Ingrese su Dirección"
                  required
                />
              </Form.Group>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formTelefono">
                  <Form.Label>Teléfono</Form.Label>
                  <Form.Control
                    type="text"
                    name="telefono"
                    value={userData.telefono}
                    onChange={handleChange}
                    placeholder="Ingrese num teléfono"
                    required
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formCorreo">
                  <Form.Label>Correo</Form.Label>
                  <Form.Control
                    type="email"
                    name="correoElectronico"
                    value={userData.correoElectronico}
                    onChange={handleChange}
                    placeholder="Ingrese su email"
                    required
                  />
                </Form.Group>
              </Row>

              <Form.Group className="mb-3" controlId="formDoctor">
                <Form.Label>Doctor Asignado</Form.Label>
                <Form.Select name="codigo_doctor" value={userData.codigo_doctor} onChange={handleChange} required>
                  <option value="">Seleccione una opción...</option>
                  {doctor.map((doc) => (
                    <option key={doc.codigo_doctor} value={doc.codigo_doctor}>
                      {doc.nombre} {doc.apellido}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <div className="form-actions">
                <Button variant="secondary" onClick={handleSubmit}>
                  Registrar
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default RegistrarPacientes;
