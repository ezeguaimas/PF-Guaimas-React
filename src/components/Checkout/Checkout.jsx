import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Checkout.css";

function Checkout() {
  const { orderid } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="checkout">
      <h1>Gracias por tu compra</h1>
      <p>Tu ID de orden es: {orderid}</p>
    </div>
  );
}

export default Checkout;
