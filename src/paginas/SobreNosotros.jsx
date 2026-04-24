import BarraNavegacion from "../componentes/BarraNavegacion";
import SombraGlobal from "../componentes/SombraGlobal"; // ✅ sombra global
import PieDePagina from "../componentes/PieDePagina"; // ✅ footer reutilizable
import imgSN from "../imagenes/imgSN.png";

// ✅ nuevas imágenes
import granosCafeImg from "../imagenes/granosCafe.jpg";
import tazaCafeImg from "../imagenes/tazaTE.jpg";
import latteArtImg from "../imagenes/latteArt.jpg";
import cafeLibroImg from "../imagenes/cafeLibro.jpg";

export default function SobreNosotros() {
  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col">
      {/* ✅ Sombra global */}
      <SombraGlobal />

      {/* ✅ Contenido principal */}
      <div className="relative z-10 flex-1">
        <BarraNavegacion />

        <section className="p-8 bg-white bg-opacity-95 rounded-lg m-8 shadow-md">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Pasión, aroma y tradición en cada taza.
          </h2>
          <p className="text-gray-700 mb-6 text-center">
            En KAFFA combinamos raíces artesanales con técnicas modernas para ofrecerte una experiencia única.
          </p>

          {/* ✅ Imagen destacada */}
          <div className="flex justify-center mb-8">
            <img
              src={imgSN}
              alt="Imagen sobre nosotros"
              className="rounded-lg shadow-lg w-full max-w-2xl object-cover"
            />
          </div>

          {/* Nuestra Historia */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-2">Nuestra Historia</h3>
            <p className="text-gray-700">
              KAFFA nació del deseo de rescatar la tradición del café artesanal y renovarla con técnicas contemporáneas.
              Desde la selección de granos hasta la atención en cada taza, trabajamos con dedicación para que cada sorbo cuente una historia.
            </p>
          </div>

          {/* ¿Por qué KAFFA? */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-2">¿Por qué KAFFA?</h3>
            <p className="text-gray-700">
              Porque creemos que el café es cultura. Nuestros proveedores son pequeños productores comprometidos con prácticas sostenibles.
              Nosotros tostamos con cuidado, preparamos con atención y servimos con cariño.
            </p>
          </div>

          {/* Misión, Visión, Valores */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-2">Misión</h3>
              <p className="text-gray-700">
                Ofrecer experiencias memorables a través del café, conectando a las personas con sabores auténticos.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Visión</h3>
              <p className="text-gray-700">
                Ser un referente local en café de especialidad, reconocidos por calidad, sostenibilidad y comunidad.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Valores</h3>
              <p className="text-gray-700">
                Calidad · Transparencia · Respeto por la tierra · Cercanía con la comunidad
              </p>
            </div>
          </div>

          {/* La Experiencia KAFFA */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-2">La Experiencia KAFFA</h3>
            <p className="text-gray-700 mb-4">Aromas, texturas y momentos que inspiran</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-100 p-4 rounded shadow text-center">
                <img src={granosCafeImg} alt="Granos de café" className="rounded-lg object-cover w-full h-40" />
                <p className="mt-2 font-semibold">Granos de café</p>
              </div>
              <div className="bg-gray-100 p-4 rounded shadow text-center">
                <img src={tazaCafeImg} alt="Taza de café" className="rounded-lg object-cover w-full h-40" />
                <p className="mt-2 font-semibold">Taza de café</p>
              </div>
              <div className="bg-gray-100 p-4 rounded shadow text-center">
                <img src={latteArtImg} alt="Latte art" className="rounded-lg object-cover w-full h-40" />
                <p className="mt-2 font-semibold">Latte art</p>
              </div>
              <div className="bg-gray-100 p-4 rounded shadow text-center">
                <img src={cafeLibroImg} alt="Café y libro" className="rounded-lg object-cover w-full h-40" />
                <p className="mt-2 font-semibold">Café y libro</p>
              </div>
            </div>
          </div>

          {/* Nuestro Equipo */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-2">Nuestro Equipo</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-100 p-4 rounded shadow">
                <h4 className="font-bold">María González</h4>
                <p>Jefa de Baristas</p>
              </div>
              <div className="bg-gray-100 p-4 rounded shadow">
                <h4 className="font-bold">Andrés Rivera</h4>
                <p>Tostador / Catador</p>
              </div>
              <div className="bg-gray-100 p-4 rounded shadow">
                <h4 className="font-bold">Laura Méndez</h4>
                <p>Experta en Métodos</p>
              </div>
              <div className="bg-gray-100 p-4 rounded shadow">
                <h4 className="font-bold">Carlos R.</h4>
                <p>Atención al Cliente</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ✅ Footer al final */}
      <PieDePagina />
    </div>
  );
}
