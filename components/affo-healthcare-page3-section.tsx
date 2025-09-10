"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Link from "next/link"
import CoffeeHealthSection from "@/components/coffee-health-section"
import { useResponsiveScreen } from "@/hooks/useResponsiveScreen"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function AffoHealthcarePage3Section() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const coffeeHealthSectionRef = useRef<HTMLDivElement>(null)
  const { responsiveValues } = useResponsiveScreen()

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Make both sections immediately visible with no delays or animations
      if (sectionRef.current) {
        gsap.set(sectionRef.current, {
          opacity: 1,
          y: 0,
          visibility: "visible",
          clearProps: "all"
        })
      }

      if (coffeeHealthSectionRef.current) {
        // Make coffee section immediately visible too
        gsap.set(coffeeHealthSectionRef.current, {
          opacity: 1,
          y: 0,
          visibility: "visible",
          clearProps: "all"
        })

        // ScrollTrigger for controlling body background
        ScrollTrigger.create({
          trigger: coffeeHealthSectionRef.current,
          start: "top 20%",
          end: "bottom top",
          onToggle: (self) => {
            if (self.isActive) {
              // When CoffeeHealthSection is active (in view), make body black
              document.body.classList.add("bg-black")
            } else {
              // When CoffeeHealthSection is not active, remove body black background
              document.body.classList.remove("bg-black")
            }
          },
        })
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      data-section="affo-healthcare-page3"
      className="relative overflow-hidden"
      style={{ 
        opacity: 1, 
        transform: "translateY(0px)", 
        visibility: "visible",
        animation: "none",
        transition: "none"
      }}
    >
      <CoffeeHealthSection ref={coffeeHealthSectionRef} />
      
      {/* Join Waitlist Button */}
      <div className="absolute left-1/2 transform -translate-x-1/2 z-10" style={{ bottom: `calc(2rem - ${Math.abs(responsiveValues.buttonMoveDown())}vh)` }}>
        <Link
          href="/pre-order"
          className="inline-flex items-center gap-2 bg-white text-gray-900 font-extralight py-2.5 px-5 rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          style={{ 
            fontFamily: "var(--font-agrandir-wide), Poppins, sans-serif",
            fontSize: "0.85em",
            transform: `scale(${responsiveValues.buttonScale() / 100})`
          }}
        >
          Join Waitlist
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </Link>
      </div>
    </section>
  )
} 