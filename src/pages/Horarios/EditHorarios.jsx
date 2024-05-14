
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { RiArrowGoBackFill } from "react-icons/ri";
import { BiSolidSave } from "react-icons/bi";
import { toast } from "react-toastify"
const EditHorario = () => {
    const [horario, setHorario] = useState(null);
    const[doctor, setDoctor]=useState([]);
    const navigate= useNavigate();
    const params = useParams();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/horarios/traer/${params.horario_id}`);
                const responseDoctor=await axios.get('http://localhost:8080/doctor/traer');
                setHorario(response.data);
                console.log(response.data);
                setDoctor(responseDoctor.data);
                console.log(responseDoctor.data)
               
              
            } catch (error) {
                console.error('Error fetching paciente data:', error);
            }
        };

        fetchData();
    }, [params.horario_id]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setHorario({ ...horario, [name]: value });
    };
    const handleDoctorChange = (event) => {
        const { name, value } = event.target;
        setHorario({ ...horario, [name]: value });
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
      const{data}=   await axios.put(`http://localhost:8080/horarios/editar/${params.horario_id}`, horario);
                
            toast.success(data.message)
      
            alert("Horario Modificado con éxito")
            
            navigate('/horarios');
            console.log('horarios actualizado correctamente');
        } catch (error) {
            toast.success(error.message)
            console.error('Error updating paciente:', error);
        }
    };

    if (!horario) {
        return <p>Cargando...</p>;
    }

    return (
        <Container>
        <h2 className='flex justify-center font-bold translate-x-4 m-10 font-'>Editar Paciente</h2>
        <Form onSubmit={handleSubmit}>
   
            <Row className="mb-3">
                <Form.Group as={Col} controlId="formDiaSemana">
                    <Form.Label>Día de la Semana</Form.Label>
                    <Form.Control type="text" name="diaSemana" value={horario.diaSemana} onChange={handleInputChange} />
                </Form.Group>
                <Form.Group as={Col} controlId="formhoraInicio">
                    <Form.Label>Hora de Inicio</Form.Label>
                    <Form.Control type="text" name="horaInicio" value={horario.horaInicio} onChange={handleInputChange} />
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="formHoraFin">
                    <Form.Label>Hora de Cierre</Form.Label>
                    <Form.Control type="text" name="horaFin" value={horario.horaFin} onChange={handleInputChange} />
                </Form.Group>
              
            </Row>
           <Row>
                <Form.Group as={Col} >
                        <Form.Label htmlFor="doctor">Doctor Asignado:</Form.Label>
                        <Form.Select id="doctor" name="codigo_doctor" value={horario.setDoctor} onChange={handleDoctorChange}>
                            <option value="">Seleccione una opción...</option>
                            {doctor.map(doc => (
                                <option key={doc.codigo_doctor} value={doc.codigo_doctor}>{doc.nombre} {doc.apellido}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
            </Row>
            <br></br>
            <div className='flex justify-center  gap-4'>
            <Button variant="success"  type="submit"><BiSolidSave /> </Button>
              <Button  onClick={() => navigate('/horarios')} variant="secondary"><RiArrowGoBackFill /></Button>
                
           
            </div>
        </Form>
    </Container>
    );
};

export default EditHorario;
