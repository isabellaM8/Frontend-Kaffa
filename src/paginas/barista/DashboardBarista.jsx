import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InventarioBarista from "./InventarioBarista";
import ChatBarista from "./ChatBarista";
import CajaBarista from "./CajaBarista";

export default function DashboardBarista() {
  const [seccion, setSeccion] = useState("pedidos");
  const [darkMode, setDarkMode] = useState(false);
  const [pedidos, setPedidos] = useState([]);
  const [mostrarPerfil, setMostrarPerfil] = useState(false);
  const navigate = useNavigate();

  // Proteger la ruta
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

  // Cargar pedidos
  useEffect(() => {
    const pedidosGuardados = JSON.parse(localStorage.getItem("pedidos")) || [];
    setPedidos(pedidosGuardados);
  }, []);

  // Guardar cambios en pedidos
  const actualizarPedidos = (nuevosPedidos) => {
    setPedidos(nuevosPedidos);
    localStorage.setItem("pedidos", JSON.stringify(nuevosPedidos));
  };

  // Cambiar estado manualmente
  const cambiarEstado = (id, nuevoEstado) => {
    const nuevosPedidos = pedidos.map((p) =>
      p.id === id ? { ...p, estado: nuevoEstado } : p
    );
    actualizarPedidos(nuevosPedidos);
  };

  return (
    <div className={darkMode ? "flex min-h-screen bg-gray-900 text-white" : "flex min-h-screen bg-gray-100 text-black"}>
      {/* Sidebar */}
      <aside className={darkMode ? "w-64 bg-gray-800 text-white flex flex-col p-6" : "w-64 bg-yellow-900 text-white flex flex-col p-6"}>
        <h2 className="text-2xl font-bold mb-8 text-center">KAFFA Barista</h2>
        <nav className="flex flex-col gap-4">
          <button onClick={() => setSeccion("pedidos")} className="hover:bg-yellow-700 p-2 rounded text-left">Tablero Pedidos</button>
          <button onClick={() => setSeccion("inventario")} className="hover:bg-yellow-700 p-2 rounded text-left">Inventario</button>
          <button onClick={() => setSeccion("chat")} className="hover:bg-yellow-700 p-2 rounded text-left">Chat Cliente</button>
          <button onClick={() => setSeccion("caja")} className="hover:bg-yellow-700 p-2 rounded text-left">Cierre de Caja</button>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        {/* Header con menú de perfil tipo dropdown */}
        <div className="flex justify-end items-center mb-6 relative">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setMostrarPerfil(!mostrarPerfil)}
          >
            <div className="w-10 h-10 rounded-full bg-yellow-900 flex items-center justify-center text-white font-bold">
              BA
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
                  className="px-4 py-2 hover:bg-yellow-700 cursor-pointer"
                  onClick={() => alert("Cambiar foto")}
                >
                  Cambiar Foto
                </li>
                <li
                  className="px-4 py-2 hover:bg-yellow-700 cursor-pointer"
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

        <h1 className="text-3xl font-bold mb-6">Panel de Barista</h1>

        {seccion === "pedidos" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Pedidos de Clientes</h2>
            {pedidos.length === 0 ? (
              <p className={darkMode ? "text-gray-300" : "text-gray-600"}>No hay pedidos pendientes.</p>
            ) : (
              <div className="space-y-4">
                {pedidos.map((p) => (
                  <div
                    key={p.id}
                    className={
                      darkMode
                        ? "bg-gray-800 p-4 rounded shadow flex justify-between items-center"
                        : "bg-white p-4 rounded shadow flex justify-between items-center"
                    }
                  >
                    <div>
                      <p className="font-semibold">Pedido #{p.id}</p>
                      {p.productos ? (
                        <ul className="text-sm">
                          {p.productos.map((prod, i) => (
                            <li key={i}>
                              {prod.nombre} - ${prod.precio.toFixed(2)}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>{p.cantidad}x {p.producto}</p>
                      )}
                      <p className="font-bold mt-2">
                        Total: $
                        {p.productos
                          ? p.productos.reduce((acc, prod) => acc + prod.precio, 0).toFixed(2)
                          : p.precio.toFixed(2)}
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <span
                        className={`px-3 py-1 rounded font-bold ${
                          p.estado === "En Solicitud"
                            ? "bg-yellow-400 text-black"
                            : p.estado === "En Preparación"
                            ? "bg-blue-400 text-white"
                            : "bg-green-600 text-white"
                        }`}
                      >
                        {p.estado}
                      </span>

                      {p.estado === "En Solicitud" && (
                        <button
                          onClick={() => cambiarEstado(p.id, "En Preparación")}
                          className="bg-blue-600 text-white px-3 py-1 rounded"
                        >
                          Marcar en Preparación
                        </button>
                      )}

                      {p.estado === "En Preparación" && (
                        <button
                          onClick={() => cambiarEstado(p.id, "Entregado")}
                          className="bg-green-600 text-white px-3 py-1 rounded"
                        >
                          Marcar Entregado
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {seccion === "inventario" && <InventarioBarista darkMode={darkMode} />}
        {seccion === "chat" && <ChatBarista darkMode={darkMode} />}
        {seccion === "caja" && <CajaBarista darkMode={darkMode} />}
      </main>
    </div>
  );
}
