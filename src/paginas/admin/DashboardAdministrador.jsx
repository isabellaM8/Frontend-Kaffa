import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PedidosAdmin from "./PedidosAdmin";
import ProductosAdmin from "./ProductosAdmin";
import ClientesAdmin from "./ClientesAdmin";
import BaristasAdmin from "./BaristasAdmin";
import InventarioAdmin from "./InventarioAdmin";
import ReportesAdmin from "./ReportesAdmin";
import InicioAdmin from "./InicioAdmin";

export default function DashboardAdministrador() {
  const [seccion, setSeccion] = useState("inicio");
  const [darkMode, setDarkMode] = useState(false);
  const [mostrarPerfil, setMostrarPerfil] = useState(false);
  const [totalVentas, setTotalVentas] = useState(0);
  const navigate = useNavigate();

  // Proteger ruta
  useEffect(() => {
    const usuarioActivo = localStorage.getItem("usuarioActivo");
    if (!usuarioActivo) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  // Cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("usuarioActivo");
    navigate("/");
  };

  // Calcular total ventas
  useEffect(() => {
    const pedidosGuardados = JSON.parse(localStorage.getItem("pedidos")) || [];
    const total = pedidosGuardados
      .filter((p) => p.estado === "Entregado")
      .reduce((acc, p) => {
        if (p.productos) {
          return acc + p.productos.reduce((sum, prod) => sum + prod.precio, 0);
        }
        return acc + (p.precio || 0);
      }, 0);
    setTotalVentas(total);
  }, []);

  return (
    <div className={darkMode ? "bg-gray-900 text-white min-h-screen flex" : "bg-gray-100 text-black min-h-screen flex"}>
      {/* Sidebar */}
      <aside className="w-64 bg-green-900 text-white flex flex-col p-6">
        <h2 className="text-2xl font-bold mb-8 text-center">KAFFA Admin</h2>
        <nav className="flex flex-col gap-4">
          <button onClick={() => setSeccion("inicio")} className="hover:bg-green-700 p-2 rounded text-left">Inicio</button>
          <button onClick={() => setSeccion("pedidos")} className="hover:bg-green-700 p-2 rounded text-left">Pedidos</button>
          <button onClick={() => setSeccion("productos")} className="hover:bg-green-700 p-2 rounded text-left">Productos</button>
          <button onClick={() => setSeccion("clientes")} className="hover:bg-green-700 p-2 rounded text-left">Clientes</button>
          <button onClick={() => setSeccion("baristas")} className="hover:bg-green-700 p-2 rounded text-left">Baristas</button>
          <button onClick={() => setSeccion("inventario")} className="hover:bg-green-700 p-2 rounded text-left">Inventario</button>
          <button onClick={() => setSeccion("reportes")} className="hover:bg-green-700 p-2 rounded text-left">Reportes</button>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 relative">
        {/* Header con menú de perfil tipo dropdown */}
        <div className="flex justify-end items-center mb-6 relative">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setMostrarPerfil(!mostrarPerfil)}
          >
            <div className="w-10 h-10 rounded-full bg-green-900 flex items-center justify-center text-white font-bold">
              AD
            </div>
            <span className="font-semibold">Isabella</span>
            {/* Flecha dinámica */}
            <span className="text-sm">{mostrarPerfil ? "▲" : "▼"}</span>
          </div>

          {/* Dropdown debajo del perfil */}
          {mostrarPerfil && (
            <div
              className={
                darkMode
                  ? "absolute right-0 top-full mt-2 w-48 bg-gray-800 text-white rounded shadow-lg z-50"
                  : "absolute right-0 top-full mt-2 w-48 bg-white text-black rounded shadow-lg z-50"
              }
            >
              <ul className="flex flex-col">
                <li
                  className="px-4 py-2 hover:bg-green-700 cursor-pointer"
                  onClick={() => alert("Cambiar foto")}
                >
                  Cambiar Foto
                </li>
                <li
                  className="px-4 py-2 hover:bg-green-700 cursor-pointer"
                  onClick={() => setDarkMode(!darkMode)}
                >
                  Tema: {darkMode ? "Oscuro" : "Claro"}
                </li>
                <li
                  className="px-4 py-2 hover:bg-red-600 cursor-pointer"
                  onClick={handleLogout}
                >
                  Cerrar Sesión
                </li>
              </ul>
            </div>
          )}
        </div>

        <h1 className="text-3xl font-bold mb-6">Panel de Administrador</h1>

        {/* Renderizado condicional con darkMode */}
        {seccion === "inicio" && <InicioAdmin darkMode={darkMode} />}
        {seccion === "pedidos" && <PedidosAdmin darkMode={darkMode} />}
        {seccion === "productos" && <ProductosAdmin darkMode={darkMode} />}
        {seccion === "clientes" && <ClientesAdmin darkMode={darkMode} />}
        {seccion === "baristas" && <BaristasAdmin darkMode={darkMode} />}
        {seccion === "inventario" && <InventarioAdmin darkMode={darkMode} />}
        {seccion === "reportes" && <ReportesAdmin darkMode={darkMode} totalVentas={totalVentas} />}
      </main>
    </div>
  );
}
