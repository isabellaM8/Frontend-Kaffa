import { useState } from "react";

export default function ChatCliente() {
  const [mensajes, setMensajes] = useState([
    { remitente: "barista", texto: "¡Hola! 👋 ¿En qué te puedo ayudar hoy?" }
  ]);
  const [nuevoMensaje, setNuevoMensaje] = useState("");

  const enviarMensaje = () => {
    if (nuevoMensaje.trim() === "") return;
    setMensajes([...mensajes, { remitente: "cliente", texto: nuevoMensaje }]);
    setNuevoMensaje("");
  };

  return (
    <div className="flex flex-col h-[80vh] bg-white rounded shadow">
      {/* Encabezado */}
      <div className="bg-yellow-900 text-white p-4 flex justify-between items-center rounded-t">
        <h2 className="text-xl font-bold">Chat</h2>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-green-700 flex items-center justify-center text-white font-bold">
            BA
          </div>
          <div>
            <p className="font-semibold">Soporte Kaffa</p>
            <p className="text-sm text-green-300">En línea</p>
          </div>
        </div>
      </div>

      {/* Mensajes */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {mensajes.map((m, i) => (
          <div
            key={i}
            className={`p-3 rounded-lg max-w-xs ${
              m.remitente === "barista"
                ? "bg-yellow-100 text-black self-start"
                : "bg-green-700 text-white self-end ml-auto"
            }`}
          >
            {m.texto}
          </div>
        ))}
      </div>

      {/* Caja de texto */}
      <div className="p-4 border-t flex gap-2">
        <input
          type="text"
          placeholder="Escribe..."
          value={nuevoMensaje}
          onChange={(e) => setNuevoMensaje(e.target.value)}
          className="flex-1 border rounded p-2"
        />
        <button
          onClick={enviarMensaje}
          className="bg-green-700 text-white px-4 py-2 rounded"
        >
          ➤
        </button>
      </div>
    </div>
  );
}
