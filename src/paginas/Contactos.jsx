import { useState } from "react";
import BarraNavegacion from "../componentes/BarraNavegacion";
import SombraGlobal from "../componentes/SombraGlobal"; // ✅ sombra global
import PieDePagina from "../componentes/PieDePagina";   // ✅ footer reutilizable
import ubicacionImg from "../imagenes/ubicacion.png";

export default function Contactos() {
  const [formData, setFormData] = useState({ nombre: "", email: "", telefono: "", mensaje: "" });
  const [status, setStatus] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { nombre, email, mensaje } = formData;
    if (!nombre.trim() || !email.trim() || !mensaje.trim()) {
      setStatus({ type: "error", message: "Por favor completa los campos requeridos." });
      return;
    }

    // Simula envío a API: más adelante puedes cambiar esta lógica por fetch('/api/contactos', { ... })
    try {
      const simulacion = {
        nombre,
        email,
        telefono: formData.telefono,
        mensaje,
        fecha: new Date().toISOString(),
      };
      localStorage.setItem("mensajeContacto", JSON.stringify(simulacion));
      setStatus({ type: "success", message: "Tu mensaje ha sido enviado. Te responderemos pronto." });
      setFormData({ nombre: "", email: "", telefono: "", mensaje: "" });
    } catch (error) {
      setStatus({ type: "error", message: "Ocurrió un error. Intenta de nuevo más tarde." });
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col">
      {/* ✅ Sombra global */}
      <SombraGlobal />

      {/* ✅ Contenido principal */}
      <div className="relative z-10 flex-1">
        <BarraNavegacion />

        <section className="p-8 bg-white bg-opacity-95 rounded-lg m-8 shadow-md">
          <h2 className="text-3xl font-bold mb-6 text-center">Contáctanos</h2>
          <p className="text-gray-700 mb-6 text-center">
            ¿Te gustaría saber más sobre nuestra cafetería, dejar una sugerencia o simplemente saludarnos?
            <br />
            Estamos aquí para servirte siempre el mejor café ☕
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-2">Dirección</h3>
                <p>Calle 4 #2-80, Cafetería Kaffa Sena Centro Comercio y Servicio</p>
                <p>Popayán, Colombia</p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2">Teléfono</h3>
                <p>
                  <a href="tel:+573000000000" className="text-green-900 hover:underline">
                    +57 300 000 0000
                  </a>
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2">Email</h3>
                <p>
                  <a href="mailto:contacto@kaffa.com" className="text-green-900 hover:underline">
                    contacto@kaffa.com
                  </a>
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2">Horario</h3>
                <p>Lunes - Viernes: 8:00 a.m - 5:00 p.m</p>
                <p>Sábados: 8:00 a.m - 12:00 p.m</p>
                <p>Domingos y festivos cerrado</p>
              </div>

              <div className="rounded-3xl overflow-hidden border border-gray-200 shadow-lg">
                <img
                  src={ubicacionImg}
                  alt="Ubicación KAFFA Café"
                  className="w-full h-64 object-cover"
                />
              </div>

              <div className="mt-6 text-center">
                <h3 className="text-xl font-bold mb-4">¡Síguenos!</h3>
                <div className="flex justify-center gap-6">
                  <a href="https://www.facebook.com" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">Facebook</a>
                  <a href="https://www.instagram.com" target="_blank" rel="noreferrer" className="text-pink-600 hover:underline">Instagram</a>
                  <a href="https://www.tiktok.com" target="_blank" rel="noreferrer" className="text-black hover:underline">TikTok</a>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 bg-green-50 rounded-3xl p-6 shadow-inner border border-green-100">
              <h3 className="text-2xl font-bold mb-4">Envíanos un mensaje</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="block">
                    <span className="text-gray-700">Nombre*</span>
                    <input
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      type="text"
                      className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-green-500 focus:outline-none"
                      placeholder="Ingresa tu nombre"
                    />
                  </label>
                  <label className="block">
                    <span className="text-gray-700">Email*</span>
                    <input
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      type="email"
                      className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-green-500 focus:outline-none"
                      placeholder="tu@correo.com"
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="text-gray-700">Teléfono</span>
                  <input
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    type="tel"
                    className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-green-500 focus:outline-none"
                    placeholder="Opcional"
                  />
                </label>

                <label className="block">
                  <span className="text-gray-700">Mensaje*</span>
                  <textarea
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    rows="5"
                    className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-green-500 focus:outline-none"
                    placeholder="Cuéntanos cómo te podemos ayudar"
                  />
                </label>

                {status && (
                  <div className={`rounded-2xl px-4 py-3 text-sm ${status.type === "success" ? "bg-green-100 text-green-900" : "bg-red-100 text-red-900"}`}>
                    {status.message}
                  </div>
                )}

                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-full bg-green-900 px-6 py-3 text-white transition hover:bg-green-800"
                >
                  Enviar mensaje
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>

      {/* ✅ Footer al final */}
      <PieDePagina />
    </div>
  );
}
