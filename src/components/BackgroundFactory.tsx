import type { Config } from '@/types'
import { lazy, Suspense } from 'react'

// Dynamically import background components
const AnimatedBackground = lazy(() => import('@/components/ui/animated-pattern'))
const DotPattern = lazy(() => import('@/components/ui/dot-pattern'))
const GridPattern = lazy(() => import('@/components/ui/grid-pattern'))
const FlickeringGridPattern = lazy(() => import('@/components/ui/flickering-grid-pattern'))
const AnimatedGridPattern = lazy(() => import('@/components/ui/animated-grid-pattern'))
const CustomBackground = lazy(() => import('@/components/ui/custom-background'))

type BackgroundType = Config['page']['background']
type CustomBackgroundType = Extract<BackgroundType, { type: string }>
type SimpleBackgroundType = Extract<BackgroundType, string>

const customBackgroundMap = {
  image: (bg: CustomBackgroundType) => (
    <CustomBackground preset={{ type: 'image', image: bg.value as string }} />
  ),
  color: (bg: CustomBackgroundType) => (
    <CustomBackground preset={{ type: 'color', color: bg.value as string }} />
  ),
  gradient: (bg: CustomBackgroundType) => (
    <CustomBackground preset={{ type: 'gradient', gradient: bg.value as { type: 'linear' | 'radial', colors: string[], direction: number } }} />
  ),
  custom: (bg: CustomBackgroundType) => (
    <CustomBackground customCSS={bg.value as Record<string, string>} />
  ),
}

const simpleBackgroundMap = {
  'animated': () => <AnimatedBackground />,
  'dot': () => <DotPattern />,
  'grid': () => <GridPattern />,
  'dashed-grid': () => <GridPattern strokeDasharray="4 2" />,
  'flickering-grid': () => <FlickeringGridPattern />,
  'animated-grid': () => <AnimatedGridPattern />,
}

function LoadingBackground() {
  return <div className="absolute inset-0 bg-background/50 backdrop-blur-xs" />
}

function renderCustomBackground(background: CustomBackgroundType) {
  const renderer = customBackgroundMap[background.type]
  return renderer ? renderer(background) : null
}

function renderSimpleBackground(background: SimpleBackgroundType) {
  if (background in simpleBackgroundMap) {
    const renderer = simpleBackgroundMap[background as keyof typeof simpleBackgroundMap]
    return renderer ? renderer() : null
  }
  return null
}

export function BackgroundFactory({
  background,
}: {
  background: BackgroundType
}) {
  if (!background || background === 'none') {
    return null
  }

  const content = typeof background === 'object'
    ? renderCustomBackground(background)
    : renderSimpleBackground(background)

  return (
    <Suspense fallback={<LoadingBackground />}>
      {content}
    </Suspense>
  )
}
