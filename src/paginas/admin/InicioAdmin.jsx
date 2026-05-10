export default function InicioAdmin({ darkMode, stats = {} }) {
  const { ventas = 0, pedidos = 0, clientes = 0, productos = 0, pendientes = 0 } = stats;
  const ticketPromedio = pedidos > 0 ? ventas / pedidos : 0;

  return (
    <div className={darkMode ? "bg-gray-900 text-white p-6 rounded" : "bg-white text-black p-6 rounded"}>
      <h1 className="text-3xl font-bold mb-6">Panel de Control</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <div className={darkMode ? "bg-gray-800 rounded shadow p-6" : "bg-white rounded shadow p-6"}>
          <h2 className="text-lg font-semibold">Ventas Entregadas</h2>
          <p className="text-3xl font-bold text-green-500 mt-4">${ventas.toFixed(2)}</p>
          <p className="text-sm text-gray-400 mt-2">Total acumulado hasta hoy</p>
        </div>

        <div className={darkMode ? "bg-gray-800 rounded shadow p-6" : "bg-white rounded shadow p-6"}>
          <h2 className="text-lg font-semibold">Pedidos</h2>
          <p className="text-3xl font-bold text-blue-400 mt-4">{pedidos}</p>
          <p className="text-sm text-gray-400 mt-2">Pedidos registrados</p>
        </div>

        <div className={darkMode ? "bg-gray-800 rounded shadow p-6" : "bg-white rounded shadow p-6"}>
          <h2 className="text-lg font-semibold">Clientes</h2>
          <p className="text-3xl font-bold text-purple-400 mt-4">{clientes}</p>
          <p className="text-sm text-gray-400 mt-2">Clientes registrados</p>
        </div>

        <div className={darkMode ? "bg-gray-800 rounded shadow p-6" : "bg-white rounded shadow p-6"}>
          <h2 className="text-lg font-semibold">Pedido Pendiente</h2>
          <p className="text-3xl font-bold text-yellow-400 mt-4">{pendientes}</p>
          <p className="text-sm text-gray-400 mt-2">Pedidos por entregar</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={darkMode ? "bg-gray-800 rounded shadow p-6" : "bg-white rounded shadow p-6"}>
          <h2 className="text-lg font-semibold mb-4">Ticket Promedio</h2>
          <p className="text-4xl font-bold text-orange-400">${ticketPromedio.toFixed(2)}</p>
          <p className="text-sm text-gray-400 mt-2">Promedio por pedido</p>
        </div>

        <div className={darkMode ? "bg-gray-800 rounded shadow p-6" : "bg-white rounded shadow p-6"}>
          <h2 className="text-lg font-semibold mb-4">Tendencias</h2>
          <img
            src="https://cdn-icons-png.flaticon.com/512/1828/1828884.png"
            alt="Gráfica de tendencias"
            className="w-full h-64 object-contain"
          />
        </div>
      </div>
    </div>
  );
}
