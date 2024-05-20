import {  RouterProvider, createBrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout"

import 'bootstrap/dist/css/bootstrap.min.css';
import Signin from "./pages/Signin.jsx";

import HomeAdmin from  "./pages/HomeAdmin.jsx";
import Signup from "./pages/Signup";
import LayoutAdmin from "./layouts/LayoutAdmin.jsx";
import Pacientes from "./pages/Patients/Pacientes.jsx";
import RegistrarPacientes from "./pages/Patients/RegistrarPacientes.jsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DetailsPatients from "./pages/Patients/DetailsPatients.jsx";
import EditPatient from "./pages/Patients/EditPatient.jsx";
import Doctors from "./pages/Doctors/Doctors.jsx";
import DetailsDoctor from "./pages/Doctors/DetailsDoctor.jsx";
import RegistrarDoctor from "./pages/Doctors/RegistrarDoctor.jsx";
import EditDoctor from "./pages/Doctors/EditDoctor.jsx";
import Histories from "./pages/HistoriasClinicas/Histories.jsx";
import Horarios from "./pages/Horarios/Horarios.jsx";
import EditHorarios from "./pages/Horarios/EditHorarios.jsx";
import CreateHorarios from "./pages/Horarios/CreateHorarios.jsx";
import Servicios from "./pages/Servicios/Servicios.jsx"
import CreateService from "./pages/Servicios/CreateService.jsx";
import EditService from "./pages/Servicios/EditService.jsx";
import Citas from "./pages/Citas/Citas.jsx";
import CreateCita from "./pages/Citas/CreateCita.jsx";
import CitasByDay from "./pages/Citas/CitasByDay.jsx";
import EditCita from "./pages/Citas/EditCita.jsx";
import CreateHistoria from "./pages/HistoriasClinicas/CreateHistoria.jsx";
import EditHistoria from "./pages/HistoriasClinicas/EditHistoria.jsx";
import Transactions from "./pages/Administration/Transactions.jsx";
import CreateTrans from "./pages/Administration/CreateTrans.jsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
    
      {
        path: '/',
        element: <Signin/>
      },
      {
        path: '/signup',
        element: <Signup />
      },
      

    ]
  },
  {
    path: '/',
    element: <LayoutAdmin />,
    children: [
    
      {
        path: '/homeadmin',
        element: <HomeAdmin/>
      },
      {
        path: '/signup',
        element: <Signup />
      },
      {
        path: '/patients',
        element: <Pacientes />
      },
      {
        path: '/createPatients',
        element: <RegistrarPacientes />
      },
      {
        path: '/watchPatient/:codigo_paciente',
        element: <DetailsPatients />
      },
      {
        path: '/editPatient/:codigo_paciente',
        element: <EditPatient />
      },
      {
        path: '/doctors',
        element: <Doctors />
      },
      {
        path: '/watchDoctor/:codigo_doctor',
        element: <DetailsDoctor/>
      },
      {
        path: '/createDoctor',
        element: <RegistrarDoctor/>
      },
      {
        path: '/editDoctor/:codigo_doctor',
        element: <EditDoctor/>
      },
      {
        path: '/histories',
        element: <Histories/>
      },
      {
        path: '/horarios',
        element: <Horarios/>
      },
      {
        path: '/editHorario/:horario_id',
        element: <EditHorarios/>
      },
      
      {
        path: '/createHorario',
        element: <CreateHorarios/>
      },
      {
        path: '/services',
        element: <Servicios/>
      },
      {
        path: '/createService',
        element: <CreateService/>
      },
      {
        path: '/editService/:codigo_servicio',
        element: <EditService/>
      },
      {
        path: '/citas',
        element: <Citas/>
      },
      {
        path: '/createCita',
        element: <CreateCita/>
      }
      ,
      {
        path: '/citaDay',
        element: <CitasByDay/>
      }
      ,
      {
        path: '/editCita/:codigo_cita',
        element: <EditCita/>
      }
      ,
      {
        path: '/createHistory',
        element: <CreateHistoria/>
      }
      ,
      {
        path: '/editHistory/:codigo_historia',
        element: <EditHistoria/>
      },
      {
        path: '/transaction',
        element: <Transactions/>
      },
      {
        path: '/createTrans',
        element: <CreateTrans/>
      }
    ]
  }
])

function App() {


  return (
      <>
    <RouterProvider router={router} />
    <ToastContainer />
    </>

  
  )
}

export default App
