'use client'
import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const localData = localStorage.getItem('cartItems');
        return localData ? JSON.parse(localData) : [];
    });

    useEffect(() => {
        // This effect runs only on the client, localStorage is accessible here
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);
    
    const addToCart = (itemId) => {
        setCartItems(prevItems => {
            const updatedCartItems = [...prevItems, itemId];
            return updatedCartItems;
        });
    };

    const removeFromCart = (itemId) => {
        setCartItems(prevItems => {
            const updatedCartItems = prevItems.filter(item => item !== itemId);
            return updatedCartItems;
        });
    };

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem('cartItems');
    };
    
    const contextValue = useMemo(() => ({
        cartItems,
        addToCart,
        removeFromCart,
        clearCart
    }), [cartItems, addToCart, removeFromCart, clearCart]);

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
};
