export default function InventarioAdmin({ darkMode }) {
  return (
    <div
      className={
        darkMode
          ? "bg-gray-900 text-white p-6 rounded"
          : "bg-white text-black p-6 rounded"
      }
    >
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Inventario & Insumos</h1>
      </header>

      <section
        className={
          darkMode
            ? "bg-gray-800 rounded shadow p-6 text-white"
            : "bg-white rounded shadow p-6 text-black"
        }
      >
        <table
          className={
            darkMode
              ? "w-full border border-gray-700"
              : "w-full border border-gray-300"
          }
        >
          <thead>
            <tr
              className={
                darkMode
                  ? "bg-gray-700 text-white"
                  : "bg-gray-200 text-black"
              }
            >
              <th className="p-2">ID</th>
              <th className="p-2">Nombre</th>
              <th className="p-2">Categoría</th>
              <th className="p-2">Cant.</th>
              <th className="p-2">Und.</th>
              <th className="p-2">Precio Compra</th>
              <th className="p-2">Proveedor</th>
              <th className="p-2">Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr className={darkMode ? "border-t border-gray-700" : "border-t"}>
              <td className="p-2">PROD-001</td>
              <td className="p-2">Café Grano Premium</td>
              <td className="p-2">Café</td>
              <td className="p-2">15</td>
              <td className="p-2">kg</td>
              <td className="p-2">$45.00</td>
              <td className="p-2">Café Colombia</td>
              <td className="p-2 text-green-600 font-bold">DISPONIBLE</td>
            </tr>
            {/* Aquí puedes agregar más filas de productos */}
          </tbody>
        </table>
      </section>
    </div>
  );
}
