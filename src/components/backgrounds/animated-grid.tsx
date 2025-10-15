'use client'

import type {
  ComponentPropsWithoutRef,
} from 'react'
import { motion } from 'motion/react'

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react'
import { cn } from '@/lib/utils'

interface Square {
  id: string
  pos: [number, number]
}

export interface AnimatedGridPatternProps
  extends ComponentPropsWithoutRef<'svg'> {
  width?: number
  height?: number
  x?: number
  y?: number
  strokeDasharray?: any
  numSquares?: number
  maxOpacity?: number
  duration?: number
  repeatDelay?: number
}

export function AnimatedGrid({
  width = 40,
  height = 40,
  x = -1,
  y = -1,
  strokeDasharray = 0,
  numSquares = 50,
  className,
  maxOpacity = 0.1,
  duration = 4,
  ...props
}: AnimatedGridPatternProps) {
  const id = useId()
  const containerRef = useRef(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  const getPos = useCallback((): [number, number] => {
    return [
      Math.floor((Math.random() * dimensions.width) / width),
      Math.floor((Math.random() * dimensions.height) / height),
    ]
  }, [dimensions.width, dimensions.height, width, height])

  // Adjust the generateSquares function to return objects with an id, x, and y
  const generateSquares = useCallback((count: number): Square[] => {
    return Array.from({ length: count }, (_, i) => ({
      id: `${id}-square-${i}`,
      pos: getPos(),
    }))
  }, [getPos, id])

  const [squares, setSquares] = useState<Square[]>(() => generateSquares(numSquares))

  // Function to update a single square's position
  const updateSquarePosition = useCallback((id: string) => {
    setSquares((currentSquares: Square[]) =>
      currentSquares.map((sq: Square) =>
        sq.id === id
          ? {
              ...sq,
              pos: getPos(),
            }
          : sq,
      ),
    )
  }, [getPos])

  // Update squares to animate in
  useEffect(() => {
    if (dimensions.width && dimensions.height) {
      // TODO: Fix this
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSquares(generateSquares(numSquares))
    }
  }, [dimensions, numSquares, generateSquares])

  // Resize observer to update container dimensions
  useEffect(() => {
    const container = containerRef.current
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        })
      }
    })

    if (container) {
      resizeObserver.observe(container)
    }

    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  return (
    <svg
      ref={containerRef}
      aria-hidden="true"
      className={cn(
        'pointer-events-none fixed inset-0 z-[-1] size-full border fill-neutral-400/15 stroke-neutral-400/15',
        className,
      )}
      {...props}
    >
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path
            d={`M.5 ${height}V.5H${width}`}
            fill="none"
            strokeDasharray={strokeDasharray}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
      <svg x={x} y={y} className="overflow-visible">
        {squares.map(({ pos: [x, y], id }: Square, index: number) => (
          <motion.rect
            initial={{ opacity: 0 }}
            animate={{ opacity: maxOpacity }}
            transition={{
              duration,
              repeat: 1,
              delay: index * 0.1,
              repeatType: 'reverse',
            }}
            onAnimationComplete={() => updateSquarePosition(id)}
            key={id}
            width={width - 1}
            height={height - 1}
            x={x * width + 1}
            y={y * height + 1}
            fill="currentColor"
            strokeWidth="0"
          />
        ))}
      </svg>
    </svg>
  )
}
