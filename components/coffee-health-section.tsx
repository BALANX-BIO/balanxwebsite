"use client"

import { useEffect, useRef, forwardRef } from "react" // Import forwardRef
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const coffeeBenefits = [
  {
    flavor: "Herbal Infusion",
    title: "Calm & Focus",
    description:
      "Infused with adaptogens like Ashwagandha and L-Theanine, this blend promotes mental clarity and reduces stress without the jitters, supporting a balanced nervous system.",
    icon: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-light-green-400" // Adjusted color for contrast
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M12 18v-6" />
        <path d="M15 15l-3-3-3 3" />
      </svg>
    ),
    color: "light-green",
  },
  {
    flavor: "Spiced Elixir",
    title: "Digestive Harmony",
    description:
      "A warming blend with ginger, turmeric, and cinnamon, known for their anti-inflammatory and digestive properties. Supports gut health and nutrient absorption for overall vitality.",
    icon: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-gold-400" // Adjusted color for contrast
      >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
        <path d="M12 8v4l3 3" />
        <path d="M12 12h.01" />
      </svg>
    ),
    color: "gold",
  },
  {
    flavor: "Mushroom Boost",
    title: "Immune Support",
    description:
      "Featuring functional mushrooms like Reishi and Lion's Mane, this coffee enhances cognitive function and strengthens the immune system, providing sustained energy and resilience.",
    icon: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-rose-gold-400" // Adjusted color for contrast
      >
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5L12 22z" />
      </svg>
    ),
    color: "rose-gold",
  },
  {
    flavor: "Golden Milk Latte",
    title: "Anti-Inflammatory",
    description:
      "A turmeric-infused blend with black pepper for enhanced absorption, offering powerful anti-inflammatory benefits. Supports joint health and overall well-being.",
    icon: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-champagne-400" // Adjusted color for contrast
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M12 18v-6" />
        <path d="M15 15l-3-3-3 3" />
      </svg>
    ),
    color: "champagne",
  },
]

interface CoffeeHealthSectionProps {
  className?: string
}

// Use forwardRef to accept a ref from the parent component
const CoffeeHealthSection = forwardRef<HTMLDivElement, CoffeeHealthSectionProps>(({ className }, ref) => {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const cardsRef = useRef<Array<HTMLDivElement | null>>([])
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered title and description animation
      gsap.fromTo(
        [titleRef.current, descriptionRef.current],
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current, // Use the passed ref as the trigger
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        },
      )

      // Staggered card entrance animation
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(
            card,
            { opacity: 0, y: 80, scale: 0.9 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1.2,
              stagger: 0.4, // Increased stagger for more distinct animation
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            },
          )
        }
      })
    }, ref) // Scope GSAP animations to this section using the passed ref

    return () => ctx.revert()
  }, []) // Empty dependency array ensures this runs once on mount

  return (
    <section
      ref={sectionRef}
      data-section="coffee-health"
      className={`relative min-h-[80vh] flex items-center justify-center overflow-hidden ${className}`}
    >
      {/* Video Background for this section */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/20250802_2354_Elegant%20Flavor%20Experience_simple_compose_01k1qbb5hmfb2t0r72t0ys4m58-a77JhmBcq0HHWeqxzbVbPqQ1vtsAUZ.mp4"
        autoPlay
        loop
        muted
        playsInline
      >
        Your browser does not support the video tag.
      </video>
      {/* Dark overlay for better text readability within this section */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px] z-10" />
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 md:py-24 text-white">
        <div className="text-center">
          <h2
            ref={titleRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold mb-6 sm:mb-8 tracking-wide drop-shadow-lg"
            style={{ fontFamily: "var(--font-agrandir-wide), Poppins, sans-serif" }}
          >
            Coffee & Wellness
          </h2>
          <p
            ref={descriptionRef}
            className="text-lg sm:text-xl md:text-2xl leading-relaxed max-w-5xl mx-auto mb-10 sm:mb-16 drop-shadow-md font-light"
            style={{ fontFamily: "var(--font-agrandir-wide), Poppins, sans-serif" }}
          >
            Discover how our unique coffee blends, infused with ancient wisdom and modern science, can elevate your daily wellness routine.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
            {coffeeBenefits.map((item, index) => (
              <div
                key={index}
                ref={(el) => (cardsRef.current[index] = el)}
                className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-6 sm:p-8 flex flex-col items-center text-center border border-white/20 hover:shadow-xl transition-all duration-300"
              >
                <div className={`p-3 sm:p-4 rounded-full bg-${item.color}-100/20 mb-4 sm:mb-6`}>{item.icon}</div>
                <p className={`text-xs sm:text-sm font-semibold uppercase tracking-wider text-${item.color}-300 mb-2`}>
                  {item.flavor}
                </p>
                <h3
                  className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 drop-shadow-sm"
                  style={{ fontFamily: "var(--font-agrandir-wide), Poppins, sans-serif" }}
                >
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base leading-relaxed text-white/80 font-thin" style={{ fontFamily: "var(--font-agrandir-wide), Poppins, sans-serif" }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
})

CoffeeHealthSection.displayName = "CoffeeHealthSection" // Add display name for debugging

export default CoffeeHealthSection
