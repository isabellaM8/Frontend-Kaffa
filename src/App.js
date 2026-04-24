import { BrowserRouter, Routes, Route } from "react-router-dom";
import Bienvenida from "./paginas/Bienvenida";
import InicioSesion from "./paginas/InicioSesion";
import Registro from "./paginas/Registro";

// Secciones principales
import Menu from "./paginas/Menu";
import Eventos from "./paginas/Eventos";
import SobreNosotros from "./paginas/SobreNosotros";
import Contactos from "./paginas/Contactos";

// Dashboards
import DashboardAdministrador from "./paginas/admin/DashboardAdministrador";
import DashboardBarista from "./paginas/barista/DashboardBarista";
import DashboardCliente from "./paginas/cliente/DashboardCliente";

// Secciones Cliente
import MenuCliente from "./paginas/cliente/MenuCliente";
import PedidosCliente from "./paginas/cliente/PedidosCliente";
import CarritoCliente from "./paginas/cliente/CarritoCliente";
import ChatCliente from "./paginas/cliente/ChatCliente";
import ConfigCliente from "./paginas/cliente/ConfigCliente";
import PagoCliente from "./paginas/cliente/PagoCliente";

// Secciones Barista
import PedidosBarista from "./paginas/barista/PedidosBarista";
import InventarioBarista from "./paginas/barista/InventarioBarista";
import ChatBarista from "./paginas/barista/ChatBarista";
import CajaBarista from "./paginas/barista/CajaBarista";
import ConfigBarista from "./paginas/barista/ConfigBarista";

// Secciones Administrador
import PedidosAdmin from "./paginas/admin/PedidosAdmin";
import ProductosAdmin from "./paginas/admin/ProductosAdmin";
import InventarioAdmin from "./paginas/admin/InventarioAdmin";
import ReportesAdmin from "./paginas/admin/ReportesAdmin";
import ConfigAdmin from "./paginas/admin/ConfigAdmin";
import ClientesAdmin from "./paginas/admin/ClientesAdmin";
import BaristasAdmin from "./paginas/admin/BaristasAdmin";

function App() {
  // ✅ Inicializar administrador por defecto
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  if (!usuarios.find((u) => u.rol === "admin")) {
    usuarios.push({
      usuario: "admin",
      contrasena: "1234", // OJO: sin tilde
      rol: "admin",
    });
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas generales */}
        <Route path="/" element={<Bienvenida />} />
        <Route path="/login" element={<InicioSesion />} />
        <Route path="/registro" element={<Registro />} />

        {/* Secciones principales */}
        <Route path="/menu" element={<Menu />} />
        <Route path="/eventos" element={<Eventos />} />
        <Route path="/sobreNosotros" element={<SobreNosotros />} />
        <Route path="/contactos" element={<Contactos />} />

        {/* Cliente */}
        <Route path="/cliente" element={<DashboardCliente />} />
        <Route path="/cliente/menu" element={<MenuCliente />} />
        <Route path="/cliente/pedidos" element={<PedidosCliente />} />
        <Route path="/cliente/carrito" element={<CarritoCliente />} />
        <Route path="/cliente/chat" element={<ChatCliente />} />
        <Route path="/cliente/config" element={<ConfigCliente />} />
        <Route path="/cliente/pago" element={<PagoCliente />} />

        {/* Barista */}
        <Route path="/barista" element={<DashboardBarista />} />
        <Route path="/barista/pedidos" element={<PedidosBarista />} />
        <Route path="/barista/inventario" element={<InventarioBarista />} />
        <Route path="/barista/chat" element={<ChatBarista />} />
        <Route path="/barista/caja" element={<CajaBarista />} />
        <Route path="/barista/config" element={<ConfigBarista />} />

        {/* Administrador */}
        <Route path="/admin" element={<DashboardAdministrador />} />
        <Route path="/admin/pedidos" element={<PedidosAdmin />} />
        <Route path="/admin/productos" element={<ProductosAdmin />} />
        <Route path="/admin/clientes" element={<ClientesAdmin />} />
        <Route path="/admin/baristas" element={<BaristasAdmin />} />
        <Route path="/admin/inventario" element={<InventarioAdmin />} />
        <Route path="/admin/reportes" element={<ReportesAdmin />} />
        <Route path="/admin/config" element={<ConfigAdmin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
