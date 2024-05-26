"use client"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import { Suspense } from "react"
import CourseLoading from "./courseLoading"

const Keenslider = ({ children }) => {

  const [sliderRef] = useKeenSlider({
    loop: false,
    
    mode: "free-snap",
    rtl: true,
   
    slides: { perView: "auto", spacing: 15 },
    
  })
  return ( <Suspense fallback={<div className=" flex gap-3"></div>}>
<div ref={sliderRef} className="keen-slider rounded-2xl" style={{ maxWidth: "100%" }}>
     
     { children }
     </div>  </Suspense> )
}

export default Keenslider