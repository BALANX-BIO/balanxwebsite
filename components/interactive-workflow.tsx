"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// Custom hook to detect desktop vs mobile/tablet
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const checkIsDesktop = () => {
      // Consider desktop as 1024px and above (lg breakpoint)
      setIsDesktop(window.innerWidth >= 1024)
    }

    checkIsDesktop()
    window.addEventListener('resize', checkIsDesktop)
    return () => window.removeEventListener('resize', checkIsDesktop)
  }, [])

  return isDesktop
}

const workflowSteps = [
  {
    number: 1,
    title: "Data Fetching",
    description: "Understanding your body before symptoms appear.",
  },
  {
    number: 2,
    title: "Predictive",
    description: "So you never had to wait for symptoms.",
  },
  {
    number: 3,
    title: "Personalized",
    description: "Tailoring solutions to your unique biological blueprint.",
  },
]

// Desktop Component - Exact main branch code
function DesktopInteractiveWorkflow() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const stickyContainerRef = useRef<HTMLDivElement>(null)
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!stickyContainerRef.current || !sectionRef.current) return

      // Calculate the total scroll duration needed for all steps to be fully visible
      // We'll give each step 1.5 times the viewport height for its transition
      const scrollDuration = window.innerHeight * workflowSteps.length * 1.5

      // Pin the main sticky container for the duration of the section
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${scrollDuration}`, // Dynamic scroll length based on steps
        pin: stickyContainerRef.current,
        scrub: true,
        pinSpacing: false,
      })

      // Use a single ScrollTrigger to update activeStep based on scroll progress
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${scrollDuration}`, // Match the pin's trigger end
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress // 0 to 1
          // Distribute the progress evenly across steps, ensuring the last step gets full activation
          const stepIndex = Math.min(workflowSteps.length - 1, Math.floor(progress * workflowSteps.length))
          setActiveStep(stepIndex)
        },
      })

      // Initial state for indicator dots (will be animated by activeStep change)
      gsap.set(".step-indicator-dot", { scale: 0.5, opacity: 0.5 })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      data-section="interactive-workflow"
      className="relative min-h-[550vh] flex flex-col items-center justify-start py-24 overflow-hidden"
      style={{
        background: "linear-gradient(to bottom, #d4c1a7 0%, #e8dccd 50%, #f8f5f0 100%)",
        marginTop: 0,
        marginBottom: 0
      }}
    >

      <div ref={stickyContainerRef} className="sticky top-0 w-full h-screen flex flex-col items-center justify-center relative z-10">
        <h1
          className="text-6xl md:text-8xl font-semibold text-center mb-16 drop-shadow-lg"
          style={{ color: "#1a1a1a" }}
        >
          {"What If Health Was ..."}
        </h1>

        <div className="relative w-full max-w-6xl mx-auto h-[calc(100%-10rem)] flex flex-col justify-around">
          {/* Central Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px" style={{ backgroundColor: "#333" }}></div>

          {workflowSteps.map((step, index) => (
            <div key={step.number} className="relative flex items-center w-full">
              {/* Left Side Content */}
              <div className="flex-1 flex justify-end pr-12">
                {index === 0 || index === 2 ? ( // Step 1 & 3: Description on left
                  <p
                    className="text-lg leading-relaxed max-w-md text-right"
                    style={{ color: "#333" }}
                  >
                    {step.description}
                  </p> // Step 2: Title on left
                ) : (
                  <div className="backdrop-blur-md rounded-xl shadow-lg border p-8 max-w-md text-right card-glow"
                       style={{ backgroundColor: "rgba(179, 131, 94, 0.3)", borderColor: "rgba(179, 131, 94, 0.5)" }}>
                    <p
                      className={`step-number-text text-2xl font-semibold mb-2 transition-colors duration-500 ${
                        index === activeStep ? "metallic-text-white" : ""
                      }`}
                      style={{ color: index === activeStep ? undefined : "#222" }}
                    >
                      {"Step "}
                      {step.number}
                    </p>
                    <h3
                      className="step-title-text text-4xl font-semibold"
                      style={{ color: "#222" }}
                    >
                      {step.title}
                    </h3>
                  </div>
                )}
              </div>

              {/* Step Indicator Dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                <div
                  className={`step-indicator-dot w-6 h-6 rounded-full border-2 transition-all duration-500 ease-out ${
                    index === activeStep ? "bg-gold-500 border-gold-500 shadow-lg" : "bg-gray-800 border-gray-600"
                  }`}
                ></div>
              </div>

              {/* Right Side Content */}
              <div className="flex-1 flex justify-start pl-12">
                {index === 0 || index === 2 ? ( // Step 1 & 3: Title on right
                  <div className="backdrop-blur-md rounded-xl shadow-lg border p-8 max-w-md text-left card-glow"
                       style={{ backgroundColor: "rgba(179, 131, 94, 0.3)", borderColor: "rgba(179, 131, 94, 0.5)" }}>
                    <p
                      className={`step-number-text text-2xl font-semibold mb-2 transition-colors duration-500 ${
                        index === activeStep ? "metallic-text-gold" : ""
                      }`}
                      style={{ color: index === activeStep ? undefined : "#222" }}
                    >
                      {"Step "}
                      {step.number}
                    </p>
                    <h3
                      className="step-title-text text-4xl font-semibold"
                      style={{ color: "#222" }}
                    >
                      {step.title}
                    </h3>
                  </div> // Step 2: Description on right
                ) : (
                  <p
                    className="text-lg leading-relaxed max-w-md text-left"
                    style={{ color: "#333" }}
                  >
                    {step.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Spacer to allow scrolling past the pinned content */}
      <div style={{ height: `${workflowSteps.length * 20}vh` }} className="w-full"></div>
    </section>
  )
}

// Mobile Component - Current branch code
function MobileInteractiveWorkflow() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const stickyContainerRef = useRef<HTMLDivElement>(null)
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!stickyContainerRef.current || !sectionRef.current) return

      const scrollDuration = window.innerHeight * workflowSteps.length * 1.5

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${scrollDuration}`,
        pin: stickyContainerRef.current,
        scrub: true,
        pinSpacing: false,
      })

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${scrollDuration}`,
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress
          const stepIndex = Math.min(workflowSteps.length - 1, Math.floor(progress * workflowSteps.length))
          setActiveStep(stepIndex)
        },
      })

      gsap.set(".step-indicator-dot", { scale: 0.5, opacity: 0.5 })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      data-section="interactive-workflow"
      className="relative min-h-[600vh] flex flex-col items-center justify-start py-12 overflow-hidden timeline-section-mobile -mt-[59vh]"
      style={{
        background: "linear-gradient(to bottom, #d4c1a7 0%, #e8dccd 50%, #f8f5f0 100%)",
        marginBottom: 0
      }}
    >
      <div ref={stickyContainerRef} className="sticky top-0 w-full h-screen flex flex-col items-center justify-start pt-16 relative z-10">
        <h1
          className="font-semibold text-center mb-8 md:mb-16 drop-shadow-lg px-4"
          style={{ 
            color: "#1a1a1a",
            fontSize: 'clamp(2rem, 4vw, 4rem)',
            lineHeight: '1.2'
          }}
        >
          What If Health Was ...
        </h1>

        <div className="relative w-full max-w-6xl mx-auto px-4">
          {/* Descriptive text above timeline - Mobile */}
          <div className="mb-12 text-center">
            <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
              Understanding your body before symptoms appear through AI-driven analysis and personalized wellness solutions.
            </p>
          </div>

          {/* Mobile: Stack cards vertically */}
          <div className="space-y-8">
            {workflowSteps.map((step, index) => (
              <div key={step.number} className="flex justify-center">
                {/* Complete Step Card with title AND description inside */}
                <div 
                  className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-amber-200/30 p-6 transition-all duration-300 hover:shadow-xl max-w-2xl w-full"
                  style={{
                    padding: "2rem",
                    wordWrap: "break-word",
                    backgroundColor: "rgba(255, 248, 240, 0.98)"
                  }}
                >
                  <div className="flex items-center mb-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4 ${
                      index === activeStep ? "bg-amber-500" : "bg-gray-600"
                    }`}>
                      {step.number}
                    </div>
                    <span className="text-sm font-medium text-amber-600 uppercase tracking-wide">
                      Step {step.number}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-lg leading-relaxed text-gray-700">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ height: `${workflowSteps.length * 5}vh` }} className="w-full spacer-mobile"></div>
    </section>
  )
}

// Main Export Component - Conditionally renders based on device
export default function InteractiveWorkflow() {
  const isDesktop = useIsDesktop()

  // Return desktop or mobile version based on screen size
  return isDesktop ? <DesktopInteractiveWorkflow /> : <MobileInteractiveWorkflow />
}