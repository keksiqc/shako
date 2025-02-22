import type { Config } from '@/types'
import { lazy, Suspense } from 'react'

// Dynamically import background components
const AnimatedBackground = lazy(() => import('@/components/ui/animated-pattern'))
const DotPattern = lazy(() => import('@/components/ui/dot-pattern'))
const GridPattern = lazy(() => import('@/components/ui/grid-pattern'))

interface BackgroundFactoryProps {
  type: Config['background']
}

function LoadingBackground() {
  return <div className="absolute inset-0 bg-background/50 backdrop-blur-sm" />
}

export function BackgroundFactory({ type }: BackgroundFactoryProps) {
  if (!type || type === 'none') {
    return null
  }

  return (
    <Suspense fallback={<LoadingBackground />}>
      {(() => {
        switch (type) {
          case 'animated':
            return <AnimatedBackground />
          case 'dot':
            return <DotPattern />
          case 'grid':
            return <GridPattern />
          case 'dashed-grid':
            return <GridPattern strokeDasharray="4 2" />
          default:
            return null
        }
      })()}
    </Suspense>
  )
}
