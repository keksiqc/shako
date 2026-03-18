import type { Types } from 'use-lanyard'
import { z } from 'zod/v4'

const SNOWFLAKE_REGEX = /^\d{17,19}$/

const backgroundSchema = z.union([
  z.enum([
    'dot',
    'grid',
    'dashed-grid',
    'flickering-grid',
    'animated-grid',
    'none',
  ]),
  z.object({
    type: z.enum(['image', 'color', 'gradient', 'custom']),
    value: z.union([
      z.string(),
      z.object({
        type: z.enum(['linear', 'radial']),
        colors: z.array(z.string()),
        direction: z.number(),
      }),
      z.record(z.string(), z.string()),
    ]),
  }),
])

const buttonStyleSchema = z.enum([
  'default',
  'destructive',
  'outline',
  'secondary',
  'ghost',
  'link',
])

export const configSchema = z.object({
  page: z.object({
    title: z.string().default('Shako').optional(),
    footer: z.union([z.boolean(), z.string()]).default(true).optional(),
    borderRadius: z.number().default(0.625).optional(),
    background: backgroundSchema.default('none').optional(),
    redirects: z.record(z.string(), z.string()).default({}).optional(),
  }).optional(),
  user: z.object({
    name: z.string().optional(),
    avatar: z.url().optional(),
    bio: z.string().optional(),
    discordId: z
      .string()
      .refine(
        (value): value is Types.Snowflake => SNOWFLAKE_REGEX.test(value),
        {
          message: 'Invalid Discord snowflake',
        },
      )
      .optional(),
  }).optional(),
  api: z
    .object({
      lanyardUrl: z.url().default('https://api.lanyard.rest/').optional(),
    }),
  links: z.object({
    social: z
      .array(
        z.object({
          icon: z.string(),
          url: z.url(),
          style: buttonStyleSchema.default('secondary').optional(),
        }),
      )
      .default([]),
    primary: z
      .array(
        z.object({
          label: z.string(),
          icon: z.string(),
          url: z.url(),
          style: buttonStyleSchema.default('outline').optional(),
          size: z.enum(['default', 'sm', 'lg', 'xl']).default('xl').optional(),
        }),
      )
      .default([]),
  }),
})

export type Config = z.input<typeof configSchema>
export type ParsedConfig = z.output<typeof configSchema>
