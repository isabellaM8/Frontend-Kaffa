import { useState, useEffect, useMemo } from "react";

const inventarioInicial = [
  { id: 1, nombre: "Capuchino", stock: 20 },
  { id: 2, nombre: "Latte", stock: 15 },
  { id: 3, nombre: "Moca", stock: 10 },
  { id: 4, nombre: "Croissant", stock: 25 },
];

export default function InventarioBarista({ darkMode }) {
  const [inventario, setInventario] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    const guardado = JSON.parse(localStorage.getItem("inventario"));
    setInventario(guardado && guardado.length > 0 ? guardado : inventarioInicial);
  }, []);

  useEffect(() => {
    localStorage.setItem("inventario", JSON.stringify(inventario));
  }, [inventario]);

  const productosFiltrados = useMemo(
    () => inventario.filter((item) => item.nombre.toLowerCase().includes(busqueda.toLowerCase())),
    [inventario, busqueda]
  );

  const cambiarStock = (id, cantidad) => {
    setInventario((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, stock: Math.max(item.stock + cantidad, 0) } : item
      )
    );
  };

  const restock = () => {
    setInventario(inventarioInicial);
  };

  return (
    <div className={darkMode ? "bg-gray-900 p-6 rounded-xl shadow" : "bg-white p-6 rounded-xl shadow"}>
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold">Inventario del Barista</h2>
          <p className={darkMode ? "text-gray-300" : "text-gray-600"}>Ajusta el stock y consulta productos bajos.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar producto"
            className={
              darkMode
                ? "border border-gray-700 bg-gray-800 text-white rounded px-3 py-2"
                : "border border-gray-300 bg-gray-100 text-black rounded px-3 py-2"
            }
          />
          <button onClick={restock} className="bg-yellow-700 text-white px-4 py-2 rounded hover:bg-yellow-600">
            Restaurar básico
          </button>
        </div>
      </div>

      {productosFiltrados.length === 0 ? (
        <p className={darkMode ? "text-gray-400" : "text-gray-500"}>No se encontraron productos.</p>
      ) : (
        <div className="space-y-4">
          {productosFiltrados.map((item) => (
            <div
              key={item.id}
              className={
                darkMode
                  ? "bg-gray-800 p-4 rounded-xl shadow flex flex-col sm:flex-row sm:justify-between sm:items-center"
                  : "bg-white p-4 rounded-xl shadow flex flex-col sm:flex-row sm:justify-between sm:items-center"
              }
            >
              <div>
                <p className="font-semibold">{item.nombre}</p>
                <p className={item.stock <= 5 ? "text-orange-400" : darkMode ? "text-gray-300" : "text-gray-600"}>
                  Stock disponible: {item.stock}
                </p>
              </div>
              <div className="mt-3 flex gap-2 sm:mt-0">
                <button
                  onClick={() => cambiarStock(item.id, 1)}
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-500"
                >
                  +1
                </button>
                <button
                  onClick={() => cambiarStock(item.id, -1)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500"
                  disabled={item.stock <= 0}
                >
                  -1
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

