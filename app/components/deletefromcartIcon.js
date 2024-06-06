'use client'
import React, {useState } from 'react';
import axios from 'axios';
import { RiDeleteBin6Line } from "react-icons/ri";
import { useCart } from './CartContext';
import Loading from './loading';
import { useUser } from './UserContext';
const DeletefromcartIcon = (props) => {
    const [showDMessage, setShowDMessage] = useState(false);
    const [loading, setLoading] = useState(false);
    const { userId} = useUser()

const {removeFromCart} = useCart()

    const handleCartClick = async () => {
        setLoading(true)
        try {
          
                if (userId) {
                    const response = await axios.get(`${process.env.NEXT_PUBLIC_PORT}/api/users/${userId}/cart`)

                    const cartItems = response.data.cart;
                    if (Array.isArray(cartItems) && cartItems.includes(props.courseId)) {
                        await axios.delete(`${process.env.NEXT_PUBLIC_PORT}/api/users/${userId}/cart/${props.courseId}`);
                        
                        setShowDMessage(true);
                        setTimeout(() => {
                            setShowDMessage(false);
                        }, 1000);
                        removeFromCart(props.courseId) // Callback to parent component
                        setLoading(false)

            } 
                }
            else{
                setShowDMessage(true);
                setTimeout(() => {
                    setShowDMessage(false);
                }, 1000);
                removeFromCart(props.courseId) // Callback to parent component
                setLoading(false)

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
          { loading? <Loading/> :  <RiDeleteBin6Line
               
                currentState={props.currentState}
            />}

        </div>
        {showDMessage &&  <div className="messageyes flex flex-col justify-center items-center duration-500 fixed p-3 text-xl md:text-3xl rounded-2xl "><RiDeleteBin6Line /> <span >تم ازالته من السلة</span></div>}

                                </>
    );
};

export default DeletefromcartIcon