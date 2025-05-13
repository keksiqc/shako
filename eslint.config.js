import antfu from '@antfu/eslint-config'
import tailwind from '@hyoban/eslint-plugin-tailwindcss'

export default antfu({
  stylistic: true,
  react: true,
  astro: true,
}, ...tailwind.configs['flat/recommended'], {
  settings: {
    tailwindcss: {
      callees: ['cn', 'cva'],
      config: 'src/styles/globals.css',
    },
  },
})
