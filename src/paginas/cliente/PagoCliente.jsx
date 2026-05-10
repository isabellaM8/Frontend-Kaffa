import { useNavigate } from "react-router-dom";

export default function PagoCliente({ darkMode }) {
  const navigate = useNavigate();

  const handleConfirmarPago = () => {
    alert("✅ Pago realizado con éxito");
    navigate("/cliente/pedidos");
  };

  return (
    <div className={darkMode ? "bg-gray-900 p-8 rounded-xl shadow text-white" : "bg-white p-8 rounded-xl shadow text-gray-900"}>
      <h2 className="text-3xl font-bold mb-4">Realizar Pago</h2>
      <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
        Aquí puedes simular el pago de tu pedido antes de que sea procesado.
      </p>
      <div className="mt-8 space-y-4 rounded-3xl bg-gray-100 p-6 text-left text-gray-900">
        <p className="font-semibold">Método de pago</p>
        <p>Tarjeta de crédito / débito</p>
        <p className="font-semibold">Monto</p>
        <p>$0,00</p>
        <p className="text-sm text-gray-500">Nota: Esta es una simulación. Integra un gateway real para un pago real.</p>
      </div>
      <button
        onClick={handleConfirmarPago}
        className="mt-6 rounded-full bg-yellow-700 px-6 py-3 text-white hover:bg-yellow-600"
      >
        Confirmar Pago
      </button>
    </div>
  );
}
