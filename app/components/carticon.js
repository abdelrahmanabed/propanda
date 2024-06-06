'use client'
import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from './CartContext';
import { BsCart } from "react-icons/bs";
import { BsCartCheck } from "react-icons/bs";
import Loading from "./loading";
import { useUser } from './UserContext';

const CartIcon = (props) => {
    const{addToCart, removeFromCart, cartItems}= useCart()
    const [state, setState] = useState(false);
    const {userId} = useUser()

    const [isLoading, setIsLoading] = useState(false);

  

    useEffect(() => {
       
        if (cartItems.includes(props.courseId) ) {
           setState(true)
 
        }
    }, [ props.courseId]);
    
 





  

      
    const handleCartClick = useCallback(async () => {
        setIsLoading(true)
        try {
            
                if (userId) {
                    const response = await axios.get(`${process.env.NEXT_PUBLIC_PORT}/api/users/${userId}/cart`);

                    const cartItems = response.data.cart;
                    if (Array.isArray(cartItems) && cartItems.includes(props.courseId)) {
                        await axios.delete(`${process.env.NEXT_PUBLIC_PORT}/api/users/${userId}/cart/${props.courseId}`);
                        removeFromCart(props.courseId)
                        console.log('Item removed from cartItems array');
                         setIsLoading(false)   
                        
                        setTimeout(() => {
                            setState(false);
                        }, 1);
                       
            } else {
                        await axios.put(`${process.env.NEXT_PUBLIC_PORT}/api/users/${userId}/cart`, { itemId: props.courseId });
                        addToCart(props.courseId)
                        console.log('Item added to cartItems array');
                        setIsLoading(false)      

                        setTimeout(() => {
                          setState(true);

                        }, 1);
                    }
                }
             else {
                // No token, manage items in localStorage
                if (cartItems.includes(props.courseId)) {
                    removeFromCart(props.courseId)
                    setIsLoading(false)
                    setState(false);

                   
                  
                   
                } else {
                    addToCart(props.courseId)
                    setState(true);
                    setIsLoading(false)

                   
                }
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }, [userId, props.courseId, cartItems, addToCart, removeFromCart]);

    return (
        <>
        <div id='lordcdiv' 
            onClick={handleCartClick}
            className={`backdrop-blur-md
                ${!state ? 'h-16 w-16 rounded-2xl' : 'clicked'}
                duration-300 flex  w-12 h-12   ${ props.className}   `}
        >
         {isLoading? <Loading/> : <> <BsCart  className={`${ state ? " absolute opacity-0 text-4xl" : " static opacity-100 text-2xl "} duration-300`}/>
           
           <BsCartCheck className={`${ !state ? " absolute opacity-0" : " static opacity-100 text-4xl"} duration-300`}/></>}

        </div>
                           
                                </>
    );
};

export default React.memo(CartIcon);
