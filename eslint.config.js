import path from 'node:path'
import { fileURLToPath } from 'node:url'
import antfu from '@antfu/eslint-config'
import tailwind from '@hyoban/eslint-plugin-tailwindcss'

// Get the directory name of the current module (eslint.config.js)
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default antfu({
  stylistic: true,
  react: true,
  astro: true,
  ignores: ['README.md'],
}, {
  settings: {
    tailwindcss: {
      callees: ['cn', 'cva'],
      // Construct an absolute path to your globals.css
      config: path.resolve(__dirname, 'src/styles/globals.css'),
    },
  },
}, tailwind.configs['flat/recommended'])
