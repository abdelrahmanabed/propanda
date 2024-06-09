'use client'
import React, {  Suspense, useEffect, useState } from "react"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import Loading from "./loading"

const  KeenSwiper = ({children, className}) =>{
    const [currentSlide, setCurrentSlide] = useState(0)
    const [loaded, setLoaded] = useState(false)
    const [sliderRef, instanceRef] = useKeenSlider({
        loop: true,
        renderMode:'performance',
      initial: 0,
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel)
      },
      created() {
        setLoaded(true)
      },
    }, [
        (slider) => {
          let timeout
          let mouseOver = false
          function clearNextTimeout() {
            clearTimeout(timeout)
          }
          function nextTimeout() {
            clearTimeout(timeout)
            if (mouseOver) return
            timeout = setTimeout(() => {
              slider.next()
            }, 3000)
          }
          slider.on("created", () => {
            slider.container.addEventListener("mouseover", () => {
              mouseOver = true
              clearNextTimeout()
            })
            slider.container.addEventListener("mouseout", () => {
              mouseOver = false
              nextTimeout()
            })
            nextTimeout()
          })
          slider.on("dragStarted", clearNextTimeout)
          slider.on("animationEnded", nextTimeout)
          slider.on("updated", nextTimeout)
        },
      ])
      useEffect(() => {
        if (instanceRef) {
          setLoaded(true)
        }
      }, [instanceRef])
    
      if (!loaded) {
        return <div className="h-96 flex justify-center items-center"><Loading /></div>
      }
    
    return (
      < Suspense fallback={<div className=" h-96"> <Loading/></div>}>
        <div className={`navigation-wrapper ${className}`}>
          {children.length>0 &&<div ref={sliderRef} className={`keen-slider swiper ${ className}`}>
            {children}
          </div>}
        
        </div>
        {children.length>0 &&loaded && instanceRef.current && (
          <div className="dots">
            {[
              ...Array(instanceRef.current.track.details.slides.length).keys(),
            ].map((idx) => {
              return (
                <button
                  key={idx}
                  onClick={() => {
                    instanceRef.current?.moveToIdx(idx)
                  }}
                  className={"dot" + (currentSlide === idx ? " active" : "")}
                ></button>
              )
            })}
        </div>
      )}
     </Suspense>
  )
}


export default KeenSwiper;