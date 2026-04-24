export default function PedidosBarista() {
  return (
    <div className="grid grid-cols-3 gap-6">
      {/* Solicitudes */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-bold mb-4 text-yellow-900">Solicitudes</h3>
        <div className="border p-2 rounded mb-2">
          <p className="font-semibold">#ORD-3685</p>
          <p>Cliente: Isabella</p>
          <p>Producto: Croissant (sin azúcar)</p>
          <p>Precio: $3.00</p>
          <span className="text-green-700 font-bold">✔ Verificado</span>
        </div>
      </div>

      {/* En preparación */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-bold mb-4 text-yellow-900">En Preparación</h3>
        <p className="text-gray-500">No hay pedidos en preparación</p>
      </div>

      {/* Entregados */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-bold mb-4 text-yellow-900">Entregados</h3>
        <p className="text-gray-500">No hay pedidos entregados</p>
      </div>
    </div>
  );
}
