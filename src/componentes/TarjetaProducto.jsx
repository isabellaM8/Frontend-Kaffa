import { useNavigate } from "react-router-dom";

export default function TarjetaProducto({ titulo, descripcion, imagen, precio }) {
  const navigate = useNavigate();

  const handleComprar = () => {
    const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (!usuario || usuario.rol !== "cliente") {
      // Si no hay sesión → ir a registro
      navigate("/registro");
    } else {
      // Si ya está logueado como cliente → agregar al carrito
      let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
      carrito.push({ nombre: titulo, precio });
      localStorage.setItem("carrito", JSON.stringify(carrito));
      navigate("/cliente"); // redirige al dashboard cliente
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 text-center">
      <img
        src={imagen}
        alt={titulo}
        className="w-full h-40 object-cover rounded mb-4"
      />
      <h3 className="text-xl font-bold text-green-900 mb-2">{titulo}</h3>
      <p className="text-gray-700 mb-4">{descripcion}</p>
      
      {/* Botón que verifica sesión antes de comprar */}
      <button
        onClick={handleComprar}
        className="bg-green-900 text-white px-4 py-2 rounded hover:bg-green-700 inline-block"
      >
        Comprar
      </button>
    </div>
  );
}
