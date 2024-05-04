import {  RouterProvider, createBrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout"

import 'bootstrap/dist/css/bootstrap.min.css';
import Signin from "./pages/Signin.jsx";

import HomeAdmin from  "./pages/HomeAdmin.jsx";
import Signup from "./pages/Signup";
import LayoutAdmin from "./layouts/LayoutAdmin.jsx";
import Pacientes from "./pages/Pacientes.jsx";
import RegistrarPacientes from "./pages/RegistrarPacientes.jsx";


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

    ]
  }
])

function App() {


  return (
    <RouterProvider router={router} />
    


  
  )
}

export default App
