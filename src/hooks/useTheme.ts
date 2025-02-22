import { useCallback, useEffect, useState } from 'react'

type Theme = 'theme-light' | 'dark' | 'system'

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('system')
  const [isSystemDark, setIsSystemDark] = useState(false)

  // Initialize theme and system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme
    if (savedTheme) {
      setTheme(savedTheme)
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    setIsSystemDark(mediaQuery.matches)

    const handleSystemThemeChange = () => {
      setIsSystemDark(mediaQuery.matches)
    }

    mediaQuery.addEventListener('change', handleSystemThemeChange)
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange)
  }, [])

  // Handle theme changes
  useEffect(() => {
    localStorage.setItem('theme', theme)
    
    const isDark = theme === 'dark' || (theme === 'system' && isSystemDark)
    document.documentElement.classList.toggle('dark', isDark)
  }, [theme, isSystemDark])

  return {
    theme,
    setTheme,
    isSystemDark
  }
}
