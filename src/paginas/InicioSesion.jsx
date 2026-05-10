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

    // 🔹 Caso especial: administrador fijo
    if (usuario === "admin" && contrasena === "1234") {
      localStorage.setItem("usuarioActivo", JSON.stringify({ rol: "admin", usuario }));
      navigate("/admin", { replace: true });
      return;
    }

    // 🔹 Leer clientes y baristas desde localStorage
    const clientes = JSON.parse(localStorage.getItem("usuarios")) || [];
    const baristas = JSON.parse(localStorage.getItem("baristas")) || [];
    const todosUsuarios = [...clientes, ...baristas];

    // 🔹 Buscar coincidencia (usamos siempre 'contrasena' sin ñ)
    const usuarioEncontrado = todosUsuarios.find(
      (u) => u.usuario === usuario && u.contrasena === contrasena
    );

    if (usuarioEncontrado) {
      // Guardar sesión activa
      localStorage.setItem("usuarioActivo", JSON.stringify(usuarioEncontrado));

      // Redirigir según rol
      if (usuarioEncontrado.rol === "barista") {
        navigate("/barista", { replace: true });
      } else if (usuarioEncontrado.rol === "cliente") {
        navigate("/cliente", { replace: true });
      }
    } else {
      alert("❌ Usuario o contraseña incorrectos");
    }
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${fondoIN})` }}
    >
      <div className="absolute inset-0 bg-black/55"></div>
      <div className="relative z-10 w-full max-w-6xl px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 rounded-3xl overflow-hidden shadow-2xl">
          <div className="bg-green-950/85 p-10 flex flex-col justify-center text-white">
            <div className="flex justify-center mb-6">
              <img src={logoCafe} alt="Logo KAFFA Café" className="w-24 h-24 rounded-full border-2 border-yellow-400" />
            </div>
            <h2 className="text-4xl font-extrabold mb-4">Accede a KAFFA</h2>
            <p className="text-lg leading-8 text-green-100/90 mb-6">
              Ingresa y gestiona tus pedidos, revisa tu historial y disfruta de un servicio personalizado para clientes y baristas.
            </p>
            <div className="space-y-4">
              <p className="inline-flex items-center gap-3 text-green-200">
                <span className="inline-flex h-3 w-3 rounded-full bg-yellow-400"></span>
                Interfaz limpia y moderna
              </p>
              <p className="inline-flex items-center gap-3 text-green-200">
                <span className="inline-flex h-3 w-3 rounded-full bg-yellow-400"></span>
                Acceso rápido para clientes y baristas
              </p>
              <p className="inline-flex items-center gap-3 text-green-200">
                <span className="inline-flex h-3 w-3 rounded-full bg-yellow-400"></span>
                Soporte y compras en un solo lugar
              </p>
            </div>
          </div>

          <section className="bg-white bg-opacity-95 p-10 rounded-3xl">
            <div className="flex justify-center mb-6">
              <img src={logoCafe} alt="Logo KAFFA Café" className="w-20 h-20" />
            </div>
            <h2 className="text-3xl font-bold mb-6 text-center text-green-900">Inicia Sesión</h2>
            <form onSubmit={manejarLogin} className="grid gap-4">
              <label className="block">
                <span className="text-gray-700">Usuario</span>
                <input
                  type="text"
                  placeholder="Usuario"
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                  className="mt-2 w-full rounded-2xl border border-green-200 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </label>
              <label className="block">
                <span className="text-gray-700">Contraseña</span>
                <input
                  type="password"
                  placeholder="Contraseña"
                  value={contrasena}
                  onChange={(e) => setContrasena(e.target.value)}
                  className="mt-2 w-full rounded-2xl border border-green-200 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </label>
              <button
                type="submit"
                className="mt-2 w-full rounded-full bg-green-900 px-6 py-3 text-white text-lg font-semibold transition hover:bg-green-800"
              >
                INGRESAR
              </button>
            </form>

            <div className="text-center mt-6 text-gray-700 space-y-3">
              <p>
                ¿No tienes cuenta?{' '}
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
      </div>
    </div>
  );
}
