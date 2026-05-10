import capuchinoImg from "../../imagenes/capuchino.jpg";
import latteImg from "../../imagenes/latte.jpg";
import mochaImg from "../../imagenes/mocha.jpg";

const productos = [
  { id: 1, nombre: "Capuchino", precio: 8000, imagen: capuchinoImg, descripcion: "Espresso suave con leche cremosa." },
  { id: 2, nombre: "Latte", precio: 7500, imagen: latteImg, descripcion: "Taza cálida con espuma aterciopelada." },
  { id: 3, nombre: "Mocha", precio: 9000, imagen: mochaImg, descripcion: "Café con chocolate y crema." },
];

export default function MenuCliente({ darkMode, onAddToCart }) {
  return (
    <div className={darkMode ? "bg-gray-900 p-6 rounded-xl shadow" : "bg-white p-6 rounded-xl shadow"}>
      <div className="mb-6 flex flex-col gap-2">
        <h2 className="text-3xl font-bold">Menú Kaffa</h2>
        <p className={darkMode ? "text-gray-300" : "text-gray-600"}>Selecciona tu bebida favorita y agrégala al carrito.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {productos.map((producto) => (
          <div key={producto.id} className={darkMode ? "bg-gray-800 rounded-3xl p-4 shadow" : "bg-gray-50 rounded-3xl p-4 shadow"}>
            <img src={producto.imagen} alt={producto.nombre} className="h-44 w-full rounded-2xl object-cover mb-4" />
            <div className="space-y-3">
              <div>
                <h3 className="text-xl font-semibold">{producto.nombre}</h3>
                <p className={darkMode ? "text-gray-400" : "text-gray-600"}>{producto.descripcion}</p>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-2xl font-bold text-yellow-600">${producto.precio.toLocaleString("es-CO")}</span>
                <button
                  onClick={() => onAddToCart?.(producto)}
                  className="rounded-full bg-yellow-700 px-4 py-2 text-white hover:bg-yellow-600"
                >
                  Agregar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
