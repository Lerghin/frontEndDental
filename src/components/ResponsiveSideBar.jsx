import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink } from "react-router-dom";
import { LS } from "../utils/LS";
import { useEffect, useState } from "react";

const ResponsiveSideBar = () => {
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const role = LS.getText("role");
    if (role) {
      setUserRole(role.trim()); // Eliminar espacios extra si los hay
    }
    setLoading(false); // Marcar la carga como completada
  }, []);

  if (loading) {
    return <div>Loading...</div>; // O un spinner de carga
  }

  return (
    <div
      style={{ display: "flex", height: "100rem", overflow: "scroll initial" }}
    >
      <CDBSidebar textColor="#fff" backgroundColor="#033d3d">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a
            href="/"
            className="text-decoration-none"
            style={{ color: "inherit" }}
          >
            Menu
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/homeadmin" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="home">Inicio</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/citaDay" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="file-alt">
                Citas del Día
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/createCita" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="calendar">
                Registrar Citas
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/createHistory" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="file-alt">
                Registrar Historia
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/createPatients" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="file-alt">
                Registrar Pacientes
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/createHorario" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="file-alt">
                Crear Horarios
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/createPresu" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="file-alt">
                Crear Presupuesto
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/createUser" activeClassName="activeClicked">
              {userRole === "USER" ? null : (
                <CDBSidebarMenuItem icon="user">
                  Crear Acceso Doctor
                </CDBSidebarMenuItem>
                
              )}
            </NavLink>
            <NavLink exact to="/signup" activeClassName="activeClicked">
              {userRole === "USER" ? null : (
                <CDBSidebarMenuItem icon="user">
                  Crear Acceso Administrador
                </CDBSidebarMenuItem>
                
              )}
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: "center" }}>
          <div style={{ padding: "20px 5px" }}>©Dental Briceño C.A.</div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default ResponsiveSideBar;
