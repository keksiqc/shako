![Shakō](https://raw.githubusercontent.com/keksiqc/shako/main/.github/banner.png)

# Shakō

Shakō: A sleek, modern linktree alternative built with Astro and React. It's designed to be easily customizable, self-hostable, and provides a modern look and feel for showcasing your links. An optional hosted version is available at [keksiqc/shako.me](https://github.com/keksiq/shako.me).

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fkeksiqc%2Fshako&project-name=shako&repository-name=shako)

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

```bash
git clone https://github.com/keksiqc/shako
cd shako
bun install
bun run dev
```

## Configuration

All configuration is done through the `shako.config.ts` file. Here's a comprehensive guide to all available options:

### Basic Configuration

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `title` | `string` | `'Shako'` | The title of your page |
| `background` | `'dot' \| 'grid' \| 'dashed-grid' \| 'animated' \| 'none'` | `'none'` | Background pattern style |
| `footer` | `boolean \| string` | `true` | Show default footer or set custom text |

### User Data Configuration

You can configure user data in two ways:

1. **Using Lanyard** (Discord integration):
```typescript
const config: Config = {
  discordID: '527147599942385674', // Your Discord user ID
  lanyardUrl: 'api.lanyard.rest/', // Optional: Custom Lanyard API URL
}
```

2. **Custom User Data**:
```typescript
const config: Config = {
  user: {
    name: "Your Name",
    avatar: "https://example.com/avatar.png",
    description: "Your Description"
  }
}
```

> [!NOTE]
> To use Lanyard integration, you must join the [Lanyard Discord Server](https://discord.gg/lanyard). Alternatively, you can specify your own Lanyard server in the `lanyardUrl` option.

### Button Configuration

Shakō supports two types of buttons:

1. **Icon Buttons** (Small circular buttons, typically for donation/support links):
```typescript
iconButtons: [
  {
    icon: 'patreon',
    url: 'https://patreon.com/username'
  },
  {
    icon: 'buymeacoffee',
    url: 'https://buymeacoffee.com/username'
  }
]
```

2. **Regular Buttons** (Full-width buttons with icon and text):
```typescript
buttons: [
  {
    name: 'GitHub',
    icon: 'github',
    url: 'https://github.com/username'
  },
  {
    name: 'Twitter',
    icon: 'x',
    url: 'https://x.com/username'
  }
]
```

The `icon` property in both button types uses icons from [Simple Icons](https://simpleicons.org/). Make sure to use the exact icon name as listed on their website.

### Background Styles

The `background` option supports five different styles:

- `'dot'`: Subtle dot pattern
- `'grid'`: Regular grid pattern
- `'dashed-grid'`: Dashed grid pattern
- `'animated'`: Animated gradient pattern
- `'none'`: No background pattern (default)

### Footer Configuration

The footer can be configured in two ways:

```typescript
// Show default footer
footer: true

// Custom footer text
footer: 'Made with ❤️ by Your Name'

// Hide footer
footer: false
```

### Complete Example Configuration

```typescript
const config: Config = {
  title: 'My Linktree',
  user: {
    name: 'John Doe',
    avatar: 'https://example.com/avatar.png',
    description: 'Software Developer'
  },
  background: 'animated',
  footer: 'Made with ❤️',
  iconButtons: [
    {
      icon: 'githubsponsors',
      url: 'https://github.com/sponsors/username'
    }
  ],
  buttons: [
    {
      name: 'Portfolio',
      icon: 'github',
      url: 'https://github.com/username'
    },
    {
      name: 'Twitter',
      icon: 'x',
      url: 'https://x.com/username'
    }
  ]
}
```

## Deployment

To deploy Shakō:

1. Build the project:
```bash
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
