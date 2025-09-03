"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { motion, AnimatePresence } from "framer-motion"

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance animation with golden ratio timing
      const tl = gsap.timeline({ delay: 1.618 })

      // Title with elegant letter spacing animation
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 100, letterSpacing: "1em", scale: 0.8 },
        { opacity: 1, y: 0, letterSpacing: "0.2em", scale: 1, duration: 1.618, ease: "power2.out" },
        "-=1.618",
      )

      // Subtitle with gentle fade
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" },
        "-=1",
      )

      // Parallax effect on scroll
      gsap.to(sectionRef.current, {
        yPercent: -25,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      })
    }, sectionRef)

    // Landing animation scroll handler
    const handleScroll = () => {
      if (!hasScrolled && window.scrollY > 0) {
        setHasScrolled(true)
        // Smooth scroll to the next section
        const nextSection = document.querySelector('[data-section="interactive-workflow"]')
        if (nextSection) {
          nextSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        }
      }
    }

    // Prevent normal scrolling on the hero section
    const preventScroll = (e: WheelEvent) => {
      if (!hasScrolled) {
        e.preventDefault()
        setHasScrolled(true)
        // Smooth scroll to the next section
        const nextSection = document.querySelector('[data-section="interactive-workflow"]')
        if (nextSection) {
          nextSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: false })
    window.addEventListener('wheel', preventScroll, { passive: false })

    return () => {
      ctx.revert()
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('wheel', preventScroll)
    }
  }, [hasScrolled])

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden hero"
      style={{ 
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {/* Video Background */}
      <video 
        ref={videoRef} 
        autoPlay 
        muted 
        loop 
        playsInline 
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ maxWidth: '100%', height: 'auto' }}
      >
        <source src="/video/0_Pink_Lake_Salt_Lake_3840x2160_8sec.mp4" type="video/mp4" />
      </video>

      {/* Content - Centered to video background */}
      <div className="absolute inset-0 z-20 flex items-center justify-center">
        <div className="text-center px-4 transform translate-y-0 md:translate-y-0 max-md:-translate-y-[230%]">
          <div 
            ref={titleRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-widest drop-shadow-2xl mb-1 md:mb-6"
            style={{ 
              fontFamily: "var(--font-agrandir-wide), Poppins, sans-serif",
              background: "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(173,216,230,0.8) 50%, rgba(255,215,0,0.7) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 0 30px rgba(255,255,255,0.4))"
            }}
          >
BALANX-BIO
          </div>
          <div 
            ref={subtitleRef}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-white font-light tracking-wide drop-shadow-lg max-w-4xl mx-auto px-4 md:px-6 leading-relaxed"
            style={{ 
              fontFamily: "var(--font-agrandir-wide), Poppins, sans-serif"
            }}
          >
            – Where AI Meet Health, Where You Meet Balance
          </div>
        </div>
      </div>

      {/* Decorative floating elements */}
      <div className="absolute inset-0 pointer-events-none z-20">
        <div className="floating absolute top-1/4 left-1/6 w-3 h-3 bg-light-green-300 rounded-full opacity-40"></div>
        <div className="floating absolute top-3/4 right-1/4 w-4 h-4 bg-rose-gold-200 rounded-full opacity-30"></div>
        <div className="floating absolute top-1/3 right-1/6 w-2 h-2 bg-champagne-300 rounded-full opacity-50"></div>
        <div className="floating absolute bottom-1/4 left-1/3 w-3 h-3 bg-gold-200 rounded-full opacity-35"></div>

        {/* SVG decorative elements */}
        <div className="parallax-element absolute top-1/5 right-1/5 opacity-10">
          <svg width="120" height="120" viewBox="0 0 120 120" style={{ maxWidth: '100%', height: 'auto' }}>
            <path
              className="svg-draw"
              d="M60 20 L80 60 L40 60 Z M60 60 L60 100"
              fill="none"
              stroke="#22c55e"
              strokeWidth="2"
            />
          </svg>
        </div>

        <div className="parallax-element absolute bottom-1/5 left-1/5 opacity-10">
          <svg width="100" height="100" viewBox="0 0 100 100" style={{ maxWidth: '100%', height: 'auto' }}>
            <circle className="svg-draw" cx="50" cy="50" r="40" fill="none" stroke="#d4af37" strokeWidth="2" />
            <circle className="svg-draw" cx="50" cy="50" r="20" fill="none" stroke="#f59e0b" strokeWidth="1" />
          </svg>
        </div>
      </div>


    </section>
  )
}
