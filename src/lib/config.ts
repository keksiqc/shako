import type { Config } from '@/types'
import { configSchema } from '@/types'
import { loadConfig } from 'c12'
import { z } from 'zod'

const DEFAULT_CONFIG: Partial<Config> = {
  title: 'Shako',
  lanyardUrl: 'https://api.lanyard.rest/v1/users',
  animatedBackground: false,
}

// Set Lanyard API URL globally
if (typeof window !== 'undefined') {
  window.LANYARD_API_URL = 'https://api.lanyard.rest/v1/users'
}

export class ConfigError extends Error {
  constructor(message: string, public cause?: unknown) {
    super(message)
    this.name = 'ConfigError'
  }
}

export async function getConfig(): Promise<Config> {
  try {
    // Load config file
    const { config: rawConfig } = await loadConfig({
      name: 'shako',
      defaults: DEFAULT_CONFIG,
    })

    if (!rawConfig) {
      throw new ConfigError('No configuration found')
    }

    try {
      // Parse and validate config
      const parsedConfig = configSchema.parse(rawConfig)
      return parsedConfig
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Format validation errors nicely
        const issues = error.issues.map(issue => 
          `${issue.path.join('.')}: ${issue.message}`
        ).join('\n')
        throw new ConfigError(`Invalid configuration:\n${issues}`)
      }
      throw new ConfigError('Failed to validate configuration', error)
    }
  } catch (error) {
    if (error instanceof ConfigError) {
      throw error
    }
    throw new ConfigError('Failed to load configuration', error)
  }
}
