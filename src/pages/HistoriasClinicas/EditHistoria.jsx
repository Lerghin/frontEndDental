import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { RiArrowGoBackFill } from "react-icons/ri";
import { BiSolidSave } from "react-icons/bi";

import "./../css/RegistroPaciente.css";
import "react-datepicker/dist/react-datepicker.css";
import SideBarHistorias from "../../components/SideBarHistorias";
import { API } from "../../utils/axios";


const EditHistoria = () => {
  const navigate = useNavigate();
  const { codigo_historia } = useParams();
  const [historias, setHistorias] = useState({
    codigo_historia: "",
    motivo: "",
    diagnostico: "",
    secuenciaTratamiento: "",
    paciente: { codigoPaciente: "", cedula: "", nombre: "", apellido: "" },
    
  });



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get(`/historias/traer/${codigo_historia}`);
        setHistorias(response.data);
      
        console.log(response.data.paciente)

      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error("Error al cargar los datos de la historia");
      }
    };

    fetchData();

  }, [codigo_historia]);


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setHistorias({ ...historias, [name]: value });
};



  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(historias)
    try {
    
      await API.put("/historias/editar", historias);
      toast.success("Historia editada con éxito");
      console.log("data:",historias)
      navigate("/histories");
    } catch (error) {
      console.error('Error editing cita:', error);
      toast.error("Error al editar la historia.");
    }
  };

 

  return (
    <>
     <div className="home">
    <div>
      <SideBarHistorias className="home-sidebar" />
    </div>
      <Container>
      <h1 className="text-center font-bold my-10">Editar Historia</h1>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formCedula">
            <Form.Label>Cédula del Paciente</Form.Label>
            <Form.Control
              type="text"
              name="cedula"
              value={historias.paciente.cedula}
              onChange={handleInputChange}
              required
              readOnly
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formNombre">
            <Form.Label>Nombre del Paciente</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              value={historias.paciente.nombre}
              readOnly
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formApellido">
            <Form.Label>Apellido del Paciente</Form.Label>
            <Form.Control
              type="text"
              name="apellido"
              value={historias.paciente.apellido}
          
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
              value={historias.diagnostico}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formSecuenciaTratamiento">
            <Form.Label>Tratamiento</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              type="text"
              onChange={handleInputChange}
              name="secuenciaTratamiento"
              value={historias.secuenciaTratamiento}
              
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
    </>
  );
};

export default EditHistoria;
