"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
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

export default function InteractiveWorkflow() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const stickyContainerRef = useRef<HTMLDivElement>(null)
  const [activeStep, setActiveStep] = useState(0) // State to track which step is active for styling

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
          {/* Descriptive text above timeline - separated from timeline elements */}
          <div className="mb-12 text-center">
            <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
              Understanding your body before symptoms appear through AI-driven analysis and personalized wellness solutions.
            </p>
          </div>

          {/* Mobile: Stack cards vertically, Desktop: Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Timeline line column (hidden on mobile, visible on desktop) */}
            <div className="hidden lg:block lg:col-span-1 relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gray-300"></div>
              {workflowSteps.map((step, index) => (
                <div key={`dot-${index}`} className="relative mb-32 last:mb-0">
                  <div className="absolute left-1/2 transform -translate-x-1/2 top-8">
                    <div
                      className={`w-4 h-4 rounded-full border-2 transition-all duration-500 ease-out ${
                        index === activeStep ? "bg-amber-500 border-amber-500 shadow-lg" : "bg-gray-600 border-gray-600"
                      }`}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Content column */}
            <div className="lg:col-span-11 space-y-8">
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
      </div>
      {/* Spacer to allow scrolling past the pinned content - balanced for proper visibility */}
      <div style={{ height: `${workflowSteps.length * 50}vh` }} className="hidden md:block w-full"></div>
      <div style={{ height: `${workflowSteps.length * 35}vh` }} className="md:hidden w-full spacer-mobile"></div>


    </section>
  )
}
