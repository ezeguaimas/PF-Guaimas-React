import React, { useContext } from "react";
import { cartContext } from "../../context/cartContext";
import Button from "../Button/Button";
import { createOrder } from "../../services/firestore";
import { useNavigate, useParams } from "react-router-dom";
import "./CartContainer.css";
import emptyCartImage from "../Img/empty-cart.png";
import Checkout from "../Checkout/Checkout";
import FormCheckout from "./FormCheckout";

function CartContainer() {
  const context = useContext(cartContext);
  const { cart, getTotalPrice } = context;
  const navigateTo = useNavigate();
  const { orderId } = useParams();
  async function handleCheckout(userData) {
    const order = {
      items: cart,
      buyer: userData,
      total: getTotalPrice(),
      date: new Date(),
    };
    const newOrderId = await createOrder(order);
    navigateTo(`/checkout/${newOrderId}`);
  }
  if (cart.length === 0) {
    return (
      <div>
        <h1>Tu Carrito</h1>
        <p>Tu carrito está vacío</p>
        <img src={emptyCartImage} alt="Carrito vacío" />
      </div>
    );
  }
  return (
    <>
      <h1>Tu Carrito</h1>
      <table className="cartList">
        <thead className="cartList_head">
          <tr className="cartList_row">
            <th>Snap</th>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Quitar</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.id} className="cartList_row">
              <td>
                <img height={50} src={item.img} alt={item.title} />
              </td>
              <td>{item.title.toUpperCase()}</td>
              <td>$ {item.precio}</td>
              <td>{item.count}</td>
              <td>
                <Button
                  color="#c63224"
                  onClick={() => context.removeItem(item.id)}
                >
                  Eliminar Item
                </Button>
              </td>
              <th>$ {item.count * item.precio}</th>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="cartList_detail">
        <h4>El total de tu compra es de $ {getTotalPrice()}</h4>
      </div>
      <FormCheckout onCheckout={handleCheckout} />
      {orderId && <Checkout orderId={orderId} />}
    </>
  );
}
export default CartContainer;
