import type { Snowflake } from 'use-lanyard'

interface IconButton {
  icon: string
  url: string
}

interface Button {
  name: string
  icon: string
  url: string
}

interface User {
  name: string
  avatar: string
}

export interface Config {
  title: string
  user?: User
  discordID?: Snowflake
  lanyardUrl?: string
  iconButtons?: IconButton[]
  buttons?: Button[]
}
