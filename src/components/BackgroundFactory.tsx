import type { Config } from '@/types'
import { lazy, Suspense } from 'react'

// Dynamically import background components
const AnimatedBackground = lazy(() => import('@/components/ui/animated-pattern'))
const DotPattern = lazy(() => import('@/components/ui/dot-pattern'))
const GridPattern = lazy(() => import('@/components/ui/grid-pattern'))
const FlickeringGridPattern = lazy(() => import('@/components/ui/flickering-grid-pattern'))
const AnimatedGridPattern = lazy(() => import('@/components/ui/animated-grid-pattern'))
const CustomBackground = lazy(() => import('@/components/ui/custom-background'))

interface BackgroundFactoryProps extends Pick<Config, 'background'> {}

function LoadingBackground() {
  return <div className="absolute inset-0 bg-background/50 backdrop-blur-sm" />
}

export function BackgroundFactory({
  background,
}: BackgroundFactoryProps) {
  if (!background || background === 'none') {
    return null
  }

  return (
    <Suspense fallback={<LoadingBackground />}>
      {(() => {
        if (typeof background === 'object') {
          switch (background.type) {
            case 'image':
              return <CustomBackground preset={{ type: 'image', image: background.image }} />
            case 'color':
              return <CustomBackground preset={{ type: 'color', color: background.color }} />
            case 'gradient':
              return <CustomBackground preset={{ type: 'gradient', gradient: background.gradient }} />
            case 'custom':
              return <CustomBackground customCSS={background.customCSS} />
            default:
              return null
          }
        }

        switch (background) {
          case 'animated':
            return <AnimatedBackground />
          case 'dot':
            return <DotPattern />
          case 'grid':
            return <GridPattern />
          case 'dashed-grid':
            return <GridPattern strokeDasharray="4 2" />
          case 'flickering-grid':
            return <FlickeringGridPattern />
          case 'animated-grid':
            return <AnimatedGridPattern />
          default:
            return null
        }
      })()}
    </Suspense>
  )
}
