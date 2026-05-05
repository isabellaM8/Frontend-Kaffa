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
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${fondoIN})` }}
    >
      <section className="p-8 bg-white bg-opacity-95 rounded-lg shadow-lg max-w-md w-full">
        
        {/* Logo arriba */}
        <div className="flex justify-center mb-6">
          <img src={logoCafe} alt="Logo Café" className="w-24 h-24" />
        </div>

        <h2 className="text-3xl font-bold mb-6 text-center text-green-900">Registrarse</h2>
        
        <form onSubmit={handleRegistro} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nombre completo"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="border-2 border-green-700 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="text"
            placeholder="Usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            className="border-2 border-green-700 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            className="border-2 border-green-700 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            className="border-2 border-green-700 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="password"
            placeholder="Confirmar contraseña"
            value={confirmarContrasena}
            onChange={(e) => setConfirmarContrasena(e.target.value)}
            className="border-2 border-green-700 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            className="bg-green-800 text-white py-2 rounded hover:bg-green-900 font-bold"
          >
            REGISTRARME
          </button>
        </form>

        {/* Enlaces abajo */}
        <div className="text-center mt-4 text-gray-700 space-y-2">
          <p>
            ¿Ya tienes cuenta?{" "}
            <Link to="/login" className="text-green-700 hover:underline font-semibold">
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
