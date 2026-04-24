export default function InicioAdmin({ darkMode }) {
  return (
    <div
      className={
        darkMode
          ? "bg-gray-900 text-white p-6 rounded"
          : "bg-white text-black p-6 rounded"
      }
    >
      <h1 className="text-3xl font-bold mb-6">Panel de Control</h1>

      {/* Tarjetas de métricas */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div
          className={
            darkMode
              ? "bg-gray-800 rounded shadow p-4"
              : "bg-white rounded shadow p-4"
          }
        >
          <h2 className="text-lg font-semibold">Ingresos Hoy</h2>
          <p className="text-2xl font-bold text-green-500">$1,250</p>
          <p className="text-sm text-green-400">▲ 5% vs ayer</p>
        </div>
        <div
          className={
            darkMode
              ? "bg-gray-800 rounded shadow p-4"
              : "bg-white rounded shadow p-4"
          }
        >
          <h2 className="text-lg font-semibold">Pedidos</h2>
          <p className="text-2xl font-bold text-blue-400">89</p>
          <p className="text-sm text-red-400">▼ 1% vs ayer</p>
        </div>
        <div
          className={
            darkMode
              ? "bg-gray-800 rounded shadow p-4"
              : "bg-white rounded shadow p-4"
          }
        >
          <h2 className="text-lg font-semibold">Clientes Nuevos</h2>
          <p className="text-2xl font-bold text-purple-400">32</p>
          <p className="text-sm text-green-400">▲ 10% vs ayer</p>
        </div>
        <div
          className={
            darkMode
              ? "bg-gray-800 rounded shadow p-4"
              : "bg-white rounded shadow p-4"
          }
        >
          <h2 className="text-lg font-semibold">Ticket Promedio</h2>
          <p className="text-2xl font-bold text-orange-400">$14.04</p>
          <p className="text-sm text-green-400">▲ $0.50</p>
        </div>
      </div>

      {/* Gráficas */}
      <div className="grid grid-cols-2 gap-6">
        <div
          className={
            darkMode
              ? "bg-gray-800 rounded shadow p-6"
              : "bg-white rounded shadow p-6"
          }
        >
          <h2 className="text-lg font-semibold mb-4">Ingresos Semanales</h2>
          <img
            src="https://cdn-icons-png.flaticon.com/512/1828/1828884.png"
            alt="Gráfica ingresos"
            className="w-full h-64 object-contain"
          />
        </div>
        <div
          className={
            darkMode
              ? "bg-gray-800 rounded shadow p-6"
              : "bg-white rounded shadow p-6"
          }
        >
          <h2 className="text-lg font-semibold mb-4">Top Productos</h2>
          <img
            src="https://cdn-icons-png.flaticon.com/512/1828/1828884.png"
            alt="Gráfica top productos"
            className="w-full h-64 object-contain"
          />
        </div>
      </div>
    </div>
  );
}
