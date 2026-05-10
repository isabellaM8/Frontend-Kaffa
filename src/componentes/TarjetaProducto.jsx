export default function TarjetaProducto({ titulo, descripcion, imagen, precio, onComprar }) {
  return (
    <div className="bg-white shadow-md rounded-3xl p-6 text-center transition hover:-translate-y-1 hover:shadow-xl">
      <img
        src={imagen}
        alt={titulo}
        className="w-full h-40 object-cover rounded-3xl mb-4"
      />
      <h3 className="text-2xl font-bold text-green-900 mb-2">{titulo}</h3>
      <p className="text-gray-700 mb-4">{descripcion}</p>
      <p className="text-xl font-semibold text-yellow-700 mb-4">${precio?.toFixed(2) ?? "0.00"}</p>
      <button
        onClick={() => onComprar?.()}
        className="rounded-full bg-green-900 px-5 py-3 text-white transition hover:bg-green-800"
      >
        Agregar al carrito
      </button>
    </div>
  );
}
