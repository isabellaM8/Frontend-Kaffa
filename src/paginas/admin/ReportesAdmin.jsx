export default function ReportesAdmin({ totalVentas, darkMode }) {
  // Cargar pedidos desde localStorage
  const pedidosGuardados = JSON.parse(localStorage.getItem("pedidos")) || [];

  // Calcular métricas
  const totalPedidos = pedidosGuardados.length;
  const pedidosEntregados = pedidosGuardados.filter((p) => p.estado === "Entregado").length;
  const productosVendidos = pedidosGuardados.reduce((acc, p) => {
    if (p.productos) {
      return acc + p.productos.length;
    }
    return acc + (p.cantidad || 0);
  }, 0);

  return (
    <div
      className={
        darkMode
          ? "p-8 bg-gray-900 text-white rounded"
          : "p-8 bg-white text-black rounded"
      }
    >
      <h1 className="text-2xl font-bold mb-6">Reportes</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div
          className={
            darkMode
              ? "bg-gray-800 p-6 rounded shadow text-center"
              : "bg-white p-6 rounded shadow text-center"
          }
        >
          <h2 className="text-lg font-semibold">Total Ventas</h2>
          <p className="text-2xl font-bold text-green-500">${totalVentas.toFixed(2)}</p>
        </div>
        <div
          className={
            darkMode
              ? "bg-gray-800 p-6 rounded shadow text-center"
              : "bg-white p-6 rounded shadow text-center"
          }
        >
          <h2 className="text-lg font-semibold">Pedidos Registrados</h2>
          <p className="text-2xl font-bold text-blue-400">{totalPedidos}</p>
        </div>
        <div
          className={
            darkMode
              ? "bg-gray-800 p-6 rounded shadow text-center"
              : "bg-white p-6 rounded shadow text-center"
          }
        >
          <h2 className="text-lg font-semibold">Pedidos Entregados</h2>
          <p className="text-2xl font-bold text-yellow-400">{pedidosEntregados}</p>
        </div>
      </div>

      <div
        className={
          darkMode
            ? "bg-gray-800 p-6 rounded shadow"
            : "bg-white p-6 rounded shadow"
        }
      >
        <h2 className="text-lg font-semibold mb-4">Productos Vendidos</h2>
        <p className="text-xl font-bold">{productosVendidos}</p>
      </div>
    </div>
  );
}
