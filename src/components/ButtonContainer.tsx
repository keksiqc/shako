import type { ParsedConfig } from '@/types'
import { Button } from '@/components/ui/button'
import { SocialIcon } from '@/components/ui/social-icon'

export function ButtonContainer({ config }: { config: ParsedConfig }) {
  return (
    <nav className="flex flex-col gap-3" aria-label="Social Links">
      {/* icon buttons */}
      {config.links.social && config.links.social.length > 0 && (
        <div className="flex items-center justify-center gap-3">
          {config.links.social.map(button => (
            <Button
              variant={button.style ?? 'secondary'}
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
      {config.links.primary && config.links.primary.length > 0 && (
        <div className="flex flex-col gap-3">
          {config.links.primary.map(button => (
            <Button
              variant={button.style ?? 'outline'}
              size={button.size ?? 'xl'}
              key={`${button.label}-${button.url}`}
              aria-label={`Visit ${button.label}`}
              asChild
            >
              <a href={button.url} target="_blank" rel="noopener noreferrer">
                <SocialIcon icon={button.icon} className="mr-2" />
                {button.label}
              </a>
            </Button>
          ))}
        </div>
      )}
    </nav>
  )
}
