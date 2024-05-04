
    import {
        CDBSidebar,
        CDBSidebarContent,
        CDBSidebarFooter,
        CDBSidebarHeader,
        CDBSidebarMenu,
        CDBSidebarMenuItem,
      } from 'cdbreact';
    
      import { NavLink } from 'react-router-dom';
    
    
    
    const SideBarPacientes = () => {
      return (
        <>
         <div  style={{ display: 'flex', height: '100rem', overflow: 'scroll initial' }} >
          <CDBSidebar textColor="#fff" backgroundColor="#033d3d">
            <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
              <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
                Menu
              </a>
            </CDBSidebarHeader>
    
            <CDBSidebarContent className="sidebar-content">
              <CDBSidebarMenu>
                <NavLink exact to="/pacientes" activeClassName="activeClicked">
                  <CDBSidebarMenuItem icon="columns">Pacientes</CDBSidebarMenuItem>
                </NavLink>
                <NavLink exact to="/Signin" activeClassName="activeClicked">
                  <CDBSidebarMenuItem icon="table">Buscar Paciente</CDBSidebarMenuItem>
                </NavLink>
                <NavLink exact to="/profile" activeClassName="activeClicked">
                  <CDBSidebarMenuItem icon="user">Registrar Paciente</CDBSidebarMenuItem>
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
    
    export default SideBarPacientes
 

