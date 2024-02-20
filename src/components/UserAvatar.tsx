import * as React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


export function UserAvatar() {
  return (
    <Avatar className="w-32 h-32">
      <AvatarImage
        src="https://cdn.discordapp.com/avatars/527147599942385674/bcea2fc83064197853e67a10574d8015.png?size=256"
        alt="@keksiqc"
      />
      <AvatarFallback>U</AvatarFallback>
    </Avatar>
  )
}