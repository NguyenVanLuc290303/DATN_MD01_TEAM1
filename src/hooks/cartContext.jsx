import { createContext, useContext, useState } from "react";


const CartContext = createContext();

const [dataCart , setDataCart] = useState([]);

const CartProvider = () =>{
    return(
        <CartContext.Provider value={{dataCart,setDataCart}}>
            {children}
        </CartContext.Provider>
    )
}

export function Cart(){
    return useContext(CartContext);
}