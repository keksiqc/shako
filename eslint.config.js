// eslint.config.js
import path from 'node:path'
import process from 'node:process'

import antfu from '@antfu/eslint-config'
import tailwind from 'eslint-plugin-tailwindcss'

export default antfu({
  stylistic: true,
  react: true,
  astro: true,
  ignores: ['README.md'],
}, tailwind.configs['flat/recommended'], {
  rules: {
    'tailwindcss/no-custom-classname': 'off',
    'react-hooks-extra/no-direct-set-state-in-use-effect': 'off',
  },
  settings: {
    tailwindcss: {
      callees: ['cn', 'cva'],
      // Construct an absolute path to your global.css
      config: path.join(process.cwd(), 'src/styles/global.css'),
    },
  },
})
