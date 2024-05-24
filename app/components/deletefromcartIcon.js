'use client'
import React, { useRef, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';
import { RiDeleteBin6Line } from "react-icons/ri";
import { useCart } from './CartContext';
const DeletefromcartIcon = (props) => {
    const [showDMessage, setShowDMessage] = useState(false);

const {removeFromCart} = useCart()

    


      
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
                        
                        setShowDMessage(true);
                        setTimeout(() => {
                            setShowDMessage(false);
                        }, 1000);
                        removeFromCart(props.courseId) // Callback to parent component

            } 
                }
            } else{
                setShowDMessage(true);
                setTimeout(() => {
                    setShowDMessage(false);
                }, 1000);
                removeFromCart(props.courseId) // Callback to parent component

            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
        <div id='lordcdiv' 
            onClick={handleCartClick}
            className={`
 rounded-2xl clicked duration-300 flex justify-center w-8 h-8 items-center  ${ props.className}   `}
        >
            <RiDeleteBin6Line
               
                currentState={props.currentState}
            />

        </div>
        {showDMessage &&  <div className="messageyes flex flex-col justify-center items-center duration-500 fixed p-3 text-xl md:text-3xl rounded-2xl "><RiDeleteBin6Line /> <span >تم ازالته من السلة</span></div>}

                                </>
    );
};

export default DeletefromcartIcon