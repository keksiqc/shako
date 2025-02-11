import { memo, Suspense, lazy } from 'react'
import type { Config } from '@/types'
import { Button } from '@/components/ui/button'

// Lazy load the Icon component
const Icon = lazy(() => import('@iconify/react').then(mod => ({ default: mod.Icon })))

const handleButtonClick = (url: string) => {
  try {
    window.open(url, '_blank', 'noopener,noreferrer')
  } catch (error) {
    console.error('Failed to open URL:', error)
  }
}

function IconFallback() {
  return <div className="size-5 animate-pulse bg-muted rounded-sm" />
}

function ButtonContainerBase({ config }: { config: Config }) {
  return (
    <section className="flex flex-col gap-3" role="navigation" aria-label="Social Links">
      {/* icon buttons */}
      {config.iconButtons && config.iconButtons.length > 0 && (
        <div className="flex items-center justify-center gap-3">
          {config.iconButtons.map(button => (
            <Button
              variant="secondary"
              size="icon"
              onClick={() => handleButtonClick(button.url)}
              key={`${button.icon}-${button.url}`}
              aria-label={`Visit ${button.icon}`}
            >
              <Suspense fallback={<IconFallback />}>
                <Icon
                  icon={`simple-icons:${button.icon}`}
                  className="size-5"
                  aria-hidden="true"
                />
              </Suspense>
            </Button>
          ))}
        </div>
      )}

      {/* regular buttons */}
      {config.buttons && config.buttons.length > 0 && (
        <div className="flex flex-col gap-3">
          {config.buttons.map(button => (
            <Button
              variant="outline"
              size="xl"
              onClick={() => handleButtonClick(button.url)}
              key={`${button.name}-${button.url}`}
              aria-label={`Visit ${button.name}`}
            >
              <Suspense fallback={<IconFallback />}>
                <Icon 
                  icon={`simple-icons:${button.icon}`} 
                  className="mr-2 size-5"
                  aria-hidden="true"
                />
              </Suspense>
              {button.name}
            </Button>
          ))}
        </div>
      )}
    </section>
  )
}

// Memoize the component to prevent unnecessary re-renders
export const ButtonContainer = memo(ButtonContainerBase)
