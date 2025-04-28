import React, { createContext, useContext, useState } from 'react';

// Create the context
const CartContext = createContext();

// Provider component
export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);

    // Function to add items to the cart
    const addToCart = (item) => {
        setCart([...cart, item]);
    };

    // Function to remove items from the cart
    const removeFromCart = (index) => {
        setCart(cart.filter((_, i) => i !== index));
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}

// Custom hook to use the cart context
export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
