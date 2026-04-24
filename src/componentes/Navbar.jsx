import { Link } from "react-router-dom";

function Navbar({ rol }) {
  return (
    <nav className="bg-green-700 text-white p-4 flex space-x-6">
      {/* Opciones para ADMIN */}
      {rol === "admin" && (
        <>
          <Link to="/admin">Inicio</Link>
          <Link to="/admin/pedidos">Pedidos</Link>
          <Link to="/admin/productos">Productos</Link>
          <Link to="/admin/usuarios">Clientes/Baristas</Link>
          <Link to="/admin/inventario">Inventario</Link>
          <Link to="/admin/reportes">Reportes</Link>
          <Link to="/admin/configuracion">Configuración</Link>
        </>
      )}

      {/* Opciones para BARISTA */}
      {rol === "barista" && (
        <>
          <Link to="/barista/pedidos">Pedidos</Link>
          <Link to="/barista/inventario">Inventario</Link>
          <Link to="/barista/chat">Chat Cliente</Link>
          <Link to="/barista/caja">Cierre de Caja</Link>
          <Link to="/barista/configuracion">Configuración</Link>
        </>
      )}

      {/* Opciones para CLIENTE */}
      {rol === "cliente" && (
        <>
          <Link to="/cliente/menu">Menú</Link>
          <Link to="/cliente/pedidos">Mis Pedidos</Link>
          <Link to="/cliente/carrito">Carrito</Link>
          <Link to="/cliente/chat">Chat Barista</Link>
          <Link to="/cliente/configuracion">Configuración</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
