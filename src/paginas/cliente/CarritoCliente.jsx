export default function CarritoCliente({ carrito = [], darkMode, onRemove, onClear }) {
  const total = carrito.reduce((sum, item) => sum + (item.precio || 0), 0);

  return (
    <div className={darkMode ? "text-white" : "text-gray-900"}>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Carrito de Compras</h2>
          <p className={darkMode ? "text-gray-300" : "text-gray-600"}>Revisa tus productos antes de confirmar.</p>
        </div>
        <button
          onClick={onClear}
          className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-500"
        >
          Vaciar carrito
        </button>
      </div>

      {carrito.length === 0 ? (
        <p className={darkMode ? "text-gray-400" : "text-gray-600"}>Tu carrito está vacío.</p>
      ) : (
        <div className="space-y-4">
          {carrito.map((item, index) => (
            <div
              key={`${item.nombre}-${index}`}
              className={darkMode ? "bg-gray-800 rounded-3xl p-4" : "bg-gray-50 rounded-3xl p-4"}
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center">
                <div>
                  <p className="font-semibold">{item.nombre}</p>
                  <p className={darkMode ? "text-gray-400" : "text-gray-600"}>Precio: ${item.precio.toLocaleString("es-CO")}</p>
                </div>
                <button
                  onClick={() => onRemove?.(index)}
                  className="rounded-full bg-red-600 px-4 py-2 text-white hover:bg-red-500"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}

          <div className={darkMode ? "bg-gray-800 rounded-3xl p-4" : "bg-gray-50 rounded-3xl p-4"}>
            <div className="flex justify-between items-center">
              <p className="font-semibold">Total</p>
              <p className="text-xl font-bold">${total.toLocaleString("es-CO")}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
