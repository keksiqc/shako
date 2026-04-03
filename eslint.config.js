// eslint.config.js
import { antfu } from '@antfu/eslint-config'
import tailwindcss from 'eslint-plugin-better-tailwindcss'

export default antfu({
  stylistic: true,
  react: true,
  astro: true,
}, {
  extends: [
    tailwindcss.configs.recommended,
  ],
  settings: {
    'better-tailwindcss': {
      entryPoint: 'src/styles/global.css',
    },
  },
})
