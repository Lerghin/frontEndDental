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
