"use client"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import { Suspense, useCallback, useEffect, useMemo, useState } from "react"
import Loading from "./loading"

function Arrow(props) {
  const disabled = props.disabled ? " arrow--disabled" : ""
  return useMemo(() => (
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
  ), [props.left, props.onClick, props.className, disabled])
}

const Keenslider = ({ children, label }) => {
  const [loaded, setLoaded] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  const slideChanged = useCallback((slider) => {
    setCurrentSlide(slider.track.details.rel)
  }, [])

  const [sliderRef, instanceRef] = useKeenSlider({
    renderMode: 'performance',
    loop: false,
    mode: "free-snap",
    rtl: true,
    slides: { perView: "auto", spacing: 15 },
    initial: 0,
    slideChanged,
    created() {
      setLoaded(true)
    }
  })
  useEffect(() => {
    if (instanceRef.current) {
      instanceRef.current.update();
    }
  }, [children]);

  return (
    <>
      <div className="relative">
        <Suspense fallback={<div className="flex gap-3 bg-white w-28 h-12"></div>}>
          {loaded && instanceRef.current && (
            <>
              <label className='mr-3 sm:text-lg md:text-xl lg:text-2xl xl:text-3xl '>{label}</label>
              <Arrow
                left
                onClick={(e) =>
                  e.stopPropagation() || instanceRef.current?.next()
                }
                disabled={currentSlide === instanceRef.current.track.details.slides.length - 1}
                className={`${instanceRef.current.track.details.slides.length <= 1 && 'hidden'}`}
              />
              <Arrow
                onClick={(e) =>
                  e.stopPropagation() || instanceRef.current?.prev()
                }
                disabled={currentSlide === 0}
                className={`${instanceRef.current.track.details.slides.length <= 1 && 'hidden'}`}
              />
            </>
          )}
        </Suspense>
      </div>
      <div className="relative py-9 pt-3 md:p-9 md:pt-3 min-h-96  md:px-16">
        {children && children.length > 0 && <div ref={sliderRef} className="keen-slider rounded-2xl" style={{ maxWidth: "100%" }}>
          {children}
        </div>}
      </div>
    </>
  )
}

export default Keenslider
