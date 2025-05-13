import type { Config } from '@/types'
import { memo } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { useDiscordUser } from '@/hooks/useDiscordUser'

function UserContainerBase({ config }: { config: Config }) {
  const { userName, avatarUrl, isLoading, error } = useDiscordUser(config)
  const description = config?.user?.description

  if (error && !userName && !avatarUrl) {
    return (
      <section className="m-5 flex flex-col items-center justify-center gap-5" role="alert" aria-live="polite">
        <Avatar className="size-32">
          <AvatarFallback>!</AvatarFallback>
        </Avatar>
        <p className="text-sm text-destructive">{error.message}</p>
      </section>
    )
  }

  if (isLoading && !userName && !avatarUrl) {
    return (
      <section className="m-5 flex flex-col items-center justify-center gap-5" aria-busy="true">
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
