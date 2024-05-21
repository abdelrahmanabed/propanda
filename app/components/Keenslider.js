"use client"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"

const Keenslider = ({ children }) => {

  const [sliderRef] = useKeenSlider({
    loop: false,
    
    mode: "free-snap",
    rtl: true,
   
    slides: { perView: "auto", spacing: 15 },
    
  })
  return (
<div ref={sliderRef} className="keen-slider rounded-2xl" style={{ maxWidth: "100%" }}>
       
     { children }
     </div>  )
}

export default Keenslider