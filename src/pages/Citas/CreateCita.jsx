import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { RiArrowGoBackFill } from "react-icons/ri";
import { BiSolidSave } from "react-icons/bi";
import { API } from "../../utils/axios";
import DatePicker from "react-datepicker";

import "./../css/RegistroPaciente.css";
import "react-datepicker/dist/react-datepicker.css";
import SideBarCitas from "../../components/SideBarCitas";

const CreateCita = () => {
  const navigate = useNavigate();
  const [servicios, setServicios]=  useState([]);

  const [cedula, setCedula] = useState("");
  const [doctors, setDoctors]= useState([])
  const [paciente, setPaciente] = useState({ nombre: "", apellido: "" });
  const [userData, setUserData] = useState({
    estado: '',
    motivo: '',
    fecha_cita: '',
    observaciones: '',
    servicio: '',
    historiaClinica: '',
    unDoctor: '',
    unPaciente: ''
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleChangeDate = (date) => {
    setUserData({ ...userData, fecha_cita: date });
  };
 

  const handleCedulaChange = (e) => {
    const cedulaValue = e.target.value;
    setCedula(cedulaValue);

    if (cedulaValue.length >= 8) {
      API
        .get(`http://localhost:8080/pacientes/traerbycedula/${cedulaValue}`)
        .then((response) => {
          if (response.data) {
            setPaciente({
              nombre: response.data.nombre,
              apellido: response.data.apellido,
            });
            setUserData({ ...userData, unPaciente: response.data });
            console.log(response.data)
          } else {
            setPaciente({ nombre: "", apellido: "" });
            setUserData({ ...userData, unPaciente: "" });
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
          setPaciente({ nombre: "", apellido: "" });
          setUserData({ ...userData, unPaciente: "" });
        });
    } else {
      setPaciente({ nombre: "", apellido: "" });
      setUserData({ ...userData, unPaciente: "" });
    }
  };

  useEffect(() => {
    API
      .get("http://localhost:8080/servicios/traer")
      .then((response) => {
        const fetchedServicios = response.data;
        setServicios(fetchedServicios); 
      })
      .catch((error) => console.error("Error fetching doctors:", error));
  }, []);
  useEffect(() => {
    API
      .get("http://localhost:8080/doctor/traer")
      .then((response) => {
        const fetchedDoctors = response.data;
        setDoctors(fetchedDoctors); 
      
      })
      .catch((error) => console.error("Error fetching doctors:", error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const citaData = {
            ...userData,
            unPaciente: { codigoPaciente: userData.unPaciente.codigoPaciente },
            unDoctor: { codigo_doctor: userData.unDoctor },
            servicio: { codigo_servicio: userData.servicio },
            historiaClinica: userData.historiaClinica ? { historia_clinica_id: userData.historiaClinica } : null
        };
        //console.log("Datos a enviar:", citaData);
        const { data } = await API.post("/citas/crear", citaData);
        console.log(data);
        toast.success(data.message);
        alert("Cita Registrada con éxito");
        navigate("/citas");
    } catch (error) {
        const { message } = error.response.data;
        //console.log(error);
        toast.error(message);
    }
};

  return (
 <>
  <div className="home">
  <div >
    <SideBarCitas className="home-sidebar" />
  </div>
    <Container>
      <h2 className="flex justify-center font-bold translate-x-4 m-10 font-">
        Registrar Cita
      </h2>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formFecha_cita">
            <Form.Label>Fecha de la Cita</Form.Label>
            <DatePicker
              id="fecha_cita"
              selected={userData.fecha_cita}
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
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formNombre">
            <Form.Label>Nombre del Paciente</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              value={paciente.nombre}
              readOnly
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formApellido">
            <Form.Label>Apellido del Paciente</Form.Label>
            <Form.Control
              type="text"
              name="apellido"
              value={paciente.apellido}
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
              value={userData.motivo}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formObservaciones">
            <Form.Label>Observaciones</Form.Label>
            <Form.Control
              type="text"
              name="observaciones"
              value={userData.observaciones}
              onChange={handleChange}
              required
            />
          </Form.Group >
          <Form.Group as={Col} controlId="formEstado">
            <Form.Label>Estado</Form.Label>
            <Form.Select
              name="estado"
              value={userData.estado}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione una opción...</option>
              <option value="Pendiente">Pendiente</option>
              <option value="Confirmada">Confirmada</option>
              <option value="En curso">En curso</option>
              <option value=" Cancelada"> Cancelada</option>
              <option value=" Reagendada"> Reagendada</option>
              <option value=" En espera"> En espera</option>
              <option value=" Atendido"> Atendido</option>
              <option value="  No asistió"> No asistió</option>
            </Form.Select>
          </Form.Group>

        </Row>
        <Row>
        <Form.Group as={Col} controlId="formServicio">
        <Form.Label>Servicio</Form.Label>
            <Form.Select 
            id="servicio"
            name="servicio"
            value={userData.servicio}
            onChange={handleChange}
            required
          > 
            <option value="">Seleccione Servicio</option>
        {servicios.map(serv => (
          <option key={serv.codigo_servicio} value={serv.codigo_servicio}>{serv.nombre}</option>
        ))}

            </Form.Select>
           
          </Form.Group>
          <Form.Group as={Col} controlId="formUnDoctor">
        <Form.Label>Doctor</Form.Label>
            <Form.Select 
            id="doctor"
            name="unDoctor"
            value={userData.unDoctor}
            onChange={handleChange}
            required
          > 
           <option value="">Seleccionar Doctor</option>
        {doctors.map(doc => (
          <option key={doc.codigo_doctor} value={doc.codigo_doctor}>{doc.nombre} {doc.apellido}</option>
        ))}

            </Form.Select>
           
          </Form.Group>




        </Row>
        <br />
        <div className="flex justify-center gap-4">
          <Button variant="success" type="submit">
            <BiSolidSave /> 
          </Button>
          <Button onClick={() => navigate("/services")} variant="secondary">
            <RiArrowGoBackFill /> 
          </Button>
        </div>
      </Form>
    </Container>
    </div>
    </>
  );
};

export default CreateCita;
