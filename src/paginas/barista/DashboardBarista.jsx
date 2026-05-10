import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import PedidosBarista from "./PedidosBarista";
import InventarioBarista from "./InventarioBarista";
import ChatBarista from "./ChatBarista";
import CajaBarista from "./CajaBarista";
import ConfigBarista from "./ConfigBarista";

const navItems = [
  { key: "pedidos", label: "Pedidos" },
  { key: "inventario", label: "Inventario" },
  { key: "chat", label: "Chat Cliente" },
  { key: "caja", label: "Cierre de Caja" },
  { key: "config", label: "Configuración" },
];

const getNavButtonClass = (active, darkMode) =>
  `w-full text-left rounded-lg px-4 py-3 transition ${
    active
      ? "bg-yellow-700 text-white shadow-lg"
      : darkMode
      ? "text-gray-200 hover:bg-yellow-700 hover:text-white"
      : "text-gray-900 hover:bg-yellow-600 hover:text-white"
  }`;

export default function DashboardBarista() {
  const [seccion, setSeccion] = useState("pedidos");
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("baristaTema");
    return saved ? JSON.parse(saved) : false;
  });
  const [pedidos, setPedidos] = useState([]);
  const [mostrarPerfil, setMostrarPerfil] = useState(false);
  const [usuario, setUsuario] = useState({ nombre: "Barista", iniciales: "BA" });
  const navigate = useNavigate();

  useEffect(() => {
    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (!usuarioActivo) {
      navigate("/", { replace: true });
      return;
    }

    const nombre = usuarioActivo.nombre || usuarioActivo.usuario || "Barista";
    const iniciales = nombre
      .split(" ")
      .filter(Boolean)
      .map((parte) => parte[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

    setUsuario({ nombre, iniciales: iniciales || "BA" });
  }, [navigate]);

  useEffect(() => {
    const pedidosGuardados = JSON.parse(localStorage.getItem("pedidos")) || [];
    setPedidos(pedidosGuardados);
  }, []);

  useEffect(() => {
    localStorage.setItem("baristaTema", JSON.stringify(darkMode));
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.removeItem("usuarioActivo");
    navigate("/");
  };

  const actualizarPedidos = (nuevosPedidos) => {
    setPedidos(nuevosPedidos);
    localStorage.setItem("pedidos", JSON.stringify(nuevosPedidos));
  };

  const cambiarEstado = (id, nuevoEstado) => {
    const nuevosPedidos = pedidos.map((pedido) =>
      pedido.id === id ? { ...pedido, estado: nuevoEstado } : pedido
    );
    actualizarPedidos(nuevosPedidos);
  };

  const summary = useMemo(() => {
    const estados = {
      "En Solicitud": 0,
      "En Preparación": 0,
      Entregado: 0,
    };
    let totalVentas = 0;

    pedidos.forEach((pedido) => {
      if (estados[pedido.estado] !== undefined) {
        estados[pedido.estado] += 1;
      }

      if (pedido.estado === "Entregado") {
        if (pedido.productos) {
          totalVentas += pedido.productos.reduce((acc, producto) => acc + (producto.precio || 0), 0);
        } else {
          totalVentas += pedido.precio || 0;
        }
      }
    });

    return {
      total: pedidos.length,
      enSolicitud: estados["En Solicitud"],
      enPreparacion: estados["En Preparación"],
      entregados: estados.Entregado,
      totalVentas,
    };
  }, [pedidos]);

  return (
    <div className={
      darkMode
        ? "min-h-screen flex flex-col md:flex-row bg-gray-950 text-white"
        : "min-h-screen flex flex-col md:flex-row bg-gray-100 text-gray-900"
    }>
      <aside className={darkMode ? "w-full md:w-72 bg-yellow-950 text-white p-6" : "w-full md:w-72 bg-yellow-900 text-white p-6"}>
        <div className="mb-8 text-center md:text-left">
          <h2 className="text-2xl font-bold">KAFFA Barista</h2>
          <p className="text-sm text-yellow-200">Panel del equipo</p>
        </div>

        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setSeccion(item.key)}
              className={getNavButtonClass(seccion === item.key, darkMode)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-6 md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center mb-6">
          <div>
            <p className={darkMode ? "text-yellow-300" : "text-yellow-700"}>Bienvenido,</p>
            <h1 className="text-3xl font-bold">{usuario.nombre}</h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setDarkMode((prev) => !prev)}
              className={darkMode ? "bg-gray-800 px-4 py-2 rounded hover:bg-gray-700" : "bg-white px-4 py-2 rounded shadow hover:bg-gray-200"}
            >
              {darkMode ? "Modo Claro" : "Modo Oscuro"}
            </button>

            <div className="relative">
              <button
                onClick={() => setMostrarPerfil((prev) => !prev)}
                className={darkMode ? "flex items-center gap-3 bg-gray-800 px-4 py-2 rounded shadow" : "flex items-center gap-3 bg-white px-4 py-2 rounded shadow"}
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-yellow-700 text-sm font-bold uppercase">{usuario.iniciales}</span>
                <span>{usuario.nombre.split(" ")[0]}</span>
                <span className="text-sm">{mostrarPerfil ? "▲" : "▼"}</span>
              </button>

              {mostrarPerfil && (
                <div className={darkMode ? "absolute right-0 mt-2 w-56 bg-gray-800 text-white rounded shadow-lg z-50" : "absolute right-0 mt-2 w-56 bg-white text-gray-900 rounded shadow-lg z-50"}>
                  <ul className="flex flex-col">
                    <li className="px-4 py-3 text-sm text-gray-400">Barista activo</li>
                    <li
                      className="px-4 py-3 hover:bg-yellow-700 hover:text-white cursor-pointer"
                      onClick={() => setSeccion("config")}
                    >
                      Perfil
                    </li>
                    <li
                      className="px-4 py-3 hover:bg-yellow-700 hover:text-white cursor-pointer"
                      onClick={() => setDarkMode((prev) => !prev)}
                    >
                      Cambiar tema
                    </li>
                    <li
                      className="px-4 py-3 text-red-500 hover:bg-red-600 hover:text-white cursor-pointer"
                      onClick={handleLogout}
                    >
                      Cerrar sesión
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
          <div className={darkMode ? "bg-gray-800 rounded-xl p-5 shadow" : "bg-white rounded-xl p-5 shadow"}>
            <p className="text-sm uppercase tracking-wide text-gray-400">Pedidos Totales</p>
            <p className="mt-3 text-3xl font-bold text-yellow-600">{summary.total}</p>
            <p className="mt-2 text-sm text-gray-500">Entradas de clientes</p>
          </div>

          <div className={darkMode ? "bg-gray-800 rounded-xl p-5 shadow" : "bg-white rounded-xl p-5 shadow"}>
            <p className="text-sm uppercase tracking-wide text-gray-400">En Solicitud</p>
            <p className="mt-3 text-3xl font-bold text-blue-500">{summary.enSolicitud}</p>
            <p className="mt-2 text-sm text-gray-500">Pedidos nuevos</p>
          </div>

          <div className={darkMode ? "bg-gray-800 rounded-xl p-5 shadow" : "bg-white rounded-xl p-5 shadow"}>
            <p className="text-sm uppercase tracking-wide text-gray-400">En Preparación</p>
            <p className="mt-3 text-3xl font-bold text-indigo-500">{summary.enPreparacion}</p>
            <p className="mt-2 text-sm text-gray-500">Pedidos en curso</p>
          </div>

          <div className={darkMode ? "bg-gray-800 rounded-xl p-5 shadow" : "bg-white rounded-xl p-5 shadow"}>
            <p className="text-sm uppercase tracking-wide text-gray-400">Ventas Entregadas</p>
            <p className="mt-3 text-3xl font-bold text-green-500">${summary.totalVentas.toFixed(2)}</p>
            <p className="mt-2 text-sm text-gray-500">Ingresos cerrados</p>
          </div>
        </div>

        <div className="space-y-6">
          {seccion === "pedidos" && (
            <PedidosBarista pedidos={pedidos} darkMode={darkMode} onChangeStatus={cambiarEstado} />
          )}
          {seccion === "inventario" && <InventarioBarista darkMode={darkMode} />}
          {seccion === "chat" && <ChatBarista darkMode={darkMode} />}
          {seccion === "caja" && <CajaBarista darkMode={darkMode} />}
          {seccion === "config" && <ConfigBarista darkMode={darkMode} setDarkMode={setDarkMode} onLogout={handleLogout} />}
        </div>
      </main>
    </div>
  );
}
