import { useState, useEffect } from "react";

export default function PedidosCliente() {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const pedidosGuardados = JSON.parse(localStorage.getItem("pedidos")) || [];
    setPedidos(pedidosGuardados);
  }, []);

  const actualizarEstado = (id, nuevoEstado) => {
    const nuevosPedidos = pedidos.map((p) =>
      p.id === id ? { ...p, estado: nuevoEstado } : p
    );
    setPedidos(nuevosPedidos);
    localStorage.setItem("pedidos", JSON.stringify(nuevosPedidos));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 className="text-2xl font-bold mb-6">Mis Pedidos</h2>

      {pedidos.length === 0 ? (
        <p>No tienes pedidos aún.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {pedidos.map((pedido) => (
            <PedidoCard
              key={pedido.id}
              pedido={pedido}
              onActualizarEstado={actualizarEstado}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function PedidoCard({ pedido, onActualizarEstado }) {
  const [tiempoRestante, setTiempoRestante] = useState(180); // 3 minutos

  useEffect(() => {
    if (pedido.estado === "En Solicitud" && tiempoRestante > 0) {
      const timer = setInterval(() => {
        setTiempoRestante((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    }

    if (tiempoRestante === 0 && pedido.estado === "En Solicitud") {
      onActualizarEstado(pedido.id, "Terminado");

      // Notificación
      if (Notification.permission === "granted") {
        new Notification("☕ Tu pedido está listo", {
          body: `ORD-${pedido.id} ha pasado a Terminado`,
        });
      } else {
        alert(`☕ Tu pedido ORD-${pedido.id} está listo`);
      }
    }
  }, [tiempoRestante, pedido.estado, pedido.id, onActualizarEstado]);

  const minutos = String(Math.floor(tiempoRestante / 60)).padStart(2, "0");
  const segundos = String(tiempoRestante % 60).padStart(2, "0");

  return (
    <div className="border rounded p-4 bg-gray-100 flex justify-between items-center">
      <div>
        <h4 className="font-bold">ORD-{pedido.id}</h4>
        {pedido.productos.map((p, i) => (
          <p key={i}>{p.nombre} - ${p.precio.toLocaleString("es-CO")}</p>
        ))}
        {pedido.estado === "En Solicitud" && tiempoRestante > 0 && (
          <p className="text-sm text-gray-500">
            Tiempo de preparación: {minutos}:{segundos}
          </p>
        )}
      </div>

      <div className="flex flex-col items-end gap-2">
        <span
          className="px-3 py-1 rounded font-bold"
          style={{
            backgroundColor:
              pedido.estado === "En Solicitud"
                ? "gold"
                : pedido.estado === "Terminado"
                ? "blue"
                : "green",
            color: "white",
          }}
        >
          {pedido.estado}
        </span>

        {pedido.estado === "Terminado" && (
          <button
            onClick={() => onActualizarEstado(pedido.id, "Entregado")}
            className="bg-green-600 text-white px-3 py-1 rounded"
          >
            Entregado
          </button>
        )}
      </div>
    </div>
  );
}
