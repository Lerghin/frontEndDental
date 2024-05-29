import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarFooter,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
  } from 'cdbreact';

  import { NavLink } from 'react-router-dom';



const ResponsiveSideBar = () => {
  return (
    <>
     <div style={{ display: 'flex', height: '100rem', overflow: 'scroll initial'  }} >
      <CDBSidebar textColor="#fff" backgroundColor="#033d3d">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
            Menu
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/homeadmin" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="home">Inicio</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/citaDay" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="file-alt">Citas del Día</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/createCita" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="calendar">Registrar Citas</CDBSidebarMenuItem>
            </NavLink>
         
            <NavLink exact to="/createHistory" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="file-alt">Registrar Historia</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/createPatients" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="file-alt">Registrar Pacientes</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/createHorarios" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="file-alt">Crear Horarios</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/createPresu" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="file-alt">Crear Presupuesto</CDBSidebarMenuItem>
            </NavLink>
          
           
            <NavLink exact to="/createUser" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user">Crear Acceso Usuario</CDBSidebarMenuItem>
            </NavLink>
        
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div
            style={{
              padding: '20px 5px',
            }}
          >
           ©Dental Briceño C.A.
            
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
    
    </>
  )
}

export default ResponsiveSideBar