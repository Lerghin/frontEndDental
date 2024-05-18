import { useState } from "react";
import {  useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";

import "./../css/RegistroPaciente.css";
import "react-datepicker/dist/react-datepicker.css";
import { RiArrowGoBackFill } from "react-icons/ri";
import { BiSolidSave } from "react-icons/bi";
import { API } from "../../utils/axios";
import "../css/RegistroPaciente.css";


const CreateService = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    codigo_servicio: "",
    nombre: "",
    descripcion: "",
  
  });
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Datos a enviar:", userData); // Agregar este console.log para imprimir los datos antes de enviar la solicitud
      const { data } = await API.post("/servicios/crear", userData);
      console.log(data);
      toast.success(data.message);
      alert("Servicio Registrado con éxito");
      navigate("/services");
    } catch (error) {
      const { message } = error.response.data;
      console.log(error);
      toast.error(message);
    }
  };
  return (
    <Container>
    <h2 className="flex justify-center font-bold translate-x-4 m-10 font-">
      Crear Servicio
    </h2>
    <Form onSubmit={handleSubmit}>
      <Row className="mb-3">
      <Form.Group as={Col} controlId="formNombre">
            <Form.Label>Nombre Del Servicio</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              value={userData.nombre}
              onChange={handleChange}
            />
          </Form.Group>
     
      </Row>
      <Row className="mb-3">
      <Form.Group as={Col} controlId="fomDescripcion">
            <Form.Label>Descripción del Servicio</Form.Label>
            <Form.Control
              type="text"
              as="textarea" rows={5}
              name="descripcion"
              value={userData.descripcion}
              onChange={handleChange}
            />
          </Form.Group>
      </Row>
     
      <br></br>
      <div className="flex justify-center  gap-4">
        <Button variant="success" type="submit">
          <BiSolidSave />{" "}
        </Button>
        <Button onClick={() => navigate("/services")} variant="secondary">
          <RiArrowGoBackFill />
        </Button>
      </div>
    </Form>
  </Container>
  )
}

export default CreateService