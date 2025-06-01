import type { Types } from '@prequist/lanyard'
import * as v from 'valibot'

export const configSchema = v.object({
  page: v.object({
    title: v.optional(v.string(), 'Shako'),
    footer: v.optional(v.union([v.boolean(), v.string()]), true),
    borderRadius: v.optional(v.number(), 0.5),
    background: v.optional(v.union([
      v.picklist(['dot', 'grid', 'dashed-grid', 'flickering-grid', 'animated-grid', 'none']),
      v.object({
        type: v.picklist(['image', 'color', 'gradient', 'custom']),
        value: v.union([v.string(), v.object({
          type: v.picklist(['linear', 'radial']),
          colors: v.array(v.string()),
          direction: v.number(),
        }), v.record(v.string(), v.string())]),
      }),
    ]), 'none'),
  }),
  user: v.object({
    name: v.optional(v.string()),
    avatar: v.optional(v.pipe(v.string(), v.url())),
    bio: v.optional(v.string()),
    discordId: v.custom<Types.Snowflake>((value) => {
      const snowflakeRegex = /^\d{17,19}$/
      return typeof value === 'string' && snowflakeRegex.test(value)
    }),
  }),
  api: v.optional(v.object({
    lanyardUrl: v.optional(v.pipe(v.string(), v.url()), 'https://api.lanyard.rest/'),
  }), {}),
  links: v.object({
    social: v.optional(v.array(v.object({
      icon: v.string(),
      url: v.pipe(v.string(), v.url()),
      style: v.optional(v.picklist(['default', 'destructive', 'outline', 'secondary', 'ghost', 'link']), 'secondary'),
    })), []),
    primary: v.optional(v.array(v.object({
      label: v.string(),
      icon: v.string(),
      url: v.pipe(v.string(), v.url()),
      style: v.optional(v.picklist(['default', 'destructive', 'outline', 'secondary', 'ghost', 'link']), 'outline'),
      size: v.optional(v.picklist(['default', 'sm', 'lg', 'xl']), 'xl'),
    })), []),
  }),
})

export type Config = v.InferInput<typeof configSchema>
export type ParsedConfig = v.InferOutput<typeof configSchema>
