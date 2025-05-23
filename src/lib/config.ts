import type { Config } from '@/types'
import { loadConfig } from 'c12'
import { z } from 'zod'
import { configSchema } from '@/types'

const DEFAULT_CONFIG: Partial<Config> = {
  lanyardUrl: 'https://api.lanyard.rest/v1/users',
  background: 'none',
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
    }
    catch (error) {
      if (error instanceof z.ZodError) {
        // Format validation errors nicely
        const issues = error.issues
          .map(issue => `${issue.path.join('.')}: ${issue.message}`)
          .join('\n')
        throw new ConfigError(`Invalid configuration:\n${issues}`)
      }
      throw new ConfigError('Failed to validate configuration', error)
    }
  }
  catch (error) {
    if (error instanceof ConfigError) {
      throw error
    }
    throw new ConfigError('Failed to load configuration', error)
  }
}
