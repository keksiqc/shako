import type { z } from 'astro/zod'

import type { configSchema } from '@/lib/schemas/config.schema'

export type Config = z.infer<typeof configSchema>
export type ParsedConfig = z.output<typeof configSchema>
