"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Link from "next/link"
import { useResponsiveScreen } from "@/hooks/useResponsiveScreen"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function PersonalizedLifestyleSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const { responsiveValues, isMobile } = useResponsiveScreen()

  useEffect(() => {
    // Completely disable all animations for this component
    // Desktop animations will be handled by the global fade-in-section class
    return () => {}
  }, [])

  return (
    <section
      ref={sectionRef}
      id="personalized-lifestyle"
      className="md:fade-in-section relative w-full min-h-[80vh] overflow-hidden strong-overlay"
    >
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        style={{ 
          maxWidth: '100%', 
          height: `${100 + responsiveValues.videoLengthen()}%`, // Responsive lengthening
          objectFit: 'cover',
          objectPosition: 'center 60%', // Pulled down to show lower portion
          transform: `translateY(${responsiveValues.videoPullDown()}%)` // Responsive pull down
        }}
      >
        <source src="/video/6035530_Woman_People_3840x2160_5sec.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Mobile-specific video adjustment */}
      <style jsx>{`
        @media (max-width: 768px) {
          video {
            object-position: center 60%;
            transform: scale(1.3) translateY(${responsiveValues.videoPullDown()}%);
            filter: brightness(0.7);
            height: ${100 + responsiveValues.videoLengthen()}%;
          }
        }
      `}</style>



      {/* Content */}
      <div className="relative z-20 w-full h-full flex items-center justify-center px-4 md:px-6 transform translate-y-0 md:translate-y-0 max-md:translate-y-[3%]">
        <div 
          className="flex flex-col items-center max-w-[1200px] mx-auto w-full"
        >
          {/* Title - Now on top */}
          <div className="text-center mb-4 mt-[8vh]">
            <h2 
              className="text-2xl md:text-4xl lg:text-5xl font-semibold text-white drop-shadow-lg leading-tight"
              style={{ fontFamily: "var(--font-agrandir-wide), Quicksand, sans-serif" }}
            >
              Personalize Your Lifestyle
            </h2>
          </div>

          {/* Three Numbered Points - Now below title */}
          <div className="space-y-3 md:space-y-4 max-w-2xl personalize-points-spacing">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 md:w-7 md:h-7 bg-white/40 rounded-full flex items-center justify-center text-white font-bold text-sm">
                1
              </div>
              <p className="text-sm md:text-lg leading-relaxed text-white drop-shadow-lg font-medium">
                Every ingredient is selected through AI analysis of your microbiome, stress patterns, and lifestyle needs.
              </p>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 md:w-7 md:h-7 bg-white/40 rounded-full flex items-center justify-center text-white font-bold text-sm">
                2
              </div>
              <p className="text-sm md:text-lg leading-relaxed text-white drop-shadow-lg font-medium">
                A precision-engineered wellness solution that goes beyond coffee.
              </p>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 md:w-7 md:h-7 bg-white/40 rounded-full flex items-center justify-center text-white font-bold text-sm">
                3
              </div>
              <p className="text-sm md:text-lg leading-relaxed text-white drop-shadow-lg font-medium">
                One simple morning ritual to address fatigue, stress, gut health, and mental clarity.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Join the Waitlist Button - Positioned at the bottom of the content */}
      <div className="absolute bottom-1/2 md:bottom-1/2 max-md:bottom-[43%] left-1/2 transform -translate-x-1/2 z-30">
        <Link
          href="/pre-order"
          className="inline-flex items-center px-6 py-2 md:px-8 md:py-3 bg-white/90 text-black font-medium rounded-full hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 backdrop-blur-sm text-sm md:text-lg"
          style={{ fontFamily: "var(--font-agrandir-wide), Quicksand, sans-serif" }}
        >
          Join the Waitlist
        </Link>
      </div>



    </section>
  )
}
