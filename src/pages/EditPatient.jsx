
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { RiArrowGoBackFill } from "react-icons/ri";
import { BiSolidSave } from "react-icons/bi";
import { toast } from "react-toastify"
const EditPatientForm = () => {
    const [paciente, setPaciente] = useState(null);
    const[doctor, setDoctor]=useState(null);
    const navigate= useNavigate();
    const params = useParams();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/pacientesdr/traer/${params.codigo_paciente}`);
                const responseDoctor=await axios.get('http://localhost:8080/doctor/traer');
                setPaciente(response.data);
                setDoctor(responseDoctor.data);
               
                console.log(params.codigo_paciente);
            } catch (error) {
                console.error('Error fetching paciente data:', error);
            }
        };

        fetchData();
    }, [params.codigo_paciente]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setPaciente({ ...paciente, [name]: value });
    };
    const handleDoctorChange = (event) => {
        const { name, value } = event.target;
        setPaciente({ ...paciente, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
      const{data}=   await axios.put(`http://localhost:8080/pacientes/editar/${params.codigo_paciente}`, paciente);
                
            toast.success(data.message)
      
            alert("Paciente Modificado con éxito")
            
            navigate('/patients');
            console.log('Paciente actualizado correctamente');
        } catch (error) {
            toast.success(error.message)
            console.error('Error updating paciente:', error);
        }
    };

    if (!paciente) {
        return <p>Cargando...</p>;
    }

    return (
        <Container>
        <h2 className='flex justify-center font-bold translate-x-4 m-10 font-'>Editar Paciente</h2>
        <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="formNombre">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" name="nombre" value={paciente.nombre} onChange={handleInputChange} />
                </Form.Group>
                <Form.Group as={Col} controlId="formApellido">
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control type="text" name="apellido" value={paciente.apellido} onChange={handleInputChange} />
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="formSexo">
                    <Form.Label>Sexo</Form.Label>
                    <Form.Control type="text" name="sexo" value={paciente.sexo} onChange={handleInputChange} />
                </Form.Group>
                <Form.Group as={Col} controlId="formCedula">
                    <Form.Label>Cédula</Form.Label>
                    <Form.Control type="text" name="cedula" value={paciente.cedula} onChange={handleInputChange} />
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="formEdad">
                    <Form.Label>Edad</Form.Label>
                    <Form.Control type="text" name="edad" value={paciente.edad} onChange={handleInputChange} />
                </Form.Group>
                <Form.Group as={Col} controlId="formFecha_Nacimiento">
                    <Form.Label>Fecha Nacimiento</Form.Label>
                    <Form.Control type="text" name="fecha_nacimiento" value={paciente.fecha_nacimiento} onChange={handleInputChange} />
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="formDireccion">
                    <Form.Label>Dirección</Form.Label>
                    <Form.Control type="text" name="direccion" value={paciente.direccion} onChange={handleInputChange} />
                </Form.Group>
                <Form.Group as={Col} controlId="formTelefono">
                    <Form.Label>Teléfono</Form.Label>
                    <Form.Control type="text" name="telefono" value={paciente.telefono} onChange={handleInputChange} />
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="formCorreoElectronico">
                    <Form.Label>Correo Electrónico</Form.Label>
                    <Form.Control type="email" name="correoElectronico" value={paciente.correoElectronico} onChange={handleInputChange} />
                </Form.Group>
                <Form.Group as={Col} >
                        <Form.Label htmlFor="doctor">Doctor Asignado:</Form.Label>
                        <Form.Select id="doctor" name="codigo_doctor" value={paciente.codigo_doctor} onChange={handleDoctorChange}>
                            <option value="">Seleccione una opción...</option>
                            {doctor.map(doc => (
                                <option key={doc.codigo_doctor} value={doc.codigo_doctor}>{doc.nombre} {doc.apellido}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
            </Row>
            <div className='flex justify-center  gap-4'>
            <Button variant="success"  type="submit"><BiSolidSave /> </Button>
              <Button  onClick={() => navigate('/patients')} variant="secondary"><RiArrowGoBackFill /></Button>
                
           
            </div>
        </Form>
    </Container>
    );
};

export default EditPatientForm;
