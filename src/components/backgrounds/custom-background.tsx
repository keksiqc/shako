import type { CSSProperties } from 'react'

interface CustomBackgroundProps {
  customCSS?: Record<string, string>
  preset?: {
    type: 'image' | 'color' | 'gradient'
    image?: string
    color?: string
    gradient?: {
      type: 'linear' | 'radial'
      colors: string[]
      angle?: number
    }
  }
}

export function CustomBackground({ customCSS, preset }: CustomBackgroundProps) {
  if (customCSS) {
    return (
      <div
        className="fixed inset-0 -z-20 size-full min-h-screen"
        style={customCSS as CSSProperties}
      />
    )
  }

  if (preset) {
    let style: CSSProperties = {}

    switch (preset.type) {
      case 'image':
        style = {
          backgroundImage: `url("${preset.image}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }
        break
      case 'color':
        style = {
          backgroundColor: preset.color,
        }
        break
      case 'gradient':
        if (preset.gradient) {
          const { type, colors, angle } = preset.gradient
          const gradientType = type === 'linear'
            ? `linear-gradient(${angle || 0}deg, ${colors.join(', ')})`
            : `radial-gradient(circle, ${colors.join(', ')})`
          style = {
            backgroundImage: gradientType,
          }
        }
        break
    }

    return (
      <div
        className="fixed inset-0 -z-20 size-full min-h-screen"
        style={style}
      />
    )
  }

  return null
}
