import antfu from '@antfu/eslint-config'
import tailwind from 'eslint-plugin-tailwindcss'

export default antfu({
  stylistic: true,
  react: true,
  astro: true,
}, {
  settings: {
    tailwindcss: {
      callees: ['cn', 'cva'],
      config: 'tailwind.config.ts',
    },
  },
}, tailwind.configs['flat/recommended'])
