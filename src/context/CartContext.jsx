import { createContext, useContext, useState } from "react";

// Create the context
const CartContext = createContext();

// Provider component
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // Function to add items to the cart
    const addToCart = (item) => {
        setCart((prevCart) => [...prevCart, item]);
    };

    // Function to remove items from the cart
    const removeFromCart = (index) => {
        setCart((prevCart) => prevCart.filter((_, i) => i !== index));
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};

// Custom hook to use the cart context
export const useCart = () => {
    return useContext(CartContext);
};
