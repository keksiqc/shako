# Shakō

Shakō: A sleek, modern linktree alternative built with Astro and React. It's designed to be easily customizable, self-hostable, and provides a modern look and feel for showcasing your links. An optional hosted version is available at [keksiqc/shako.me](https://github.com/keksiq/shako.me).

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

> [!NOTE]
> To integrate your Discord user data with Shakō, you must join the [Lanyard Discord Server](https://discord.gg/lanyard). Or specify your own Lanyard server in the `shako.config.ts` file.

## Usage

### Clone the repository

```bash
git clone https://github.com/keksiqc/shako

cd shako

bun install
bun run dev
```

### Edit the configuration

Edit the `shako.config.ts` file to add your links. This file allows you to configure your profile information, social links, and other settings.

The `icon` prop corresponds to the icon name from [Simple Icons](https://simpleicons.org/). Ensure the icon name matches exactly with the one listed on the Simple Icons website for proper rendering.

## Deployment

To deploy Shakō, follow these steps:

1.  Build the project: `bun run build`
2.  Deploy the `dist` directory to your preferred hosting platform.

> Please follow the official [Astro documentation](https://docs.astro.build/en/guides/deploy/) for detailed deployment instructions.

## License

Shakō is licensed under the GPL-3.0 License - see the [LICENSE file](./LICENSE) for details.

## Contributing

Contributions are welcome! If you'd like to contribute to Shakō, please follow these guidelines:

- Report bugs by opening an issue.
- Suggest new features by opening an issue.
- Submit pull requests with your changes.

For major changes, please open an issue first to discuss what you would like to change.
