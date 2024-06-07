import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { RiArrowGoBackFill } from "react-icons/ri";
import { BiSolidSave } from "react-icons/bi";
import { API } from "../../utils/axios";
import DatePicker from "react-datepicker";

import "./../css/RegistroPaciente.css";
import "react-datepicker/dist/react-datepicker.css";
import SideBarCitas from "../../components/SideBarCitas";
import axios from "axios"; 
import { generadorPDF } from "./pdfGenerator";
const CreateTrans = () => {
  const navigate = useNavigate();
  const [cedula, setCedula] = useState("");
  const [paciente, setPaciente] = useState({ nombre: "", apellido: "" });
  const [userData, setUserData] = useState({
    fecha: "",
    observaciones: "",
    paciente: "",
    ingreso: "",
    deuda: "",
    formaPago: "",
  });

  const [montoBs, setMontoBs] = useState(0); // Tasa de cambio de USD a Bs
  const [deudaBs, setDeudaBs] = useState(0); // Valor de deuda en Bs
  const [ingresoBs, setIngresoBs] = useState(0); // Valor de ingreso en Bs

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://v6.exchangerate-api.com/v6/8ee293f7c8b83cfe4baa699c/latest/USD"
        );
        const valorDollar = res.data.conversion_rates.VES;
        setMontoBs(valorDollar);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });

    // Convertir automáticamente el valor en dólares a Bolívares
    if (name === "deuda") {
      const convertedDeudaBs = parseFloat(value) * montoBs;
      setDeudaBs(convertedDeudaBs);
    }

    if (name === "ingreso") {
      const convertedIngresoBs = parseFloat(value) * montoBs;
      setIngresoBs(convertedIngresoBs);
    }
  };

  const handleChangeDate = (date) => {
    setUserData({ ...userData, fecha: date });
  };

  const handleCedulaChange = (e) => {
    const cedulaValue = e.target.value;
    setCedula(cedulaValue);

    if (cedulaValue.length >= 8) {
      API.get(`/pacientes/traerbycedula/${cedulaValue}`)
        .then((response) => {
          if (response.data) {
            setPaciente({
              nombre: response.data.nombre,
              apellido: response.data.apellido,
            });
            setUserData({ ...userData, paciente: response.data });
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
      if (confirm("¿Está segur@ de los valores suministrados?")) {
        const { data } = await API.post("/trans/crear", transData);
        console.log(data);
        toast.success(data.message);
        alert("Pago registrado con éxito");
        generadorPDF(transData, paciente, cedula, montoBs);
        navigate("/transaction");
      }
    } catch (error) {
      const { message } = error.response.data;
      toast.error(message);
    }
  };

  return (
    <>
      <div className="home">
        <div>
          <SideBarCitas className="home-sidebar" />
        </div>
        <Container className="m-2">
          <h2 className="flex justify-center font-bold translate-x-4 m-10">
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
                <Form.Label>Monto de Consulta o Servicio (USD)</Form.Label>
                <Form.Control
                  type="number"
                  name="deuda"
                  value={userData.deuda}
                  onChange={handleChange}
                  required
                />
                <Form.Text className="text-muted">
                  {`Monto en Bolívares (Bs): ${deudaBs.toFixed(2)} Bs`}
                </Form.Text>
              </Form.Group>
              <Form.Group as={Col} controlId="formIngreso">
                <Form.Label>Monto Cancelado por el Paciente (USD)</Form.Label>
                <Form.Control
                  type="number"
                  name="ingreso"
                  value={userData.ingreso}
                  onChange={handleChange}
                  required
                />
                <Form.Text className="text-muted">
                  {`Monto en Bolívares (Bs): ${ingresoBs.toFixed(2)} Bs`}
                </Form.Text>
              </Form.Group>
              <Form.Group as={Col} controlId="formObservaciones">
                <Form.Label>Observaciones</Form.Label>
                <Form.Control
                  type="text"
                  name="observaciones"
                  value={userData.observaciones}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
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
                  <option value="Bs en Efectivo">Bolívares en Efectivo</option>
                  <option value="Bs Transferencia">Bs Transferencia</option>
                  <option value="Pago Móvil">Pago Móvil</option>
                  <option value="Tarjeta de Crédito">Tarjeta de Crédito</option>
                  <option value="Tarjeta de Débito">Tarjeta de Débito</option>
                  <option value="Otro">Otro</option>
                </Form.Select>
              </Form.Group>
            </Row>
            <br />
            <div className="flex justify-center gap-4">
              <Button variant="success" type="submit">
                <BiSolidSave />
              </Button>
              <Button
                onClick={() => navigate("/transaction")}
                variant="secondary"
              >
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
