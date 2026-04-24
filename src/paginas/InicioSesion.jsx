import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import fondoIN from "../imagenes/fondoIN.jpg";   // Fondo café
import logoCafe from "../imagenes/Logo.jpeg";    // Logo del café

export default function InicioSesion() {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const navigate = useNavigate();

  const manejarLogin = (e) => {
    e.preventDefault();

    // Caso especial: administrador fijo
    if (usuario === "admin" && contrasena === "1234") {
      localStorage.setItem("usuarioActivo", JSON.stringify({ rol: "admin", usuario }));
      navigate("/admin", { replace: true }); // ✅ aquí sí usamos replace
      return;
    }

    // Leer usuarios guardados en localStorage (baristas y clientes)
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Buscar coincidencia
    const usuarioEncontrado = usuarios.find(
      (u) => u.usuario === usuario && u.contraseña === contrasena
    );

    if (usuarioEncontrado) {
      // Guardar sesión activa
      localStorage.setItem("usuarioActivo", JSON.stringify(usuarioEncontrado));

      if (usuarioEncontrado.rol === "barista") {
        navigate("/barista", { replace: true }); // ✅ replace aquí
      } else if (usuarioEncontrado.rol === "cliente") {
        navigate("/cliente", { replace: true }); // ✅ replace aquí
      }
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${fondoIN})` }}
    >
      <section className="p-8 bg-white bg-opacity-95 rounded-lg shadow-lg max-w-md w-full">
        
        {/* Logo arriba */}
        <div className="flex justify-center mb-6">
          <img src={logoCafe} alt="Logo Café" className="w-24 h-24" />
        </div>

        <h2 className="text-3xl font-bold mb-6 text-center text-green-900">Inicia Sesión</h2>
        
        <form onSubmit={manejarLogin} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            className="border-2 border-green-700 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            className="border-2 border-green-700 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            className="bg-green-800 text-white py-2 rounded hover:bg-green-900 font-bold"
          >
            INGRESAR
          </button>
        </form>

        {/* Enlaces abajo */}
        <div className="text-center mt-4 text-gray-700 space-y-2">
          <p>
            ¿No tienes cuenta?{" "}
            {/* 🚀 sin replace, para que atrás vuelva a Bienvenida */}
            <Link to="/registro" className="text-green-700 hover:underline font-semibold">
              Regístrate aquí
            </Link>
          </p>
          <p>
            <Link to="/recuperar" className="text-green-700 hover:underline font-semibold">
              ¿Olvidaste tu contraseña?
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
