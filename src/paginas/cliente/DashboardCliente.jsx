import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuCliente from "./MenuCliente";
import PedidosCliente from "./PedidosCliente";
import ChatCliente from "./ChatCliente";
import ConfigCliente from "./ConfigCliente";
import CarritoCliente from "./CarritoCliente";

const navItems = [
  { key: "menu", label: "Menú" },
  { key: "pedidos", label: "Mis Pedidos" },
  { key: "chat", label: "Chat Barista" },
  { key: "config", label: "Configuración" },
];

const getNavClass = (active, darkMode) =>
  `w-full text-left rounded-lg px-4 py-3 transition ${
    active
      ? "bg-yellow-700 text-white shadow-lg"
      : darkMode
      ? "text-gray-200 hover:bg-yellow-700 hover:text-white"
      : "text-gray-900 hover:bg-yellow-600 hover:text-white"
  }`;

export default function DashboardCliente() {
  const [seccion, setSeccion] = useState("menu");
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("clienteTema");
    return saved ? JSON.parse(saved) : false;
  });
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const [mostrarPerfil, setMostrarPerfil] = useState(false);
  const [carrito, setCarrito] = useState([]);
  const [usuario, setUsuario] = useState({ nombre: "Cliente", iniciales: "CL" });
  const navigate = useNavigate();

  useEffect(() => {
    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (!usuarioActivo) {
      navigate("/", { replace: true });
      return;
    }
    const nombre = usuarioActivo.nombre || usuarioActivo.usuario || "Cliente";
    const iniciales = nombre
      .split(" ")
      .filter(Boolean)
      .map((word) => word[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
    setUsuario({ nombre, iniciales });
  }, [navigate]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("carrito")) || [];
    setCarrito(savedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem("clienteTema", JSON.stringify(darkMode));
  }, [darkMode]);

  const carritoCantidad = useMemo(() => carrito.length, [carrito]);
  const carritoTotal = useMemo(
    () => carrito.reduce((sum, item) => sum + (item.precio || 0), 0),
    [carrito]
  );

  const actualizarCarrito = (nuevoCarrito) => {
    setCarrito(nuevoCarrito);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
  };

  const handleAddToCart = (producto) => {
    const nuevoCarrito = [...carrito, producto];
    actualizarCarrito(nuevoCarrito);
    alert(`✅ ${producto.nombre} agregado al carrito`);
  };

  const handleRemoveFromCart = (index) => {
    const nuevoCarrito = carrito.filter((_, i) => i !== index);
    actualizarCarrito(nuevoCarrito);
  };

  const handleConfirmPurchase = () => {
    if (carrito.length === 0) {
      alert("Tu carrito está vacío");
      return;
    }

    const pedidosGuardados = JSON.parse(localStorage.getItem("pedidos")) || [];
    pedidosGuardados.push({
      id: Date.now(),
      productos: carrito,
      estado: "En Solicitud",
      fecha: new Date().toLocaleString("es-CO"),
    });
    localStorage.setItem("pedidos", JSON.stringify(pedidosGuardados));

    actualizarCarrito([]);
    setMostrarCarrito(false);
    setSeccion("pedidos");
    alert("✅ Compra realizada con éxito");
  };

  const handleLogout = () => {
    localStorage.removeItem("usuarioActivo");
    navigate("/");
  };

  return (
    <div className={darkMode ? "min-h-screen flex flex-col md:flex-row bg-gray-950 text-white" : "min-h-screen flex flex-col md:flex-row bg-gray-100 text-gray-900"}>
      <aside className={darkMode ? "w-full md:w-72 bg-yellow-950 text-white p-6" : "w-full md:w-72 bg-yellow-900 text-white p-6"}>
        <div className="mb-8 text-center md:text-left">
          <h2 className="text-2xl font-bold">KAFFA Cliente</h2>
          <p className="text-sm text-yellow-200">Tu espacio de pedidos</p>
        </div>
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setSeccion(item.key)}
              className={getNavClass(seccion === item.key, darkMode)}
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
            <button
              onClick={() => setMostrarCarrito(true)}
              className={darkMode ? "relative bg-gray-800 px-4 py-2 rounded" : "relative bg-white px-4 py-2 rounded shadow"}
            >
              🛒 Carrito
              <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-2 text-xs">{carritoCantidad}</span>
            </button>
            <button
              onClick={() => setMostrarPerfil(true)}
              className={darkMode ? "bg-gray-800 px-4 py-2 rounded" : "bg-white px-4 py-2 rounded shadow"}
            >
              {usuario.iniciales}
            </button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-8">
          <div className={darkMode ? "bg-gray-800 rounded-xl p-5 shadow" : "bg-white rounded-xl p-5 shadow"}>
            <p className="text-sm uppercase tracking-wide text-gray-400">Productos en carrito</p>
            <p className="mt-3 text-3xl font-bold text-yellow-500">{carritoCantidad}</p>
          </div>
          <div className={darkMode ? "bg-gray-800 rounded-xl p-5 shadow" : "bg-white rounded-xl p-5 shadow"}>
            <p className="text-sm uppercase tracking-wide text-gray-400">Total estimado</p>
            <p className="mt-3 text-3xl font-bold text-green-500">${carritoTotal.toFixed(0)}</p>
          </div>
          <div className={darkMode ? "bg-gray-800 rounded-xl p-5 shadow" : "bg-white rounded-xl p-5 shadow"}>
            <p className="text-sm uppercase tracking-wide text-gray-400">Sección actual</p>
            <p className="mt-3 text-3xl font-bold text-blue-500">{navItems.find((item) => item.key === seccion)?.label}</p>
          </div>
          <div className={darkMode ? "bg-gray-800 rounded-xl p-5 shadow" : "bg-white rounded-xl p-5 shadow"}>
            <p className="text-sm uppercase tracking-wide text-gray-400">Estado</p>
            <p className="mt-3 text-3xl font-bold text-orange-500">{carrito.length > 0 ? "Listo para comprar" : "Agrega productos"}</p>
          </div>
        </div>

        <div className="space-y-6">
          {seccion === "menu" && <MenuCliente darkMode={darkMode} onAddToCart={handleAddToCart} />}
          {seccion === "pedidos" && <PedidosCliente darkMode={darkMode} />}
          {seccion === "chat" && <ChatCliente darkMode={darkMode} />}
          {seccion === "config" && <ConfigCliente darkMode={darkMode} setDarkMode={setDarkMode} onLogout={handleLogout} />}
        </div>

        {mostrarCarrito && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4">
            <div className={darkMode ? "w-full max-w-xl rounded-xl bg-gray-900 p-6 text-white shadow-lg" : "w-full max-w-xl rounded-xl bg-white p-6 text-gray-900 shadow-lg"}>
              <CarritoCliente
                darkMode={darkMode}
                carrito={carrito}
                onRemove={handleRemoveFromCart}
                onClear={() => actualizarCarrito([])}
              />
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-between">
                <button
                  onClick={() => setMostrarCarrito(false)}
                  className="w-full rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-400 sm:w-auto"
                >
                  Cerrar
                </button>
                <button
                  onClick={handleConfirmPurchase}
                  className="w-full rounded bg-green-600 px-4 py-2 text-white hover:bg-green-500 sm:w-auto"
                >
                  Confirmar Compra
                </button>
              </div>
            </div>
          </div>
        )}

        {mostrarPerfil && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4">
            <div className={darkMode ? "w-full max-w-xl rounded-xl bg-gray-900 p-6 text-white shadow-lg" : "w-full max-w-xl rounded-xl bg-white p-6 text-gray-900 shadow-lg"}>
              <ConfigCliente
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                onLogout={() => {
                  setMostrarPerfil(false);
                  handleLogout();
                }}
              />
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setMostrarPerfil(false)}
                  className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-400"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
