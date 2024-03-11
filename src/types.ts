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
  discordId: string
  lanyardUrl: string
  iconButtons: IconButton[]
  buttons: Button[]
}
