import {createContext, useContext, useState} from 'react';

const CartContext = createContext();

export function CartProvider({children}) {
  const [dataCart, setDataCart] = useState([]);

  const addItemToCart = item => {
    setDataCart([...dataCart, item]);
  };

  const removeItemFromCart = (itemId) => {
    console.log(itemId);
    const updatedCartItems = dataCart.filter(
      item =>
        item._id !== itemId 
    );

    setDataCart(updatedCartItems);
  };

  return (
    <CartContext.Provider
      value={{dataCart, setDataCart, addItemToCart, removeItemFromCart}}>
      {children}
    </CartContext.Provider>
  );
}

export function Cart() {
  return useContext(CartContext);
}
