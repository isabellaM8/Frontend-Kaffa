import { useState, useEffect } from "react";

export default function BaristasAdmin({ darkMode }) {
  const [baristas, setBaristas] = useState([]);

  // 🔹 Cargar baristas desde localStorage al iniciar
  useEffect(() => {
    const guardados = JSON.parse(localStorage.getItem("baristas")) || [];
    setBaristas(guardados);
  }, []);

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [baristaEditando, setBaristaEditando] = useState(null);

  const [nuevoBarista, setNuevoBarista] = useState({
    nombre: "",
    usuario: "",
    contrasena: "",
    turno: "",
  });

  // Generar usuario y contraseña automáticamente mientras se escribe el nombre
  useEffect(() => {
    if (nuevoBarista.nombre && !modoEdicion) {
      const partes = nuevoBarista.nombre.trim().split(" ");
      if (partes.length >= 2) {
        const nombre = partes[0].toLowerCase();
        const apellido = partes[1].toLowerCase();
        const numero = Math.floor(Math.random() * 90 + 10); // número corto de 2 dígitos
        const usuario = `${nombre}.${apellido}${numero}`;
        const contrasena = Math.random().toString(36).slice(-8);
        setNuevoBarista((prev) => ({ ...prev, usuario, contrasena }));
      }
    }
  }, [nuevoBarista.nombre, modoEdicion]);

  // Guardar barista nuevo o editado
  const handleGuardarBarista = (e) => {
    e.preventDefault();
    if (!nuevoBarista.nombre || !nuevoBarista.turno) return;

    let baristasActualizados;
    if (modoEdicion && baristaEditando) {
      baristasActualizados = baristas.map((b) =>
        b.id === baristaEditando.id
          ? { ...b, nombre: nuevoBarista.nombre, turno: nuevoBarista.turno }
          : b
      );
    } else {
      const id = Date.now();
      const barista = {
        id,
        nombre: nuevoBarista.nombre,
        usuario: nuevoBarista.usuario,
        contrasena: nuevoBarista.contrasena, // 🔹 corregido
        turno: nuevoBarista.turno,
        rol: "barista", // 🔹 importante para login
      };
      baristasActualizados = [...baristas, barista];
    }

    setBaristas(baristasActualizados);
    localStorage.setItem("baristas", JSON.stringify(baristasActualizados));

    setNuevoBarista({ nombre: "", usuario: "", contrasena: "", turno: "" });
    setMostrarFormulario(false);
    setModoEdicion(false);
    setBaristaEditando(null);
  };

  // Eliminar barista
  const handleEliminarBarista = (id) => {
    const filtrados = baristas.filter((b) => b.id !== id);
    setBaristas(filtrados);
    localStorage.setItem("baristas", JSON.stringify(filtrados));
  };

  // Editar barista
  const handleEditarBarista = (barista) => {
    setNuevoBarista({
      nombre: barista.nombre,
      usuario: barista.usuario,
      contrasena: barista.contrasena,
      turno: barista.turno,
    });
    setBaristaEditando(barista);
    setModoEdicion(true);
    setMostrarFormulario(true);
  };

  return (
    <div className={darkMode ? "bg-gray-900 text-white p-6 rounded" : "bg-white text-black p-6 rounded"}>
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Baristas</h1>
        <button
          onClick={() => {
            setMostrarFormulario(true);
            setModoEdicion(false);
            setNuevoBarista({ nombre: "", usuario: "", contrasena: "", turno: "" });
          }}
          className={darkMode ? "bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600" : "bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"}
        >
          + Agregar Barista
        </button>
      </header>

      <section>
        <h2 className="text-xl font-semibold mb-4">Lista de Baristas</h2>
        <table className={darkMode ? "w-full border border-gray-700" : "w-full border border-gray-300"}>
          <thead>
            <tr className={darkMode ? "bg-gray-800 text-white" : "bg-gray-200 text-black"}>
              <th className="p-2">ID</th>
              <th className="p-2">Nombre Completo</th>
              <th className="p-2">Usuario</th>
              <th className="p-2">Contraseña</th>
              <th className="p-2">Turno</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {baristas.map((b) => (
              <tr key={b.id} className={darkMode ? "border-t border-gray-700" : "border-t"}>
                <td className="p-2">#{b.id}</td>
                <td className="p-2">{b.nombre}</td>
                <td className="p-2">{b.usuario}</td>
                <td className="p-2">{b.contrasena}</td>
                <td className="p-2">{b.turno}</td>
                <td className="p-2 flex gap-2">
                  <button
                    onClick={() => handleEditarBarista(b)}
                    className={darkMode ? "bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-500" : "bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleEliminarBarista(b.id)}
                    className={darkMode ? "bg-red-600 text-white px-2 py-1 rounded hover:bg-red-500" : "bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Modal/Formulario */}
      {mostrarFormulario && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className={darkMode ? "bg-gray-800 p-6 rounded shadow-lg w-96 text-white" : "bg-white p-6 rounded shadow-lg w-96 text-black"}>
            <h2 className="text-xl font-bold mb-4">{modoEdicion ? "Editar Barista" : "Agregar Nuevo Barista"}</h2>
            <form onSubmit={handleGuardarBarista} className="space-y-4">
              <input
                type="text"
                placeholder="Nombre completo"
                value={nuevoBarista.nombre}
                onChange={(e) => setNuevoBarista({ ...nuevoBarista, nombre: e.target.value })}
                className={darkMode ? "w-full border p-2 rounded bg-gray-700 text-white" : "w-full border p-2 rounded bg-gray-100 text-black"}
              />
              <select
                value={nuevoBarista.turno}
                onChange={(e) => setNuevoBarista({ ...nuevoBarista, turno: e.target.value })}
                className={darkMode ? "w-full border p-2 rounded bg-gray-700 text-white" : "w-full border p-2 rounded bg-gray-100 text-black"}
              >
                <option value="">Seleccionar turno</option>
                <option value="Mañana">Mañana</option>
                <option value="Tarde">Tarde</option>
                <option value="Noche">Noche</option>
              </select>
              {!modoEdicion && nuevoBarista.usuario && (
                <div>
                  <p><strong>Usuario generado:</strong> {nuevoBarista.usuario}</p>
                  <p><strong>Contraseña generada:</strong> {nuevoBarista.contrasena}</p>
                </div>
              )}
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setMostrarFormulario(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className={darkMode ? "bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600" : "bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600"}
                >
                  {modoEdicion ? "Guardar Cambios" : "Guardar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
