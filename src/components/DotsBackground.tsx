import { p5i } from 'p5i'
import React, { useEffect, useMemo, useRef } from 'react'

/**
 * Dots Background Effect
 *
 * This component creates an animated background with moving dots.
 * The effect is inspired by and adapted from Anthony Fu's personal website.
 *
 * Original source: https://github.com/antfu/antfu.me
 *
 * Modified and integrated into this project with appreciation to Anthony Fu's work.
 */

const SCALE = 200
const LENGTH = 10
const SPACING = 15

interface Point {
  x: number
  y: number
  opacity: number
}

export function WaveBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  // Memoize the p5i functions to avoid recreating them on each render
  const p5Functions = useMemo(() => p5i(), [])

  useEffect(() => {
    if (!containerRef.current)
      return

    const {
      mount,
      unmount,
      createCanvas,
      background,
      noFill,
      stroke,
      noise,
      noiseSeed,
      resizeCanvas,
      cos,
      sin,
      TWO_PI,
      circle,
    } = p5Functions

    let w = window.innerWidth
    let h = window.innerHeight
    let offsetY = window.scrollY

    const existingPoints = new Set<string>()
    const points: Point[] = []

    function getForceOnPoint(x: number, y: number, z: number) {
      return (noise(x / SCALE, y / SCALE, z) - 0.5) * 2 * TWO_PI
    }

    function addPoints() {
      for (let x = -SPACING / 2; x < w + SPACING; x += SPACING) {
        for (let y = -SPACING / 2; y < h + offsetY + SPACING; y += SPACING) {
          const id = `${x}-${y}`
          if (existingPoints.has(id))
            continue
          existingPoints.add(id)
          points.push({ x, y, opacity: Math.random() * 0.5 + 0.5 })
        }
      }
    }

    function setup() {
      createCanvas(w, h)
      background('#ffffff')
      stroke('#ccc')
      noFill()

      noiseSeed(+new Date())

      addPoints()
    }

    function draw() {
      // Update offsetY inside draw to reflect current scroll position
      offsetY = window.scrollY
      background('#ffffff')
      const t = +new Date() / 10000

      for (const p of points) {
        const { x, y } = p
        const rad = getForceOnPoint(x, y, t)
        const length = (noise(x / SCALE, y / SCALE, t * 2) + 0.5) * LENGTH
        const nx = x + cos(rad) * length
        const ny = y + sin(rad) * length
        stroke(200, 200, 200, (Math.abs(cos(rad)) * 0.8 + 0.2) * p.opacity * 255)
        circle(nx, ny - offsetY, 1)
      }
    }

    function restart() {
      if (containerRef.current)
        mount(containerRef.current, { setup, draw })
    }

    restart()

    const handleResize = () => {
      w = window.innerWidth
      h = window.innerHeight
      resizeCanvas(w, h)
      addPoints()
    }

    window.addEventListener('resize', handleResize)

    // Add scroll event listener to update offsetY
    const handleScroll = () => {
      offsetY = window.scrollY
    }
    window.addEventListener('scroll', handleScroll)

    return () => {
      unmount()
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [p5Functions])

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-[-1] dark:invert"
    />
  )
}
