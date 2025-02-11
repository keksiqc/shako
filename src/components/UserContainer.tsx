import type { Config } from '@/types'
import type { Snowflake } from 'use-lanyard'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { memo } from 'react'
import { useLanyard } from 'use-lanyard'

function getDiscordAvatarUrl(discordId: Snowflake, avatarHash: string) {
  return `https://cdn.discordapp.com/avatars/${discordId}/${avatarHash}.webp?size=256`
}

function UserContainerBase({ config }: { config: Config }) {
  // Use config values if available
  let userName: string | undefined = config?.user?.name
  let avatarUrl: string | undefined = config?.user?.avatar
  const description: string | undefined = config?.user?.description // Added description

  // Only fetch Discord data if we have a Discord ID and lanyard URL
  const { data, error } = useLanyard(config?.discordID as Snowflake, { api: { hostname: config?.lanyardUrl || 'api.lanyard.rest/', secure: true } })
  const isLoading = !data && !error && config?.discordID

  // Only try to use Discord data if we don't have direct config values
  if (!userName || !avatarUrl) {
    if (config?.discordID && data?.discord_user) {
      userName = data.discord_user.global_name ?? undefined
      if (data.discord_user.avatar) {
        avatarUrl = getDiscordAvatarUrl(config.discordID, data.discord_user.avatar)
      }
    }
  }

  // Show error state if Discord fetch failed
  if (error && !userName && !avatarUrl) {
    return (
      <section className="m-5 flex flex-col items-center justify-center gap-5">
        <Avatar className="size-32">
          <AvatarFallback>!</AvatarFallback>
        </Avatar>
        <p className="text-sm text-destructive">Failed to load user data</p>
      </section>
    )
  }

  // Show loading state while fetching Discord data
  if (isLoading && !userName && !avatarUrl) {
    return (
      <section className="m-5 flex flex-col items-center justify-center gap-5">
        <Skeleton className="size-32 rounded-full" />
        <Skeleton className="h-8 w-32" />
        {description && <Skeleton className="h-4 w-48" />}
      </section>
    )
  }

  // Show user data if available
  return (
    <section className="m-5 flex flex-col items-center justify-center gap-5" role="region" aria-label="User Profile">
      <Avatar className="size-32">
        <AvatarImage src={avatarUrl} alt={userName ?? 'User avatar'} />
        <AvatarFallback>
          {userName?.[0]?.toUpperCase() ?? 'U'}
        </AvatarFallback>
      </Avatar>
      <h2 className="text-3xl font-semibold text-foreground">
        {userName ?? 'Anonymous User'}
      </h2>
      {description && <p className="text-sm text-muted-foreground">{description}</p>}
    </section>
  )
}

// Memoize the component to prevent unnecessary re-renders
export const UserContainer = memo(UserContainerBase)
