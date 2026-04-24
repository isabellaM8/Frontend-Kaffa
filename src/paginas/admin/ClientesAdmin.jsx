export default function ClientesAdmin({ darkMode }) {
  return (
    <div
      className={
        darkMode
          ? "bg-gray-900 text-white p-6 rounded"
          : "bg-white text-black p-6 rounded"
      }
    >
      <h1 className="text-3xl font-bold mb-6">Clientes</h1>
      <section
        className={
          darkMode
            ? "bg-gray-800 rounded shadow p-6 text-white"
            : "bg-white rounded shadow p-6 text-black"
        }
      >
        <h2 className="text-xl font-semibold mb-4">Gestión de Clientes</h2>
        <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
          Próximamente: Historial de compras.
        </p>
      </section>
    </div>
  );
}
