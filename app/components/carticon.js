'use client'
import React, { useRef, useEffect, useState } from 'react';
import { Player } from '@lordicon/react';
import axios from 'axios';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';
import TrashIcon from './trashicon';
import { useCart } from './CartContext';
const CartIcon = (props) => {
    const{addToCart, removeFromCart, cartItems}= useCart()
    const playerRef = useRef(null);
    const [state, setState] = useState("in-oscillate");
    const [added, setAdded] = useState("./wired-outline-139-basket.json");
    const [showMessage, setShowMessage] = useState(false);
    const [showDMessage, setShowDMessage] = useState(false);

    useEffect(()=> {
        handlePFB();

    },[])

    useEffect(() => {
       
        if (cartItems.includes(props.courseId) ) {
           setState('morph-fill')
 
        }
    }, [cartItems]);
    
    const handlePFB = () => {
        // Play the animation when the mouse enters
        playerRef.current?.playFromBeginning();
    };

 
    const handleGTFF = () => {
        // Play the animation when the mouse enters
        playerRef.current?.goToFirstFrame();
    };

    const handlePlay = () => {
        // Play the animation when the mouse enters
        playerRef.current?.play();
    };



  

      
    const handleCartClick = async () => {
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
                        setState("in-oscillate");
                        setShowDMessage(true);
                        setTimeout(() => {
                            setShowDMessage(false);
                        }, 1000);
                        handlePFB();
                       
            } else {
                        await axios.put(`${process.env.NEXT_PUBLIC_PORT}/api/users/${userId}/cart`, { itemId: props.courseId }, {
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${token}`,
                            },
                        });
                        addToCart(props.courseId)
                        console.log('Item added to cartItems array');
                        setState("morph-fill");
                        setShowMessage(true);
                        setTimeout(() => {
                            setShowMessage(false);
                        }, 1000);
                        handlePFB();
                    }
                }
            } else {
                // No token, manage items in localStorage
                if (cartItems.includes(props.courseId)) {
                    removeFromCart(props.courseId)
                    setState("in-oscillate");
                    setShowDMessage(true);
                    setTimeout(() => {
                        setShowDMessage(false);
                    }, 1000);
                    handleGTFF();
                    handlePFB();
                   
                } else {
                    addToCart(props.courseId)
                    setState("morph-fill");
                    setShowMessage(true);
                    setTimeout(() => {
                        setShowMessage(false);
                    }, 1000);
                    handlePlay();
                }
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    const ICON = require(`${added}`); // Replace with your actual icon data

    return (
        <>
        <div id='lordcdiv' 
            onClick={handleCartClick}
            className={`backdrop-blur-md
                ${state === 'in-oscillate' ? 'h-16 w-16 rounded-2xl' : 'clicked'}
                duration-300 flex  w-12 h-12   ${ props.className}   `}
        >
            <Player
                state={state}
                size={state === 'morph-fill' ? 40 : 25}
                ref={playerRef}
                icon={ICON}
                colorize={"#000"}
                currentState={props.currentState}
            />

        </div>
                                {showMessage && <div className="messageyes duration-500 fixed p-3 text-xl flex flex-col justify-center items-center md:text-3xl rounded-2xl "> <span >تم اضافته الى السلة</span></div>}
                                {showDMessage &&  <div className="messageyes flex flex-col justify-center items-center duration-500 fixed p-3 text-xl md:text-3xl rounded-2xl "><TrashIcon state="morph-trash-in"/> <span >تم ازالته من السلة</span></div>}

                                </>
    );
};

export default CartIcon;