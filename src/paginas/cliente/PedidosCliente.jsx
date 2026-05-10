import { useEffect, useMemo, useState } from "react";

const estadoStyles = {
  "En Solicitud": "bg-yellow-200 text-yellow-900",
  "En Preparación": "bg-blue-200 text-blue-900",
  Terminado: "bg-indigo-200 text-indigo-900",
  Entregado: "bg-green-200 text-green-900",
  Cancelado: "bg-red-200 text-red-900",
};

export default function PedidosCliente({ darkMode }) {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const pedidosGuardados = JSON.parse(localStorage.getItem("pedidos")) || [];
    setPedidos(pedidosGuardados);
  }, []);

  const actualizarEstado = (id, nuevoEstado) => {
    const nuevosPedidos = pedidos.map((pedido) =>
      pedido.id === id ? { ...pedido, estado: nuevoEstado } : pedido
    );
    setPedidos(nuevosPedidos);
    localStorage.setItem("pedidos", JSON.stringify(nuevosPedidos));
  };

  const pedidosResumen = useMemo(
    () => ({
      total: pedidos.length,
      enSolicitud: pedidos.filter((pedido) => pedido.estado === "En Solicitud").length,
      entregados: pedidos.filter((pedido) => pedido.estado === "Entregado").length,
    }),
    [pedidos]
  );

  return (
    <div className={darkMode ? "bg-gray-900 p-6 rounded-xl shadow text-white" : "bg-white p-6 rounded-xl shadow text-gray-900"}>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
        <div>
          <h2 className="text-3xl font-bold">Mis Pedidos</h2>
          <p className={darkMode ? "text-gray-400" : "text-gray-600"}>Revisa el estado de tus pedidos y actúa si es necesario.</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-3xl bg-yellow-50 p-4 text-center text-yellow-800 shadow-sm">
            <p className="text-sm uppercase">Total</p>
            <p className="text-2xl font-bold">{pedidosResumen.total}</p>
          </div>
          <div className="rounded-3xl bg-blue-50 p-4 text-center text-blue-800 shadow-sm">
            <p className="text-sm uppercase">En solicitud</p>
            <p className="text-2xl font-bold">{pedidosResumen.enSolicitud}</p>
          </div>
          <div className="rounded-3xl bg-green-50 p-4 text-center text-green-800 shadow-sm">
            <p className="text-sm uppercase">Entregados</p>
            <p className="text-2xl font-bold">{pedidosResumen.entregados}</p>
          </div>
        </div>
      </div>

      {pedidos.length === 0 ? (
        <p className={darkMode ? "text-gray-400" : "text-gray-600"}>No tienes pedidos aún.</p>
      ) : (
        <div className="space-y-4">
          {pedidos.map((pedido) => (
            <div key={pedido.id} className={darkMode ? "bg-gray-800 rounded-3xl p-5 shadow" : "bg-gray-50 rounded-3xl p-5 shadow"}>
              <div className="flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-center">
                <div>
                  <p className="text-sm text-gray-400">Pedido #{pedido.id}</p>
                  <p className="text-xl font-semibold">{pedido.fecha || "Fecha no disponible"}</p>
                </div>
                <span className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold ${estadoStyles[pedido.estado] || "bg-gray-200 text-gray-800"}`}>
                  {pedido.estado}
                </span>
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  {pedido.productos?.map((item, index) => (
                    <div key={index} className={darkMode ? "rounded-2xl bg-gray-900 p-3" : "rounded-2xl bg-white p-3"}>
                      <p className="font-medium">{item.nombre}</p>
                      <p className={darkMode ? "text-gray-400" : "text-gray-500"}>${item.precio.toLocaleString("es-CO")}</p>
                    </div>
                  ))}
                </div>
                <div className="rounded-3xl bg-yellow-50 p-4 text-right">
                  <p className="text-sm uppercase text-gray-500">Total</p>
                  <p className="text-2xl font-bold">${pedido.productos?.reduce((sum, item) => sum + (item.precio || 0), 0).toLocaleString("es-CO")}</p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-3 justify-end">
                {pedido.estado === "En Solicitud" && (
                  <button
                    onClick={() => actualizarEstado(pedido.id, "En Preparación")}
                    className="rounded-full bg-blue-600 px-4 py-2 text-white hover:bg-blue-500"
                  >
                    Confirmar preparación
                  </button>
                )}
                {pedido.estado === "En Preparación" && (
                  <button
                    onClick={() => actualizarEstado(pedido.id, "Entregado")}
                    className="rounded-full bg-green-600 px-4 py-2 text-white hover:bg-green-500"
                  >
                    Marcar entregado
                  </button>
                )}
                {pedido.estado !== "Entregado" && pedido.estado !== "Cancelado" && (
                  <button
                    onClick={() => actualizarEstado(pedido.id, "Cancelado")}
                    className="rounded-full bg-red-600 px-4 py-2 text-white hover:bg-red-500"
                  >
                    Cancelar pedido
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
