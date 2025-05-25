import type { Types } from '@prequist/lanyard'
import { z } from 'zod'

// Reusable schemas
const hexColorSchema = z.string().regex(/^#([0-9A-F]{3}|[0-9A-F]{6})$/i, 'Must be a valid hex color')
const buttonStyleSchema = z.enum(['default', 'destructive', 'outline', 'secondary', 'ghost', 'link']).default('default')

export const configSchema = z.object({
  // Page Configuration
  page: z.object({
    title: z.string().min(1).max(100).default('Shako'),
    footer: z.union([z.boolean(), z.string().max(200)]).default(true),
    borderRadius: z.number().min(0).max(2).default(0.5),
    background: z.union([
      // Preset backgrounds
      z.enum(['dot', 'grid', 'dashed-grid', 'animated', 'flickering-grid', 'animated-grid', 'none']),
      // Custom background
      z.object({
        type: z.enum(['image', 'color', 'gradient', 'custom']),
        value: z.union([
          z.string().url(), // For image type
          hexColorSchema,   // For color type
          z.object({        // For gradient type
            type: z.enum(['linear', 'radial']).default('linear'),
            colors: z.array(hexColorSchema).min(2).max(10),
            direction: z.number().min(0).max(360).default(0),
          }),
          z.record(z.string(), z.string()), // For custom CSS
        ]),
      }),
    ]).default('none'),
  }).default({}),

  // User Information
  user: z.object({
    name: z.string().min(1).max(50).optional(),
    avatar: z.string().url().optional(),
    bio: z.string().max(500).optional(),
    discordId: z.custom<Types.Snowflake>().optional(),
  }).default({}),

  // Lanyard Integration
  lanyard: z.object({
    apiUrl: z.string().url().default('https://api.lanyard.rest/'),
  }).default({}),

  // Navigation & Links
  links: z.object({
    // Small icon-only buttons
    social: z.array(
      z.object({
        icon: z.string().min(1),
        url: z.string().url(),
        label: z.string().max(50).optional(),
        style: buttonStyleSchema.optional(),
      }),
    ).default([]),

    // Larger buttons with text
    primary: z.array(
      z.object({
        label: z.string().min(1).max(50),
        icon: z.string().min(1).optional(),
        url: z.string().url(),
        size: z.enum(['sm', 'md', 'lg', 'xl']).default('md'),
        style: buttonStyleSchema.optional(),
      }),
    ).default([]),
  }).default({}),
})

export type Config = z.input<typeof configSchema>
export type ParsedConfig = z.output<typeof configSchema>
