import keksiqc from '@keksiqc/eslint-config'

export default keksiqc({
  formatters: true,
  react: true,
  astro: true,
  tailwind: true,
}, {
  settings: {
    tailwind: {
      callees: ['cn', 'cva'],
      config: 'tailwind.config.ts',
    },
  },
})
