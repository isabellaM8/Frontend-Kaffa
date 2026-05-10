import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import BarraNavegacion from "../componentes/BarraNavegacion";
import HeroBienvenida from "../componentes/HeroBienvenida";
import TarjetaProducto from "../componentes/TarjetaProducto";
import SeccionSobreNosotros from "../componentes/SeccionSobreNosotros";
import PieDePagina from "../componentes/PieDePagina";
import SombraGlobal from "../componentes/SombraGlobal"; 

import fondoImg from "../imagenes/fondoP1.jpg";
import capuchinoImg from "../imagenes/capuchino.jpg";
import latteImg from "../imagenes/latte.jpg";
import mochaImg from "../imagenes/mocha.jpg";

function Bienvenida() {
  const navigate = useNavigate();

  const handleComprar = (producto) => {
    const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (!usuario || usuario.rol !== "cliente") {
      navigate("/registro");
    } else {
      let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
      if (producto) carrito.push(producto);
      localStorage.setItem("carrito", JSON.stringify(carrito));
      navigate("/cliente", { replace: true });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.0, staggerChildren: 0.3 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div
      className="relative min-h-screen overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${fondoImg})` }}
    >
      {/* ✅ Sombra global */}
      <SombraGlobal />

      {/* ✅ Contenido encima de la sombra */}
      <div className="relative z-10">
        <BarraNavegacion />
        <HeroBienvenida />

        <section className="p-8 bg-white bg-opacity-80 rounded-lg m-8">
          <h2 className="text-2xl font-bold mb-6">Recomendados</h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <motion.div variants={cardVariants}>
              <TarjetaProducto
                titulo="Capuchino"
                descripcion="Espresso con leche vaporizada y espuma cremosa."
                imagen={capuchinoImg}
                onComprar={() => handleComprar({ nombre: "Capuchino", precio: 4.5 })}
              />
            </motion.div>
            <motion.div variants={cardVariants}>
              <TarjetaProducto
                titulo="Latte"
                descripcion="Café espresso con abundante leche vaporizada."
                imagen={latteImg}
                onComprar={() => handleComprar({ nombre: "Latte", precio: 5.0 })}
              />
            </motion.div>
            <motion.div variants={cardVariants}>
              <TarjetaProducto
                titulo="Mocha"
                descripcion="La combinación perfecta de espresso, chocolate y leche."
                imagen={mochaImg}
                onComprar={() => handleComprar({ nombre: "Mocha", precio: 5.5 })}
              />
            </motion.div>
          </motion.div>
        </section>

        <SeccionSobreNosotros />
        <PieDePagina />
      </div>
    </div>
  );
}

export default Bienvenida;
