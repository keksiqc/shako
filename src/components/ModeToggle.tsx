import { Moon, Sun } from 'lucide-react'
import * as React from 'react'

import { Button } from '@/components/ui/button'

export function ModeToggle() {
  const [theme, setTheme] = React.useState<
    'theme-light' | 'dark' | 'system'
  >('theme-light')

  React.useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark')
    requestAnimationFrame(() => setTheme(isDarkMode ? 'dark' : 'theme-light'))
  }, [])

  React.useEffect(() => {
    const isDark
      = theme === 'dark'
        || (theme === 'system'
          && window.matchMedia('(prefers-color-scheme: dark)').matches)
    document.documentElement.classList[isDark ? 'add' : 'remove']('dark')
  }, [theme])

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === 'theme-light' ? 'dark' : 'theme-light')}
    >
      <Sun className="size-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute size-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
