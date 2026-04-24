export default function PieDePagina() {
  return (
    <footer className="bg-green-900 text-white py-10 px-6 mt-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Descripción */}
        <div>
          <h2 className="text-xl font-bold mb-4">KAFFA Café</h2>
          <p>
            El arte del buen café artesanal con aroma y tradición desde 2020.
          </p>
        </div>

        {/* Horarios */}
        <div>
          <h2 className="text-xl font-bold mb-4">Horarios</h2>
          <p>Lunes - Viernes: 7:00 AM - 8:00 PM</p>
          <p>Sábados: 8:00 AM - 9:00 PM</p>
          <p>Domingos: 9:00 AM - 6:00 PM</p>
        </div>

        {/* Contacto */}
        <div>
          <h2 className="text-xl font-bold mb-4">Contacto</h2>
          <p>Calle 4 #2-80, Sena Centro Comercio y Servicio</p>
          <p>📞 +57 300 123 4567</p>
          <p>📧 info@kaffacafe.com</p>
        </div>

        {/* Enlaces rápidos */}
        <div>
          <h2 className="text-xl font-bold mb-4">Enlaces Rápidos</h2>
          <ul className="space-y-2">
            <li><a href="/" className="hover:underline">Inicio</a></li>
            <li><a href="/menu" className="hover:underline">Menú</a></li>
            <li><a href="/eventos" className="hover:underline">Eventos</a></li>
            <li><a href="/sobre-nosotros" className="hover:underline">Sobre Nosotros</a></li>
            <li><a href="/contactos" className="hover:underline">Contacto</a></li>
          </ul>
        </div>
      </div>

      <div className="text-center mt-8 border-t border-white pt-4">
        © 2025 KAFFA Café. Todos los derechos reservados. | Vive la experiencia KAFFA
      </div>
    </footer>
  );
}
