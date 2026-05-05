import { useState, useEffect } from "react";

export default function ClientesAdmin({ darkMode }) {
  const [clientes, setClientes] = useState([]);

  // 🔹 Cargar clientes desde localStorage al iniciar
  useEffect(() => {
    const guardados = JSON.parse(localStorage.getItem("usuarios")) || [];
    // Filtramos solo los que tengan rol cliente
    const soloClientes = guardados.filter((c) => c.rol === "cliente");
    setClientes(soloClientes);
  }, []);

  return (
    <div className={darkMode ? "bg-gray-900 text-white p-6 rounded" : "bg-white text-black p-6 rounded"}>
      <h1 className="text-3xl font-bold mb-6">Clientes Registrados</h1>

      <table className={darkMode ? "w-full border border-gray-700" : "w-full border border-gray-300"}>
        <thead>
          <tr className={darkMode ? "bg-gray-800 text-white" : "bg-gray-200 text-black"}>
            <th className="p-2">Usuario</th>
            <th className="p-2">Nombre</th>
            <th className="p-2">Correo</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((c) => (
            <tr key={c.usuario} className={darkMode ? "border-t border-gray-700" : "border-t"}>
              <td className="p-2">{c.usuario}</td>
              <td className="p-2">{c.nombre}</td>
              <td className="p-2">{c.correo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
