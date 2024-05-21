'use client'
import React, { useRef, useEffect, useState } from 'react';
import { Player } from '@lordicon/react';

import { useCart } from './CartContext';
const CartBtn = (props) => {
    const playerRef = useRef(null);
    const [state, setState] = useState("in-oscillate");
    const [added, setAdded] = useState("./wired-outline-139-basket.json");
    const { cartItems } = useCart();

    useEffect(() => {
        if (!cartItems) {
            localStorage.setItem('cartItems', JSON.stringify([]));
        }
        setState('in-oscillate')

        handlePFB();

     
        if (cartItems.length > 0 ) {
           handlePFB();
           setState('morph-fill')
            
        }
    }, [cartItems]);
    
    const handlePFB = () => {
    
        playerRef.current?.playFromBeginning();
    };


      
  
    const ICON = require(`${added}`); 

    return (
        <div
  

       
            className={` backdrop-blur-xl
              
                  ${ props.className}   `}
        >
            <Player
                state={state}
                size={ 30}
                ref={playerRef}
                icon={ICON}
                colorize={props.color}
                currentState={props.currentState}
                onComplete={()=>{
                    if(state=== "loop-oscillate-empty" || state=== "hover-oscillate-full" ){
                        handlePFB()
                } else {
                    
                }
                }}
            />
        </div>
    );
};

export default CartBtn;