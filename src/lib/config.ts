import type { ParsedConfig } from '@/types'
import { z } from 'astro/zod'

import { loadConfig } from 'c12'
import { configSchema } from '@/lib/schemas/config.schema'

export async function getConfig(): Promise<ParsedConfig | null> {
  const config = await loadConfig({
    name: 'shako',
  })

  if (!config) {
    console.error('No configuration found')
    return null
  }

  const result = configSchema.safeParse(config.config)

  if (result.success) {
    return result.data
  }
  else {
    console.error(z.treeifyError(result.error))
    return null
  }
}
