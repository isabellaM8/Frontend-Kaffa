import { useMemo } from "react";

const estados = ["En Solicitud", "En Preparación", "Entregado"];

const getEstadoStyle = (estado) => {
  if (estado === "En Solicitud") return "bg-yellow-200 text-yellow-900";
  if (estado === "En Preparación") return "bg-blue-200 text-blue-900";
  return "bg-green-200 text-green-900";
};

export default function PedidosBarista({ pedidos = [], darkMode, onChangeStatus }) {
  const pedidosPorEstado = useMemo(
    () =>
      estados.reduce((acc, estado) => {
        acc[estado] = pedidos.filter((pedido) => pedido.estado === estado);
        return acc;
      }, {}),
    [pedidos]
  );

  const totalVentas = useMemo(
    () =>
      pedidos.reduce((acc, pedido) => {
        if (pedido.estado !== "Entregado") return acc;
        if (pedido.productos) {
          return acc + pedido.productos.reduce((sum, prod) => sum + (prod.precio || 0), 0);
        }
        return acc + (pedido.precio || 0);
      }, 0),
    [pedidos]
  );

  return (
    <div className={darkMode ? "bg-gray-900 p-6 rounded-xl shadow" : "bg-white p-6 rounded-xl shadow"}>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold">Tablero de Pedidos</h2>
          <p className={darkMode ? "text-gray-300" : "text-gray-600"}>Administra los pedidos en cada estado de preparación.</p>
        </div>
        <div className={darkMode ? "text-gray-200" : "text-gray-700"}>
          <p className="font-semibold">Total de ventas entregadas</p>
          <p className="text-3xl font-bold">${totalVentas.toFixed(2)}</p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {estados.map((estado) => (
          <div key={estado} className={darkMode ? "bg-gray-800 rounded-xl p-4" : "bg-gray-50 rounded-xl p-4"}>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">{estado}</h3>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getEstadoStyle(estado)}`}>
                {pedidosPorEstado[estado].length}
              </span>
            </div>

            {pedidosPorEstado[estado].length === 0 ? (
              <p className={darkMode ? "text-gray-400" : "text-gray-500"}>Sin pedidos en esta etapa.</p>
            ) : (
              <div className="space-y-3">
                {pedidosPorEstado[estado].map((pedido) => (
                  <div
                    key={pedido.id}
                    className={darkMode ? "bg-gray-900 border border-gray-700 rounded-xl p-4" : "bg-white border border-gray-200 rounded-xl p-4"}
                  >
                    <p className="font-semibold">Pedido #{pedido.id}</p>
                    {pedido.productos ? (
                      <ul className="text-sm mt-2 space-y-1">
                        {pedido.productos.map((prod, index) => (
                          <li key={index}>{prod.nombre} — ${prod.precio.toFixed(2)}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm mt-2">{pedido.cantidad} x {pedido.producto}</p>
                    )}
                    <div className="mt-3 flex flex-wrap gap-2 items-center justify-between">
                      <span className={darkMode ? "text-gray-300" : "text-gray-500"}>
                        Total: ${pedido.productos ? pedido.productos.reduce((acc, prod) => acc + (prod.precio || 0), 0).toFixed(2) : (pedido.precio || 0).toFixed(2)}
                      </span>

                      {estado === "En Solicitud" && (
                        <button
                          onClick={() => onChangeStatus && onChangeStatus(pedido.id, "En Preparación")}
                          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-500"
                        >
                          Preparar
                        </button>
                      )}

                      {estado === "En Preparación" && (
                        <button
                          onClick={() => onChangeStatus && onChangeStatus(pedido.id, "Entregado")}
                          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-500"
                        >
                          Entregar
                        </button>
                      )}

                      {estado === "Entregado" && (
                        <span className="text-sm font-semibold text-green-400">Finalizado</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
