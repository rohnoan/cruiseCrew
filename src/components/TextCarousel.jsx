"use client"

import { useState, useEffect } from "react"

export default function TextCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    { text: "NEED SOME GEAR?", size: "text-4xl" },
    { text: "NEED A HELMET?", size: "text-4xl" },
    { text: "NEED A JACKET?", size: "text-4xl" },
    { text: "NEED A BIKE?", size: "text-4xl" },
  ]

  // Auto slide every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    }, 2000)

    return () => clearInterval(timer)
  }, [])

  // Navigation functions
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  return (
    <div className="relative h-20 w-full overflow-hidden  ">
      {/* Slides */}
      <div className="relative h-full w-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute left-0 top-0 h-full w-full transform transition-all duration-500 ease-in-out ${
              index === currentSlide ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
            }`}
          >
            <div className="flex h-full items-center justify-center">
              <div className={`${slide.size} font-bold tracking-wider`}>{slide.text}</div>
            </div>
          </div>
        ))}
      </div>

      
      
    </div>
  )
}

