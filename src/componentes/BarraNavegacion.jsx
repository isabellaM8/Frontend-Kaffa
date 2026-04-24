import { Link } from "react-router-dom";
import logoCafe from "../imagenes/logoKaffa.png"; // ✅ tu logo principal en formato PNG

function BarraNavegacion() {
  return (
    <header className="bg-green-900 text-white">
      <nav className="max-w-7xl mx-auto flex justify-between items-center p-4">
        
        {/* Logo redondo + texto en cursiva */}
        <div className="flex items-center gap-3">
          <img 
            src={logoCafe} 
            alt="Logo KAFFA Café" 
            className="w-20 h-20 rounded-full" // ✅ logo redondo y más grande
          />
          <span className="italic font-bold text-2xl">KAFFA</span> {/* ✅ texto en cursiva */}
        </div>

        {/* Navegación */}
        <div className="space-x-6">
          <Link to="/" className="hover:underline">Inicio</Link>
          <Link to="/Menu" className="hover:underline">Menú</Link>
          <Link to="/Eventos" className="hover:underline">Eventos</Link>
          <Link to="/SobreNosotros" className="hover:underline">Sobre Nosotros</Link>
          <Link to="/Contactos" className="hover:underline">Contactos</Link>
        </div>

        {/* Botones de acción */}
        <div className="space-x-4">
          <Link to="/registro" className="bg-yellow-600 px-3 py-1 rounded hover:bg-yellow-700">
            Regístrese ahora
          </Link>
          <Link to="/login" className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700">
            Iniciar sesión
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default BarraNavegacion;
