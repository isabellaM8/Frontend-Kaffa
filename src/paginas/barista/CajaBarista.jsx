import { useEffect, useMemo, useState } from "react";

export default function CajaBarista({ darkMode }) {
  const [pedidosEntregados, setPedidosEntregados] = useState([]);

  useEffect(() => {
    const pedidosGuardados = JSON.parse(localStorage.getItem("pedidos")) || [];
    const entregados = pedidosGuardados.filter((p) => p.estado === "Entregado");
    setPedidosEntregados(entregados);
  }, []);

  const totalVentas = useMemo(
    () =>
      pedidosEntregados.reduce((acc, pedido) => {
        if (pedido.productos) {
          return acc + pedido.productos.reduce((sum, prod) => sum + (prod.precio || 0), 0);
        }
        return acc + (pedido.precio || 0);
      }, 0),
    [pedidosEntregados]
  );

  const ticketPromedio = useMemo(
    () => (pedidosEntregados.length > 0 ? totalVentas / pedidosEntregados.length : 0),
    [pedidosEntregados, totalVentas]
  );

  return (
    <div className={darkMode ? "bg-gray-900 p-6 rounded-xl shadow" : "bg-white p-6 rounded-xl shadow"}>
      <h2 className="text-2xl font-bold mb-4">Cierre de Caja</h2>

      <div className="grid gap-4 sm:grid-cols-3 mb-6">
        <div className={darkMode ? "bg-gray-800 p-4 rounded-xl" : "bg-gray-50 p-4 rounded-xl"}>
          <p className="text-sm uppercase tracking-wide text-gray-400">Ventas entregadas</p>
          <p className="mt-3 text-3xl font-bold text-green-500">${totalVentas.toFixed(2)}</p>
        </div>
        <div className={darkMode ? "bg-gray-800 p-4 rounded-xl" : "bg-gray-50 p-4 rounded-xl"}>
          <p className="text-sm uppercase tracking-wide text-gray-400">Pedidos cerrados</p>
          <p className="mt-3 text-3xl font-bold text-yellow-500">{pedidosEntregados.length}</p>
        </div>
        <div className={darkMode ? "bg-gray-800 p-4 rounded-xl" : "bg-gray-50 p-4 rounded-xl"}>
          <p className="text-sm uppercase tracking-wide text-gray-400">Ticket promedio</p>
          <p className="mt-3 text-3xl font-bold text-blue-500">${ticketPromedio.toFixed(2)}</p>
        </div>
      </div>

      {pedidosEntregados.length === 0 ? (
        <p className={darkMode ? "text-gray-400" : "text-gray-600"}>No hay ventas registradas aún.</p>
      ) : (
        <div className="space-y-4">
          {pedidosEntregados.map((pedido) => (
            <div
              key={pedido.id}
              className={
                darkMode
                  ? "bg-gray-800 p-4 rounded-xl shadow-sm"
                  : "bg-white p-4 rounded-xl shadow-sm"
              }
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center">
                <div>
                  <p className="font-semibold">Pedido #{pedido.id}</p>
                  {pedido.productos ? (
                    <ul className="text-sm mt-2 space-y-1">
                      {pedido.productos.map((prod, index) => (
                        <li key={index}>{prod.nombre} — ${prod.precio.toFixed(2)}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm mt-2">{pedido.cantidad}x {pedido.producto}</p>
                  )}
                </div>
                <p className="text-lg font-semibold">${pedido.productos ? pedido.productos.reduce((acc, prod) => acc + (prod.precio || 0), 0).toFixed(2) : (pedido.precio || 0).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

