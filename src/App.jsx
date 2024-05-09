import {  RouterProvider, createBrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout"

import 'bootstrap/dist/css/bootstrap.min.css';
import Signin from "./pages/Signin.jsx";

import HomeAdmin from  "./pages/HomeAdmin.jsx";
import Signup from "./pages/Signup";
import LayoutAdmin from "./layouts/LayoutAdmin.jsx";
import Pacientes from "./pages/Pacientes.jsx";
import RegistrarPacientes from "./pages/RegistrarPacientes.jsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DetailsPatients from "./pages/DetailsPatients.jsx";
import EditPatient from "./pages/EditPatient.jsx";


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
