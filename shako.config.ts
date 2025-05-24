import type { Config } from '@/types'

const config: Config = {
  title: 'Shako - Keksi',
  // Optional: Override Lanyard user data with custom values if you don't want to use Lanyard
  user: {
    // name: "Keksi",
    // avatar: "https://avatars.githubusercontent.com/u/28254289?v=4",
    // description: "Software Engineer",
  },
  discordID: '527147599942385674', // Discord user ID for Lanyard integration (can be omitted if 'user' is defined)
  lanyardUrl: 'api.lanyard.rest/', // Custom Lanyard API URL (optional, for self-hosted instances)
  borderRadius: 0.5, // Border radius (default: 0.5, recommended: 0, 0.3, 0.5, 0.75, 1)
  background: 'flickering-grid', // Background style (default: 'none') [dot, grid, dashed-grid, flickering-grid, animated-grid, animated, none]
  footer: true, // Whether to show the footer (default: true)
  // footer: 'Made with Heart', // Custom footer text (optional)
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
      name: 'Bluesky',
      icon: 'bluesky',
      url: 'https://bsky.app/profile/keksi.dev',
    },
    {
      name: 'Steam',
      icon: 'steam',
      url: 'https://steamcommunity.com/id/keksiqc',
    },
    {
      name: 'AniList',
      icon: 'anilist',
      url: 'https://anilist.co/user/keksi',
    },
    {
      name: 'Trakt',
      icon: 'trakt',
      url: 'https://trakt.tv/users/keksiqc',
    },
  ],
} as const

export default config
