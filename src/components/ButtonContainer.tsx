import config from "@/config"
import { Icon } from "@iconify/react"

import { Button } from "@/components/ui/button"

export function ButtonContainer() {
  return (
    <section className="flex flex-col gap-3">
      {/* icon buttons */}
      <div className="flex items-center justify-center gap-3">
        {config.iconButtons.map((button, index) => (
          <Button variant="secondary" size="icon" key={index}>
            <Icon
              icon={`simple-icons:${button.icon}`}
              className="size-5"
              aria-label={button.icon}
              key={index}
            />
          </Button>
        ))}
      </div>

      {/* buttons */}
      {config.buttons.map((button, index) => (
        <Button
          variant="outline"
          size="xl"
          onClick={() => window.open(button.url)}
          key={index}
          aria-label={button.name}
        >
          <Icon icon={`simple-icons:${button.icon}`} className="mr-2 size-5" />{" "}
          {button.name}
        </Button>
      ))}
    </section>
  )
}
