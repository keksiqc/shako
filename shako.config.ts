import type { Config } from '@/types'

const config: Config = {
  page: {
    title: 'Shako - Keksi',
    footer: true,
    borderRadius: 0.5,
    background: 'flickering-grid',
  },
  user: {
    //* Setting name and avatar will override the Lanyard user data
    // name: 'Keksi',
    // avatar: 'https://avatars.githubusercontent.com/u/28254289?v=4',
    // bio: 'Software Engineer',
    discordId: '527147599942385674',
  },
  api: {
    //* Lanyard API URL (default: https://api.lanyard.rest/)
    lanyardUrl: 'https://api.lanyard.rest/',
  },
  links: {
    //* Social links (small buttons on the top)
    social: [
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
    //* Primary links (big buttons)
    primary: [
      {
        label: 'GitHub',
        icon: 'github',
        url: 'https://github.com/keksiqc',
      },
      {
        label: 'Discord',
        icon: 'discord',
        url: 'https://discord.com/users/527147599942385674',
      },
      {
        label: 'Twitter',
        icon: 'x',
        url: 'https://x.com/keksiqc',
      },
      {
        label: 'Bluesky',
        icon: 'bluesky',
        url: 'https://bsky.app/profile/keksi.dev',
      },
      {
        label: 'Steam',
        icon: 'steam',
        url: 'https://steamcommunity.com/id/keksiqc',
      },
      {
        label: 'AniList',
        icon: 'anilist',
        url: 'https://anilist.co/user/keksiqc',
      },
      {
        label: 'Trakt',
        icon: 'trakt',
        url: 'https://trakt.tv/users/keksiqc',
      },
    ],
  },

export default config
