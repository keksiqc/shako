import type { Types } from '@prequist/lanyard'
import { memo } from 'react'
import { useLanyard } from 'use-lanyard'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import type { ParsedConfig } from '@/types'

function UserContainerBase({ config }: { config: ParsedConfig | null }) {
  // Only call the hook when we have a valid discordId
  const { data, error, isLoading } = useLanyard(
    config?.user?.discordId as Types.Snowflake,
    {
      api: {
        hostname: config?.api?.lanyardUrl?.replace(/^https?:\/\//, '').replace(/\/$/, '') || 'api.lanyard.rest',
        secure: true,
      },
    },
  )

  // Determine user info - prefer config values, fallback to Lanyard data
  const userName = config?.user?.name || data?.discord_user?.global_name || data?.discord_user?.username

  // Construct avatar URL properly
  let avatarUrl = config?.user?.avatar
  if (!avatarUrl && data?.discord_user?.avatar) {
    avatarUrl = `https://cdn.discordapp.com/avatars/${data.discord_user.id}/${data.discord_user.avatar}.${data.discord_user.avatar.startsWith('a_') ? 'gif' : 'png'}?size=256`
  }

  const description = config?.user?.bio

  // Show error if there's an error and no fallback data
  if (error && !userName && !avatarUrl) {
    return (
      <section className="m-5 flex flex-col items-center justify-center gap-5" role="alert" aria-live="polite">
        <Avatar className="size-32">
          <AvatarFallback>!</AvatarFallback>
        </Avatar>
        <p className="text-sm text-destructive">
          {`Failed to load user data: ${error.message}`}
        </p>
      </section>
    )
  }

  // Show loading state while fetching data (but only if no fallback config data exists)
  if (isLoading && !userName && !avatarUrl && !config?.user?.name) {
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
