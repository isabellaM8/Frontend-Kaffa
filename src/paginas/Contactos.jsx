import BarraNavegacion from "../componentes/BarraNavegacion";
import SombraGlobal from "../componentes/SombraGlobal"; // ✅ sombra global
import PieDePagina from "../componentes/PieDePagina";   // ✅ footer reutilizable
import ubicacionImg from "../imagenes/ubicacion.png";

export default function Contactos() {
  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col">
      {/* ✅ Sombra global */}
      <SombraGlobal />

      {/* ✅ Contenido principal */}
      <div className="relative z-10 flex-1">
        <BarraNavegacion />

        <section className="p-8 bg-white bg-opacity-95 rounded-lg m-8 shadow-md">
          <h2 className="text-3xl font-bold mb-6 text-center">Contáctanos</h2>
          <p className="text-gray-700 mb-6 text-center">
            ¿Te gustaría saber más sobre nuestra cafetería, dejar una sugerencia o simplemente saludarnos?
            <br />
            Estamos aquí para servirte siempre el mejor café ☕
          </p>

          {/* Información principal */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Datos de contacto */}
            <div>
              <h3 className="text-xl font-bold mb-2">Dirección</h3>
              <p>Calle 4 #2-80, Cafetería Kaffa Sena Centro Comercio y Servicio</p>
              <p>Popayán, Colombia</p>

              <h3 className="text-xl font-bold mt-4 mb-2">Teléfono</h3>
              <p>+57 300 000 0000</p>

              <h3 className="text-xl font-bold mt-4 mb-2">Email</h3>
              <p>contacto@kaffa.com</p>

              <h3 className="text-xl font-bold mt-4 mb-2">Horario</h3>
              <p>Lunes - Viernes: 8:00 a.m - 5:00 p.m</p>
              <p>Sábados: 8:00 a.m - 12:00 p.m</p>
              <p>Domingos y festivos cerrado</p>
            </div>

            {/* Imagen de ubicación */}
            <div className="flex justify-center items-center">
              <img
                src={ubicacionImg}
                alt="Ubicación KAFFA Café"
                className="rounded-lg shadow-lg w-full max-w-md object-cover"
              />
            </div>
          </div>

          {/* Redes sociales */}
          <div className="mt-10 text-center">
            <h3 className="text-xl font-bold mb-4">¡Síguenos!</h3>
            <div className="flex justify-center gap-6">
              <a href="#" className="text-blue-600 hover:underline">Facebook</a>
              <a href="#" className="text-pink-600 hover:underline">Instagram</a>
              <a href="#" className="text-black hover:underline">TikTok</a>
            </div>
          </div>
        </section>
      </div>

      {/* ✅ Footer al final */}
      <PieDePagina />
    </div>
  );
}
