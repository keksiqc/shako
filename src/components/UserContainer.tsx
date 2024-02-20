import * as React from 'react';
import { useLanyard } from 'use-lanyard';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from "@/components/ui/skeleton";

const DISCORD_ID = '527147599942385674';


export function UserContainer() {
	const { data } = useLanyard(DISCORD_ID);

	return (
		<section className="flex flex-col justify-center items-center gap-5 m-5">
			{ data?.discord_user.avatar && data?.discord_user.global_name ? 
				<>
					<Avatar className="w-32 h-32">
						<AvatarImage
							src={`https://cdn.discordapp.com/avatars/${DISCORD_ID}/${data.discord_user.avatar}.png?size=256`}
							alt="@keksiqc"
						/>
						<AvatarFallback>U</AvatarFallback>
					</Avatar>
					<h2 className="text-3xl font-semibold text-foreground">{data.discord_user.global_name}</h2>
				</>
			: 
				<>
					<Skeleton className=" rounded-full w-32 h-32" />
					<Skeleton className="w-32 h-8" />
				</>
			}
		</section>
	);
}
