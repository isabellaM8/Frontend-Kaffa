import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // ✅ importamos Link

import { useEffect, useState } from "react";

export default function HeroBienvenida() {
  const [texto, setTexto] = useState("");
  const mensaje = "El mejor café artesanal para ti";

  // ✅ efecto typing
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTexto(mensaje.slice(0, i));
      i++;
      if (i > mensaje.length) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('/imagenes/fondoHero.jpg')", // ✅ coloca tu imagen de fondo aquí
      }}
    >

      {/* ✅ Contenido visible */}
      <div className="relative z-10 text-center text-white">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 2, y: 0 }}
          transition={{ duration: 1.5 }}
          className="text-5xl font-bold mb-4"
        >
          Bienvenido a KAFFA Café
        </motion.h1>

        {/* ✅ subtítulo con efecto typing */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-xl h-8"
        >
          {texto}
        </motion.p>

        {/* ✅ botón que lleva al menú */}
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Link
            to="/menu"
            className="mt-6 inline-block bg-yellow-700 px-6 py-2 rounded text-white font-semibold shadow-lg"
          >
            Explorar Menú
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
