import type { Snowflake } from "use-lanyard"

interface IconButton {
  icon: string
  url: string
}

interface Button {
  name: string
  icon: string
  url: string
}

export interface Config {
  title: string
  discordID: Snowflake
  lanyardUrl: string
  iconButtons: IconButton[]
  buttons: Button[]
}
