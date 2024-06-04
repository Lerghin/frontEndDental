import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { RiArrowGoBackFill } from "react-icons/ri";
import { BiSolidSave } from "react-icons/bi";
import DatePicker from "react-datepicker";

import "./../css/RegistroPaciente.css";
import "react-datepicker/dist/react-datepicker.css";
import SideBarCitas from "../../components/SideBarCitas";
import moment from 'moment';
import { API } from "../../utils/axios";

const EditTrans = () => {
  const navigate = useNavigate();
  const { codigo_transaccion } = useParams();
  const [trans, setTrans] = useState({
    fecha: new Date(),
    formaPago:"",
    observaciones: "",
    deuda:"", 
    ingreso:"",
    
    paciente: { codigoPaciente: "", cedula: "", nombre: "", apellido: "" },

  });

  const [cedula, setCedula] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get(`http://localhost:8080/trans/traer/${codigo_transaccion}`);
        setTrans(response.data);
        setCedula(response.data.paciente.cedula);

      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error("Error al cargar los datos de la cita.");
      }
    };

    fetchData();

  }, [codigo_transaccion]);

  const handleChangeDate = (date) => {
    setTrans({ ...trans, fecha: date });
  };
 

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTrans({ ...trans, [name]: value });
};




  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const fechaCitaISO = moment(trans.fecha).format('YYYY-MM-DD');
      const transData = {
        ...trans,
        fecha: fechaCitaISO,
        paciente: { codigoPaciente: trans.paciente.codigoPaciente }
     
      };
      await API.put("http://localhost:8080/admin/trans/edit", transData);
      toast.success("Pago editado con éxito");
      
      navigate("/transaction");
    } catch (error) {
      console.error('Error editing cita:', error);
      toast.error("Error al editar la cita.");
    }
  };

 
  return (
    <>
      <div className="home">
        <div>
          <SideBarCitas className="home-sidebar" />
        </div>
        <Container>
          <h2 className="flex justify-center font-bold translate-x-4 m-10 font-">
            Editar Cita
          </h2>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formFecha_cita">
                <Form.Label>Fecha de la Cita</Form.Label>
                <DatePicker
                  selected={new Date(trans.fecha)}
                  onChange={handleChangeDate}
                  dateFormat="yyyy-MM-dd"
                  placeholderText="Seleccionar fecha"
                  maxDate={new Date()}
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
           
                  required
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formNombre">
                <Form.Label>Nombre del Paciente</Form.Label>
                <Form.Control
                  type="text"
                  name="nombre"
                  value={trans.paciente.nombre}
                  readOnly
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formApellido">
                <Form.Label>Apellido del Paciente</Form.Label>
                <Form.Control
                  type="text"
                  name="apellido"
                  value={trans.paciente.apellido}
                  readOnly
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
        <Form.Group as={Col} controlId="formDeuda">
            <Form.Label>Monto de Consulta o Servicio</Form.Label>
            <Form.Control
              type="number"
              name="deuda"
              value={trans.deuda}
              onChange={handleInputChange}
              
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formIngreso">
            <Form.Label>Monto Cancelado por el Paciente</Form.Label>
            <Form.Control
              type="number"
              name="ingreso"
              value={trans.ingreso}
              onChange={handleInputChange}
           
            />
          </Form.Group>
        
      
          <Form.Group as={Col} controlId="formObservaciones">
            <Form.Label>Observaciones</Form.Label>
            <Form.Control
              type="text"
              name="observaciones"
              value={trans.observaciones}
              onChange={handleInputChange}
             
            />
          </Form.Group >
         
          </Row>
      
       
        <Row className="mb-3">
        <Form.Group as={Col} controlId="formFormaPago">
            <Form.Label>Método de Pago</Form.Label>
            <Form.Select
              name="formaPago"
              value={trans.formaPago}
              onChange={handleInputChange}
              required
            >
              <option value="">Seleccione una opción...</option>
              <option value="Efectivo Dolar">Efectivo</option>
              <option value="Zelle">Zelle</option>
              <option value="Bs en Efectivo">Bolivares en Efectivo</option>
              <option value=" Bs Transferencia">Bs Transferencia</option>
              <option value=" Pago Movil"> Pago Movil</option>
              <option value=" Tarjeta de Credito"> Tarjeta de Credito</option>
              <option value=" Tarjeta de debito"> Tarjeta de Debito</option>
              <option value=" Otro">Otro</option>
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

export default EditTrans;
