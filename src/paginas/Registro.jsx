import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import fondoIN from "../imagenes/fondoIN.jpg";   // mismo fondo café
import logoCafe from "../imagenes/Logo.jpeg";    // mismo logo

export default function Registro() {
  const [nombre, setNombre] = useState("");
  const [usuario, setUsuario] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [confirmarContrasena, setConfirmarContrasena] = useState("");
  const navigate = useNavigate();

  const handleRegistro = (e) => {
    e.preventDefault();

    if (contrasena !== confirmarContrasena) {
      alert("❌ Las contraseñas no coinciden");
      return;
    }

    const nuevoCliente = {
      nombre,
      usuario,
      correo,
      contrasena,
      rol: "cliente",
    };

    const clientes = JSON.parse(localStorage.getItem("usuarios")) || [];
    clientes.push(nuevoCliente);
    localStorage.setItem("usuarios", JSON.stringify(clientes));

    alert("✅ Registro exitoso, ahora puedes iniciar sesión");
    navigate("/login");
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
            <h2 className="text-4xl font-extrabold mb-4">Bienvenido a KAFFA</h2>
            <p className="text-lg leading-8 text-green-100/90 mb-6">
              Regístrate y descubre café artesanal, promociones exclusivas y un servicio pensado para clientes que disfrutan cada taza.
            </p>
            <div className="space-y-4">
              <p className="inline-flex items-center gap-3 text-green-200">
                <span className="inline-flex h-3 w-3 rounded-full bg-yellow-400"></span>
                Plataforma fresca y bien diseñada
              </p>
              <p className="inline-flex items-center gap-3 text-green-200">
                <span className="inline-flex h-3 w-3 rounded-full bg-yellow-400"></span>
                Registro rápido y seguro
              </p>
              <p className="inline-flex items-center gap-3 text-green-200">
                <span className="inline-flex h-3 w-3 rounded-full bg-yellow-400"></span>
                Accede a tu menú y pedidos con un clic
              </p>
            </div>
          </div>

          <section className="bg-white bg-opacity-95 p-10 rounded-3xl">
            <div className="flex justify-center mb-6">
              <img src={logoCafe} alt="Logo KAFFA Café" className="w-20 h-20" />
            </div>
            <h2 className="text-3xl font-bold mb-6 text-center text-green-900">Registrarse</h2>
            <form onSubmit={handleRegistro} className="grid gap-4">
              <label className="block">
                <span className="text-gray-700">Nombre completo</span>
                <input
                  type="text"
                  placeholder="Nombre completo"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="mt-2 w-full rounded-2xl border border-green-200 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </label>
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
                <span className="text-gray-700">Correo electrónico</span>
                <input
                  type="email"
                  placeholder="Correo electrónico"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  className="mt-2 w-full rounded-2xl border border-green-200 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </label>
              <div className="grid gap-4 md:grid-cols-2">
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
                <label className="block">
                  <span className="text-gray-700">Confirmar contraseña</span>
                  <input
                    type="password"
                    placeholder="Confirmar contraseña"
                    value={confirmarContrasena}
                    onChange={(e) => setConfirmarContrasena(e.target.value)}
                    className="mt-2 w-full rounded-2xl border border-green-200 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </label>
              </div>
              <button
                type="submit"
                className="mt-2 w-full rounded-full bg-green-900 px-6 py-3 text-white text-lg font-semibold transition hover:bg-green-800"
              >
                REGISTRARME
              </button>
            </form>

            <div className="text-center mt-6 text-gray-700">
              <p>
                ¿Ya tienes cuenta?{' '}
                <Link to="/login" className="text-green-700 hover:underline font-semibold">
                  Inicia sesión aquí
                </Link>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
