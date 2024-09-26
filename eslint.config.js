import antfu from '@antfu/eslint-config'
import { FlatCompat } from '@eslint/eslintrc'

// workaround for flat config not being supported yet by eslint-plugin-tailwindcss
// https://github.com/francoismassart/eslint-plugin-tailwindcss/issues/280
// how-to from: https://github.com/antfu/eslint-config/issues/431#issuecomment-2014668812
const customTailwindConfig = new FlatCompat().config({
  extends: ['plugin:tailwindcss/recommended'],
  rules: {
    'tailwindcss/no-custom-classname': 'warn',
    'tailwindcss/classnames-order': 'error',
  },
  settings: {
    tailwindcss: {
      callees: ['cn', 'cva'],
      config: 'tailwind.config.cjs',
    },
  },
})

// Add the name property to the config so it displays correctly in the eslint config-inspector (https://github.com/eslint/config-inspector)
// To run the inspector, use `pnpx @eslint/config-inspector` in the root of the project.
customTailwindConfig[0].name = 'tailwindcss/recommended'

export default antfu({
  formatters: true,
  react: true,
  astro: true,
}, customTailwindConfig)
