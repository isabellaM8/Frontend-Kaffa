import { useState, useEffect } from "react";

export default function InventarioBarista({ darkMode }) {
  const [inventario, setInventario] = useState([]);

  // Cargar inventario desde localStorage o valores iniciales
  useEffect(() => {
    const inventarioGuardado = JSON.parse(localStorage.getItem("inventario")) || [
      { id: 1, nombre: "Capuchino", stock: 20 },
      { id: 2, nombre: "Latte", stock: 15 },
      { id: 3, nombre: "Moca", stock: 10 },
      { id: 4, nombre: "Croissant", stock: 25 },
    ];
    setInventario(inventarioGuardado);
  }, []);

  // Guardar inventario en localStorage
  const actualizarInventario = (nuevoInventario) => {
    setInventario(nuevoInventario);
    localStorage.setItem("inventario", JSON.stringify(nuevoInventario));
  };

  // Cambiar stock manualmente
  const cambiarStock = (id, cantidad) => {
    const nuevoInventario = inventario.map((item) =>
      item.id === id ? { ...item, stock: Math.max(item.stock + cantidad, 0) } : item
    );
    actualizarInventario(nuevoInventario);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Inventario del Barista</h2>
      {inventario.length === 0 ? (
        <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
          No hay productos en inventario.
        </p>
      ) : (
        <div className="space-y-4">
          {inventario.map((item) => (
            <div
              key={item.id}
              className={
                darkMode
                  ? "bg-gray-800 p-4 rounded shadow flex justify-between items-center"
                  : "bg-white p-4 rounded shadow flex justify-between items-center"
              }
            >
              <div>
                <p className="font-bold">{item.nombre}</p>
                <p>Stock disponible: {item.stock}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => cambiarStock(item.id, 1)}
                  className="bg-green-600 text-white px-3 py-1 rounded"
                >
                  +1
                </button>
                <button
                  onClick={() => cambiarStock(item.id, -1)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
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

