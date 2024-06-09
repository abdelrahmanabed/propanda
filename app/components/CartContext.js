'use client';
import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        // This effect runs only on the client, localStorage is accessible here
        const localData = localStorage.getItem('cartItems');
        const items = localData ? JSON.parse(localData) : [];
        setCartItems(items);
    }, []);

    const addToCart = useCallback((itemId) => {
        setCartItems(prevCartItems => {
            const updatedCartItems = [...prevCartItems, itemId];
            localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
            return updatedCartItems;
        });
    }, []);

    const removeFromCart = useCallback((itemId) => {
        setCartItems(prevCartItems => {
            const updatedCartItems = prevCartItems.filter(item => item !== itemId);
            localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
            return updatedCartItems;
        });
    }, []);

    const clearCart = useCallback(() => {
        setCartItems([]);
        localStorage.removeItem('cartItems');
    }, []);

    const contextValue = useMemo(() => ({
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
    }), [cartItems, addToCart, removeFromCart, clearCart]);

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
};
