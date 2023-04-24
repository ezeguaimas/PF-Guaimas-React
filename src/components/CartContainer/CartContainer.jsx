import React, { useContext } from "react";
import { cartContext } from "../../context/cartContext";
import Button from "../Button/Button";
import "./cart.css";
import { createOrder } from "../../services/firestore";
import { useNavigate } from "react-router-dom";
import FormCheckout from "./FormCheckout";

function CartContainer() {
  const context = useContext(cartContext);
  const { cart, getTotalPrice } = context;

  const navigateTo = useNavigate();

  async function handleCheckout(userData) {
    const order = {
      items: cart,
      buyer: userData,
      total: getTotalPrice(),
      date: new Date(),
    };

    const orderId = await createOrder(order);
    navigateTo(`/checkout/${orderId}`);
  }

  return (
    <>
      <h1 style={{ fontSize: "3rem", color: "darkred" }}>Tu Carrito</h1>
      <table className="cartList">
        <thead className="cartList_head">
          <tr className="cartList_row">
            <th style={{ fontSize: "2rem", color: "white" }}>Snap</th>
            <th style={{ fontSize: "2rem", color: "white" }}>Producto</th>
            <th style={{ fontSize: "2rem", color: "white" }}>Precio</th>
            <th style={{ fontSize: "2rem", color: "white" }}>Cantidad</th>
            <th style={{ fontSize: "2rem", color: "white" }}>Quitar</th>
            <th style={{ fontSize: "2rem", color: "white" }}>Total</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.id} className="cartList_row">
              <td>
                <img height={50} src={item.img} alt={item.title} />
              </td>
              <td style={{ fontSize: "1.5rem", color: "black" }}>
                {item.title.toUpperCase()}
              </td>
              <td style={{ fontSize: "1.5rem", color: "black" }}>
                $ {item.precio}
              </td>
              <td style={{ fontSize: "1.5rem", color: "black" }}>
                {item.count}
              </td>
              <td>
                <Button color="#c63224" onClick={item.removeItem}>Eliminar Item</Button>
              </td>
              <th style={{ fontSize: "1.5rem", color: "black" }}>
                $ {item.count * item.precio}
              </th>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="cartList_detail">
        <h4 style={{ fontSize: "2rem", color: "black" }}>
          El total de tu compra es de $ {getTotalPrice()}
        </h4>
      </div>
      <FormCheckout onCheckout={handleCheckout} />
    </>
  );
}

export default CartContainer;
