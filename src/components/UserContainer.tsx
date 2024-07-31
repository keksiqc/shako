import config from "@/config"
import { useLanyard } from "use-lanyard"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"

export function UserContainer() {
  let userName: string | null | undefined = config.user?.name
  let avatarUrl: string | null | undefined = config.user?.avatar

  if (!userName || !avatarUrl) {
    if (config.discordID) {
      const { data } = useLanyard(config.discordID)
      userName = data?.discord_user.global_name
      avatarUrl = `https://cdn.discordapp.com/avatars/${config.discordID}/${data?.discord_user.avatar}.webp?size=256`
    }
  }

  return (
    <section className="m-5 flex flex-col items-center justify-center gap-5">
      {avatarUrl && userName ? (
        <>
          <Avatar className="size-32">
            <AvatarImage src={avatarUrl} alt={userName} />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <h2 className="text-3xl font-semibold text-foreground">
            {userName}
          </h2>
        </>
      ) : (
        <>
          <Skeleton className=" size-32 rounded-full" />
          <Skeleton className="h-8 w-32" />
        </>
      )}
    </section>
  )
}
