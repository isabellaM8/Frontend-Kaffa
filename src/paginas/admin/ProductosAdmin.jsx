import { useState } from "react";

export default function ProductosAdmin({ darkMode }) {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [productoEditando, setProductoEditando] = useState(null);

  const [productos, setProductos] = useState([
    { id: 1, nombre: "Capuchino", precio: 4.5, imagen: "https://cdn-icons-png.flaticon.com/512/415/415733.png" },
    { id: 2, nombre: "Croissant", precio: 3.0, imagen: "https://cdn-icons-png.flaticon.com/512/1046/1046784.png" },
  ]);

  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    precio: "",
    imagen: "",
  });

  // Guardar producto nuevo o editado
  const handleGuardarProducto = (e) => {
    e.preventDefault();
    if (!nuevoProducto.nombre || !nuevoProducto.precio) return;

    if (modoEdicion && productoEditando) {
      const productosActualizados = productos.map((p) =>
        p.id === productoEditando.id
          ? { ...p, nombre: nuevoProducto.nombre, precio: parseFloat(nuevoProducto.precio), imagen: nuevoProducto.imagen }
          : p
      );
      setProductos(productosActualizados);
    } else {
      const producto = {
        id: Date.now(),
        nombre: nuevoProducto.nombre,
        precio: parseFloat(nuevoProducto.precio),
        imagen: nuevoProducto.imagen || "https://cdn-icons-png.flaticon.com/512/1046/1046784.png",
      };
      setProductos([...productos, producto]);
    }

    setNuevoProducto({ nombre: "", precio: "", imagen: "" });
    setMostrarFormulario(false);
    setModoEdicion(false);
    setProductoEditando(null);
  };

  const handleEliminarProducto = (id) => {
    const productosFiltrados = productos.filter((p) => p.id !== id);
    setProductos(productosFiltrados);
  };

  const handleEditarProducto = (producto) => {
    setNuevoProducto({ nombre: producto.nombre, precio: producto.precio, imagen: producto.imagen });
    setProductoEditando(producto);
    setModoEdicion(true);
    setMostrarFormulario(true);
  };

  return (
    <div
      className={
        darkMode
          ? "bg-gray-900 text-white p-6 rounded"
          : "bg-white text-black p-6 rounded"
      }
    >
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Productos</h1>
        <button
          onClick={() => {
            setMostrarFormulario(true);
            setModoEdicion(false);
            setNuevoProducto({ nombre: "", precio: "", imagen: "" });
          }}
          className={
            darkMode
              ? "bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600"
              : "bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
          }
        >
          + Nuevo Producto
        </button>
      </header>

      <section>
        <h2 className="text-xl font-semibold mb-4">Catálogo Público</h2>
        <p className={darkMode ? "text-gray-300 mb-6" : "text-gray-600 mb-6"}>
          Vista de productos tal como aparecen en la App del cliente.
        </p>
        <div className="grid grid-cols-2 gap-6">
          {productos.map((prod) => (
            <div
              key={prod.id}
              className={
                darkMode
                  ? "bg-gray-800 rounded shadow p-4 flex flex-col items-center"
                  : "bg-white rounded shadow p-4 flex flex-col items-center"
              }
            >
              <img src={prod.imagen} alt={prod.nombre} className="w-20 h-20 mb-4" />
              <h3 className="text-lg font-bold">{prod.nombre}</h3>
              <p className="text-green-500 font-semibold">${prod.precio.toFixed(2)}</p>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => handleEditarProducto(prod)}
                  className={
                    darkMode
                      ? "bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-500"
                      : "bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  }
                >
                  Editar
                </button>
                <button
                  onClick={() => handleEliminarProducto(prod.id)}
                  className={
                    darkMode
                      ? "bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500"
                      : "bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  }
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal/Formulario */}
      {mostrarFormulario && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div
            className={
              darkMode
                ? "bg-gray-800 p-6 rounded shadow-lg w-96 text-white"
                : "bg-white p-6 rounded shadow-lg w-96 text-black"
            }
          >
            <h2 className="text-xl font-bold mb-4">
              {modoEdicion ? "Editar Producto" : "Agregar Nuevo Producto"}
            </h2>
            <form onSubmit={handleGuardarProducto} className="space-y-4">
              <input
                type="text"
                placeholder="Nombre del producto"
                value={nuevoProducto.nombre}
                onChange={(e) => setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })}
                className={
                  darkMode
                    ? "w-full border p-2 rounded bg-gray-700 text-white"
                    : "w-full border p-2 rounded bg-gray-100 text-black"
                }
              />
              <input
                type="number"
                placeholder="Precio"
                value={nuevoProducto.precio}
                onChange={(e) => setNuevoProducto({ ...nuevoProducto, precio: e.target.value })}
                className={
                  darkMode
                    ? "w-full border p-2 rounded bg-gray-700 text-white"
                    : "w-full border p-2 rounded bg-gray-100 text-black"
                }
              />
              <input
                type="text"
                placeholder="URL de imagen (opcional)"
                value={nuevoProducto.imagen}
                onChange={(e) => setNuevoProducto({ ...nuevoProducto, imagen: e.target.value })}
                className={
                  darkMode
                    ? "w-full border p-2 rounded bg-gray-700 text-white"
                    : "w-full border p-2 rounded bg-gray-100 text-black"
                }
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setMostrarFormulario(false);
                    setModoEdicion(false);
                    setProductoEditando(null);
                  }}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className={
                    darkMode
                      ? "bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600"
                      : "bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
                  }
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
