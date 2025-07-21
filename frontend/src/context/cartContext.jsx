import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [wishList, setWishList] = useState([]);

  const addToCart = (product) => {
    const exist = cart.find((item) => item._id === product._id);

    if (exist) {
      setCart(
        cart.map((item) => {
          return item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item;
        })
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const decreaseQty = (id) => {
    setCart(
      cart
        .map((item) =>
          item._id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const remove = (id) => setCart(cart.filter((item) => item._id !== id));

  const toggleWishList = (product) => {
    const exist = wishList.find((item) => item._id === product._id);
    if (exist) {
      setWishList(wishList.filter((item) => item._id !== product._id));
    } else {
      setWishList([...wishList, product]);
    }
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const totalDiscount = cart.reduce((total, item) => {
    const discount = totalPrice - (totalPrice * item.discount) / 100;
    return Math.round(total + discount * item.quantity);
  }, 0);

  const shippingFees = totalDiscount > 1000 ? 0 : 150;

  const finalAmount = totalDiscount + shippingFees;

  const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const contextValue = {
    cart,
    addToCart,
    decreaseQty,
    remove,
    wishList,
    toggleWishList,
    totalPrice,
    totalDiscount,
    finalAmount,
    itemCount,
    shippingFees,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
