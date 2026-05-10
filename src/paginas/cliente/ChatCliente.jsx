import { useEffect, useRef, useState } from "react";

const mensajeInicial = [
  { id: 1, remitente: "barista", texto: "¡Hola! 👋 ¿En qué te puedo ayudar hoy?", hora: "09:00" },
];

export default function ChatCliente({ darkMode }) {
  const [mensajes, setMensajes] = useState([]);
  const [nuevoMensaje, setNuevoMensaje] = useState("");
  const chatRef = useRef(null);

  useEffect(() => {
    const guardado = JSON.parse(localStorage.getItem("chatCliente"));
    setMensajes(guardado && guardado.length > 0 ? guardado : mensajeInicial);
  }, []);

  useEffect(() => {
    localStorage.setItem("chatCliente", JSON.stringify(mensajes));
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
  }, [mensajes]);

  const enviarMensaje = () => {
    const texto = nuevoMensaje.trim();
    if (!texto) return;

    const mensaje = {
      id: Date.now(),
      remitente: "cliente",
      texto,
      hora: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMensajes((prev) => [...prev, mensaje]);
    setNuevoMensaje("");

    setTimeout(() => {
      setMensajes((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          remitente: "barista",
          texto: "Gracias por tu mensaje. En breve te respondo.",
          hora: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    }, 1200);
  };

  return (
    <div className={darkMode ? "bg-gray-900 rounded-xl shadow p-6 text-white" : "bg-white rounded-xl shadow p-6 text-gray-900"}>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Chat con Barista</h2>
          <p className={darkMode ? "text-gray-400" : "text-gray-600"}>Responde rápido a tus consultas o pedidos.</p>
        </div>
        <span className={darkMode ? "text-gray-400" : "text-gray-500"}>En línea</span>
      </div>

      <div
        ref={chatRef}
        className={darkMode ? "mb-4 max-h-[65vh] space-y-3 overflow-y-auto rounded-xl bg-gray-800 p-4" : "mb-4 max-h-[65vh] space-y-3 overflow-y-auto rounded-xl bg-gray-100 p-4"}
      >
        {mensajes.map((m) => (
          <div
            key={m.id}
            className={`max-w-xl rounded-3xl px-4 py-3 ${
              m.remitente === "barista"
                ? darkMode
                  ? "bg-yellow-700 text-white self-start"
                  : "bg-yellow-200 text-gray-900 self-start"
                : darkMode
                ? "bg-gray-700 text-white self-end ml-auto"
                : "bg-green-700 text-white self-end ml-auto"
            }`}
          >
            <p>{m.texto}</p>
            <p className="mt-2 text-right text-xs opacity-80">{m.hora}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <input
          value={nuevoMensaje}
          onChange={(e) => setNuevoMensaje(e.target.value)}
          placeholder="Escribe tu mensaje..."
          className={darkMode ? "flex-1 rounded-xl border border-gray-700 bg-gray-800 px-4 py-3 text-white" : "flex-1 rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900"}
        />
        <button
          onClick={enviarMensaje}
          className="rounded-xl bg-yellow-700 px-5 py-3 text-white hover:bg-yellow-600"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
