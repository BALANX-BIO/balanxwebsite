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
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 95%",
              end: "bottom 10%",
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
      className="fade-in-section relative min-h-[80vh] flex items-center justify-center px-4 sm:px-6 py-12 sm:py-20 overflow-hidden bg-gradient-to-b from-gray-900 via-black to-gray-900 affo-healthcare-mobile"
    >
      {/* Background video */}
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-60"
        style={{ maxWidth: '100%', height: 'auto' }}
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1846e211-60b1-4108-86f9-901aeef72c29%20%281%29-Ayv68fmwXKkfHBtbYgzAza9cQ8pi8.mp4"
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
      <div className="relative z-20 max-w-7xl mx-auto text-center px-4">
        <h2
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extralight text-white mb-6 sm:mb-8 drop-shadow-lg"
        >
          ÁFFO HEALTHCARE
        </h2>
        <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/30 max-w-full sm:max-w-2xl lg:max-w-3xl mx-auto mb-8 sm:mb-16 shadow-lg">
          <p className="text-base sm:text-xl md:text-2xl text-white/90 drop-shadow-md">
            Experience personalized wellness through advanced <span className="whitespace-nowrap">bio-analysis</span> and tailored nutrition.
          </p>
        </div>
        
        {/* Embedded video */}
        <div className="w-full max-w-full sm:max-w-3xl lg:max-w-4xl mx-auto mb-8 sm:mb-16 rounded-xl overflow-hidden shadow-2xl">
          <video
            className="w-full h-auto object-cover"
            style={{ maxWidth: '100%', height: 'auto' }}
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
        <CoffeeHealthSection ref={coffeeHealthSectionRef} className="mt-12 sm:mt-16" />
      </div>

      {/* Mobile-specific styling */}
      <style jsx>{`
        @media (max-width: 768px) {
          section.affo-healthcare-mobile {
            margin-top: -150vh !important;
            padding-top: 4rem !important;
            padding-bottom: 4rem !important;
          }
        }
      `}</style>
    </section>
  )
} 