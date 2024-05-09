import { useState } from "react";
import Button from "react-bootstrap/Button";
import { CiMenuKebab } from "react-icons/ci";
import { TiDelete } from "react-icons/ti";


import { Outlet } from 'react-router-dom';
import './MainLayout.css';



const MainLayout = () => {
  const [menu, setMenu] = useState(false);

  return (
    <>
    <div className="w-100 h-[10vh]  bg-teal-700 relative">
      <header className="w-100 h-100  d-flex  justify-content-between align-items-center   ">
        <div className=" d-flex align-items-center    overflow-hidden ">
          <img
            src="./../../public/assets/logo.png"
            alt="Logo"
            className="logo"
          />
          <h1 className=" logo-h1 hidden sm:block text-1xl text-white uppercase translate-y-0.3 translate-x-8 font-bold w-80 ">
           Clínica Dental Briceño
          </h1>
       
       
        
        </div>
        <Button
          onClick={()=> setMenu((prev)=>!prev)}
            variant="dark"
            className="sm:hidden   -translate-x-20  flex right-32 top-2  text-white  font-medium text-lg flex-col gap-4 bg-teal-700"
          >
            {   
             menu? <TiDelete /> : <CiMenuKebab />
            }
           
          </Button>
          
        
      </header>
   
    <div className="min-h-screen  w-100">
         {/*children*/}
         <Outlet />
    </div>
    </div>
    </>
  );
};

export default MainLayout;