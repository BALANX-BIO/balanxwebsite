"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function AffoHealthcarePage2Section() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (sectionRef.current && contentRef.current) {
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

        // Animate content elements
        gsap.fromTo(
          contentRef.current.children,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.3,
            ease: "power3.out",
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top 80%",
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
      data-section="affo-healthcare-page2"
      className="fade-in-section relative min-h-[80vh] flex items-center justify-center px-6 py-20 overflow-hidden affo-page2-mobile"
      style={{
        background: "linear-gradient(to bottom, #d4c1a7 0%, #e8dccd 50%, #f8f5f0 100%)",
        marginTop: 0
      }}
    >

      {/* Content */}
      <div ref={contentRef} className="relative z-20 max-w-7xl mx-auto text-center">
        <h2
          className="text-3xl sm:text-4xl md:text-7xl font-semibold text-gray-800 mb-6 md:mb-8 drop-shadow-lg"
          style={{ fontFamily: "var(--font-agrandir-wide), Poppins, sans-serif" }}
        >
          ÁFFO HEALTHCARE
        </h2>
        <div className="bg-white/20 backdrop-blur-md rounded-xl p-6 sm:p-8 border border-white/30 max-w-3xl sm:max-w-4xl mx-auto mb-8 sm:mb-16 shadow-lg">
          <p className="text-sm sm:text-lg md:text-2xl drop-shadow-md" style={{ color: "#5A4632" }}>
            Experience personalized wellness through advanced <span className="whitespace-nowrap">bio-analysis</span> and tailored nutrition.
          </p>
        </div>
        
        {/* Embedded video */}
        <div className="w-full max-w-md sm:max-w-2xl md:max-w-4xl mx-auto mb-8 sm:mb-16 rounded-lg sm:rounded-xl overflow-hidden shadow-2xl">
          <video
            className="w-full h-auto object-cover"
            src="/video/affofinal.mp4"
            autoPlay
            loop
            muted
            playsInline
          >
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Four Core Steps */}
        <div className="w-full max-w-7xl mx-auto">
          <h3 className="text-2xl sm:text-3xl md:text-5xl font-semibold text-gray-800 mb-8 sm:mb-12 md:mb-16 drop-shadow-lg">
            Our Service Process
          </h3>
          
          <div 
            className="max-w-md sm:max-w-3xl md:max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-10 justify-items-center"
            style={{ alignItems: "start" }}
          >
            {/* Step 1: Daily Data Collection */}
            <div 
              className="group rounded-lg md:rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-4 md:p-6 flex flex-col justify-center"
              style={{
                aspectRatio: "1/1", // Square boxes  
                height: "200px", // Back to good size that looked professional
                width: "200px",  // Back to good size that looked professional
                position: "relative",
                top: "0px" // Force all boxes to same baseline
              }}
            >
              <div className="flex flex-col items-center text-center flex-1 justify-center">
                {/* Badge: perfectly uniform + centered */}
                <div className="mb-3 mx-auto rounded-full bg-white/95 backdrop-blur-sm shadow-lg group-hover:shadow-xl transition-shadow duration-300 border border-white/50 w-16 h-16 flex items-center justify-center">
                  {/* Inner crop ring: calendar logo - larger + positioned down */}
                  <div className="w-13 h-13 rounded-full overflow-hidden flex items-center justify-center">
                    <img
                      src="/images/affo1.jpg"
                      alt="Daily Data Collection"
                      className="object-cover block"
                      style={{ 
                        width: "120%", 
                        height: "120%",
                        transform: "translateY(4%)"
                      }}
                      loading="lazy"
                      draggable={false}
                    />
                  </div>
                </div>
                <h4 className="text-sm md:text-base font-semibold text-gray-800 mb-1 md:mb-2 leading-tight">
                  Daily Data Collection
                </h4>
                <p className="text-xs md:text-sm text-gray-700 leading-tight font-light line-clamp-4">
                  We gather essential health metrics and lifestyle data every day to track your wellness journey.
                </p>
              </div>
            </div>

            {/* Step 2: AI Analysis */}
            <div 
              className="group rounded-lg md:rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-4 md:p-6 flex flex-col justify-center"
              style={{
                aspectRatio: "1/1", // Square boxes  
                height: "200px", // Back to good size that looked professional
                width: "200px",  // Back to good size that looked professional
                position: "relative",
                top: "0px" // Force all boxes to same baseline
              }}
            >
              <div className="flex flex-col items-center text-center flex-1 justify-center">
                {/* Badge: perfectly uniform + centered */}
                <div className="mb-3 mx-auto rounded-full bg-white/95 backdrop-blur-sm shadow-lg group-hover:shadow-xl transition-shadow duration-300 border border-white/50 w-16 h-16 flex items-center justify-center">
                  {/* Inner crop ring: brain logo - enlarged 20% */}
                  <div className="w-13 h-13 rounded-full overflow-hidden flex items-center justify-center">
                    <img
                      src="/images/affo2.jpg"
                      alt="AI Analysis"
                      className="object-cover block"
                      style={{ 
                        width: "120%", 
                        height: "120%"
                      }}
                      loading="lazy"
                      draggable={false}
                    />
                  </div>
                </div>
                <h4 className="text-sm md:text-base font-semibold text-gray-800 mb-1 md:mb-2 leading-tight">
                  AI Analysis
                </h4>
                <p className="text-xs md:text-sm text-gray-700 leading-tight font-light line-clamp-4">
                  Our algorithms process your data to identify trends and health patterns unique to you.
                </p>
              </div>
            </div>

            {/* Step 3: Personalized Recommendations */}
            <div 
              className="group rounded-lg md:rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-4 md:p-6 flex flex-col justify-center"
              style={{
                aspectRatio: "1/1", // Square boxes  
                height: "200px", // Back to good size that looked professional
                width: "200px",  // Back to good size that looked professional
                position: "relative",
                top: "1px" // Move 3px lower from previous position to align with Health Reports
              }}
            >
              <div className="flex flex-col items-center text-center flex-1 justify-center">
                {/* Badge: perfectly uniform + centered */}
                <div className="mb-3 mx-auto rounded-full bg-white/95 backdrop-blur-sm shadow-lg group-hover:shadow-xl transition-shadow duration-300 border border-white/50 w-16 h-16 flex items-center justify-center">
                  {/* Inner crop ring: leaf logo - enlarged 10% + moved left */}
                  <div className="w-13 h-13 rounded-full overflow-hidden flex items-center justify-center">
                    <img
                      src="/images/affo3.jpg"
                      alt="Personalized Recommendations"
                      className="object-cover block"
                      style={{ 
                        width: "110%", 
                        height: "110%",
                        transform: "translateX(-3%)"
                      }}
                      loading="lazy"
                      draggable={false}
                    />
                  </div>
                </div>
                <h4 className="text-sm md:text-base font-semibold text-gray-800 mb-1 md:mb-2 leading-tight">
                  Personalized Recommendations
                </h4>
                <p className="text-xs md:text-sm text-gray-700 leading-tight font-light line-clamp-4">
                  Receive tailored wellness and nutrition suggestions based on your individual profile.
                </p>
              </div>
            </div>

            {/* Step 4: Health Reports */}
            <div 
              className="group rounded-lg md:rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-4 md:p-6 flex flex-col justify-center"
              style={{
                aspectRatio: "1/1", // Square boxes  
                height: "200px", // Back to good size that looked professional
                width: "200px",  // Back to good size that looked professional
                position: "relative",
                top: "0px" // Force all boxes to same baseline
              }}
            >
              <div className="flex flex-col items-center text-center flex-1 justify-center">
                {/* Badge: perfectly uniform + centered */}
                <div className="mb-3 mx-auto rounded-full bg-white/95 backdrop-blur-sm shadow-lg group-hover:shadow-xl transition-shadow duration-300 border border-white/50 w-16 h-16 flex items-center justify-center">
                  {/* Inner crop ring: forces equal visual size */}
                  <div className="w-13 h-13 rounded-full overflow-hidden flex items-center justify-center">
                    <img
                      src="/images/affo4.jpg"
                      alt="Health Reports"
                      className="w-full h-full object-cover block"
                      loading="lazy"
                      draggable={false}
                    />
                  </div>
                </div>
                <h4 className="text-sm md:text-base font-semibold text-gray-800 mb-1 md:mb-2 leading-tight">
                  Health Reports
                </h4>
                <p className="text-xs md:text-sm text-gray-700 leading-tight font-light line-clamp-4">
                  Get regular, easy-to-read reports that summarize your progress and suggest next steps.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 