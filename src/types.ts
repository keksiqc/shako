import type { Snowflake } from 'use-lanyard'
import { z } from 'zod'

export const configSchema = z.object({
  title: z.string().default('Shako'),
  user: z
    .object({
      name: z.string().optional(),
      avatar: z.string().optional(),
      description: z.string().optional(),
    })
    .optional(),
  discordID: z.custom<Snowflake>().optional(),
  lanyardUrl: z.string().optional().default('api.lanyard.rest/'),
  background: z
    .union([
      z.literal('dot'),
      z.literal('grid'),
      z.literal('dashed-grid'),
      z.literal('animated'),
      z.literal('none'),
    ])
    .optional()
    .default('none'),
  footer: z.union([z.boolean(), z.string()]).optional().default(true),
  iconButtons: z
    .array(
      z.object({
        icon: z.string(),
        url: z.string().url(),
      }),
    )
    .optional(),
  buttons: z
    .array(
      z.object({
        name: z.string(),
        icon: z.string(),
        url: z.string().url(),
      }),
    )
    .optional(),
})

export type Config = z.infer<typeof configSchema>
