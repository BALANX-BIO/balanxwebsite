"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { useIsMobile } from "@/hooks/use-mobile"

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null)
  const router = useRouter()
  const pathname = usePathname()
  const isMobile = useIsMobile()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    // Elegant navigation entrance
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.618, delay: 3.5, ease: "power3.out" },
    )

    // Backdrop filter support detection
    const root = document.documentElement
    const test = CSS.supports('backdrop-filter', 'blur(1px)') || CSS.supports('-webkit-backdrop-filter', 'blur(1px)')
    if (!test) root.classList.add('no-backdrop')

    // Scroll detection for glassmorphism
    const nav = document.querySelector('.navbar.glass')
    const onScroll = () => {
      if (nav) {
        nav.classList.toggle('scrolled', window.scrollY > 100)
      }
    }
    
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll() // Initial check

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])
  
  // Close mobile menu on pathname change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  // Handle navigation clicks
  const handleNavigationClick = (sectionId: string) => {
    if (pathname === '/') {
      // If on home page, scroll to section with enhanced smooth behavior
      if (sectionId === 'hero') {
        window.scrollTo({ 
          top: 0, 
          behavior: "smooth" 
        })
      } else {
        const section = document.querySelector(`[data-section="${sectionId}"]`)
        if (section) {
          // Add a small delay for better visual effect
          setTimeout(() => {
            section.scrollIntoView({
              behavior: "smooth",
              block: "start",
            })
          }, 100)
        }
      }
    } else {
      // If on other pages, navigate to home page with hash
      if (sectionId === 'hero') {
        router.push('/')
      } else {
        router.push(`/#${sectionId}`)
      }
    }
  }

  // Close mobile menu when navigating
  const handleMobileNavigation = (sectionId: string) => {
    handleNavigationClick(sectionId)
    setMobileMenuOpen(false)
  }

  return (
    <nav
      ref={navRef}
      className="navbar glass"
    >
      <div className="flex items-center justify-between w-full h-full">
        {/* Logo Image */}
        <Link href="/" className="text-left py-0 ml-8">
          <img
            src="/images/logo-clean.png"
            alt="BALANX Logo"
            className="h-12 md:h-16 object-contain bg-transparent transition-opacity duration-500 hover:opacity-80 cursor-pointer brightness-0 invert"
          />
        </Link>

        {/* Navigation Links - Horizontal Layout */}
        <div className="hidden md:flex items-center space-x-6">
          <button
            onClick={() => handleNavigationClick('hero')}
            className="text-white font-extralight hover:text-light-green-400 transition-colors duration-200"
            style={{ fontFamily: "var(--font-agrandir-wide), Quicksand, sans-serif" }}
          >
            Home
          </button>
          <div className="w-1 h-1 bg-white/60 rounded-full"></div>
          <button
            onClick={() => handleNavigationClick('interactive-workflow')}
            className="text-white font-extralight hover:text-light-green-400 transition-colors duration-200"
            style={{ fontFamily: "var(--font-agrandir-wide), Quicksand, sans-serif" }}
          >
            About
          </button>
          <div className="w-1 h-1 bg-white/60 rounded-full"></div>
          <button
            onClick={() => handleNavigationClick('algorithm')}
            className="text-white font-extralight hover:text-light-green-400 transition-colors duration-200"
            style={{ fontFamily: "var(--font-agrandir-wide), Quicksand, sans-serif" }}
          >
            Our Algorithm
          </button>
          <div className="w-1 h-1 bg-white/60 rounded-full"></div>
          <button
            onClick={() => handleNavigationClick('affo-healthcare-page2')}
            className="text-white font-extralight hover:text-light-green-400 transition-colors duration-200"
            style={{ fontFamily: "var(--font-agrandir-wide), Quicksand, sans-serif" }}
          >
            Affo Healthcare
          </button>
          <div className="w-1 h-1 bg-white/60 rounded-full"></div>
          <button
            onClick={() => handleNavigationClick('affo-healthcare-page3')}
            className="text-white font-extralight hover:text-light-green-400 transition-colors duration-200"
            style={{ fontFamily: "var(--font-agrandir-wide), Quicksand, sans-serif" }}
          >
            Services
          </button>
          <div className="w-1 h-1 bg-white/60 rounded-full"></div>
          <button
            onClick={() => handleNavigationClick('contact')}
            className="text-white font-extralight hover:text-light-green-400 transition-colors duration-200"
            style={{ fontFamily: "var(--font-agrandir-wide), Quicksand, sans-serif" }}
          >
            Contact
          </button>
        </div>

        {/* Join the Waitlist Button */}
        <Link
          href="/pre-order"
          className="hidden md:inline-flex items-center px-6 py-2.5 bg-black/80 text-white font-extralight rounded-full hover:bg-black transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 backdrop-blur-sm mr-8"
          style={{ fontFamily: "var(--font-agrandir-wide), Quicksand, sans-serif" }}
        >
          Join the Waitlist
        </Link>

        {/* Mobile menu button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white hover:text-light-green-400 transition-colors duration-300 mr-8"
        >
          <div className={`w-8 h-px bg-current mb-2 transition-all duration-300 ${mobileMenuOpen ? 'transform rotate-45 translate-y-2.5' : ''}`}></div>
          <div className={`w-8 h-px bg-current mb-2 transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></div>
          <div className={`w-8 h-px bg-current transition-all duration-300 ${mobileMenuOpen ? 'transform -rotate-45 -translate-y-2.5' : ''}`}></div>
        </button>
      </div>

       {/* Mobile Menu Overlay */}
       {mobileMenuOpen && (
         <div className="fixed inset-0 z-50 flex flex-col items-center justify-center md:hidden" style={{ backgroundColor: '#000000', opacity: 1, backdropFilter: 'none' }}>
           {/* Close Button */}
           <button
             onClick={() => setMobileMenuOpen(false)}
             className="absolute top-4 right-8 text-white hover:text-green-400 transition-colors duration-300 z-10"
           >
             <div className="w-8 h-8 flex items-center justify-center">
               <div className="w-6 h-px bg-current transform rotate-45"></div>
               <div className="w-6 h-px bg-current transform -rotate-45 absolute"></div>
             </div>
           </button>
           
           <div className="flex flex-col items-center space-y-8 w-full px-8" style={{ backgroundColor: '#000000' }}>
            <button
              onClick={() => handleMobileNavigation('hero')}
              className="text-white text-2xl font-extralight hover:text-green-400 transition-colors duration-200 w-full py-4 border-b border-white/30 hover:bg-white/10 rounded-lg px-4"
              style={{ fontFamily: "var(--font-agrandir-wide), Quicksand, sans-serif", color: '#ffffff' }}
            >
              Home
            </button>
            <button
              onClick={() => handleMobileNavigation('interactive-workflow')}
              className="text-white text-2xl font-extralight hover:text-green-400 transition-colors duration-200 w-full py-4 border-b border-white/30 hover:bg-white/10 rounded-lg px-4"
              style={{ fontFamily: "var(--font-agrandir-wide), Quicksand, sans-serif", color: '#ffffff' }}
            >
              About
            </button>
            <button
              onClick={() => handleMobileNavigation('algorithm')}
              className="text-white text-2xl font-extralight hover:text-green-400 transition-colors duration-200 w-full py-4 border-b border-white/30 hover:bg-white/10 rounded-lg px-4"
              style={{ fontFamily: "var(--font-agrandir-wide), Quicksand, sans-serif", color: '#ffffff' }}
            >
              Our Algorithm
            </button>
            <button
              onClick={() => handleMobileNavigation('affo-healthcare-page2')}
              className="text-white text-2xl font-extralight hover:text-green-400 transition-colors duration-200 w-full py-4 border-b border-white/30 hover:bg-white/10 rounded-lg px-4"
              style={{ fontFamily: "var(--font-agrandir-wide), Quicksand, sans-serif", color: '#ffffff' }}
            >
              Affo Healthcare
            </button>
            <button
              onClick={() => handleMobileNavigation('affo-healthcare-page3')}
              className="text-white text-2xl font-extralight hover:text-green-400 transition-colors duration-200 w-full py-4 border-b border-white/30 hover:bg-white/10 rounded-lg px-4"
              style={{ fontFamily: "var(--font-agrandir-wide), Quicksand, sans-serif", color: '#ffffff' }}
            >
              Services
            </button>
            <button
              onClick={() => handleMobileNavigation('contact')}
              className="text-white text-2xl font-extralight hover:text-green-400 transition-colors duration-200 w-full py-4 border-b border-white/30 hover:bg-white/10 rounded-lg px-4"
              style={{ fontFamily: "var(--font-agrandir-wide), Quicksand, sans-serif", color: '#ffffff' }}
            >
              Contact
            </button>
            
            <Link
              href="/pre-order"
              className="mt-4 text-white text-2xl font-extralight hover:text-green-400 transition-colors duration-200 w-full py-4 border-b border-white/30 hover:bg-white/10 rounded-lg px-4 text-center"
              style={{ fontFamily: "var(--font-agrandir-wide), Quicksand, sans-serif", color: '#ffffff' }}
              onClick={() => setMobileMenuOpen(false)}
            >
              Join the Waitlist
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
