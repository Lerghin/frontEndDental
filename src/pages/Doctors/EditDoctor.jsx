
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { RiArrowGoBackFill } from "react-icons/ri";
import { BiSolidSave } from "react-icons/bi";
import { toast } from "react-toastify";
import { API } from "../../utils/axios";
const EditDoctor = () => {
  const [doctor, setDoctor] = useState(null);
  const [horarios, setHorarios] = useState(null);
  const navigate = useNavigate();
  const params = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get(
          `http://localhost:8080/doctor/traer/${params.codigo_doctor}`
        );
        const responseHorarios = await API.get(
          "http://localhost:8080/onlyhorarios/traer"
        );
        setDoctor(response.data);
        setHorarios(responseHorarios.data);
  

      
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      }
    };

    fetchData();
  }, [params.codigo_doctor]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDoctor({ ...doctor, [name]: value });
   
  };


  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    const horarioSeleccionado = horarios.find(
      (horario) => horario.horario_id.toString() === value
    );
  
    setDoctor((prevDoctor) => {
      const doctorActualizado = { ...prevDoctor };
      if (checked) {
        doctorActualizado.horarios.push(horarioSeleccionado);
      } else {
        doctorActualizado.horarios = doctorActualizado.horarios.filter(
          (h) => h.horario_id !== horarioSeleccionado.horario_id
        );
      }
      console.log(doctorActualizado)
      return doctorActualizado;
    });
  };
  
  
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
       
      const { data } = await API.put(
        `http://localhost:8080/admin/doctor/editar/${params.codigo_doctor}`,
        doctor
      );
      if (data) {
        // Si la respuesta es exitosa, mostrar un mensaje de éxito
        toast.success(data.message);
        alert("Doctor Modificado con éxito");
        navigate("/doctors");
        console.log("Doctor actualizado correctamente");
      }
    
    } catch (error) {
      toast.success(error.message);
      console.error("Error updating paciente:", error);
    }
  };

  if (!doctor) {
    return <p>Cargando...</p>;
  }

  return (
    <Container>
      <h2 className="flex justify-center font-bold translate-x-4 m-10 font-">
        Editar Doctor
      </h2>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formNombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              value={doctor.nombre}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formApellido">
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              type="text"
              name="apellido"
              value={doctor.apellido}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formSexo">
            <Form.Label>Sexo</Form.Label>
            <Form.Control
              type="text"
              name="sexo"
              value={doctor.sexo}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formCedula">
            <Form.Label>Cédula</Form.Label>
            <Form.Control
              type="text"
              name="cedula"
              value={doctor.cedula}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formEdad">
            <Form.Label>Edad</Form.Label>
            <Form.Control
              type="text"
              name="edad"
              value={doctor.edad}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formFecha_Nacimiento">
            <Form.Label>Fecha Nacimiento</Form.Label>
            <Form.Control
              type="text"
              name="fecha_nacimiento"
              value={doctor.fecha_nacimiento}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formDireccion">
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              type="text"
              name="direccion"
              value={doctor.direccion}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formTelefono">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              type="text"
              name="telefono"
              value={doctor.telefono}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formCorreoElectronico">
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control
              type="email"
              name="correoElectronico"
              value={doctor.correoElectronico}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formEspecialidad">
          <Form.Label> Especialidad</Form.Label>
          <Form.Control
              type="text"
              name="especialidad"
              value={doctor.especialidad}
              onChange={handleInputChange}
            />
        

          </Form.Group>

          </Row>
          <Row>
          <Form.Group as={Col}>
            <Form.Label htmlFor="doctor">Horario Asignado:</Form.Label>
           
              {horarios && (
                <div className="form-group">
                  <label>Horarios:</label>
                  {horarios.map((horario) => (
                    <div key={horario.horario_id} className="checkbox-group">
                      <input
                        type="checkbox"
                        id={horario.horario_id}
                        name={horario.horario_id}
                        value={horario.horario_id}
                        onChange={handleCheckboxChange}
                        checked={doctor.horarios && doctor.horarios.some((h) => h.horario_id === horario.horario_id)}
                        className="form-checkbox"
                      />
                      <label
                        htmlFor={horario.horario_id}
                      >{`${horario.diaSemana} ${horario.horaInicio} - ${horario.horaFin}`}</label>
                    </div>
                  ))}
                </div>
              )}
         
          </Form.Group>
        </Row>
        <div className="flex justify-center  gap-4">
          <Button variant="success" type="submit">
            <BiSolidSave />{" "}
          </Button>
          <Button onClick={() => navigate("/doctors")} variant="secondary">
            <RiArrowGoBackFill />
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default EditDoctor;
