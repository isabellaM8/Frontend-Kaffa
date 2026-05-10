import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PedidosAdmin from "./PedidosAdmin";
import ProductosAdmin from "./ProductosAdmin";
import ClientesAdmin from "./ClientesAdmin";
import BaristasAdmin from "./BaristasAdmin";
import InventarioAdmin from "./InventarioAdmin";
import ReportesAdmin from "./ReportesAdmin";
import InicioAdmin from "./InicioAdmin";

const navItems = [
  { key: "inicio", label: "Inicio" },
  { key: "pedidos", label: "Pedidos" },
  { key: "productos", label: "Productos" },
  { key: "clientes", label: "Clientes" },
  { key: "baristas", label: "Baristas" },
  { key: "inventario", label: "Inventario" },
  { key: "reportes", label: "Reportes" },
];

const cardStyles = {
  light: "bg-white text-black",
  dark: "bg-gray-800 text-white",
};

export default function DashboardAdministrador() {
  const [seccion, setSeccion] = useState("inicio");
  const [darkMode, setDarkMode] = useState(false);
  const [mostrarPerfil, setMostrarPerfil] = useState(false);
  const [usuario, setUsuario] = useState({ nombre: "Administrador", iniciales: "AD" });
  const [stats, setStats] = useState({ pedidos: 0, clientes: 0, productos: 0, ventas: 0, pendientes: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (!usuarioActivo) {
      navigate("/", { replace: true });
      return;
    }

    const nombre = usuarioActivo.nombre || usuarioActivo.usuario || "Administrador";
    const iniciales = nombre
      .split(" ")
      .filter(Boolean)
      .map((parte) => parte[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

    setUsuario({ nombre, iniciales: iniciales || "AD" });
  }, [navigate]);

  useEffect(() => {
    const pedidosGuardados = JSON.parse(localStorage.getItem("pedidos")) || [];
    const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || [];
    const productosGuardados = JSON.parse(localStorage.getItem("productos")) || [];

    const ventas = pedidosGuardados
      .filter((p) => p.estado === "Entregado")
      .reduce((acc, pedido) => {
        if (pedido.productos) {
          return acc + pedido.productos.reduce((sum, prod) => sum + (prod.precio || 0), 0);
        }
        return acc + (pedido.precio || 0);
      }, 0);

    const pendientes = pedidosGuardados.filter((p) => p.estado !== "Entregado").length;
    const clientes = usuariosGuardados.filter((usuario) => usuario.rol === "cliente").length;

    setStats({
      pedidos: pedidosGuardados.length,
      clientes,
      productos: productosGuardados.length,
      ventas,
      pendientes,
    });
  }, []);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const getNavButtonClass = (active) =>
    `w-full text-left rounded-lg px-4 py-3 transition ${
      active
        ? "bg-green-700 text-white shadow"
        : darkMode
        ? "text-gray-200 hover:bg-green-700 hover:text-white"
        : "text-gray-900 hover:bg-green-600 hover:text-white"
    }`;

  return (
    <div className={darkMode ? "bg-gray-900 text-white min-h-screen flex flex-col md:flex-row" : "bg-gray-100 text-black min-h-screen flex flex-col md:flex-row"}>
      <aside className={darkMode ? "bg-green-950 text-white w-full md:w-72 p-6" : "bg-green-900 text-white w-full md:w-72 p-6"}>
        <div className="mb-8 text-center md:text-left">
          <h2 className="text-2xl font-bold">KAFFA Admin</h2>
          <p className="text-sm text-green-200 mt-1">Panel de administración</p>
        </div>

        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setSeccion(item.key)}
              className={getNavButtonClass(seccion === item.key)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-6 md:p-8 relative">
        <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center mb-6">
          <div>
            <p className="text-sm text-gray-400">Bienvenido de nuevo,</p>
            <h1 className="text-3xl font-bold">{usuario.nombre}</h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleDarkMode}
              className={darkMode ? "bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700" : "bg-white text-gray-900 px-4 py-2 rounded shadow hover:bg-gray-100"}
            >
              {darkMode ? "Modo Claro" : "Modo Oscuro"}
            </button>
            <div className="relative">
              <button
                onClick={() => setMostrarPerfil((prev) => !prev)}
                className={darkMode ? "flex items-center gap-3 bg-gray-800 px-4 py-2 rounded shadow" : "flex items-center gap-3 bg-white px-4 py-2 rounded shadow"}
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-green-700 text-sm font-bold uppercase">{usuario.iniciales}</span>
                <span>{usuario.nombre.split(" ")[0]}</span>
                <span className="text-sm">{mostrarPerfil ? "▲" : "▼"}</span>
              </button>

              {mostrarPerfil && (
                <div className={darkMode ? "absolute right-0 mt-2 w-56 bg-gray-800 text-white rounded shadow-lg z-50" : "absolute right-0 mt-2 w-56 bg-white text-black rounded shadow-lg z-50"}>
                  <ul className="flex flex-col">
                    <li className="px-4 py-3 text-sm text-gray-300">Administrador activo</li>
                    <li
                      className="px-4 py-3 hover:bg-green-700 hover:text-white cursor-pointer"
                      onClick={() => alert("Función no implementada")}
                    >
                      Perfil
                    </li>
                    <li
                      className="px-4 py-3 hover:bg-green-700 hover:text-white cursor-pointer"
                      onClick={toggleDarkMode}
                    >
                      {darkMode ? "Tema claro" : "Tema oscuro"}
                    </li>
                    <li
                      className="px-4 py-3 text-red-500 hover:bg-red-600 hover:text-white cursor-pointer"
                      onClick={() => {
                        localStorage.removeItem("usuarioActivo");
                        navigate("/");
                      }}
                    >
                      Cerrar sesión
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
          <div className={`rounded-xl p-5 shadow ${cardStyles[darkMode ? "dark" : "light"]}`}>
            <p className="text-sm uppercase tracking-wide text-gray-500">Ventas entregadas</p>
            <p className="mt-3 text-3xl font-bold text-green-600">${stats.ventas.toFixed(2)}</p>
            <p className="mt-2 text-sm text-gray-400">ingresos generados</p>
          </div>
          <div className={`rounded-xl p-5 shadow ${cardStyles[darkMode ? "dark" : "light"]}`}>
            <p className="text-sm uppercase tracking-wide text-gray-500">Pedidos</p>
            <p className="mt-3 text-3xl font-bold text-blue-500">{stats.pedidos}</p>
            <p className="mt-2 text-sm text-gray-400">total de pedidos</p>
          </div>
          <div className={`rounded-xl p-5 shadow ${cardStyles[darkMode ? "dark" : "light"]}`}>
            <p className="text-sm uppercase tracking-wide text-gray-500">Clientes</p>
            <p className="mt-3 text-3xl font-bold text-purple-500">{stats.clientes}</p>
            <p className="mt-2 text-sm text-gray-400">clientes registrados</p>
          </div>
          <div className={`rounded-xl p-5 shadow ${cardStyles[darkMode ? "dark" : "light"]}`}>
            <p className="text-sm uppercase tracking-wide text-gray-500">Inventario</p>
            <p className="mt-3 text-3xl font-bold text-orange-500">{stats.productos}</p>
            <p className="mt-2 text-sm text-gray-400">productos activos</p>
          </div>
        </div>

        <div className="grid gap-4">
          {seccion === "inicio" && <InicioAdmin darkMode={darkMode} stats={stats} />}
          {seccion === "pedidos" && <PedidosAdmin darkMode={darkMode} />}
          {seccion === "productos" && <ProductosAdmin darkMode={darkMode} />}
          {seccion === "clientes" && <ClientesAdmin darkMode={darkMode} />}
          {seccion === "baristas" && <BaristasAdmin darkMode={darkMode} />}
          {seccion === "inventario" && <InventarioAdmin darkMode={darkMode} />}
          {seccion === "reportes" && <ReportesAdmin darkMode={darkMode} totalVentas={stats.ventas} />}
        </div>
      </main>
    </div>
  );
}
