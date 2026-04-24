import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MenuCliente from "./MenuCliente";
import PedidosCliente from "./PedidosCliente";
import ChatCliente from "./ChatCliente";
import ConfigCliente from "./ConfigCliente";
import CarritoCliente from "./CarritoCliente";

export default function DashboardCliente() {
  const [seccion, setSeccion] = useState("menu");
  const [darkMode, setDarkMode] = useState(false);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const [mostrarPerfil, setMostrarPerfil] = useState(false); // ✅ nuevo estado para modal perfil
  const [cantidadCarrito, setCantidadCarrito] = useState(0);
  const navigate = useNavigate();

  // ✅ Proteger la ruta: si no hay sesión activa, redirigir a bienvenida
  useEffect(() => {
    const usuarioActivo = localStorage.getItem("usuarioActivo");
    if (!usuarioActivo) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  // ✅ Cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("usuarioActivo"); // limpiar sesión
    navigate("/"); // redirigir a bienvenida
  };

  // Actualizar cantidad de productos en carrito
  useEffect(() => {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    setCantidadCarrito(carrito.length);
  }, [mostrarCarrito]);

  // Función para confirmar compra
  const confirmarCompra = () => {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    if (carrito.length > 0) {
      // Guardar pedido en localStorage
      let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
      pedidos.push({
        id: Date.now(),
        productos: carrito,
        estado: "En Solicitud",
      });
      localStorage.setItem("pedidos", JSON.stringify(pedidos));

      // Vaciar carrito
      localStorage.removeItem("carrito");
      setCantidadCarrito(0);

      alert("Compra realizada con éxito");

      // Redirigir a Mis Pedidos
      setSeccion("pedidos");
      setMostrarCarrito(false);
    } else {
      alert("Tu carrito está vacío");
    }
  };

  return (
    <div className={darkMode ? "flex min-h-screen bg-gray-900 text-white" : "flex min-h-screen bg-gray-100 text-black"}>
      {/* Sidebar */}
      <aside className="w-64 bg-yellow-900 text-white flex flex-col p-6">
        <h2 className="text-2xl font-bold mb-8 text-center">KAFFA Cliente</h2>
        <nav className="flex flex-col gap-4">
          <button onClick={() => setSeccion("menu")} className="hover:bg-yellow-700 p-2 rounded text-left">Menú</button>
          <button onClick={() => setSeccion("pedidos")} className="hover:bg-yellow-700 p-2 rounded text-left">Mis Pedidos</button>
          <button onClick={() => setSeccion("chat")} className="hover:bg-yellow-700 p-2 rounded text-left">Chat Barista</button>
          <button onClick={() => setSeccion("config")} className="hover:bg-yellow-700 p-2 rounded text-left">Configuración</button>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 relative">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Panel Cliente</h1>
          {/* ✅ Perfil + Carrito */}
          <div className="flex items-center gap-4">
            {/* Foto perfil */}
            <button
              onClick={() => setMostrarPerfil(true)}
              className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center hover:ring-2 hover:ring-yellow-700"
            >
              👤
            </button>

            {/* Icono carrito */}
            <button
              onClick={() => setMostrarCarrito(true)}
              className="relative bg-gray-200 p-3 rounded-full hover:bg-gray-300"
            >
              🛒
              <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full px-2">
                {cantidadCarrito}
              </span>
            </button>
          </div>
        </div>

        {seccion === "menu" && <MenuCliente />}
        {seccion === "pedidos" && <PedidosCliente />}
        {seccion === "chat" && <ChatCliente />}
        {seccion === "config" && (
          <ConfigCliente darkMode={darkMode} setDarkMode={setDarkMode} onLogout={handleLogout} />
        )}

        {/* ✅ Modal carrito */}
        {mostrarCarrito && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded shadow-lg p-6 w-96 text-black">
              <CarritoCliente />
              <div className="flex justify-end gap-4 mt-4">
                <button
                  onClick={() => setMostrarCarrito(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded"
                >
                  Cerrar
                </button>
                <button
                  onClick={confirmarCompra}
                  className="bg-green-700 text-white px-4 py-2 rounded"
                >
                  Confirmar Compra
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ✅ Modal perfil */}
        {mostrarPerfil && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded shadow-lg p-6 w-96 text-black">
              <ConfigCliente
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                onLogout={() => {
                  setMostrarPerfil(false);
                  handleLogout();
                }}
              />
              <div className="flex justify-end gap-4 mt-4">
                <button
                  onClick={() => setMostrarPerfil(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
