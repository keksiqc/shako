import type { Types } from 'use-lanyard'
import type { ParsedConfig } from '@/types'
import { memo } from 'react'

import { useLanyard } from 'use-lanyard'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'

const PROTOCOL_PREFIX_REGEX = /^https?:\/\//
const TRAILING_SLASH_REGEX = /\/$/

function UserContainerBase({ config }: { config: ParsedConfig | null }) {
  // Only call the hook when we have a valid discordId
  const presence = useLanyard(
    config?.user?.discordId as Types.Snowflake,
    {
      api: {
        hostname:
          config?.api?.lanyardUrl?.replace(PROTOCOL_PREFIX_REGEX, '').replace(TRAILING_SLASH_REGEX, '')
          || 'api.lanyard.rest',
        secure: true,
      },
    },
  )

  // Determine user info - prefer config values, fallback to Lanyard data
  const userName = config?.user?.name || presence?.discord_user?.global_name || presence?.discord_user?.username

  // Construct avatar URL properly
  let avatarUrl = config?.user?.avatar
  if (!avatarUrl && presence?.discord_user?.avatar) {
    avatarUrl = `https://cdn.discordapp.com/avatars/${presence.discord_user.id}/${presence.discord_user.avatar}.${presence.discord_user.avatar.startsWith('a_')
      ? 'gif'
      : 'png'}?size=256`
  }

  const description = config?.user?.bio

  // Show loading state while fetching data (but only if no fallback config data exists)
  if (!userName && !avatarUrl && !config?.user?.name) {
    return (
      <section className="m-5 flex flex-col items-center justify-center gap-5" aria-busy="true">
        <Skeleton className="size-32 rounded-full" />
        <Skeleton className="h-8 w-32" />
        {description && <Skeleton className="h-4 w-48" />}
      </section>
    )
  }

  // Show user data (either from config or fetched from Discord)
  return (
    <section className="m-5 flex flex-col items-center justify-center gap-5" role="region" aria-label="User Profile">
      <Avatar className="size-32">
        <AvatarImage src={avatarUrl || ''} alt={userName || 'User avatar'} />
        <AvatarFallback>
          {userName?.[0]?.toUpperCase() || 'U'}
        </AvatarFallback>
      </Avatar>
      <h2 className="text-3xl font-semibold text-foreground">
        {userName || 'User'}
      </h2>
      {description && <p className="text-sm text-muted-foreground">{description}</p>}
    </section>
  )
}

// Memoize the component to prevent unnecessary re-renders
export const UserContainer = memo(UserContainerBase)
