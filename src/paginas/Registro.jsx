import { useState } from "react";
import fondoRImg from "../imagenes/fondoR.jpg";   // Fondo café
import logoCafe from "../imagenes/Logo.jpeg"; 
import { Link, useNavigate } from "react-router-dom";

export default function Registro() {
  const navigate = useNavigate();

  // Estado del formulario
  const [formData, setFormData] = useState({
    nombre: "",
    usuario: "",
    correo: "",
    contraseña: "",          
    confirmarContraseña: "", 
  });

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    if (formData.contraseña !== formData.confirmarContraseña) {
      alert("Las contraseñas no coinciden");
      return;
    }

    usuarios.push({
      nombre: formData.nombre,
      usuario: formData.usuario,
      correo: formData.correo,
      contraseña: formData.contraseña, 
      rol: "cliente",
    });

    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    alert("Registro exitoso, ahora puedes iniciar sesión");

    // 🚀 Navegar a login guardando historial (sin replace)
    navigate("/login");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${fondoRImg})` }}
    >
      <div className="bg-white bg-opacity-95 p-8 rounded-lg shadow-lg w-full max-w-md">
        
        {/* Logo arriba */}
        <div className="flex justify-center mb-6">
          <img src={logoCafe} alt="Logo Café" className="w-20 h-20" />
        </div>

        <h2 className="text-2xl font-bold mb-6 text-center text-green-900">Registro</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="nombre"
            placeholder="Tu nombre completo"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full p-2 border-2 border-green-700 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="text"
            name="usuario"
            placeholder="Nombre de usuario"
            value={formData.usuario}
            onChange={handleChange}
            className="w-full p-2 border-2 border-green-700 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="email"
            name="correo"
            placeholder="Correo electrónico"
            value={formData.correo}
            onChange={handleChange}
            className="w-full p-2 border-2 border-green-700 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="password"
            name="contraseña"
            placeholder="Contraseña"
            value={formData.contraseña}
            onChange={handleChange}
            className="w-full p-2 border-2 border-green-700 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="password"
            name="confirmarContraseña"
            placeholder="Repite la contraseña"
            value={formData.confirmarContraseña}
            onChange={handleChange}
            className="w-full p-2 border-2 border-green-700 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            className="w-full bg-green-800 text-white py-2 rounded hover:bg-green-900 font-bold"
          >
            REGISTRARME
          </button>
        </form>

        {/* Enlace para ir al inicio de sesión */}
        <p className="text-center mt-4 text-gray-700">
          ¿Ya tienes una cuenta?{" "}
          <Link to="/login" className="text-green-700 hover:underline font-semibold">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
