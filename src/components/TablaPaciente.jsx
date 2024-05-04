

const TablaPaciente = ({ data }) => {
  const {
    codigo_paciente,
    nombre,
    apellido,
    sexo,
    cedula,
    correoElectronico,
    direccion,
    telefono,
  } = data;

  return (
    
      
    <tr>
    <td>{codigo_paciente}</td>
    <td>{nombre}</td>
    <td>{apellido}</td>
    <td>{sexo}</td>
    <td>{cedula}</td>
    <td>{correoElectronico}</td>
    <td>{direccion}</td>
    <td>{telefono}</td>
  </tr>
 
  );
};

export default TablaPaciente;
