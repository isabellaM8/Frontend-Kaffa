// Componentes
import BarraNavegacion from "../componentes/BarraNavegacion";
import SombraGlobal from "../componentes/SombraGlobal";
import PieDePagina from "../componentes/PieDePagina";
import { useNavigate } from "react-router-dom";

// Imágenes
import capuchinoImg from "../imagenes/capuchino.jpg";
import latteImg from "../imagenes/latte.jpg";
import mochaImg from "../imagenes/mocha.jpg";
import americanoImg from "../imagenes/americano.jpg";
import brownieImg from "../imagenes/brownie.jpg";
import cheesecakeImg from "../imagenes/cheesecake.jpg";
import tiramisuImg from "../imagenes/tiramisu.jpg";
import sandwichClubImg from "../imagenes/sandwichClub.jpg";
import croissantImg from "../imagenes/croissant.jpg";
import bagelImg from "../imagenes/bagel.jpg";

export default function Menu() {
  const navigate = useNavigate();

  const handleComprar = (producto) => {
    const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));

    if (!usuario || usuario.rol !== "cliente") {
      // 🚨 Si no hay sesión → ir a registro
      navigate("/registro");
    } else {
      // ✅ Si ya está logueado como cliente → agregar al carrito
      const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
      carrito.push(producto);
      localStorage.setItem("carrito", JSON.stringify(carrito));

      alert(`✅ ${producto.nombre} agregado al carrito`);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col">
      {/* ✅ Sombra global */}
      <SombraGlobal />

      {/* ✅ Contenido principal */}
      <div className="relative z-10 flex-1">
        <BarraNavegacion />
        <section className="p-8 bg-white bg-opacity-95 rounded-lg m-8 shadow-md">
          <h2 className="text-3xl font-bold mb-6 text-center">Nuestro Menú</h2>

          {/* Cafés */}
          <h3 className="text-2xl font-bold mb-4">Cafés</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Producto nombre="Capuchino" precio={8000} imagen={capuchinoImg} onComprar={handleComprar} />
            <Producto nombre="Latte" precio={7500} imagen={latteImg} onComprar={handleComprar} />
            <Producto nombre="Mocha" precio={9000} imagen={mochaImg} onComprar={handleComprar} />
            <Producto nombre="Americano" precio={6000} imagen={americanoImg} onComprar={handleComprar} />
          </div>

          {/* Postres */}
          <h3 className="text-2xl font-bold mb-4">Postres</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Producto nombre="Brownie" precio={6000} imagen={brownieImg} onComprar={handleComprar} />
            <Producto nombre="Cheesecake" precio={7000} imagen={cheesecakeImg} onComprar={handleComprar} />
            <Producto nombre="Tiramisú" precio={7500} imagen={tiramisuImg} onComprar={handleComprar} />
          </div>

          {/* Snacks */}
          <h3 className="text-2xl font-bold mb-4">Snacks</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Producto nombre="Sándwich Club" precio={10000} imagen={sandwichClubImg} onComprar={handleComprar} />
            <Producto nombre="Croissant" precio={5500} imagen={croissantImg} onComprar={handleComprar} />
            <Producto nombre="Bagel" precio={6500} imagen={bagelImg} onComprar={handleComprar} />
          </div>
        </section>
      </div>

      {/* ✅ Footer al final */}
      <PieDePagina />
    </div>
  );
}

function Producto({ nombre, precio, imagen, onComprar }) {
  return (
    <div className="bg-gray-100 p-4 rounded shadow text-center">
      <img src={imagen} alt={nombre} className="w-full h-40 object-cover rounded mb-2" />
      <h4 className="font-bold">{nombre}</h4>
      <p>${precio.toLocaleString("es-CO")}</p>
      <button
        onClick={() => onComprar({ nombre, precio })}
        className="bg-green-900 text-white px-4 py-1 rounded hover:bg-green-700 mt-2"
      >
        Comprar
      </button>
    </div>
  );
}
