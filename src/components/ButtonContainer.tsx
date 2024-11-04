import { Button } from '@/components/ui/button'
import type { Config } from '@/types'
import { Icon } from '@iconify/react'

export function ButtonContainer({ config }: { config: Config }) {
  return (
    <section className="flex flex-col gap-3">
      {/* icon buttons */}
      <div className="flex items-center justify-center gap-3">
        {config.iconButtons?.map(button => (
          <Button
            variant="secondary"
            size="icon"
            onClick={() => window.open(button.url)}
            key={`${button.icon}-${button.url}`}
          >
            <Icon
              icon={`simple-icons:${button.icon}`}
              className="size-5"
              aria-label={button.icon}
            />
          </Button>
        ))}
      </div>

      {/* buttons */}
      {config.buttons?.map(button => (
        <Button
          variant="outline"
          size="xl"
          onClick={() => window.open(button.url)}
          key={`${button.name}-${button.url}`}
          aria-label={button.name}
        >
          <Icon icon={`simple-icons:${button.icon}`} className="mr-2 size-5" />
          {' '}
          {button.name}
        </Button>
      ))}
    </section>
  )
}
