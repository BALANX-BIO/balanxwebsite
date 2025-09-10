
"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import CoffeeHealthSection from "@/components/coffee-health-section"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function AffoHealthcareSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const coffeeHealthSectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (sectionRef.current && coffeeHealthSectionRef.current) {
        // Fade in animation for the section
        gsap.fromTo(
          sectionRef.current,
          { opacity: 0, y: 100 },
          {
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          }
        )

        // ScrollTrigger for controlling display property and body background
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
      data-section="affo-healthcare"
      className="fade-in-section relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden bg-gradient-to-b from-gray-900 via-black to-gray-900"
    >
      {/* Background video */}
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-60"
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1846e211-60b1-4108-86f9-901aeef72c29%20%281%29-Ayv68fmwXKkfHBtbYgzAza9cZQ8pi8.mp4"
        autoPlay
        loop
        muted
        playsInline
      >
        Your browser does not support the video tag.
      </video>

      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto text-center">
        <h2
          className="text-5xl md:text-7xl font-extralight text-white mb-8 drop-shadow-lg"
          style={{ fontFamily: "var(--font-agrandir-wide), Poppins, sans-serif" }}
        >
          ÁFFO HEALTHCARE
        </h2>
        <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-16 drop-shadow-md">
          Experience personalized wellness through advanced <span className="whitespace-nowrap">bio-analysis</span> and tailored nutrition.
        </p>
        
        {/* Embedded video */}
        <div className="w-full max-w-4xl mx-auto mb-16 rounded-xl overflow-hidden shadow-2xl">
          <video
            className="w-full h-auto object-cover"
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/exploded-BTR24P5NPnuMt8Axv3S3SZKDqIED1R.mp4"
            autoPlay
            loop
            muted
            playsInline
          >
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Coffee Health Section */}
        <CoffeeHealthSection ref={coffeeHealthSectionRef} className="mt-16" />
      </div>
    </section>
  )
} 