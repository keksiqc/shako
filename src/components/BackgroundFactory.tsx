import type { Config } from '@/types'
import { lazy, Suspense } from 'react'

// Dynamically import background components
const AnimatedBackground = lazy(() => import('@/components/ui/animated-pattern'))
const DotPattern = lazy(() => import('@/components/ui/dot-pattern'))
const GridPattern = lazy(() => import('@/components/ui/grid-pattern'))
const CustomBackground = lazy(() => import('@/components/ui/custom-background'))

interface BackgroundFactoryProps extends Pick<Config, 'background' |
  'backgroundImage' |
  'backgroundColor' |
  'backgroundGradient' |
  'customCSS'> {}

function LoadingBackground() {
  return <div className="absolute inset-0 bg-background/50 backdrop-blur-sm" />
}

export function BackgroundFactory({
  background,
  backgroundImage,
  backgroundColor,
  backgroundGradient,
  customCSS,
}: BackgroundFactoryProps) {
  if (!background || background === 'none') {
    return null
  }

  return (
    <Suspense fallback={<LoadingBackground />}>
      {(() => {
        switch (background) {
          case 'animated':
            return <AnimatedBackground />
          case 'dot':
            return <DotPattern />
          case 'grid':
            return <GridPattern />
          case 'dashed-grid':
            return <GridPattern strokeDasharray="4 2" />
          case 'image':
            return <CustomBackground preset={{ type: 'image', image: backgroundImage }} />
          case 'color':
            return <CustomBackground preset={{ type: 'color', color: backgroundColor }} />
          case 'gradient':
            return <CustomBackground preset={{ type: 'gradient', gradient: backgroundGradient }} />
          case 'custom':
            return <CustomBackground customCSS={customCSS} />
          default:
            return null
        }
      })()}
    </Suspense>
  )
}
