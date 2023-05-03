import { useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Checkout.css";
import { cartContext } from "../../context/cartContext";

function Checkout() {
  const { orderid } = useParams();
  const navigate = useNavigate();
  const { removeAllItems } = useContext(cartContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      removeAllItems();
      navigate("/");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate, removeAllItems]);

  return (
    <div className="checkout">
      <h1>Gracias por tu compra!</h1>
      <p>Tu ID de pedido es: {orderid}</p>
    </div>
  );
}

export default Checkout;
