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
      <div className="flex justify-center">
        <img
          src={ubicacionImg}
          alt="Ubicación KAFFA Café"
          className="rounded-lg shadow-lg w-full max-w-md object-cover"
        />
      </div>
    </section>
  );
}
