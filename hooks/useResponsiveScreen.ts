import { useState, useEffect } from 'react'
import { getScreenRatio, scalePercentage, RESPONSIVE_VALUES } from '@/lib/screen-utils'

export function useResponsiveScreen() {
  const [screenRatio, setScreenRatio] = useState({ width: 1, height: 1, primary: 1 })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const updateScreenInfo = () => {
      const ratio = getScreenRatio()
      setScreenRatio(ratio)
      setIsMobile(window.innerWidth <= 768)
    }

    // Initial calculation
    updateScreenInfo()

    // Listen for resize events
    window.addEventListener('resize', updateScreenInfo)
    return () => window.removeEventListener('resize', updateScreenInfo)
  }, [])

  return {
    screenRatio,
    isMobile,
    scalePercentage,
    responsiveValues: RESPONSIVE_VALUES
  }
}
