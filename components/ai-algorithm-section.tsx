"use client"

import { useEffect, useState, useRef } from "react"

export default function AIAlgorithmSection() {
  const [scrollY, setScrollY] = useState(0)
  const [sentenceIndex, setSentenceIndex] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        const sectionTop = rect.top + window.scrollY
        const relativeScrollY = Math.max(0, window.scrollY - sectionTop + window.innerHeight)
        setScrollY(relativeScrollY)
        // Update sentenceIndex based on relative scroll position
        const newSentenceIndex = Math.floor(relativeScrollY / 300)
        setSentenceIndex(newSentenceIndex)
      }
    }
    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initial call
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Calculate fade opacity based on scroll position - fixed version
  const getFadeOpacity = (startFade: number, endFade: number) => {
    if (scrollY < startFade) return 1
    if (scrollY > endFade) return 0.1 // Keep minimum visibility instead of 0
    return Math.max(0.1, 1 - (scrollY - startFade) / (endFade - startFade))
  }

  // Calculate slide and fade transform - fixed version
  const getTransform = (startFade: number, endFade: number, slideDistance = 50) => {
    const opacity = Math.max(0.3, getFadeOpacity(startFade, endFade)) // Ensure minimum opacity
    const translateY = Math.min(slideDistance, (1 - getFadeOpacity(startFade, endFade)) * slideDistance)
    return {
      opacity,
      transform: `translateY(${translateY}px)`,
      transition: "all 0.1s ease-out", // 进一步减少到 0.1s，让效果出现更快
    }
  }

  return (
    <section ref={sectionRef} data-section="algorithm" className="relative min-h-screen" style={{
      background: "linear-gradient(to bottom, #d4c1a7 0%, #e8dccd 50%, #f8f5f0 100%)"
    }}>

      {/* Scrollable Content */}
      <div className="relative z-10">
        <div>
          <HeroSection />
        </div>
        <div style={getTransform(2400, 3000)}>
          <StoryIntroduction sentenceIndex={sentenceIndex} relativeScrollY={scrollY} />
        </div>
        <div>
          <BiomarkerInputs />
        </div>
        <div>
          <AIBlackBox />
        </div>
        <div>
          <MicrobiomeResults />
        </div>
        <div>
          <CoffeeConfiguration />
        </div>
      </div>
    </section>
  )
}

function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/video/realMark.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/30" />
      <div className="text-center z-10 px-6 h-full flex flex-col items-center justify-center">
        <div className="rounded-3xl p-12 mb-12">
          <div className="w-24 h-24 mx-auto mb-8 rounded-full flex items-center justify-center animate-pulse backdrop-blur-sm shadow-2xl overflow-hidden">
            {/* Purple gradient background */}
            <div className="w-full h-full bg-gradient-to-r from-blue-400/90 via-purple-500/90 to-purple-700/90 flex items-center justify-center">
              {/* Two stylized human figures */}
              <svg className="w-12 h-12 text-purple-900" fill="currentColor" viewBox="0 0 24 24">
                {/* Left figure */}
                <path d="M8 6c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm-2 8c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2z"/>
                {/* Right figure */}
                <path d="M16 6c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm-2 8c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2z"/>
                {/* Connection between them */}
                <path d="M12 8c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2z"/>
              </svg>
            </div>
          </div>
          <div className="relative inline-block group">
            {/* Main container with glassmorphism */}
            <div className="bg-white/10 backdrop-blur-2xl rounded-[2rem] px-8 py-6 border border-white/20 shadow-2xl relative overflow-hidden">
              {/* Subtle inner glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 rounded-[2rem]"></div>
              
              {/* Content */}
              <h1 className="text-6xl font-bold text-white drop-shadow-lg relative z-10" style={{ fontFamily: "var(--font-agrandir-wide), Poppins, sans-serif" }}>
                Meet Sarah & Mark
              </h1>
            </div>
            
            {/* Outer glow ring */}
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-400/20 via-orange-400/20 to-amber-400/20 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition-all duration-1000 scale-110 group-hover:scale-100"></div>
            
            {/* Subtle border highlight */}
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-r from-amber-200/30 via-orange-200/30 to-amber-200/30 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
          </div>
        </div>
        
        <div className="inline-block bg-black/60 backdrop-blur-md rounded-2xl px-6 py-3 border border-white/20 animate-bounce">
          <div className="text-gray-300 drop-shadow-md">
            How our algorithm works
          </div>
        </div>
      </div>
    </section>
  )
}

function StoryIntroduction({ sentenceIndex, relativeScrollY }: { sentenceIndex: number; relativeScrollY: number }) {
  const scrollY = relativeScrollY

  const getElementFade = (delay: number) => {
    const adjustedScroll = Math.max(0, scrollY - 1200 - delay)
    return Math.max(0.8, 1 - adjustedScroll / 1500)
  }

  // Replace the getVisibleSentenceCount function with:
  const getSentenceOpacity = (sentenceIndex: number) => {
    const scrollThresholds = [
      { start: 600, end: 1000 }, // Sentence 1 - 增加间隔
      { start: 1000, end: 1400 }, // Sentence 2 - 增加间隔
      { start: 1050, end: 1450 }, // Sentence 3 - 再早一点
    ]

    const threshold = scrollThresholds[sentenceIndex]
    if (!threshold) return 0

    if (scrollY < threshold.start) return 0
    if (scrollY > threshold.end) return 1

    // Gradual fade in
    const progress = (scrollY - threshold.start) / (threshold.end - threshold.start)
    return Math.max(0, Math.min(1, progress))
  }

  const stories = [
    {
      text: "Sarah, a working mother striving to balance her career and family. Lately, the pressures of work and the exhaustion from caring for her children have left her ",
      emphasis: "physically and mentally drained",
      suffix: ".",
    },
    {
      text: "Her husband Mark, a ",
      emphasis: "type 2 diabetes patient",
      suffix: ", is facing the uncertainty of corporate layoffs. An ",
      emphasis2: "invisible anxiety",
      suffix2: " looms over the entire family.",
    },
    {
      text: "Sarah knows she must stay ",
      emphasis: "clear-headed and energized",
      suffix: " to face the challenges ahead. At the recommendation of a friend, she turned to ",
      emphasis2: "BALANX",
      suffix2: ", hoping for the first time to truly understand the signals her body is sending through the ",
      emphasis3: "power of technology",
      suffix3: ".",
    },
  ]

  return (
    <section className="min-h-screen flex items-start justify-center px-6 py-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-5 gap-16 items-center mb-20">
          <div
            className="lg:col-span-2"
            style={{
              opacity: getElementFade(0),
              transform: `translateX(${(1 - getElementFade(0)) * -50}px)`,
              transition: "all 0.4s ease-out",
            }}
          >
            <div className="relative">
              <div className="aspect-[4/3] bg-white/10 backdrop-blur-md rounded-3xl shadow-xl border border-white/20 overflow-hidden">
                <img 
                  src="/images/hug.jpg" 
                  alt="Sarah and Mark hug" 
                  className="w-full h-full object-cover"
                  style={{ objectPosition: "center 30%" }}
                />
              </div>
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-400/30 rounded-full blur-sm"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-purple-400/30 rounded-full blur-sm"></div>
            </div>
          </div>

          <div
            className="lg:col-span-3 space-y-8"
            style={{
              opacity: getElementFade(100),
              transform: `translateX(${(1 - getElementFade(100)) * 50}px)`,
              transition: "all 0.4s ease-out",
            }}
          >
            <div>
              <h2 className="text-5xl font-semibold text-white mb-6 leading-tight drop-shadow-lg">
                The Real-Life Struggle
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mb-8"></div>
            </div>

            {/* Show sentences progressively */}
            <div className="min-h-[280px] text-lg leading-relaxed space-y-4 bg-black/95 backdrop-blur-4xl rounded-2xl p-8 border border-white/20">
              {stories.map((story, index) => (
                <div
                  key={index}
                  className="transition-all duration-1000 ease-out"
                  style={{
                    opacity: getSentenceOpacity(index),
                    transform: `translateY(${(1 - getSentenceOpacity(index)) * 30}px)`,
                  }}
                >
                  <p className="text-gray-100 drop-shadow-md leading-relaxed">
                    {story.text}
                    <span className="font-extralight text-white bg-gradient-to-r from-blue-500/40 to-purple-500/40 px-3 rounded-md backdrop-blur-sm border border-white/20 py-px">
                      {story.emphasis}
                    </span>
                    {story.suffix}
                    {story.emphasis2 && (
                      <>
                        <span className="font-extralight text-yellow-100 bg-gradient-to-r from-yellow-500/40 to-orange-500/40 px-3 rounded-md backdrop-blur-sm border border-white/20 ml-1 mt-0 py-px">
                          {story.emphasis2}
                        </span>
                        {story.suffix2}
                      </>
                    )}
                    {story.emphasis3 && (
                      <>
                        <span className="font-extralight text-cyan-100 bg-gradient-to-r from-cyan-500/40 to-blue-500/40 rounded-md ml-1 backdrop-blur-sm border border-white/20 py-px px-3">
                          {story.emphasis3}
                        </span>
                        {story.suffix3}
                      </>
                    )}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Add space for scrolling */}
        <div className="h-[0vh]"></div>

        <div
          className="grid md:grid-cols-3 gap-8 mb-16"
          style={{
            opacity: getElementFade(1600),
            transform: `translateY(${(1 - getElementFade(1800)) * 50}px)`,
            transition: "all 0.6s ease-out",
          }}
        >
          {[
            {
              title: "Work Stress",
              icon: "sange1",
              items: ["Mark facing potential layoff", "Sarah's demanding deadlines", "Financial uncertainty"],
              bgColor: "bg-red-500/20",
              borderColor: "border-red-400/30",
              iconBg: "bg-transparent",
              iconColor: "text-amber-900",
              titleColor: "text-amber-900",
              textColor: "text-amber-900",
              dotColor: "bg-amber-900",
            },
            {
              title: "Family Life",
              icon: "sange2",
              items: ["Two kids under 8 years old", "Constant school activities", "No time for self-care"],
              bgColor: "bg-blue-500/20",
              borderColor: "border-blue-400/30",
              iconBg: "bg-transparent",
              iconColor: "text-amber-900",
              titleColor: "text-amber-900",
              textColor: "text-amber-900",
              dotColor: "bg-amber-900",
            },
            {
              title: "Health Concerns",
              icon: "sange3",
              items: ["Mark's Type 2 diabetes", "Sarah's chronic fatigue", "No time for doctor visits"],
              bgColor: "bg-purple-500/20",
              borderColor: "border-purple-400/30",
              iconBg: "bg-transparent",
              iconColor: "text-amber-900",
              titleColor: "text-amber-900",
              textColor: "text-amber-900",
              dotColor: "bg-amber-900",
            },
          ].map((card, index) => (
            <div
              key={card.title}
              className={`${card.bgColor} backdrop-blur-md rounded-3xl p-8 ${card.borderColor} hover:shadow-lg transition-all duration-300 border`}
            >
              <div className="flex items-center mb-6">
                <div
                  className={`w-12 h-12 ${card.iconBg} rounded-2xl flex items-center justify-center mr-4 backdrop-blur-sm overflow-hidden`}
                >
                  <img
                    src={`/images/${card.icon}.jpg`}
                    alt={`${card.title} icon`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className={`text-xl font-semibold ${card.titleColor} drop-shadow-md`}>{card.title}</h3>
              </div>
              <ul className={`${card.textColor} space-y-3 text-sm`}>
                {card.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-center">
                    <span className={`w-1.5 h-1.5 ${card.dotColor} rounded-full mr-3`}></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="text-center bg-white/10 backdrop-blur-md rounded-3xl p-10 border border-white/20"
          style={{
            opacity: getElementFade(2000),
            transform: `translateY(${(1 - getElementFade(1800)) * 50}px)`,
            transition: "all 0.6s ease-out",
          }}
        >
          <h3 className="text-3xl font-semibold text-amber-900 mb-6 drop-shadow-lg" style={{ fontFamily: "var(--font-agrandir-wide), Quicksand, sans-serif" }}>Sound Familiar?</h3>
          <p className="text-amber-900 text-lg leading-relaxed max-w-5xl mx-auto drop-shadow-md" style={{ fontFamily: "var(--font-agrandir-wide), Quicksand, sans-serif" }}>
            Like millions of working people, Sarah and Mark are caught in the endless cycle of responsibilities. They
            need a solution that fits into their chaotic schedule - something simple, personalized, and effective.
          </p>
        </div>
      </div>
    </section>
  )
}

function BiomarkerInputs() {
  const biomarkers = [
    {
      name: "Bifidobacterium longum",
      value: "Decreased Activity",
      status: "Insufficient",
      image: "/images/bifidobacterium_longum.png",
      color: "from-purple-400 to-purple-600",
      concern: "Key for Mood Stability",
    },
    {
      name: "Lactobacillus rhamnosus",
      value: "Decreased Activity",
      status: "Stress Imbalance",
      image: "/images/lactobacilius_rhamnosus.png",
      color: "from-blue-400 to-blue-600",
      concern: "Body's Stress Regulator",
    },
    {
      name: "Faecalibacterium prausnitzii",
      value: "Decreased",
      status: "Low Power",
      image: "/images/faecalibacterium prausnitzii.png",
      color: "from-green-400 to-green-600",
      concern: "Gut's Core Energy Factory",
    },
    {
      name: "Akkermansia muciniphila",
      value: "Decreased",
      status: "Weakened Barrier",
      image: "/images/akkermansia_mucinlphila.png",
      color: "from-teal-400 to-teal-600",
      concern: "Metabolism & Barrier Guardian",
    },
    {
      name: "Alistipes spp.",
      value: "Increased",
      status: "Overgrowth",
      image: "/images/alistipes_spp..png",
      color: "from-gray-400 to-orange-500",
      concern: "Linked to Persistent Fatigue",
    },
    {
      name: "F/B Ratio",
      value: "Imbalanced",
      status: "Dysbiosis",
      image: "/images/FB_ratio.png",
      color: "from-orange-400 to-orange-600",
      concern: "Overall Gut Wellness",
    },
  ]

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-semibold text-amber-900 mb-6 drop-shadow-lg inline-block px-8 py-6 rounded-2xl bg-gradient-to-r from-amber-50/40 via-white/30 to-amber-50/40 backdrop-blur-xl shadow-2xl border border-amber-200/50 hover:shadow-3xl hover:border-amber-300/70 transition-all duration-500" style={{ fontFamily: "var(--font-agrandir-wide), Quicksand, sans-serif" }}>Sarah's Microbiome Analysis</h2>
          <p className="text-xl text-amber-900 drop-shadow-md" style={{ fontFamily: "var(--font-agrandir-wide), Quicksand, sans-serif" }}>Detected by BALANX's Advanced Microbiome Analysis</p>
        </div>

        <div className="relative">
          {/* Biomarker Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16 relative z-10">
            {biomarkers.map((biomarker, index) => (
              <div key={biomarker.name} className="relative group">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <div
                    className={`w-16 h-16 rounded-full bg-gradient-to-r ${biomarker.color} flex items-center justify-center mb-4 mx-auto shadow-lg relative z-20 overflow-hidden`}
                  >
                    <img 
                      src={biomarker.image} 
                      alt={biomarker.name} 
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-amber-900 mb-2 text-center drop-shadow-md" style={{ fontFamily: "var(--font-agrandir-wide), Quicksand, sans-serif" }}>{biomarker.name}</h3>
                  <p className="text-lg text-amber-900 text-center font-mono mb-1" style={{ fontFamily: "var(--font-agrandir-wide), Quicksand, sans-serif" }}>{biomarker.value}</p>
                  <p className="text-sm text-amber-900 text-center font-extralight mb-2" style={{ fontFamily: "var(--font-agrandir-wide), Quicksand, sans-serif" }}>({biomarker.status})</p>
                  <p className="text-sm text-amber-900 text-center italic" style={{ fontFamily: "var(--font-agrandir-wide), Quicksand, sans-serif" }}>{biomarker.concern}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Enhanced Particle Stream System */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Main convergence streams from each card */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 800">
              <defs>
                {/* Multiple gradient definitions for variety */}
                <linearGradient id="stream-gradient-1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(34, 211, 238, 0.8)" />
                  <stop offset="50%" stopColor="rgba(59, 130, 246, 1)" />
                  <stop offset="100%" stopColor="rgba(99, 102, 241, 0.6)" />
                </linearGradient>
                <linearGradient id="stream-gradient-2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(16, 185, 129, 0.8)" />
                  <stop offset="50%" stopColor="rgba(34, 211, 238, 1)" />
                  <stop offset="100%" stopColor="rgba(59, 130, 246, 0.6)" />
                </linearGradient>
                <linearGradient id="stream-gradient-3" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(168, 85, 247, 0.8)" />
                  <stop offset="50%" stopColor="rgba(236, 72, 153, 1)" />
                  <stop offset="100%" stopColor="rgba(59, 130, 246, 0.6)" />
                </linearGradient>
              </defs>

              {/* Curved paths from each biomarker card to center */}
              {biomarkers.map((_, index) => {
                const positions = [
                  { x: 167, y: 150 }, // Top left
                  { x: 500, y: 150 }, // Top center
                  { x: 833, y: 150 }, // Top right
                  { x: 167, y: 350 }, // Bottom left
                  { x: 500, y: 350 }, // Bottom center
                  { x: 833, y: 350 }, // Bottom right
                ]

                const start = positions[index]
                const centerX = 500
                const centerY = 500

                // Create curved path
                const controlX = (start.x + centerX) / 2
                const controlY = start.y < centerY ? start.y + 100 : start.y - 50

                const pathData = `M ${start.x} ${start.y} Q ${controlX} ${controlY} ${centerX} ${centerY}`

                return (
                  <g key={index}>
                    {/* Main stream path */}
                    <path
                      d={pathData}
                      stroke={`url(#stream-gradient-${(index % 3) + 1})`}
                      strokeWidth="3"
                      fill="none"
                      opacity="0.6"
                      className="animate-pulse"
                      style={{ animationDelay: `${index * 0.3}s` }}
                    />

                    {/* Multiple flowing particles per path */}
                    {[...Array(8)].map((_, particleIndex) => (
                      <circle
                        key={particleIndex}
                        r={particleIndex % 2 === 0 ? "4" : "2"}
                        fill={
                          particleIndex % 3 === 0
                            ? "rgba(34, 211, 238, 0.9)"
                            : particleIndex % 3 === 1
                              ? "rgba(16, 185, 129, 0.9)"
                              : "rgba(168, 85, 247, 0.9)"
                        }
                        opacity="0.8"
                      >
                        <animateMotion
                          dur={`${3 + particleIndex * 0.5}s`}
                          repeatCount="indefinite"
                          begin={`${index * 0.4 + particleIndex * 0.3}s`}
                          path={pathData}
                        />
                        <animate
                          attributeName="opacity"
                          values="0;1;1;0"
                          dur={`${3 + particleIndex * 0.5}s`}
                          repeatCount="indefinite"
                          begin={`${index * 0.4 + particleIndex * 0.3}s`}
                        />
                      </circle>
                    ))}

                    {/* Additional sparkle particles */}
                    {[...Array(5)].map((_, sparkleIndex) => (
                      <circle key={`sparkle-${sparkleIndex}`} r="1" fill="rgba(255, 255, 255, 0.8)">
                        <animateMotion
                          dur={`${2 + sparkleIndex * 0.2}s`}
                          repeatCount="indefinite"
                          begin={`${index * 0.2 + sparkleIndex * 0.4}s`}
                          path={pathData}
                        />
                        <animate
                          attributeName="opacity"
                          values="0;1;0"
                          dur={`${2 + sparkleIndex * 0.2}s`}
                          repeatCount="indefinite"
                          begin={`${index * 0.2 + sparkleIndex * 0.4}s`}
                        />
                      </circle>
                    ))}
                  </g>
                )
              })}

              {/* Additional ambient particles floating around */}
              {[...Array(20)].map((_, index) => (
                <circle
                  key={`ambient-${index}`}
                  r={Math.random() * 2 + 1}
                  fill={`rgba(${Math.random() * 100 + 100}, ${Math.random() * 100 + 200}, 255, ${Math.random() * 0.5 + 0.3})`}
                  cx={Math.random() * 1000}
                  cy={Math.random() * 800}
                >
                  <animate
                    attributeName="cy"
                    values={`${Math.random() * 800};${Math.random() * 800};${Math.random() * 800}`}
                    dur={`${Math.random() * 10 + 5}s`}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.3;0.8;0.3"
                    dur={`${Math.random() * 3 + 2}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              ))}
            </svg>
          </div>

          {/* Enhanced AI Processing Indicator */}
          <div className="flex justify-center items-center relative z-20 mt-8">
            <div className="relative">
              {/* Outer energy rings */}
              <div className="absolute inset-0 w-32 h-32 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
                <div
                  className="absolute inset-0 rounded-full border-2 border-cyan-400/20 animate-spin"
                  style={{ animationDuration: "8s" }}
                ></div>
                <div
                  className="absolute inset-2 rounded-full border border-blue-500/30 animate-spin"
                  style={{ animationDuration: "6s", animationDirection: "reverse" }}
                ></div>
                <div
                  className="absolute inset-4 rounded-full border border-purple-500/20 animate-spin"
                  style={{ animationDuration: "4s" }}
                ></div>
              </div>

              {/* Main processing unit */}
              <div className="relative bg-black/70 backdrop-blur-md rounded-2xl border border-cyan-400/40 shadow-2xl p-8">
                <div className="flex items-center space-x-6">
                  {/* Enhanced pulsing core */}
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg shadow-cyan-400/50 relative z-10">
                      <span className="text-4xl text-white animate-pulse">🧠</span>
                    </div>

                    {/* Multiple ripple effects */}
                    <div className="absolute inset-0 rounded-full border-2 border-cyan-400/40 animate-ping"></div>
                    <div
                      className="absolute inset-0 rounded-full border border-blue-500/30 animate-ping"
                      style={{ animationDelay: "0.5s" }}
                    ></div>
                    <div
                      className="absolute inset-0 rounded-full border border-purple-500/20 animate-ping"
                      style={{ animationDelay: "1s" }}
                    ></div>

                    {/* Particle burst effect */}
                    {[...Array(12)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                        style={{
                          left: "50%",
                          top: "50%",
                          transform: `rotate(${i * 30}deg) translateY(-40px)`,
                          animation: `particleBurst 2s ease-out infinite`,
                          animationDelay: `${i * 0.1}s`,
                        }}
                      />
                    ))}
                  </div>

                  <div className="text-left">
                    <span className="text-white font-mono text-xl drop-shadow-md block mb-3">
                      AI analyzing microbiome &amp; lifestyle patterns...
                    </span>

                    {/* Enhanced data flow indicators */}
                    <div className="flex space-x-1 mb-2">
                      {[...Array(12)].map((_, i) => (
                        <div
                          key={i}
                          className="w-2 h-2 rounded-full animate-pulse"
                          style={{
                            backgroundColor: `hsl(${180 + i * 15}, 70%, 60%)`,
                            animationDelay: `${i * 0.15}s`,
                            animationDuration: "1.5s",
                          }}
                        />
                      ))}
                    </div>

                    {/* Processing status bars */}
                    <div className="space-y-1">
                      {[
                        "Biomarkers Analyzing",
                        "Microbiome Composition Scan",
                        "Metabolic Pathway Mapping",
                        "Nutrient Synthesis Profile",
                      ].map((process, index) => (
                        <div key={process} className="flex items-center space-x-2">
                          <span className="text-xs text-gray-300 w-46">{process}</span>
                          <div className="w-16 h-1 bg-gray-700 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-pulse"
                              style={{
                                width: `${60 + index * 30}%`,
                                animation: `progressBar 3s ease-in-out infinite`,
                                animationDelay: `${index * 0.5}s`,
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced CSS Animations */}
      <style jsx>{`
        @keyframes particleBurst {
          0% { 
            opacity: 0;
            transform: rotate(var(--rotation)) translateY(-20px) scale(0);
          }
          50% { 
            opacity: 1;
            transform: rotate(var(--rotation)) translateY(-40px) scale(1);
          }
          100% { 
            opacity: 0;
            transform: rotate(var(--rotation)) translateY(-60px) scale(0);
          }
        }
        
        @keyframes progressBar {
          0%, 100% { width: 20%; }
          50% { width: 90%; }
        }
      `}</style>
    </section>
  )
}

function AIBlackBox() {
  const [displayedLines, setDisplayedLines] = useState<string[]>([])
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(false)

  const codeStream = [
    "Initializing BALANX Microbiome AI...",
            "Loading health profile [Sarah & Mark]...",
    "Parsing gut flora data sample [ID: sm7c3b0d]...",
    "stress_signature_score = 0.89 # Low Bifido & Lacto detected",
    "metabolic_strain_index = 0.76 # Imbalanced F/B Ratio",
    "energy_synthesis_marker = 'LOW' # Low F. prausnitzii",
    "Processing gut-brain axis signals...",
    "Analyzing family lifestyle impact...",
    "if stress_signature_score > 0.8 and metabolic_strain_index > 0.7:",
    "    needs_flags = ['MOOD_SUPPORT', 'ANTI_INFLAMMATION']",
    "    energy_support = True",
    "Calculating personalized nutrient matrix...",
    "module.L-Theanine = calculate_for('MOOD_SUPPORT')",
    "module.Omega3_D3 = calculate_for('ANTI_INFLAMMATION')",
    "module.Adaptogens = calculate_for('ENERGY_SUPPORT')",
    "Generating personalized wellness blend...",
            "final_config = optimize_for_busy_lifestyle(Sarah, Mark)",
    "Analysis Complete.",
  ]

  useEffect(() => {
    if (currentLineIndex >= codeStream.length) {
      const resetTimer = setTimeout(() => {
        setDisplayedLines([])
        setCurrentLineIndex(0)
        setCurrentCharIndex(0)
      }, 6688)

      return () => clearTimeout(resetTimer)
    }

    setIsTyping(true)
    const currentLine = codeStream[currentLineIndex]

    if (currentCharIndex < currentLine.length) {
      const timer = setTimeout(
        () => {
          setDisplayedLines((prev) => {
            const newLines = [...prev]
            if (newLines[currentLineIndex]) {
              newLines[currentLineIndex] = currentLine.substring(0, currentCharIndex + 1)
            } else {
              newLines[currentLineIndex] = currentLine.substring(0, currentCharIndex + 1)
            }
            return newLines
          })
          setCurrentCharIndex((prev) => prev + 1)
        },
        Math.random() * 50 + 30,
      )
      return () => clearTimeout(timer)
    } else {
      const timer = setTimeout(() => {
        setCurrentLineIndex((prev) => prev + 1)
        setCurrentCharIndex(0)
        setIsTyping(false)
      }, 800)
      return () => clearTimeout(timer)
    }
  }, [currentLineIndex, currentCharIndex, codeStream])

  const getLineColor = (line: string) => {
    if (!line) return "text-emerald-400"
    if (line.includes("#")) return "text-slate-400"
    if (line.includes("=")) return "text-blue-400"
    if (line.includes("if") || line.includes("def")) return "text-purple-400"
    if (line.includes("True") || line.includes("False")) return "text-amber-400"
    return "text-emerald-400"
  }

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-12">
          <h2 className="text-4xl font-semibold text-amber-900 mb-6 drop-shadow-lg inline-block px-8 py-6 rounded-2xl bg-gradient-to-r from-amber-50/40 via-white/30 to-amber-50/40 backdrop-blur-xl shadow-2xl border border-amber-200/50 hover:shadow-3xl hover:border-amber-300/70 transition-all duration-500" style={{ fontFamily: "var(--font-agrandir-wide), Quicksand, sans-serif" }}>AI Understanding Their Life</h2>
          <p className="text-xl text-amber-900 drop-shadow-md font-light" style={{ fontFamily: "var(--font-agrandir-wide), Quicksand, sans-serif" }}>
            Advanced algorithms recognize the patterns of modern family stress
          </p>
        </div>

        <div className="bg-black/30 backdrop-blur-md rounded-3xl p-0 shadow-2xl border border-white/20 max-w-4xl mx-auto overflow-hidden">
          {/* Terminal Header */}
          <div className="flex items-center justify-between px-8 py-6 bg-gradient-to-r from-slate-800/80 to-slate-900/80 border-b border-slate-700/50 backdrop-blur-sm">
            <div className="flex items-center space-x-4">
              <div className="flex space-x-3">
                <div className="w-3 h-3 bg-red-400 rounded-full shadow-lg"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full shadow-lg"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full shadow-lg"></div>
              </div>
              <span className="text-slate-300 text-sm font-extralight">BALANX Family AI Terminal</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50"></div>
              <span className="text-emerald-400 text-sm font-extralight">ACTIVE</span>
            </div>
          </div>

          {/* Terminal Content */}
          <div className="px-8 py-8 bg-gradient-to-br from-slate-900/60 via-slate-800/60 to-slate-900/60 min-h-[400px] backdrop-blur-sm">
            <div className="text-left font-mono text-base leading-relaxed space-y-3">
              {displayedLines.map((line, index) => (
                <div key={index} className={`${getLineColor(line)} transition-all duration-300`}>
                  <span className="text-cyan-400 select-none mr-2">{"❯"}</span>
                  <span>{line}</span>
                  {index === currentLineIndex && isTyping && (
                    <span className="text-white animate-pulse ml-1 font-extralight">|</span>
                  )}
                </div>
              ))}

              {currentLineIndex < codeStream.length && displayedLines.length === currentLineIndex && (
                <div className="text-emerald-400">
                  <span className="text-cyan-400 select-none mr-2">{"❯"}</span>
                  <span className="text-white animate-pulse font-extralight">|</span>
                </div>
              )}
            </div>

            {/* Progress Section */}
            <div className="mt-6 pt-4 border-t border-slate-700/50">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                <span>
                  Processing: {Math.min(currentLineIndex + 1, codeStream.length)}/{codeStream.length}
                </span>
                <div className="flex space-x-1">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-1 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-pulse"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    ></div>
                  ))}
                </div>
              </div>
              <div className="w-full bg-slate-700/50 rounded-full h-1 mt-2">
                <div
                  className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 h-1 rounded-full transition-all duration-300 ease-out shadow-lg shadow-blue-500/30"
                  style={{ width: `${(Math.min(currentLineIndex + 1, codeStream.length) / codeStream.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function MicrobiomeResults() {
  const stressFactors = [
    "Chronic work pressure affecting gut health",
    "Irregular meal times due to busy schedule",
    "Fast food consumption increasing inflammation",
    "Sleep disruption from kids affecting recovery",
  ]

  const healthOpportunities = [
    "Vitamin D3 & Omega-3 for gut-linked inflammation",
    "Targeted probiotics for stress management",
    "Adaptogens to balance the gut-brain axis",
    "Prebiotic fiber to nourish beneficial flora",
  ]

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-semibold text-amber-900 mb-6 drop-shadow-lg inline-block px-8 py-6 rounded-2xl bg-gradient-to-r from-amber-50/40 via-white/30 to-amber-50/40 backdrop-blur-xl shadow-2xl border border-amber-200/50 hover:shadow-3xl hover:border-amber-300/70 transition-all duration-500" style={{ fontFamily: "var(--font-agrandir-wide), Quicksand, sans-serif" }}>Lifestyle Impact Analysis</h2>
          <p className="text-xl text-amber-900 drop-shadow-md font-light" style={{ fontFamily: "var(--font-agrandir-wide), Quicksand, sans-serif" }}>
            AI reveals how modern life is affecting Sarah & Mark's health
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-red-500/20 backdrop-blur-md rounded-2xl p-8 border border-red-400/30">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-red-500/40 rounded-full flex items-center justify-center mr-4 backdrop-blur-sm">
                <span className="text-4xl">⚠️</span>
              </div>
              <h3 className="text-2xl font-semibold text-amber-900 drop-shadow-md">Stress Factors</h3>
            </div>
            <div className="space-y-4">
              {stressFactors.map((factor, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-4 shadow-sm border border-white/20"
                >
                  <span className="text-amber-900">{factor}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-green-500/20 backdrop-blur-md rounded-2xl p-8 border border-green-400/30">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-green-500/40 rounded-full flex items-center justify-center mr-4 backdrop-blur-sm">
                <span className="text-4xl">✨</span>
              </div>
              <h3 className="text-2xl font-semibold text-amber-900 drop-shadow-md">Solutions</h3>
            </div>
            <div className="space-y-4">
              {healthOpportunities.map((opportunity, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-4 shadow-sm border border-white/20"
                >
                  <span className="text-amber-900">{opportunity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 text-center bg-blue-500/20 backdrop-blur-md rounded-2xl p-8 border border-blue-400/30">
          <h4 className="text-xl font-semibold text-amber-900 mb-4 drop-shadow-md">AI Insight</h4>
          <p className="text-amber-900 leading-relaxed font-light">
            The analysis shows classic patterns of modern family stress manifesting as a significant gut microbiome
            imbalance. Sarah and Mark need targeted nutritional support that addresses this root cause, fitting
            seamlessly into your busy lifestyle.
          </p>
        </div>
      </div>
    </section>
  )
}

function CoffeeConfiguration() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-semibold text-amber-900 mb-6 drop-shadow-lg inline-block px-8 py-6 rounded-2xl bg-gradient-to-r from-amber-50/40 via-white/30 to-amber-50/40 backdrop-blur-xl shadow-2xl border border-amber-200/50 hover:shadow-3xl hover:border-amber-300/70 transition-all duration-500" style={{ fontFamily: "var(--font-agrandir-wide), Quicksand, sans-serif" }}>Sarah & Mark's Daily Healthcare Blend</h2>
          <p className="text-xl text-amber-900 max-w-3xl mx-auto drop-shadow-md mb-4 ml-auto px-1 py-1 rounded-lg border-transparent bg-transparent opacity-100 font-light" style={{ fontFamily: "var(--font-agrandir-wide), Quicksand, sans-serif" }}>
            AI-selected nutrients and flavors to restore balance to your busy lives
          </p>
          <div className="text-lg text-white font-extralight px-4 py-3 rounded-lg my-0 mx-28 md:mx-28 max-md:mx-8 bg-slate-700/90 backdrop-blur-sm border border-slate-600/50" style={{ fontFamily: "var(--font-agrandir-wide), Quicksand, sans-serif" }}>
            Based on your microbiome analysis, the AI has selected the optimal flavor and nutrient combination from the<br />{" "}
            <span className="text-white font-extralight" style={{ fontFamily: "var(--font-agrandir-wide), Quicksand, sans-serif" }}>Calm & Focus Mind & Body Balance Series</span>
          </div>
        </div>

        {/* Main Layout: Coffee Cup in Center, Cards Around */}
        <div className="relative">
          {/* Central Artistic Coffee Cup */}
          <div className="flex justify-center mb-16">
            <div className="relative">
              {/* Enhanced Coffee Cup Design */}
              <div className="w-96 h-96 relative">
                {/* Outer Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 via-orange-400/30 to-amber-400/20 rounded-full blur-3xl"></div>

                {/* Cup Container */}
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                  {/* Cup Body */}
                  <div className="relative w-64 h-80">
                    {/* Main Cup Shape */}
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-48 h-56 bg-gradient-to-b from-slate-100/90 via-slate-200/80 to-slate-300/70 rounded-b-[3rem] rounded-t-lg border-2 border-white/40 shadow-2xl backdrop-blur-sm">
                      {/* Coffee Liquid */}
                      <div className="absolute top-3 left-2 right-2 bottom-2 bg-gradient-to-b from-amber-700/90 via-amber-800/95 to-amber-900/90 rounded-b-[2.5rem] rounded-t-sm shadow-inner">
                        {/* Coffee Surface with Foam */}
                        <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-radial from-amber-200/80 via-amber-300/70 to-amber-400/60 rounded-t-sm">
                    
                        </div>

                        {/* Floating Nutrient Particles - Added mouse hover tooltips */}
                        {[...Array(15)].map((_, i) => (
                          // 1. Create a relatively positioned group container for each particle to expand hover area
                          <div key={i} className="absolute group cursor-pointer z-50" style={{
                              left: `${50 + Math.cos(i * 0.8) * 18}%`,
                              top: `${40 + Math.sin(i * 0.8) * 15}%`,
                              width: '20px',
                              height: '20px',
                              transform: 'translate(-50%, -50%)'
                          }}>
                            {/* This is the original particle Div, centered display */}
                            <div
                              className="w-1.5 h-1.5 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                              style={{
                                backgroundColor: `hsl(${120 + i * 25}, 70%, 60%)`,
                                animation: `floatParticle 6s ease-in-out infinite`,
                                animationDelay: `${i * 0.4}s`,
                                boxShadow: `0 0 8px hsl(${120 + i * 25}, 70%, 60%)`,
                              }}
                            />
                            
                            {/* 2. Add tooltip */}
                            <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-max px-4 py-2 bg-gradient-to-r from-purple-600/95 via-blue-600/95 to-cyan-600/95 text-white text-xs font-extralight rounded-xl shadow-2xl backdrop-blur-md border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-105 pointer-events-none z-[100]">
                              <div className="flex items-center space-x-2">
                                <span className="animate-pulse">✨</span>
                                <span>Personalized Nutrients & Flavor</span>
                                <span className="animate-pulse">✨</span>
                              </div>
                              {/* Small triangle arrow */}
                              <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-purple-600/95"></div>
                            </div>
                          </div>
                        ))}

                      </div>

                      {/* Cup Rim Highlight */}
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-white/60 via-white/80 to-white/60 rounded-t-lg"></div>
                    </div>

                    {/* Cup Handle */}
                    <div className="absolute -right-4 top-28 w-14 h-24 border-[10px] border-slate-200/70 rounded-r-full bg-transparent shadow-lg"></div>

                    {/* Saucer */}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-56 h-8 bg-gradient-to-r from-slate-200/60 via-slate-100/80 to-slate-200/60 rounded-full border border-white/30 shadow-xl backdrop-blur-sm"></div>

                    {/* Steam Animation */}
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      {[...Array(6)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute opacity-70"
                          style={{
                            left: `${i * 6 - 15}px`,
                            width: "2px",
                            height: "40px",
                            background: "linear-gradient(to top, rgba(255,255,255,0.8), transparent)",
                            borderRadius: "2px",
                            animation: `steam 4s ease-in-out infinite`,
                            animationDelay: `${i * 0.4}s`,
                          }}
                        />
                      ))}
                    </div>

                    {/* Magical Aura */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/10 via-purple-400/10 to-blue-400/10 animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Base Drink Configuration Section */}
          <div className="mb-16">
            <div className="text-center">
              <h3 className="text-3xl font-semibold text-amber-900 mb-8 inline-block px-6 py-4 rounded-2xl bg-gradient-to-r from-amber-50/40 via-white/30 to-amber-50/40 backdrop-blur-xl shadow-2xl border border-amber-200/50 hover:shadow-3xl hover:border-amber-300/70 transition-all duration-500" style={{ fontFamily: "var(--font-agrandir-wide), Quicksand, sans-serif" }}>Base Drink Configuration</h3>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Caffeine",
                  amount: "85 mg",
                  description: "A gentle energy boost to combat fatigue without the crash",
                  color: "from-yellow-400 to-orange-500",
                  image: "/images/coffee.jpg",
                },
                {
                  title: "Sugar",
                  amount: "Zero Sugar",
                  description: "Recommended to maintain stable blood sugar, considering Mark's health profile",
                  color: "from-green-400 to-emerald-500",
                  image: "/images/haohao.jpg",
                },
                {
                  title: "Milk",
                  amount: "Oat Milk, 60 ml",
                  description: "Provides a smooth, sustained energy release",
                  color: "from-amber-400 to-orange-500",
                  image: "/images/milk.jpg",
                },
                {
                  title: "Water",
                  amount: "180 ml",
                  description: "Ensures foundational hydration while delivering key nutrients",
                  color: "from-blue-400 to-cyan-500",
                  image: "/images/water.jpg",
                },
              ].map((item, index) => (
                <div
                  key={`base-${index}`}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <div className="flex items-center mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mr-4 shadow-md overflow-hidden`}
                    >
                      {item.title === "Caffeine" && (
                        <img 
                          src="/images/coffee.jpg" 
                          alt="Coffee" 
                          className="w-full h-full object-cover rounded-xl"
                        />
                      )}
                      {item.title === "Sugar" && (
                        <img 
                          src="/images/haohao.jpg" 
                          alt="Sugar" 
                          className="w-full h-full object-cover rounded-xl"
                        />
                      )}
                      {item.title === "Milk" && (
                        <img 
                          src="/images/milk.jpg" 
                          alt="Milk" 
                          className="w-full h-full object-cover rounded-xl"
                        />
                      )}
                      {item.title === "Water" && (
                        <img 
                          src="/images/water.jpg" 
                          alt="Water" 
                          className="w-full h-full object-cover rounded-xl"
                        />
                      )}
                    </div>
                    <div>
                      <h4 className="text-amber-900 font-semibold text-lg" style={{ fontFamily: "var(--font-agrandir-wide), Quicksand, sans-serif" }}>{item.title}</h4>
                      <p className="text-amber-900 text-sm font-mono" style={{ fontFamily: "var(--font-agrandir-wide), Quicksand, sans-serif" }}>{item.amount}</p>
                    </div>
                  </div>
                  <p className="text-amber-900 text-sm leading-relaxed" style={{ fontFamily: "var(--font-agrandir-wide), Quicksand, sans-serif" }}>{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Personalized Nutrients & Flavor Section */}
          <div className="text-center">
            <h3 className="text-3xl font-semibold text-amber-900 text-center mb-8 inline-block px-6 py-4 rounded-2xl bg-gradient-to-r from-amber-50/40 via-white/30 to-amber-50/40 backdrop-blur-xl shadow-2xl border border-amber-200/50 hover:shadow-3xl hover:border-amber-300/70 transition-all duration-500" style={{ fontFamily: "var(--font-agrandir-wide), Quicksand, sans-serif" }}>Personalized Nutrients & Flavor</h3>
            <div className="max-w-7xl mx-auto">
              {/* Top Row - 3 boxes */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 justify-items-center">
                {[
                  {
                    title: "Flavor Tank",
                    subtitle: "Yuzu Rosemary",
                    description:
                      "Mental clarity, fatigue relief. A bright, herbal blend designed to cut through mental fog and restore focus to your day",
                    background: "/images/wu1.png",
                  },
                  {
                    title: "Omega-3",
                    subtitle: "500 mg (from Algae Oil)",
                    description: "Supports brain health and combats inflammation linked to gut dysbiosis",
                    background: "/images/wu2.png",
                  },
                  {
                    title: "L-Theanine",
                    subtitle: "150 mg",
                    description:
                      "Works with caffeine to provide a state of calm focus, buffering the stress response identified by your analysis",
                    background: "/images/wu3.png",
                  },
                ].map((item, index) => (
                  <div
                    key={`nutrient-top-${index}`}
                    className="rounded-3xl p-6 border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 overflow-hidden h-full flex flex-col w-full max-w-sm"
                    style={{
                      backgroundImage: `url(${item.background})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat'
                    }}
                  >
                    <div className="flex items-start mb-4 flex-1">
                      <div className="flex-1">
                        <h4 className="text-white font-semibold text-lg mb-2" style={{ fontFamily: "var(--font-agrandir-wide), Quicksand, sans-serif" }}>{item.title}</h4>
                        <p className="text-white text-sm font-light mb-3" style={{ fontFamily: "var(--font-agrandir-wide), Quicksand, sans-serif" }}>{item.subtitle}</p>
                      </div>
                    </div>
                    <p className="text-white text-sm leading-relaxed font-light mt-auto" style={{ fontFamily: "var(--font-agrandir-wide), Quicksand, sans-serif" }}>{item.description}</p>
                  </div>
                ))}
              </div>
              
              {/* Bottom Row - 2 boxes centered */}
              <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12 max-w-4xl mx-auto">
                {[
                  {
                    title: "Stress Resilience Complex",
                    subtitle: "Magnesium & B-Complex",
                    description:
                      "Essential nutrients for nervous system support, helping to improve mood and restore energy levels depleted by chronic stress",
                    background: "/images/wu4.png",
                  },
                  {
                    title: "Microbiome Support",
                    subtitle: "Polyphenols + Soluble Fiber",
                    description:
                      "Each flavor tank contains ingredients to nourish beneficial gut bacteria, addressing the root cause of imbalance",
                    background: "/images/wu5.png",
                  },
                ].map((item, index) => (
                  <div
                    key={`nutrient-bottom-${index}`}
                    className="rounded-2xl p-4 sm:p-6 border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 overflow-hidden h-full flex flex-col w-full max-w-sm relative"
                    style={{
                      backgroundImage: `url(${item.background})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat'
                    }}
                  >
                    {/* Semi-transparent overlay for better text readability */}
                    <div className="absolute inset-0 bg-black/40 rounded-2xl"></div>
                    
                    <div className="relative z-10 flex items-start mb-4 flex-1">
                      <div className="flex-1">
                        <h4 className="text-white font-semibold text-lg mb-2" style={{ fontFamily: "var(--font-agrandir-wide), Quicksand, sans-serif" }}>{item.title}</h4>
                        <p className="text-white text-sm font-light mb-3" style={{ fontFamily: "var(--font-agrandir-wide), Quicksand, sans-serif" }}>{item.subtitle}</p>
                      </div>
                    </div>
                    <p className="text-white text-sm leading-relaxed font-light mt-auto relative z-10" style={{ fontFamily: "var(--font-agrandir-wide), Quicksand, sans-serif" }}>{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>


        </div>
      </div>

      {/* Enhanced CSS Animations */}
      <style jsx>{`
        @keyframes steam {
          0% { 
            opacity: 0.8;
            transform: translateY(0px) scale(1) rotate(0deg);
          }
          33% { 
            opacity: 0.6;
            transform: translateY(-15px) scale(1.1) rotate(2deg);
          }
          66% { 
            opacity: 0.3;
            transform: translateY(-25px) scale(1.2) rotate(-1deg);
          }
          100% { 
            opacity: 0;
            transform: translateY(-40px) scale(0.8) rotate(1deg);
          }
        }
        
        @keyframes floatParticle {
          0%, 100% { 
            transform: translateY(0px) scale(1);
            opacity: 0.8;
          }
          50% { 
            transform: translateY(-10px) scale(1.1);
            opacity: 1;
          }
        }
      `}</style>
    </section>
  )
} 