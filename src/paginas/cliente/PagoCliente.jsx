import { useNavigate } from "react-router-dom";

export default function PagoCliente() {
  const navigate = useNavigate();

  const handleConfirmarPago = () => {
    // Aquí podrías integrar pasarela de pago real
    alert("✅ Pago realizado con éxito");

    // Redirigir a Mis Pedidos
    navigate("/cliente/pedidos");
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Realizar Pago</h2>
      <p>Simulación de pago para tu pedido.</p>
      <button
        onClick={handleConfirmarPago}
        style={{ backgroundColor: "blue", color: "white", padding: "10px 15px", borderRadius: "5px", marginTop: "20px" }}
      >
        Confirmar Pago
      </button>
    </div>
  );
}
