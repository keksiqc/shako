import type { Config } from '@/types'
import { Button } from '@/components/ui/button'
import { SocialIcon } from '@/components/ui/social-icon'
import { memo } from 'react'

function ButtonContainerBase({ config }: { config: Config }) {
  return (
    <nav className="flex flex-col gap-3" aria-label="Social Links">
      {/* icon buttons */}
      {config.iconButtons && config.iconButtons.length > 0 && (
        <div className="flex items-center justify-center gap-3">
          {config.iconButtons.map(button => (
            <Button
              variant={button.variant ?? 'secondary'}
              size="icon"
              key={`${button.icon}-${button.url}`}
              aria-label={`Visit ${button.icon}`}
              asChild
            >
              <a href={button.url} target="_blank" rel="noopener noreferrer">
                <SocialIcon icon={button.icon} />
              </a>
            </Button>
          ))}
        </div>
      )}

      {/* regular buttons */}
      {config.buttons && config.buttons.length > 0 && (
        <div className="flex flex-col gap-3">
          {config.buttons.map(button => (
            <Button
              variant={button.variant ?? 'outline'}
              size={button.size ?? 'xl'}
              key={`${button.name}-${button.url}`}
              aria-label={`Visit ${button.name}`}
              asChild
            >
              <a href={button.url} target="_blank" rel="noopener noreferrer">
                <SocialIcon icon={button.icon} className="mr-2" />
                {button.name}
              </a>
            </Button>
          ))}
        </div>
      )}
    </nav>
  )
}

// Memoize the component to prevent unnecessary re-renders
export const ButtonContainer = memo(ButtonContainerBase)
