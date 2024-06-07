import { useState, useEffect } from "react";

import { Form, Button, Table, Container, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import SideBarPresupuesto from "../../components/SideBarPresupuesto";
import { API } from "../../utils/axios";
import { toast } from "react-toastify";

const EditPresu = () => {
  const { codigo_presupuesto } = useParams();
  const [presupuesto, setPresupuesto] = useState({
    nombre: "",
    apellido: "",
    cedula: "",
    detalles: [{ descripcion: "", monto: "" }]
  });
  const [totalMonto, setTotalMonto] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPresupuesto = async () => {
      try {
        const response = await API.get(`http://localhost:8080/presu/traer/${codigo_presupuesto}`);
        setPresupuesto(response.data);
      } catch (error) {
        console.error("Error al cargar el presupuesto:", error);
      }
    };
    fetchPresupuesto();
  }, [codigo_presupuesto]);

  const handleChangeCliente = (e) => {
    setPresupuesto({ ...presupuesto, [e.target.name]: e.target.value });
  };

  const handleChangeDetalle = (index, e) => {
    const detalles = [...presupuesto.detalles];
    detalles[index][e.target.name] = e.target.value;
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.put(`/admin/presu/editar/${codigo_presupuesto}`, presupuesto);
      toast.success("Presupuesto editado con éxito");
      navigate('/presupuesto');
      console.log("Presupuesto actualizado:", response.data);
    } catch (error) {
      console.error("Error al actualizar el presupuesto:", error);
    }
  };

  useEffect(() => {
    const total = presupuesto.detalles.reduce((sum, detalle) => sum + parseFloat(detalle.monto || 0), 0);
    setTotalMonto(total);
  }, [presupuesto.detalles]);

  return (
    <div className="home">
      <div>
        <SideBarPresupuesto className="home-sidebar" />
      </div>
      <Container className="mt-5">
        <h2 className="text-center p-2"><b>Editar Presupuesto</b></h2>
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
          <h3 className="text-center">Total: {totalMonto.toFixed(2)}$ US.Dollar</h3>
          <br /><br />
          <div className="text-center">
            <Button variant="success" type="submit">
              Actualizar Presupuesto
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default EditPresu;
