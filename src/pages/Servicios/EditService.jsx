

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { RiArrowGoBackFill } from "react-icons/ri";
import { BiSolidSave } from "react-icons/bi";
import { toast } from "react-toastify"
import { API } from '../../utils/axios';

const EditService = () => {
    const [servicio, setServicio] = useState(null);
 
    const navigate= useNavigate();
    const params = useParams();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await API.get(`http://localhost:8080/servicios/traer/${params.codigo_servicio}`);
                
                setServicio(response.data);
                console.log(response.data);
              
               
              
            } catch (error) {
                console.error('Error fetching paciente data:', error);
            }
        };

        fetchData();
    }, [params.codigo_servicio]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setServicio({ ...servicio, [name]: value });
    };
 


    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("Datos a enviar:", servicio); 
        try {
      const{data}=   await API.put(`http://localhost:8080/admin/servicios/editar/${params.codigo_servicio}`, servicio);
                
            toast.success(data.message)
      
            alert("Servicio Modificado con éxito")
            
            navigate('/services');
            console.log('horarios actualizado correctamente');
        } catch (error) {
            toast.success(error.message)
            console.error('Error updating paciente:', error);
        }
    };

    if (!servicio) {
        return <p>Cargando...</p>;
    }

    return (
        <Container>
        <h2 className='flex justify-center font-bold translate-x-4 m-10 font-'>Editar Servicio</h2>
        <Form onSubmit={handleSubmit}>
   
            <Row className="mb-3">
                <Form.Group as={Col} controlId="formNombre">
                    <Form.Label>Nombre del Servicio</Form.Label>
                    <Form.Control type="text" name="nombre" value={servicio.nombre} onChange={handleInputChange} />
                </Form.Group>
              
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="formDescripcion">
                    <Form.Label>Descripción del Servicio</Form.Label>
                    <Form.Control as="textarea" rows={5} type="text" name="descripcion" value={servicio.descripcion} onChange={handleInputChange} />
                </Form.Group>
              
            </Row>
           
            <br></br>
            <div className='flex justify-center  gap-4'>
            <Button variant="success"  type="submit"><BiSolidSave /> </Button>
              <Button  onClick={() => navigate('/services')} variant="secondary"><RiArrowGoBackFill /></Button>
                
           
            </div>
        </Form>
    </Container>
    );
};

export default EditService;
