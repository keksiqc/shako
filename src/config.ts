import type { Config } from './types'

const config: Config = {
  title: 'Shako - Keksi',
  // Optional: Override Lanyard user data with custom values if you don't want to use Lanyard
  // user: {
  //   name: "Keksi",
  //   avatar: "https://cdn.discordapp.com/avatars/527147599942385674/32a37325c4d3098a37e8f078707de99a.webp?size=256",
  // },
  discordID: '527147599942385674', // Discord user ID for Lanyard integration (can be omitted if 'user' is defined)
  lanyardUrl: 'api.lanyard.rest', // Custom Lanyard API URL (optional, for self-hosted instances) (WIP)
  iconButtons: [
    {
      icon: 'patreon',
      url: 'https://patreon.com/keksi',
    },
    {
      icon: 'buymeacoffee',
      url: 'https://www.buymeacoffee.com/keksi',
    },
    {
      icon: 'githubsponsors',
      url: 'https://github.com/sponsors/keksiqc',
    },
  ],
  buttons: [
    {
      name: 'GitHub',
      icon: 'github',
      url: 'https://github.com/keksiqc',
    },
    {
      name: 'Discord',
      icon: 'discord',
      url: 'https://discord.com/users/527147599942385674',
    },
    {
      name: 'Twitter',
      icon: 'x',
      url: 'https://x.com/keksiqc',
    },
    {
      name: 'Steam',
      icon: 'steam',
      url: 'https://steamcommunity.com/id/keksiqc',
    },
    {
      name: 'AniList',
      icon: 'anilist',
      url: 'https://anilist.co/user/keksiqc',
    },
    {
      name: 'Trakt',
      icon: 'trakt',
      url: 'https://trakt.tv/users/keksiqc'
    },
    {
      name: 'Hetzner Cloud',
      icon: 'hetzner',
      url: 'https://hetzner.cloud/?ref=iccx7cMZHWlx',
    },
  ],
}

export default config
