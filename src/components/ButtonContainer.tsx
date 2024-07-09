import config from "@/config"
import { Icon } from "@iconify/react"

import { Button } from "@/components/ui/button"

export function ButtonContainer() {
  return (
    <section className="flex flex-col gap-3">
      {/* icon buttons */}
      <div className="flex items-center justify-center gap-3">
        {config.iconButtons.map((button) => (
          <Button variant="secondary" size="icon">
            <Icon icon={`simple-icons:${button.icon}`} className="size-5" />
          </Button>
        ))}
      </div>

      {/* buttons */}
      {config.buttons.map((button) => (
        <Button
          variant="outline"
          size="xl"
          onClick={() => window.open(button.url)}
        >
          <Icon icon={`simple-icons:${button.icon}`} className="mr-2 size-5" />{" "}
          {button.name}
        </Button>
      ))}
    </section>
  )
}
