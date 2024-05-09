import ResponsiveSideBar from "../components/ResponsiveSideBar";
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card';
import '../components/css/home.css'
import { useNavigate } from "react-router-dom";

const Home = () => {

  const navigate= useNavigate()
  return (

     <div className="home">
      <ResponsiveSideBar  />
      <div className='cardHome'>

      <Card className="cardIn" style={{ width: '18rem' }}>
          <Card.Img className="img-card" variant="top" src="https://gescom.net/wp-content/uploads/2022/02/marketing-dental-invertir-en-conseguir-pacientes-de-odontologia.jpg" />
          <Card.Body>
            <Card.Title>Pacientes</Card.Title>
            <Card.Text>
              Gestión de Pacientes
            </Card.Text>
            <br></br>
            <Button  onClick={() => navigate('/patients')} variant="btn btn-secondary" >Gestionar</Button>
          </Card.Body>
        </Card>
        <Card  className="cardIn" style={{ width: '18rem' }}>
          <Card.Img className="img-card" variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSP1uqD82utUdRRFuGqJlkgmKLG96ScudxuWP9d81yS8A&s" />
          <Card.Body>
            <Card.Title>Doctores</Card.Title>
            <Card.Text>
              Gestión de Doctores
            </Card.Text>
            <br></br>
            <Button  onClick={() => navigate('/signin')} variant="btn btn-secondary" >Gestionar</Button>
          </Card.Body>
        </Card>
        <Card  className="cardIn" style={{ width: '18rem' }}>
          <Card.Img className="img-card" variant="top" src="data:image/jpeg;base64,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" />
          <Card.Body>
            <Card.Title>Historias Clínicas</Card.Title>
            <Card.Text>
              Gestión de Historias
            </Card.Text>
            <br></br>
            <Button  onClick={() => navigate('/signin')} variant="btn btn-secondary" >Gestionar</Button>
          </Card.Body>
        </Card>
        <Card   className="cardIn"style={{ width: '18rem' }}>
          <Card.Img className="img-card" variant="top" src="data:image/png;base64,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" />
          <Card.Body>
            <Card.Title>Citas</Card.Title>
            <Card.Text>
              Gestión de Citas
            </Card.Text>
            <br></br>
            <Button  onClick={() => navigate('/signin')} variant="btn btn-secondary" >Gestionar</Button>
          </Card.Body>
        </Card>
        <Card   className="cardIn"style={{ width: '18rem' }}>
          <Card.Img className="img-card" variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2SL0XndgZQqggaFjwpBNcxc56D9xlOQIZOw&s" />
          <Card.Body>
            <Card.Title>Servicios</Card.Title>
            <Card.Text>
              Gestión de Servicios
            </Card.Text>
            <br></br>
            <Button  onClick={() => navigate('/signin')} variant="btn btn-secondary" >Gestionar</Button>
          </Card.Body>
        </Card>
        <Card  className="cardIn" style={{ width: '18rem' }}>
          <Card.Img className="img-card" variant="top" src="data:image/jpeg;base64,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" />
          <Card.Body>
            <Card.Title>Horarios</Card.Title>
            <Card.Text>
              Gestión de Horarios
            </Card.Text>
            <br></br>
            <Button  onClick={() => navigate('/signin')} variant="btn btn-secondary" >Gestionar</Button>
          </Card.Body>
        </Card>
        <Card  className="cardIn" style={{ width: '18rem' }}>
          <Card.Img className="img-card" variant="top" src="data:image/jpeg;base64,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" />
          <Card.Body>
            <Card.Title>Administración</Card.Title>
            <Card.Text>
              Control Administrativo Dental Briceño 
            </Card.Text>
            <br></br>
            <Button onClick={() => navigate('/signin')} variant="btn btn-secondary" >Ir</Button>
          </Card.Body>
        </Card>
    
         </div>
         </div>
       
  )
};

export default Home;