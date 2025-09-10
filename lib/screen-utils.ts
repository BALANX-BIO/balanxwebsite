// Screen size utilities for responsive percentage scaling
// iPhone 14 Pro Max reference: 430x932px

export const IPHONE_14_PRO_MAX = {
  width: 430,
  height: 932
}

export function getScreenRatio() {
  if (typeof window === 'undefined') return 1
  
  const currentWidth = window.innerWidth
  const currentHeight = window.innerHeight
  
  // Use width ratio for horizontal scaling, height ratio for vertical scaling
  const widthRatio = currentWidth / IPHONE_14_PRO_MAX.width
  const heightRatio = currentHeight / IPHONE_14_PRO_MAX.height
  
  return {
    width: widthRatio,
    height: heightRatio,
    // Use height ratio for most percentage movements since they're vertical
    primary: heightRatio
  }
}

export function scalePercentage(basePercentage: number, useWidth = false): number {
  const ratio = getScreenRatio()
  const scaleFactor = useWidth ? ratio.width : ratio.height
  return basePercentage * scaleFactor
}

export function getResponsiveValue(baseValue: number, unit = 'px', useWidth = false): string {
  const scaledValue = scalePercentage(baseValue, useWidth)
  return `${scaledValue}${unit}`
}

// Common responsive values based on iPhone 14 Pro Max
export const RESPONSIVE_VALUES = {
  // Video positioning (based on iPhone 14 Pro Max movements)
  videoPullDown: () => scalePercentage(-10), // -10% for iPhone 14 Pro Max
  videoLengthen: () => scalePercentage(20), // +20% height for iPhone 14 Pro Max
  
  // Section movements (based on iPhone 14 Pro Max movements)
  sectionMoveUp: (basePercentage: number) => scalePercentage(basePercentage), // e.g., -20% for AFFO Healthcare
  sectionMoveDown: (basePercentage: number) => scalePercentage(basePercentage), // e.g., +30% for "What If Health Was"
  
  // Button positioning
  buttonMoveDown: () => scalePercentage(-3), // -3vh for Join Waitlist button
  
  // Component sizing
  buttonScale: () => scalePercentage(85, true), // 85% scale for buttons
}
