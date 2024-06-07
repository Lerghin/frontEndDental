import { useState, useEffect } from "react";
import { Form, Button, Table, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import SideBarPresupuesto from "../../components/SideBarPresupuesto";
import { generarPDFPresupuesto } from "./generarPDFPRESU";
import { toast } from "react-toastify";
import { API } from "../../utils/axios";
import axios from "axios";

const CreatePresu = () => {
  const [presupuesto, setPresupuesto] = useState({
    nombre: "",
    apellido: "",
    cedula: "",
    detalles: [{ descripcion: "", monto: "" }]
  });
  const [montoBs, setMontoBs] = useState(0);
  const [totalMonto, setTotalMonto] = useState(0);
  const navigate = useNavigate();

  const handleChangeCliente = (e) => {
    setPresupuesto({ ...presupuesto, [e.target.name]: e.target.value });
  };

  const handleChangeDetalle = (index, e) => {
    const detalles = [...presupuesto.detalles];
    detalles[index][e.target.name] = e.target.name === 'monto' ? parseFloat(e.target.value) || 0 : e.target.value;
    setPresupuesto({ ...presupuesto, detalles });
  };

  const handleAddDetalle = () => {
    setPresupuesto({
      ...presupuesto,
      detalles: [...presupuesto.detalles, { descripcion: "", monto: "" }]
    });
  };

  const handleRemoveDetalle = (index) => {
    const detalles = [...presupuesto.detalles];
    detalles.splice(index, 1);
    setPresupuesto({ ...presupuesto, detalles });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://v6.exchangerate-api.com/v6/8ee293f7c8b83cfe4baa699c/latest/USD");
        const valorDollar = res.data.conversion_rates.VES;
        setMontoBs(valorDollar);
       
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const total = presupuesto.detalles.reduce((sum, detalle) => sum + parseFloat(detalle.monto || 0), 0);
    setTotalMonto(total);
  }, [presupuesto.detalles]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/presu/crear", presupuesto);
      toast.success("Presupuesto registrado con éxito");
      const totalEnBs = (parseFloat(montoBs) * totalMonto).toFixed(2);
      generarPDFPresupuesto(response.data, totalMonto, totalEnBs); 
      navigate('/presupuesto');
      console.log("Presupuesto creado:", response.data);
      setPresupuesto({ nombre: "", apellido: "", cedula: "", detalles: [{ descripcion: "", monto: "" }] });
    } catch (error) {
      console.error("Error al crear el presupuesto:", error);
    }
  };

  return (
    <div className="home">
      <div>
        <SideBarPresupuesto className="home-sidebar" />
      </div>
      <Container className="mt-5">
        <h2 className="text-center p-2"><b>Crear Presupuesto</b></h2>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formNombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={presupuesto.nombre}
                onChange={handleChangeCliente}
                placeholder="Ingresa el nombre"
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formApellido">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="text"
                name="apellido"
                value={presupuesto.apellido}
                onChange={handleChangeCliente}
                placeholder="Ingresa el apellido"
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formCedula">
              <Form.Label>Cédula</Form.Label>
              <Form.Control
                type="text"
                name="cedula"
                value={presupuesto.cedula}
                onChange={handleChangeCliente}
                placeholder="Ingresa la cédula"
              />
            </Form.Group>
          </Row>
          <Table striped bordered hover className="mb-3">
            <thead>
              <tr>
                <th>Descripción</th>
                <th>Monto</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {presupuesto.detalles.map((detalle, index) => (
                <tr key={index}>
                  <td>
                    <Form.Control
                      type="text"
                      name="descripcion"
                      value={detalle.descripcion}
                      onChange={(e) => handleChangeDetalle(index, e)}
                      placeholder="Descripción"
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="number"
                      name="monto"
                      value={detalle.monto}
                      onChange={(e) => handleChangeDetalle(index, e)}
                      placeholder="Monto"
                    />
                  </td>
                  <td>
                    <Button variant="danger" onClick={() => handleRemoveDetalle(index)}>
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="text-center mb-3">
            <Button variant="primary" onClick={handleAddDetalle}>
              Agregar Detalle
            </Button>
          </div>
          <h3 className="text-center font-bold">Total en Dólares: {totalMonto.toFixed(2)}$ </h3>
          <h3 className="text-center">Tasa BCV: {montoBs.toFixed(2)} Bs</h3>
          <h3 className="text-center font-bold">Total en Bs: {(parseFloat(montoBs) * totalMonto).toFixed(2)} Bs</h3>
          <br /><br />
          <div className="text-center">
            <Button variant="success" type="submit">
              Crear Presupuesto
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default CreatePresu;
