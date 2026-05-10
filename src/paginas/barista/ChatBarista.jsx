import { useEffect, useRef, useState } from "react";

const initialMessages = [
  {
    id: 1,
    sender: "cliente",
    text: "Hola, ¿mi pedido está listo?",
    time: "09:05",
  },
];

export default function ChatBarista({ darkMode }) {
  const [messages, setMessages] = useState([]);
  const [texto, setTexto] = useState("");
  const timeoutRef = useRef(null);

  useEffect(() => {
    const guardado = JSON.parse(localStorage.getItem("chatBarista"));
    setMessages(guardado && guardado.length > 0 ? guardado : initialMessages);

    return () => clearTimeout(timeoutRef.current);
  }, []);

  useEffect(() => {
    localStorage.setItem("chatBarista", JSON.stringify(messages));
  }, [messages]);

  const enviarMensaje = (e) => {
    e.preventDefault();
    const textoLimpio = texto.trim();
    if (!textoLimpio) return;

    const nuevoMensaje = {
      id: Date.now(),
      sender: "barista",
      text: textoLimpio,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, nuevoMensaje]);
    setTexto("");

    timeoutRef.current = setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "cliente",
          text: "Gracias, espero tu aviso cuando esté listo.",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    }, 1200);
  };

  return (
    <div className={darkMode ? "bg-gray-900 p-6 rounded-xl shadow" : "bg-white p-6 rounded-xl shadow"}>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Chat con Cliente</h2>
        <p className={darkMode ? "text-gray-300" : "text-gray-600"}>Responde rápidamente a las solicitudes de los clientes.</p>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto mb-6">
        {messages.map((mensaje) => (
          <div
            key={mensaje.id}
            className={`rounded-2xl px-4 py-3 max-w-xl ${
              mensaje.sender === "barista"
                ? darkMode
                  ? "bg-yellow-700 text-white ml-auto"
                  : "bg-yellow-500 text-white ml-auto"
                : darkMode
                ? "bg-gray-800 text-gray-100"
                : "bg-gray-100 text-gray-900"
            }`}
          >
            <p>{mensaje.text}</p>
            <p className="mt-2 text-xs text-gray-300 text-right">{mensaje.time}</p>
          </div>
        ))}
      </div>

      <form onSubmit={enviarMensaje} className="flex gap-3">
        <input
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Escribe tu mensaje..."
          className={
            darkMode
              ? "flex-1 border border-gray-700 bg-gray-800 text-white rounded px-4 py-2"
              : "flex-1 border border-gray-300 bg-white text-gray-900 rounded px-4 py-2"
          }
        />
        <button type="submit" className="bg-yellow-700 text-white px-4 py-2 rounded hover:bg-yellow-600">
          Enviar
        </button>
      </form>
    </div>
  );
}
