import type { Snowflake } from 'use-lanyard'
import { z } from 'zod'

export const configSchema = z.object({
  title: z.string().default("Shako"),
  user: z.object({
    name: z.string(),
    avatar: z.string(),
  }).optional(),
  discordID: z.custom<Snowflake>().optional(),
  lanyardUrl: z.string().optional().default("api.lanyard.rest/"),
  animatedBackground: z.boolean().optional().default(false),
  iconButtons: z.array(
    z.object({
      icon: z.string(),
      url: z.string().url(),
    }),
  ).optional(),
  buttons: z.array(
    z.object({
      name: z.string(),
      icon: z.string(),
      url: z.string().url(),
    }),
  ).optional(),
})

export type Config = z.infer<typeof configSchema>
