import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function HeroBienvenida() {
  const [texto, setTexto] = useState("");
  const mensaje = "El mejor café artesanal para ti";

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
    <section className="relative min-h-[calc(100vh-80px)] flex items-center justify-center px-6 py-24">
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative z-10 max-w-3xl text-center text-white">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="text-5xl font-extrabold tracking-tight sm:text-6xl"
        >
          Bienvenido a KAFFA Café
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-6 text-lg leading-8 text-gray-200"
        >
          {texto}
        </motion.p>

        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
          <Link
            to="/menu"
            className="mt-10 inline-flex rounded-full bg-yellow-500 px-8 py-4 text-lg font-semibold text-gray-900 shadow-xl shadow-yellow-500/20 transition hover:bg-yellow-400"
          >
            Explorar Menú
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
