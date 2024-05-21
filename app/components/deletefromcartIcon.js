import React, { useRef, useState } from 'react';
import { Player } from '@lordicon/react';
import axios from 'axios';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';
import TrashIcon from './trashicon';
import { useCart } from './CartContext';
const DeletefromcartIcon = (props) => {
    const playerRef = useRef(null);
    const [state, setState] = useState("hover-empty");
    const [added, setAdded] = useState('./wired-outline-185-trash-bin.json');
    const [showDMessage, setShowDMessage] = useState(false);

const {removeFromCart} = useCart()

    
    const handlePFB = () => {
        // Play the animation when the mouse enters
        playerRef.current?.playFromBeginning();
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
                        
                        console.log('Item removed from cartItems array');
                        setState("morph-trash-in");
                        setShowDMessage(true);
                        setTimeout(() => {
                            setShowDMessage(false);
                        }, 1000);
                        handlePFB();
                        removeFromCart(props.courseId) // Callback to parent component

            } 
                }
            } else{
                setState("morph-trash-in");
                setShowDMessage(true);
                setTimeout(() => {
                    setShowDMessage(false);
                }, 1000);
                handlePFB();
                removeFromCart(props.courseId) // Callback to parent component

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
            className={`
                ${state === 'in-oscillate' ? 'h-16 w-16 rounded-2xl' : 'clicked'}
                duration-300 flex justify-center w-8 h-8 items-center  ${ props.className}   `}
        >
            <Player
                state={state}
                size={30}
                ref={playerRef}
                icon={ICON}
                colorize={"#000"}
                currentState={props.currentState}
            />

        </div>
        {showDMessage &&  <div className="messageyes flex flex-col justify-center items-center duration-500 fixed p-3 text-xl md:text-3xl rounded-2xl "><TrashIcon state="morph-trash-in"/> <span >تم ازالته من السلة</span></div>}

                                </>
    );
};

export default DeletefromcartIcon