import {  useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { RiArrowGoBackFill } from "react-icons/ri";
import { BiSolidSave } from "react-icons/bi";
import { API } from "../../utils/axios";
import DatePicker from "react-datepicker";
import axios from "axios";
import "./../css/RegistroPaciente.css";
import "react-datepicker/dist/react-datepicker.css";
import SideBarCitas from "../../components/SideBarCitas";

const CreateTrans = () => {
  const navigate = useNavigate();
  

  const [cedula, setCedula] = useState("");
 
  const [paciente, setPaciente] = useState({ nombre: "", apellido: "" });
  const [userData, setUserData] = useState({
    
    fecha: '',
    observaciones: '',
    paciente: '', 
    ingreso:'',
    deuda:'',
    formaPago:''
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleChangeDate = (date) => {
    setUserData({ ...userData, fecha: date });
  };
 

  const handleCedulaChange = (e) => {
    const cedulaValue = e.target.value;
    setCedula(cedulaValue);

    if (cedulaValue.length >= 8) {
      axios
        .get(`http://localhost:8080/pacientes/traerbycedula/${cedulaValue}`)
        .then((response) => {
          if (response.data) {
            setPaciente({
              nombre: response.data.nombre,
              apellido: response.data.apellido,
            });
            setUserData({ ...userData, paciente: response.data });
            //console.log(response.data)
          } else {
            setPaciente({ nombre: "", apellido: "" });
            setUserData({ ...userData, paciente: "" });
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
          setUserData({ ...userData, paciente: "" });
        });
    } else {
      setPaciente({ nombre: "", apellido: "" });
      setUserData({ ...userData, paciente: "" });
    }
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const transData = {
            ...userData,
            paciente: { codigoPaciente: userData.paciente.codigoPaciente },
          
        };
        console.log("Datos a enviar:", transData);
        const { data } = await API.post("/trans/crear", transData);
        console.log(data);
        toast.success(data.message);
        alert("Pago Registrado con éxito");
        navigate("/transaction");
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
    <Container className="m-2">
      <h2 className="flex justify-center font-bold translate-x-4 m-10 font-">
        Registrar Pago
      </h2>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formFecha">
            <Form.Label>Fecha</Form.Label>
            <DatePicker
              id="fecha"
          
              selected={userData.fecha}
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
            <span></span>
          </Form.Group>
        
        </Row>
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
        <Row className="mb-3">
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
        <Form.Group as={Col} controlId="formDeuda">
            <Form.Label>Monto de Consulta o Servicio</Form.Label>
            <Form.Control
              type="number"
              name="deuda"
              value={userData.deuda}
              onChange={handleChange}
              
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formIngreso">
            <Form.Label>Monto Cancelado por el Paciente</Form.Label>
            <Form.Control
              type="number"
              name="ingreso"
              value={userData.ingreso}
              onChange={handleChange}
           
            />
          </Form.Group>
        
      
          <Form.Group as={Col} controlId="formObservaciones">
            <Form.Label>Observaciones</Form.Label>
            <Form.Control
              type="text"
              name="observaciones"
              value={userData.observaciones}
              onChange={handleChange}
             
            />
          </Form.Group >
         
          </Row>
      
       
        <Row className="mb-3">
        <Form.Group as={Col} controlId="formFormaPago">
            <Form.Label>Método de Pago</Form.Label>
            <Form.Select
              name="formaPago"
              value={userData.formaPago}
              onChange={handleChange}
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
          <Button onClick={() => navigate("/transaction")} variant="secondary">
            <RiArrowGoBackFill /> 
          </Button>
        </div>
      </Form>
    </Container>
    </div>
    </>
  );
};

export default CreateTrans;
