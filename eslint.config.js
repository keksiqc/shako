import antfu from '@antfu/eslint-config'
import tailwindcss from 'eslint-plugin-better-tailwindcss'

export default antfu({
  formatters: true,
  astro: true,
}, {
  extends: [
    tailwindcss.configs.recommended,
  ],
  rules: {
    'better-tailwindcss/enforce-consistent-line-wrapping': 'off',

  },
  settings: {
    'better-tailwindcss': {
      entryPoint: 'src/styles/global.css',
    },
  },
})
