'use client'
import React, { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export const useUser = () => useContext(CartContext);

export const UserProvider = ({ children }) => {
    const [userId, setUserId] = useState()
    const [userName, setUserName] = useState()
    const [userEmail, setUserEmail] = useState()
    useEffect(() => {
        // This effect runs only on the client, localStorage is accessible here
        const localData = localStorage.getItem('cartItems');
        const items = localData ? JSON.parse(localData) : [];
        setCartItems(items);
    }, []);
    
    const addToCart = (itemId) => {
        
        const updatedCartItems = [...cartItems, itemId];
        setCartItems(updatedCartItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    };

    const removeFromCart = (itemId) => {
        const updatedCartItems = cartItems.filter(item => item !== itemId);
        setCartItems(updatedCartItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    };
    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem('cartItems');
      };
    
    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, setCartItems }}>
            {children}
        </CartContext.Provider>
    );
};

