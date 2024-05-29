import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";


import "./../css/RegistroPaciente.css";
import "react-datepicker/dist/react-datepicker.css";
import { RiArrowGoBackFill } from "react-icons/ri";
import { BiSolidSave } from "react-icons/bi";
import { API } from "../../utils/axios";
import "../css/RegistroPaciente.css";
const CreateHorarios = () => {
  const [doctor, setDoctor] = useState([]);
  const [userData, setUserData] = useState({
    codigo_doctor: "",
    diaSemana: "",
    horaInicio: "",
    horaFin: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    API
      .get("http://localhost:8080/doctor/traer")
      .then((response) => {
        setDoctor(response.data);
        //console.log(response.data)
      })
      .catch((error) => {
        console.error("Error fetching options:", error);
      });
  }, []);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Datos a enviar:", userData); // Agregar este console.log para imprimir los datos antes de enviar la solicitud
      const { data } = await API.post("/horarios/crear", userData);
      console.log(data);
      toast.success(data.message);
      alert("Horario Registrado con éxito");
      navigate("/horarios");
    } catch (error) {
      const { message } = error.response.data;
      console.log(error);
      toast.error(message);
    }
  };

  return (
    <Container>
      <h2 className="flex justify-center font-bold translate-x-4 m-10 font-">
        Crear Horario
      </h2>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formDiaSemana">
            <Form.Label>Día de la Semana</Form.Label>
            <Form.Select
              name="diaSemana"
              value={userData.diaSemana}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione una opción...</option>
              <option value="Lunes">Lunes</option>
              <option value="Martes">Martes</option>
              <option value="Miércoles">Miércoles</option>
              <option value="Jueves">Jueves</option>
              <option value="Viernes">Viernes</option>
              <option value="Sábado">Sábado</option>
              <option value="Domingo">Domingo</option>
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col} controlId="formhoraInicio">
            <Form.Label>Hora de Inicio</Form.Label>
            <Form.Select
              name="horaInicio"
              value={userData.horaInicio}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione una opción...</option>
              <option value="08:00am">08:00 AM</option>
              <option value="01:00pm">01:00 PM</option>
            </Form.Select>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formHoraFin">
            <Form.Label>Hora de Cierre</Form.Label>
            <Form.Select
              name="horaFin"
              value={userData.horaFin}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione una opción...</option>
              <option value="12:00pm">12:00 PM</option>
              <option value="06:00pm">06:00 PM</option>
            </Form.Select>
          </Form.Group>
        </Row>
        <Row>
          <Form.Select
            id="doctor"
            name="codigo_doctor"
            value={userData.codigo_doctor}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione una opción...</option>
            {doctor.map((doc) => (
              <option key={doc.codigo_doctor} value={doc.codigo_doctor}>
                {doc.nombre} {doc.apellido}
              </option>
            ))}
          </Form.Select>
        </Row>
        <br></br>
        <div className="flex justify-center  gap-4">
          <Button variant="success" type="submit">
            <BiSolidSave />{" "}
          </Button>
          <Button onClick={() => navigate("/horarios")} variant="secondary">
            <RiArrowGoBackFill />
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default CreateHorarios;
