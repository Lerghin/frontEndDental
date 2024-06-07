import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";

import { API } from "../../utils/axios";
import { RiArrowGoBackFill } from "react-icons/ri";
import { BiSolidSave } from "react-icons/bi";
import "../css/RegistroPaciente.css";
import SideBarHistorias from "../../components/SideBarHistorias";

const CreateHistoria = () => {
  const [doctores, setDoctores] = useState([]);
  const [userData, setUserData] = useState({
    paciente: "",
    diagnostico: "",
    secuenciaTratamiento: "",
  
  });
  const navigate = useNavigate();
  const [cedula, setCedula] = useState("");
  const [paciente, setPaciente] = useState({ nombre: "", apellido: "" });

  useEffect(() => {
    const fetchDoctores = async () => {
      try {
        const response = await API.get("http://localhost:8080/doctor/traer");
        setDoctores(response.data);
      
       
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctores();
  }, []);
 

  const handleCedulaChange = useCallback(async (e) => {
    const cedulaValue = e.target.value;
    setCedula(cedulaValue);

    if (cedulaValue.length >= 8) {
      try {
        const response = await API.get(`/pacientes/traerbycedula/${cedulaValue}`);
        if (response.data) {
          setPaciente({
            nombre: response.data.nombre,
            apellido: response.data.apellido,
          });
          setUserData((prevState) => ({ ...prevState, paciente: response.data }));
        } else {
          resetPaciente();
          toast.warning("¡Paciente no encontrado! Debe registrar al paciente antes de crear la Historia", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
        }
      } catch (error) {
        console.error("Error fetching paciente:", error);
        resetPaciente();
      }
    } else {
      resetPaciente();
    }
  }, []);

  const resetPaciente = () => {
    setPaciente({ nombre: "", apellido: "" });
    setUserData((prevState) => ({ ...prevState, unPaciente: "" }));
  };

  const handleChange = (e) => {
    if (e.target.name === "codigo_doctor") {
      const selectedDoctor = doctores.find((doc) => doc.codigo_doctor === e.target.value);
      const updatedDoctor = {
        codigo_doctor: selectedDoctor.codigo_doctor,
        nombre: selectedDoctor.nombre,
        apellido: selectedDoctor.apellido,
      };
      setUserData((prevUserData) => ({
        ...prevUserData,
        doctor: updatedDoctor,
      }));
    } else {
      setUserData({ ...userData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log( "lo que va ", userData)
    try {
      const { data } = await API.post("/historias/crear", userData);
      toast.success(data.message);
      alert("Historia Registrada con éxito");
      navigate("/histories");
    } catch (error) {
      const { message } = error.response.data;
      toast.error(message);
    }
  };

  return (
    <div className="home">
    <div>
      <SideBarHistorias className="home-sidebar" />
    </div>
    <Container>
      <h1 className="text-center font-bold my-10">Crear Historia</h1>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
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
       
        <Row>
          <Form.Group as={Col} controlId="formDiagnostico">
            <Form.Label>Diagnóstico</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              type="text"
              name="diagnostico"
              value={userData.diagnostico}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formSecuenciaTratamiento">
            <Form.Label>Tratamiento</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              type="text"
              onChange={handleChange}
              name="secuenciaTratamiento"
              value={userData.secuenciaTratamiento}
              
              required
            />
          </Form.Group>
        </Row>
        <br />
        <div className="d-flex justify-content-center gap-4">
          <Button variant="success" type="submit">
            <BiSolidSave />
          </Button>
          <Button onClick={() => navigate("/histories")} variant="secondary">
            <RiArrowGoBackFill />
          </Button>
        </div>
      </Form>
    </Container>
    </div>
  );
};

export default CreateHistoria;
