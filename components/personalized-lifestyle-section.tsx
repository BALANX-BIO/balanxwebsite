"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Link from "next/link"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function PersonalizedLifestyleSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (sectionRef.current && textRef.current) {
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
              start: "top 90%",
              end: "bottom 10%",
              toggleActions: "play none none reverse",
            },
          }
        )

        // Text entrance animation
        gsap.fromTo(
          textRef.current,
          { opacity: 0, scale: 0.98, y: 20 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            delay: 0.1,
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        )
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="personalized-lifestyle"
      className="fade-in-section relative w-full min-h-[80vh] overflow-hidden strong-overlay"
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
          height: 'auto',
          objectFit: 'cover',
          objectPosition: 'center center'
        }}
      >
        <source src="/video/6035530_Woman_People_3840x2160.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Mobile-specific video adjustment */}
      <style jsx>{`
        @media (max-width: 768px) {
          video {
            object-position: center center;
            transform: scale(1.3);
            filter: brightness(0.7);
          }
        }
      `}</style>

      {/* Dark Overlay - stronger on mobile to remove white background effect */}
      <div 
        className="absolute inset-0 z-10"
        style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
      ></div>
      
      {/* Additional mobile overlay */}
      <div 
        className="absolute inset-0 z-11 md:hidden"
        style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
      ></div>

      {/* Content - Moved up for better visibility */}
      <div className="relative z-20 w-full h-full flex items-center justify-center px-4 md:px-6" style={{ transform: 'translateY(-10%)' }}>
        <div 
          ref={textRef}
          className="flex flex-col items-center max-w-[1200px] mx-auto w-full"
        >
          {/* Title - Now on top */}
          <div className="text-center mb-8">
                          <h2 
              className="text-2xl md:text-4xl lg:text-5xl font-semibold text-white drop-shadow-lg leading-tight"
              style={{ fontFamily: "var(--font-agrandir-wide), Quicksand, sans-serif", color: "yellow" }}
            >
              Personalize Your Lifestyle - UPDATED
            </h2>
          </div>

                      {/* Three Numbered Points - Now below title */}
            <div className="space-y-4 md:space-y-5 max-w-2xl personalize-points-spacing">
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
      <div className="absolute bottom-[15%] left-1/2 transform -translate-x-1/2 z-30">
        <Link
          href="/pre-order"
          className="inline-flex items-center px-6 py-2 md:px-8 md:py-3 bg-white/90 text-black font-medium rounded-full hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 backdrop-blur-sm text-sm md:text-lg"
          style={{ fontFamily: "var(--font-agrandir-wide), Quicksand, sans-serif" }}
        >
          Join the Waitlist
        </Link>
      </div>

      {/* Mobile-specific styling for better spacing and positioning */}
      <style jsx>{`
        @media (max-width: 768px) {
          /* Better spacing between points */
          .personalize-points-spacing {
            margin-bottom: 2rem !important;
            gap: 1.5rem !important;
          }
          
          .personalize-points-spacing > div {
            margin-bottom: 1.5rem !important;
          }
          
          /* Position button for mobile */
          .bottom-\[15\%\] {
            bottom: 20% !important;
          }
        }
      `}</style>
    </section>
  )
}
