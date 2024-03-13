import { createContext, useContext, useState } from "react";


const CartContext = createContext();


export function CartProvider  ({children}){
    const [dataCart , setDataCart] = useState([]);

    return(
        <CartContext.Provider value={{dataCart,setDataCart}}>
            {children}
        </CartContext.Provider>
    )
}

export function Cart(){
    return useContext(CartContext);
}