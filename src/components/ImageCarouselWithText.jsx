import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Button from "../components/Button"

  

export function ImagaCarouselWithText({ images }) {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = React.useState(true)
  const [touchStart, setTouchStart] = React.useState(0)
  const timeoutRef = React.useRef(null) // Remove the type definition for timeoutRef

  const goToNext = React.useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }, [images.length])

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX)
  }

  const handleTouchMove = (e) => {
    if (touchStart) {
      const touchEnd = e.touches[0].clientX
      const diff = touchStart - touchEnd

      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          goToNext()
        } else {
          goToPrevious()
        }
        setTouchStart(0)
      }
    }
  }

  React.useEffect(() => {
    if (isAutoPlaying) {
      timeoutRef.current = window.setTimeout(goToNext, 1000) // Using window.setTimeout
    }
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [isAutoPlaying, goToNext])

  const handleMouseEnter = () => setIsAutoPlaying(false)
  const handleMouseLeave = () => setIsAutoPlaying(true)

  return (
    <div
      className="group relative h-[600px] w-full overflow-hidden rounded-xl bg-black"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      {/* Images */}
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute h-full w-full transition-all duration-700 ease-in-out
            ${index === currentIndex ? "opacity-100" : "opacity-0"}`}
        >
          {/* Image with zoom effect */}
          <div
            className={`relative h-full w-full transform transition-transform duration-[2000ms] ease-out
              ${index === currentIndex ? "scale-105" : "scale-100"}`}
          >
            <img src={image.src || "/placeholder.svg"} alt={image.alt} className="h-full w-full object-cover" />
          </div>

          {/* Content Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent">
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <h2 className="mb-2 text-3xl font-bold text-white">{image.title}</h2>
              <p className="text-lg text-white/90">{image.description}</p>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 transform rounded-full bg-white/10 text-white opacity-0 backdrop-blur-sm transition-opacity hover:bg-white/20 group-hover:opacity-100"
        onClick={goToPrevious}
      >
        <ChevronLeft className="h-8 w-8" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 transform rounded-full bg-white/10 text-white opacity-0 backdrop-blur-sm transition-opacity hover:bg-white/20 group-hover:opacity-100"
        onClick={goToNext}
      >
        <ChevronRight className="h-8 w-8" />
      </Button>

      {/* Progress Indicators */}
      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 transform gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-1.5 rounded-full transition-all duration-300 
              ${index === currentIndex ? "w-8 bg-white" : "w-4 bg-white/50 hover:bg-white/75"}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
