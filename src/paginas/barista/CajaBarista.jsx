import { useState, useEffect } from "react";

export default function CajaBarista({ darkMode }) {
  const [pedidosEntregados, setPedidosEntregados] = useState([]);
  const [totalVentas, setTotalVentas] = useState(0);

  // Cargar pedidos entregados desde localStorage
  useEffect(() => {
    const pedidosGuardados = JSON.parse(localStorage.getItem("pedidos")) || [];
    const entregados = pedidosGuardados.filter((p) => p.estado === "Entregado");
    setPedidosEntregados(entregados);

    // Calcular total de ventas
    const total = entregados.reduce((acc, p) => {
      if (p.productos) {
        return acc + p.productos.reduce((sum, prod) => sum + prod.precio, 0);
      }
      return acc + (p.precio || 0);
    }, 0);

    setTotalVentas(total);
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Cierre de Caja</h2>

      {pedidosEntregados.length === 0 ? (
        <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
          No hay ventas registradas aún.
        </p>
      ) : (
        <div className="space-y-4">
          {pedidosEntregados.map((p) => (
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
                  <p>
                    {p.cantidad}x {p.producto}
                  </p>
                )}
              </div>
              <p className="font-bold">
                Total: $
                {p.productos
                  ? p.productos
                      .reduce((acc, prod) => acc + prod.precio, 0)
                      .toFixed(2)
                  : p.precio.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      )}

      <h3 className="text-2xl font-bold mt-6">
        Total del Turno: ${totalVentas.toFixed(2)}
      </h3>
    </div>
  );
}

