import * as v from 'valibot'

import type { ParsedConfig } from '@/types'
import { configSchema } from '@/types'

import shakoConfig from '../../shako.config'

export async function getConfig(): Promise<ParsedConfig | null> {
  const result = v.safeParse(configSchema, shakoConfig)

  if (result.success) {
    return result.output
  }
  else {
    console.error(v.summarize(result.issues))
    return null
  }
}
