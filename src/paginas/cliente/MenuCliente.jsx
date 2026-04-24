import capuchinoImg from "../../imagenes/capuchino.jpg";
import latteImg from "../../imagenes/latte.jpg";
import mochaImg from "../../imagenes/mocha.jpg";

export default function MenuCliente() {
  const handleComprar = (producto) => {
    // Guardar producto en el carrito
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));

    alert(`✅ ${producto.nombre} agregado al carrito`);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center" }}>Menú Cliente</h2>

      <div style={{ display: "flex", gap: "20px", justifyContent: "center", marginTop: "30px" }}>
        <Producto nombre="Capuchino" precio={8000} imagen={capuchinoImg} onComprar={handleComprar} />
        <Producto nombre="Latte" precio={7500} imagen={latteImg} onComprar={handleComprar} />
        <Producto nombre="Mocha" precio={9000} imagen={mochaImg} onComprar={handleComprar} />
      </div>
    </div>
  );
}

function Producto({ nombre, precio, imagen, onComprar }) {
  return (
    <div style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "10px", textAlign: "center" }}>
      <img src={imagen} alt={nombre} style={{ width: "200px", height: "150px", objectFit: "cover", borderRadius: "6px" }} />
      <h4>{nombre}</h4>
      <p>${precio.toLocaleString("es-CO")}</p>
      <button
        onClick={() => onComprar({ nombre, precio })}
        style={{ backgroundColor: "green", color: "white", padding: "8px 12px", borderRadius: "5px", marginTop: "10px" }}
      >
        Comprar
      </button>
    </div>
  );
}
