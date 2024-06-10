'use client'
import { useEffect, useState } from "react";
let totalPrice = 0;

const Totalprice = (props) => {
  
  const [currentTotalPrice, setCurrentTotalPrice] = useState(totalPrice);
    
    useEffect(()=>{ 
      const calculateTotalPrice = async () => {
        const totalPriceValue = props.courses.reduce((acc, course) => acc + course.price, 0);
        totalPrice = totalPriceValue.toFixed(2);
        setCurrentTotalPrice(totalPrice);
    };

    calculateTotalPrice();
           
        
      
      },[props.courses])
     
  return (
<div><span className=" font-light">EGP</span> {currentTotalPrice}</div>
  )
}

export default Totalprice
export { totalPrice };
