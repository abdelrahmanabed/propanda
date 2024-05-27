"use client"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import { Suspense, useState } from "react"
import CourseLoading from "./courseLoading"

function Arrow(props) {
  const disabled = props.disabled ? " arrow--disabled" : ""
  return (
    <svg
      onClick={props.onClick}
      className={`arrow z-10 ${props.className} ${
        props.left ? "arrow--left" : "arrow--right"
      } ${disabled}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {props.left && (
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      )}
      {!props.left && (
        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
      )}
    </svg>
  )
}



const Keenslider = ({ children }) => {
  const [loaded, setLoaded] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  const [sliderRef, instanceRef] = useKeenSlider({
    
    
    loop: false,
    
    mode: "free-snap",
    rtl: true,
   
    slides: { perView: "auto", spacing: 15 },
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
  })
  console.log("cs", currentSlide)
  return ( <Suspense fallback={<div className=" flex gap-3"></div>}>
    <div className=" relative py-9 md:p-9  md:px-16">
    {loaded && instanceRef.current && (
          <>
            <Arrow
              left
              onClick={(e) =>
                e.stopPropagation() || instanceRef.current?.next()
              }
              disabled={
               
                  currentSlide === instanceRef.current.track.details.slides.length - 1
                
                
                 


              } 
              className={`${instanceRef.current.track.details.slides.length <= 1 && 'hidden'}`}

              />

            <Arrow
              onClick={(e) =>
                e.stopPropagation() || instanceRef.current?.prev()
              }
              disabled={
                currentSlide === 0
              }
              className={`${instanceRef.current.track.details.slides.length <= 1 && 'hidden'}`}
            />
          </>
        )}
<div ref={sliderRef} className="keen-slider rounded-2xl" style={{ maxWidth: "100%" }}>

     { children }
     </div>  
     </div>
     </Suspense> )
}

export default Keenslider