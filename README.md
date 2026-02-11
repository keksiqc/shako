![Shakō](https://raw.githubusercontent.com/keksiqc/shako/main/.github/assets/banner.png)

# Shakō

Shakō: A sleek, modern linktree alternative built with Astro and React. It's designed to be easily customizable, self-hostable, and provides a modern look and feel for showcasing your links. An optional hosted version is available at [keksiqc/shako.me](https://github.com/keksiqc/shako.me).

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fkeksiqc%2Fshako&project-name=shako&repository-name=shako)

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/keksiqc/shako)

Key features:

- **Customizable:** Easily change the appearance and functionality to match your personal brand.
- **Self-hostable:** Deploy your linktree on your own server for complete control.
- **Modern design:** A clean and professional look that stands out.

## Tech stack

- Astro
- React
- Tailwind CSS
- Shadcn/UI
- Lanyard

## Quick Start

```sh
git clone https://github.com/keksiqc/shako
cd shako
bun install
bun run dev
```

## Configuration

All configuration is done through the `shako.config.ts` file. Here's a comprehensive guide to all available options:

### Page Configuration

```ts
page: {
  title: string,           // Page title shown in browser tab
  footer: boolean | string, // Show footer (true/false) or custom footer text
  borderRadius?: number,     // Border radius for UI elements (0-1, where 1 = full radius)
  background?: string | object, // Background style (see Background Options below)
  redirects?: Record<string, string> // Redirects for custom domains
}
```

#### Redirects
You can redirect paths to other URLs.
```ts
redirects: {
  '/discord': 'https://discord.gg/keksi',
}
```

#### Background Options

You can use predefined backgrounds or create custom ones:

**Predefined backgrounds:**
- `'dot'` - Dot pattern
- `'grid'` - Grid pattern
- `'dashed-grid'` - Dashed grid pattern
- `'flickering-grid'` - Flickering grid effect
- `'animated-grid'` - Animated grid pattern
- `'none'` - No background pattern

**Custom backgrounds:**
```ts
background: {
  type: 'image' | 'color' | 'gradient' | 'custom',
  value: string | GradientConfig | Record<string, string>
}
```

**Gradient example:**
```ts
background: {
  type: 'gradient',
  value: {
    type: 'linear' | 'radial',
    colors: ['#ff0000', '#00ff00', '#0000ff'],
    direction: 45 // degrees for linear gradients
  }
}
```

### User Configuration

```ts
user: {
  name?: string,        // Display name (overrides Discord username if set)
  avatar?: string,      // Avatar URL (overrides Discord avatar if set)
  bio?: string,         // Bio text (overrides Discord status if set)
  discordId: string     // Required: Your Discord user ID for Lanyard integration
}
```

**Note:** If `name` or `avatar` are not specified, Shakō will automatically fetch this information from Discord via Lanyard.

### API Configuration

```ts
api: {
  lanyardUrl: string // Lanyard API endpoint (default: 'https://api.lanyard.rest/')
}
```

### Links Configuration

#### Social Links
Small icon buttons displayed at the top of the page:

```ts
social?: [
  {
    icon: string,                    // Icon name (see supported icons below)
    url: string,                     // Link URL
    style?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  }
]
```

#### Primary Links
Large featured buttons for main links:

```ts
primary?: [
  {
    label: string,                   // Button text
    icon: string,                    // Icon name
    url: string,                     // Link URL
    style?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link',
    size?: 'default' | 'sm' | 'lg' | 'xl'
  }
]
```

### Supported Icons

See [Simple Icons](https://simpleicons.org) for a list of supported icons.

### Example Configuration

```ts
import type { Config } from '@/types'

const config: Config = {
  page: {
    title: 'My Links - John Doe',
    footer: true,
    borderRadius: 0.5,
    background: 'flickering-grid',
  },
  user: {
    discordId: '123456789012345678',
    // name: 'John Doe',          // Optional: Override Discord username
    // avatar: 'https://...',     // Optional: Override Discord avatar
    // bio: 'Software Engineer',  // Optional
  },
  api: {
    lanyardUrl: 'https://api.lanyard.rest',
  },
  links: {
    social: [
      { icon: 'github', url: 'https://github.com/johndoe' },
      { icon: 'x', url: 'https://x.com/johndoe' },
    ],
    primary: [
      {
        label: 'My Portfolio',
        icon: 'globe',
        url: 'https://johndoe.dev',
        style: 'default',
        size: 'xl'
      },
      {
        label: 'Contact Me',
        icon: 'mail',
        url: 'mailto:john@example.com',
        style: 'outline'
      }
    ],
  },
}

export default config
```

## Deployment

To deploy Shakō:

1. Build the project:
```sh
bun run build
```

2. Deploy the `dist` directory to your preferred hosting platform.

Follow the official [Astro deployment guide](https://docs.astro.build/en/guides/deploy/) for platform-specific instructions.

## License

Shakō is licensed under the GPL-3.0 License - see the [LICENSE file](./LICENSE) for details.

## Contributing

Contributions are welcome! Please follow these guidelines:

- Report bugs by opening an issue
- Suggest new features by opening an issue
- Submit pull requests with improvements

For major changes, please open an issue first to discuss what you would like to change.
