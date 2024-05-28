'use client'
import { useEffect, useState } from "react";

const Totalprice = (props) => {

    const [totalPrice, setTotalPrice] = useState(0);
    
    useEffect(()=>{ 
        const  getCart= async()=>{
                
     
      
            
              
                 const totalPrice = props.courses.reduce((acc, course) => acc + course.price, 0);
                 setTotalPrice(totalPrice);
         }
      
         getCart()
           
        
      
      },[props.courses])
     
  return (
<div><span className=" font-light">EGP</span>  {totalPrice.toFixed(2)}</div>
  )
}

export default Totalprice
