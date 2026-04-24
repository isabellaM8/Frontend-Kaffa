export default function PedidosAdmin({ darkMode }) {
  return (
    <div
      className={
        darkMode
          ? "bg-gray-900 text-white p-6 rounded"
          : "bg-white text-black p-6 rounded"
      }
    >
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Pedidos</h1>
        <button
          className={
            darkMode
              ? "bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600"
              : "bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
          }
        >
          Exportar
        </button>
      </header>

      <section>
        <h2 className="text-xl font-semibold mb-4">Últimos Pedidos</h2>
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
                  ? "bg-gray-800 text-white"
                  : "bg-gray-200 text-black"
              }
            >
              <th className="p-2">ID Pedido</th>
              <th className="p-2">Cliente</th>
              <th className="p-2">Productos</th>
              <th className="p-2">Total</th>
              <th className="p-2">Estado</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr className={darkMode ? "border-t border-gray-700" : "border-t"}>
              <td className="p-2">#KAF-8723</td>
              <td className="p-2">Mario Casas</td>
              <td className="p-2">2x Capuchino, 1x Brownie</td>
              <td className="p-2">$22.00</td>
              <td className="p-2 text-green-700 font-bold">COMPLETADO</td>
              <td className="p-2">
                <button className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-500">
                  Ver
                </button>
              </td>
            </tr>
            <tr className={darkMode ? "border-t border-gray-700" : "border-t"}>
              <td className="p-2">#KAF-8724</td>
              <td className="p-2">Luisa Lane</td>
              <td className="p-2">1x Latte, 1x Agua</td>
              <td className="p-2">$8.50</td>
              <td className="p-2 text-yellow-600 font-bold">PENDIENTE</td>
              <td className="p-2">
                <button className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-500">
                  Ver
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}
