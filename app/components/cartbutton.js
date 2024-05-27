'use client'
import React, { useRef, useEffect, useState } from 'react';
import { BsCart } from "react-icons/bs";

import { useCart } from './CartContext';
const CartBtn = (props) => {
    const [state, setState] = useState(false);
    const { cartItems } = useCart();

    useEffect(() => {
        if (!cartItems) {
            localStorage.setItem('cartItems', JSON.stringify([]));
        }
        setState(false)


     
        if (cartItems.length > 0 ) {
           setState(true)
            
        }
    }, [cartItems]);
    


      
  

    return (
        <div 
                 className={` backdrop-blur-xl        
                  ${ props.className}   `}
        >
           { state&& <span className='absolute notify '>{cartItems.length}</span>}
            <BsCart className={` text-2xl`}/>
        </div>
    );
};

export default CartBtn;