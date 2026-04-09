// eslint.config.js
import { antfu } from '@antfu/eslint-config'
import tailwindcss from 'eslint-plugin-better-tailwindcss'

export default antfu({
  ignores: ['README.md'],
  stylistic: true,
  react: true,
  astro: true,
}, {
  extends: [
    tailwindcss.configs.recommended,
  ],
  rules: {
    'better-tailwindcss/no-unknown-classes': 'off',
  },
  settings: {
    'better-tailwindcss': {
      entryPoint: 'src/styles/globals.css',
    },
  },
})
