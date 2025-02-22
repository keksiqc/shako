import type { Config } from '@/types'
import { Button } from '@/components/ui/button'
import { SocialIcon } from '@/components/ui/social-icon'
import { memo } from 'react'

function ButtonContainerBase({ config }: { config: Config }) {
  const handleButtonClick = (url: string) => {
    try {
      window.open(url, '_blank', 'noopener,noreferrer')
    }
    catch (error) {
      console.error('Failed to open URL:', error)
    }
  }

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
              <SocialIcon icon={button.icon} />
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
              <SocialIcon icon={button.icon} className="mr-2" />
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
