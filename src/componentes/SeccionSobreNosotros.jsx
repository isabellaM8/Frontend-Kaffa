import { Link } from "react-router-dom";
import ubicacionImg from "../imagenes/imgSN.png";

export default function SeccionSobreNosotros() {
  return (
    <section className="p-8 bg-white bg-opacity-90 rounded-lg m-8 shadow-md">
      <h2 className="text-2xl font-bold mb-4">Sobre Nosotros</h2>
      <p className="text-gray-700 mb-6">
        En KAFFA Café nos apasiona ofrecer la mejor experiencia de café,
        combinando tradición y calidad en cada taza. Nuestro equipo trabaja
        día a día para brindarte un ambiente acogedor y productos únicos.
      </p>
      <div className="flex flex-col items-center gap-6 lg:flex-row lg:items-start">
        <div className="space-y-4 lg:w-1/2">
          <p className="text-gray-600">
            Descubre nuestra selección de cafés especiales, repostería fresca
            y un ambiente ideal para trabajar o relajarte. Visítanos y vive la
            experiencia KAFFA.
          </p>
          <Link
            to="/contactos"
            className="inline-block rounded-full bg-green-900 px-6 py-3 text-white transition hover:bg-green-800"
          >
            Contáctanos
          </Link>
        </div>
        <img
          src={ubicacionImg}
          alt="Ubicación KAFFA Café"
          className="rounded-lg shadow-lg w-full max-w-md object-cover"
        />
      </div>
    </section>
  );
}
