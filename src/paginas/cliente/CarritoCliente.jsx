import { useEffect, useState } from "react";

export default function CarritoCliente() {
  const [productos, setProductos] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    setProductos(carrito);

    const suma = carrito.reduce((acc, p) => acc + p.precio, 0);
    setTotal(suma);
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Carrito de Compras</h2>

      {productos.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <>
          <table className="w-full border-collapse mb-4">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Producto</th>
                <th className="border p-2">Precio</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((p, i) => (
                <tr key={i}>
                  <td className="border p-2">{p.nombre}</td>
                  <td className="border p-2">${p.precio.toLocaleString("es-CO")}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="text-right">
            <p><strong>Cantidad de productos:</strong> {productos.length}</p>
            <p><strong>Total a pagar:</strong> ${total.toLocaleString("es-CO")}</p>
          </div>
        </>
      )}
    </div>
  );
}
