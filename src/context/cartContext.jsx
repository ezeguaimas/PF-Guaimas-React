import { createContext, useState } from "react";
import useDeepCopy from "../hooks/useDeepCopy";

const cartContext = createContext({ cart: [] });

function CartProvider(props) {
  const [cart, setCart] = useState([]);
  const newCart = useDeepCopy(cart);

  function addItem(product, countFromCounter) {
    if (isItemInCart(product.id)) {
      const itemIndex = cart.findIndex(
        (itemInCart) => itemInCart.id === product.id
      );
      newCart[itemIndex].count += countFromCounter;
    } else {
      newCart.push({ ...product, count: countFromCounter });
      newCart[newCart.length - 1].removeItem = () => removeItem(product.id);
    }
    setCart(newCart);
  }
  

  //function addItem(product, countFromCounter) {
  //  if (isItemInCart(product.id)) {
  //    const itemIndex = cart.findIndex(
  //      (itemInCart) => itemInCart.id === product.id
  //    );
  //    newCart[itemIndex].count += countFromCounter;
  //  } else {
  //    newCart.push({ ...product, count: countFromCounter });
  //  }
  //  setCart(newCart);
  //}

  function removeItem(idToDelete) {
    const updatedCart = newCart.filter((itemInCart) => itemInCart.id !== idToDelete);
    setCart(updatedCart);
  }
  
  
  //function removeItem(idToDelete) {
  //  /*  */
  //}

  function isItemInCart(id) {
    return cart.some((itemInCart) => itemInCart.id === id);
  }

  function getCountInCart(id) {
    const item = cart.find((itemInCart) => itemInCart.id === id);

    return item !== undefined ? item.count : 0;
  }


  function getTotalPrice() {
    let totalPrice = 0;
    cart.forEach((item) => {
      totalPrice += item.count * item.precio;
    });
    return totalPrice;
  }

  return (
    <cartContext.Provider
      value={{ cart: cart, addItem, isItemInCart, getCountInCart, removeItem, getTotalPrice }}
    >
      {props.children}
    </cartContext.Provider>
  );
}

export { cartContext, CartProvider };
