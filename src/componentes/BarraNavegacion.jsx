import { Link } from "react-router-dom";
import logoCafe from "../imagenes/Logo.jpeg";

function BarraNavegacion() {
  return (
    <header className="bg-green-900 text-white">
      <nav className="max-w-7xl mx-auto flex justify-between items-center p-4">
        
        {/* Logo redondo + texto en cursiva */}        <div className="flex items-center gap-3">
          <img 
            src={logoCafe} 
            alt="Logo KAFFA Café" 
            className="w-20 h-20 rounded-full" 
          />
          <span className="italic font-bold text-2xl">KAFFA</span> {/*  texto en cursiva */}
        </div>

        {/* Navegación */}
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <Link to="/" className="rounded-full bg-white/10 px-4 py-2 transition hover:bg-white/20">Inicio</Link>
          <Link to="/menu" className="rounded-full bg-white/10 px-4 py-2 transition hover:bg-white/20">Menú</Link>
          <Link to="/eventos" className="rounded-full bg-white/10 px-4 py-2 transition hover:bg-white/20">Eventos</Link>
          <Link to="/sobreNosotros" className="rounded-full bg-white/10 px-4 py-2 transition hover:bg-white/20">Sobre Nosotros</Link>
          <Link to="/contactos" className="rounded-full bg-white/10 px-4 py-2 transition hover:bg-white/20">Contactos</Link>
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
