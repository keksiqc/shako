import { loadConfig } from 'c12'
import * as v from 'valibot'

import type { ParsedConfig } from '@/types'
import { configSchema } from '@/types'

export async function getConfig(): Promise<ParsedConfig | null> {
  const config = await loadConfig({
    name: 'shako',
  })

  if (!config) {
    console.error('No configuration found')
    return null
  }

  const result = v.safeParse(configSchema, config.config)

  if (result.success) {
    return result.output
  }
  else {
    console.error(v.summarize(result.issues))
    return null
  }
}
