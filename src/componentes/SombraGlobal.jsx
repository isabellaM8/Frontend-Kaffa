import { motion, useScroll, useTransform } from "framer-motion";

export default function SombraGlobal() {
  const { scrollY } = useScroll();

  // ✅ La sombra se moverá hacia abajo con el scroll
  const y = useTransform(scrollY, [0, 1000], [0, 500]); 
  // puedes ajustar [0,1000] y [0,500] para controlar la velocidad

  const opacity = useTransform(scrollY, [0, 300], [0.3, 0.7]); 
  // la sombra se hace más oscura al bajar

  return (
    <motion.div
      style={{ y, opacity }}
      className="fixed inset-0 bg-black pointer-events-none"
    />
  );
}
