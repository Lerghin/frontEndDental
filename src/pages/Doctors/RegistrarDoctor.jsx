import { useEffect, useState } from "react";
import SideBarDoctores from "../../components/SidebarDoctores";

import DatePicker from "react-datepicker";

import { API } from "../../utils/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import './../Doctors/registrarDoctor.css'
const RegistrarDoctor = () => {
  const [horarios, setHorarios] = useState(null);
  const navigate=useNavigate();
  useEffect(() => {
    API
      .get("http://localhost:8080/onlyhorarios/traer")
      .then((response) => {
        setHorarios(response.data);
        console.log(response.data)

      })
      .catch((error) => {
        console.error("Error fetching options:", error);
      });
  }, []);

  const [doctorData, setDoctorData] = useState({
    nombre: "",
    apellido: "",
    cedula: "",
    direccion: "",
    sexo: "",
    fecha_nacimiento: new Date(),
    telefono: "",
    especialidad: "",
    correoElectronico: "",
    horarios: [],
  });
  const handleChangeDate = (date) => {
    setDoctorData({ ...doctorData, fecha_nacimiento: date });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDoctorData({ ...doctorData, [name]: value });
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    const horarioSeleccionado = horarios.find(horario => horario.horario_id.toString() === value);
    
    if (checked) {
      setDoctorData(prevData => ({
        ...prevData,
        horarios: [...prevData.horarios, horarioSeleccionado]
      }));
    } else {
      setDoctorData(prevData => ({
        ...prevData,
        horarios: prevData.horarios.filter(horario => horario.horario_id !== horarioSeleccionado.horario_id)
      }));
    }
  };


  const handleSubmit= async()=>{
    try{
     
        const {data}= await API.post('/doctor/crear', doctorData)
        console.log(data)
        toast.success(data.response)
        alert("Doctor Registrado con éxito")
        navigate('/doctors')
    }catch (error){
        
        toast.error(error.response.data)
        console.log(error)
        
    }
}
  return (
    <div className="home">
  <div >
    <SideBarDoctores className="home-sidebar" />
  </div>
  <div className="content">
    <div className="form-container">
      <div className="form-card">
        <form className="form" onSubmit={(e) => e.preventDefault()}>
          <h2 className="form-heading">Registrar Doctor</h2>

          <div className="form-group">
            <label htmlFor="nombre" className="form-label">
              Nombre
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={doctorData.nombre}
              onChange={handleChange}
              className="form-input"
              placeholder="Ingresa nombre"
              autoComplete="off"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="apellido" className="form-label">
              Apellido
            </label>
            <input
              type="text"
              id="apellido"
              name="apellido"
              value={doctorData.apellido}
              onChange={handleChange}
              className="form-input"
              placeholder="Ingresa apellido"
              autoComplete="off"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="sexo" className="form-label">
              Sexo
            </label>
            <select
              id="sexo"
              name="sexo"
              value={doctorData.sexo}
              onChange={handleChange}
              className="form-select"
            >
              <option value="">Selecciona una opción...</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="especialidad" className="form-label">
              Especialidad
            </label>
            <select
              id="especialidad"
              name="especialidad"
              value={doctorData.especialidad}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">Selecciona una especialidad...</option>
              <option value="Ortodoncia">Ortodoncia</option>
              <option value="Periodoncia">Periodoncia</option>
              <option value="Endodoncia">Endodoncia</option>
              <option value="Cirugía Oral y Maxilofacial">Cirugía Oral y Maxilofacial</option>
              <option value="Odontopediatría">Odontopediatría</option>
              <option value="Prostodoncia">Prostodoncia</option>
              <option value="Odontología Estética">Odontología Estética</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="cedula" className="form-label">
              Cédula
            </label>
            <input
              type="text"
              id="cedula"
              name="cedula"
              value={doctorData.cedula}
              onChange={handleChange}
              className="form-input"
              placeholder="Ingrese su Cédula"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="fecha_nacimiento" className="form-label">
              Fecha de Nacimiento
            </label>
            <DatePicker
              id="fecha_nacimiento"
              selected={doctorData.fecha_nacimiento}
              onChange={handleChangeDate}
              dateFormat="yyyy-MM-dd"
              placeholderText="Seleccionar fecha"
              showYearDropdown
              scrollableYearDropdown
              yearDropdownItemNumber={100}
              scrollableMonthYearDropdown
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="direccion" className="form-label">
              Dirección
            </label>
            <textarea
              id="direccion"
              name="direccion"
              value={doctorData.direccion}
              onChange={handleChange}
              className="form-textarea"
              placeholder="Ingrese su Dirección"
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="telefono" className="form-label">
              Teléfono
            </label>
            <input
              type="text"
              id="telefono"
              name="telefono"
              value={doctorData.telefono}
              onChange={handleChange}
              className="form-input"
              placeholder="Ingrese su número de teléfono"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="correo" className="form-label">
              Correo
            </label>
            <input
              type="email"
              id="correo"
              name="correoElectronico"
              value={doctorData.correoElectronico}
              onChange={handleChange}
              className="form-input"
              placeholder="Ingrese su correo electrónico"
              required
            />
          </div>

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
                    className="form-checkbox"
                  />
                  <label htmlFor={horario.horario_id}>{`${horario.diaSemana} ${horario.horaInicio} - ${horario.horaFin}`}</label>
                </div>
              ))}
            </div>
          )}

          <div className="form-actions">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Registrar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

  );
};

export default RegistrarDoctor;
