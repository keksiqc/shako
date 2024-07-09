import type { Config } from "./types"

const config: Config = {
  title: "Shako - Keksi",
  discordId: "",
  lanyardUrl: "api.lanyard.rest",
  iconButtons: [
    {
      icon: "patreon",
      url: "https://patreon.com/keksi",
    },
    {
      icon: "buymeacoffee",
      url: "https://www.buymeacoffee.com/keksi",
    },
    {
      icon: "githubsponsors",
      url: "https://github.com/sponsors/keksiqc",
    },
  ],
  buttons: [
    {
      name: "GitHub",
      icon: "github",
      url: "https://github.com/keksiqc",
    },
    {
      name: "Discord",
      icon: "discord",
      url: "https://discord.com/users/527147599942385674",
    },
    {
      name: "Twitter",
      icon: "x",
      url: "https://x.com/keksiqc",
    },
    {
      name: "Steam",
      icon: "steam",
      url: "https://steamcommunity.com/id/keksiqc",
    },
    {
      name: "AniList",
      icon: "anilist",
      url: "https://anilist.co/user/keksiqc",
    },
  ],
}

export default config
