import type { Snowflake } from 'use-lanyard'
import { z } from 'zod'
import { ConfigError } from './lib/config'

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
  borderRadius: z.number().min(0).optional().default(0.5),
  background: z
    .union([
      z.literal('dot'),
      z.literal('grid'),
      z.literal('dashed-grid'),
      z.literal('animated'),
      z.literal('flickering-grid'),
      z.literal('animated-grid'),
      z.literal('none'),
      z.object({
        type: z.union([z.literal('image'), z.literal('color'), z.literal('gradient'), z.literal('custom')]),
        image: z.string().url().optional(),
        color: z.string().optional(),
        gradient: z
          .object({
            type: z.union([z.literal('linear'), z.literal('radial')]),
            colors: z.array(z.string()),
            angle: z.number().min(0).max(360).optional(),
          })
          .optional(),
        customCSS: z.record(z.string(), z.string()).optional(),
      }),
    ])
    .optional()
    .default('none'),
  footer: z.union([z.boolean(), z.string()]).optional().default(true),
  iconButtons: z
    .array(
      z.object({
        icon: z.string(),
        url: z.string().url(),
        variant: z.union([
          z.literal('default'),
          z.literal('destructive'),
          z.literal('outline'),
          z.literal('secondary'),
          z.literal('ghost'),
          z.literal('link'),
        ]).optional(),
      }),
    )
    .optional(),
  buttons: z
    .array(
      z.object({
        name: z.string(),
        icon: z.string(),
        url: z.string().url(),
        variant: z.union([
          z.literal('default'),
          z.literal('destructive'),
          z.literal('outline'),
          z.literal('secondary'),
          z.literal('ghost'),
          z.literal('link'),
        ]).optional(),
      }),
    )
    .optional(),
})

export type Config = z.infer<typeof configSchema>
