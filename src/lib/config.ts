import type { Config } from '@/types'
import { configSchema } from '@/types'
import { loadConfig } from 'c12'

export async function getConfig(): Promise<Config> {
  const { config } = await loadConfig({
    name: 'shako',
    defaults: {
      title: 'Shako',
      lanyardUrl: 'https://api.lanyard.rest/',
    },
  })

  const parsedConfig = configSchema.parse(config)

  return parsedConfig
}
