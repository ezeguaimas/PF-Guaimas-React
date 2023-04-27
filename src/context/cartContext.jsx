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
    }
    setCart(newCart);
  }

  function removeItem(idToDelete) {
    const updatedCart = cart.filter(
      (itemInCart) => itemInCart.id !== idToDelete
    );
    setCart(updatedCart);
  }

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

  function removeAllItems() {
    cart.forEach((item) => {
      removeItem(item.id);
    });
  }

  return (
    <cartContext.Provider
      value={{
        cart: cart,
        addItem: addItem,
        isItemInCart: isItemInCart,
        getCountInCart: getCountInCart,
        removeItem: removeItem,
        getTotalPrice: getTotalPrice,
        removeAllItems: removeAllItems,
      }}
    >
      {props.children}
    </cartContext.Provider>
  );
}

export { cartContext, CartProvider };
