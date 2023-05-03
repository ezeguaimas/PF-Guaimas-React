import { createContext, useState } from "react";

const cartContext = createContext({ cart: [] });

function CartProvider(props) {
  const [cart, setCart] = useState([]);

  function addItem(product, countFromCounter) {
    if (isItemInCart(product.id)) {
      setCart((prevCart) =>
        prevCart.map((itemInCart) => {
          if (itemInCart.id === product.id) {
            return {
              ...itemInCart,
              count: itemInCart.count + countFromCounter,
            };
          }
          return itemInCart;
        })
      );
    } else {
      setCart((prevCart) => [
        ...prevCart,
        { ...product, count: countFromCounter },
      ]);
    }
  }

  function removeItem(idToDelete) {
    setCart((prevCart) =>
      prevCart.filter((itemInCart) => itemInCart.id !== idToDelete)
    );
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
    setCart([]);
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
