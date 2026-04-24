import BarraNavegacion from "../componentes/BarraNavegacion";
import SombraGlobal from "../componentes/SombraGlobal"; // ✅ sombra global
import PieDePagina from "../componentes/PieDePagina";   // ✅ footer reutilizable

export default function Eventos() {
  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col">
      {/* ✅ Sombra global */}
      <SombraGlobal />

      {/* ✅ Contenido principal */}
      <div className="relative z-10 flex-1">
        <BarraNavegacion />

        <section className="p-8 bg-white bg-opacity-95 rounded-lg m-8 shadow-md">
          <h2 className="text-3xl font-bold mb-6 text-center">Próximos Eventos</h2>

          {/* Evento principal */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-2">
              SENA, protagonista en la Feria Internacional de Café, Cacao y Agroturismo
            </h3>
            <p className="italic text-gray-600 mb-2">Miércoles, 18 de septiembre de 2024</p>
            <p className="text-gray-700 mb-4">
              En el evento, que mostró lo mejor de la caficultura y cacaocultura regional,
              contó con la participación de aprendices e instructores de las regionales
              Huila, Antioquia, Caldas, Cauca y Quindío.
            </p>
            <p className="text-gray-700 mb-4">
              En la capital del Cauca se desarrolla la feria más grande del suroccidente colombiano:
              <span className="font-semibold"> 'El Cauca sabe a Café'</span>; se trata de la 13.ª Feria y Concurso de Cafés Especiales
              y del II Encuentro de Procesadores.
            </p>
            <p className="text-gray-700 mb-4">
              <span className="font-semibold">Cata de café:</span> Gracias a la alianza entre Tecnicafe, Comité de Cafeteros Cauca y
              Mercy Corps Colombia, el SENA participará hasta el 18 de agosto en este evento con
              instructores como jueces y aprendices competidores en las categorías Arte Latte,
              AeroPress y April Brewers Cup; además de 40 aprendices como voluntarios.
            </p>
            <a href="#" className="text-blue-600 hover:underline">Más información</a>
          </div>

          {/* Redes sociales */}
          <div className="mt-10 text-center">
            <h3 className="text-xl font-bold mb-4">Síguenos en nuestras redes</h3>
            <div className="flex justify-center gap-6">
              <a href="#" className="text-blue-600 hover:underline">Facebook</a>
              <a href="#" className="text-pink-600 hover:underline">Instagram</a>
              <a href="#" className="text-blue-400 hover:underline">Twitter</a>
              <a href="#" className="text-green-600 hover:underline">WhatsApp</a>
            </div>
          </div>
        </section>
      </div>

      {/* ✅ Footer al final */}
      <PieDePagina />
    </div>
  );
}
