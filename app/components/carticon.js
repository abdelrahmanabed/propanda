'use client'
import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';
import TrashIcon from './trashicon';
import { useCart } from './CartContext';
import { BsCart } from "react-icons/bs";
import { BsCartCheck } from "react-icons/bs";
import Loading from "./loading";

const CartIcon = (props) => {
    const{addToCart, removeFromCart, cartItems}= useCart()
    const [state, setState] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [showDMessage, setShowDMessage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

  

    useEffect(() => {
       
        if (cartItems.includes(props.courseId) ) {
           setState(true)
 
        }
    }, [cartItems]);
    
 





  

      
    const handleCartClick = async () => {
       setIsLoading(true)
        try {
            
            const token = Cookies.get('token');
            if (token) {
                const encryptedUserId = Cookies.get('encryptedUserId');
                if (encryptedUserId) {
                    const bytes = CryptoJS.AES.decrypt(encryptedUserId, `${process.env.NEXT_PUBLIC_JWT_SECRET}`);
                    const userId = bytes.toString(CryptoJS.enc.Utf8);

                    const response = await axios.get(`${process.env.NEXT_PUBLIC_PORT}/api/users/${userId}/cart`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    const cartItems = response.data.cart;
                    if (Array.isArray(cartItems) && cartItems.includes(props.courseId)) {
                        await axios.delete(`${process.env.NEXT_PUBLIC_PORT}/api/users/${userId}/cart/${props.courseId}`, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        });
                        removeFromCart(props.courseId)
                        console.log('Item removed from cartItems array');
                         setShowDMessage(true);
                         setIsLoading(false)   
                        
                        setTimeout(() => {
                            setShowDMessage(false);
                            setState(false);
                        }, 1);
                       
            } else {
                        await axios.put(`${process.env.NEXT_PUBLIC_PORT}/api/users/${userId}/cart`, { itemId: props.courseId }, {
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${token}`,
                            },
                        });
                        addToCart(props.courseId)
                        console.log('Item added to cartItems array');
                        setShowMessage(true);
                        setIsLoading(false)      

                        setTimeout(() => {
                            setShowMessage(false);  
                          setState(true);

                        }, 100);
                    }
                }
            } else {
                // No token, manage items in localStorage
                if (cartItems.includes(props.courseId)) {
                    removeFromCart(props.courseId)
                    setShowDMessage(true);
                    setIsLoading(false)
                    setState(false);

                    setTimeout(() => {
                        setShowDMessage(false);
                    }, 11);
                  
                   
                } else {
                    addToCart(props.courseId)
                    setState(true);
                    setShowMessage(true);
                    setIsLoading(false)

                    setTimeout(() => {
                        setShowMessage(false);
                    }, 1000);
                }
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
        <div id='lordcdiv' 
            onClick={handleCartClick}
            className={`backdrop-blur-md
                ${!state ? 'h-16 w-16 rounded-2xl' : 'clicked'}
                duration-300 flex  w-12 h-12   ${ props.className}   `}
        >
         {isLoading? <Loading/> : <> <BsCart currentState={props.currentState} className={`${ state ? " absolute opacity-0 text-4xl" : " static opacity-100 text-2xl "} duration-300`}/>
           
           <BsCartCheck className={`${ !state ? " absolute opacity-0" : " static opacity-100 text-4xl"} duration-300`}/></>}

        </div>
                                {showMessage && <div className="messageyes duration-500 fixed p-3 text-xl flex flex-col justify-center items-center md:text-3xl rounded-2xl "> <span >تم اضافته الى السلة</span></div>}
                                {showDMessage &&  <div className="messageyes flex flex-col justify-center items-center duration-500 fixed p-3 text-xl md:text-3xl rounded-2xl "><TrashIcon state="morph-trash-in"/> <span >تم ازالته من السلة</span></div>}

                                </>
    );
};

export default CartIcon;