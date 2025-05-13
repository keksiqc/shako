import type { Snowflake } from 'use-lanyard'
import type { Config } from '@/types'
import { useEffect, useMemo, useState } from 'react'
import { useLanyard } from 'use-lanyard'

interface DiscordUser {
  userName: string | undefined
  avatarUrl: string | undefined
  isLoading: boolean
  error: Error | null
}

interface CachedDiscordData {
  userName: string | undefined
  avatarUrl: string | undefined
  expiresAt: number
}

const CACHE_KEY = 'discord_user_data'
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

function getDiscordAvatarUrl(discordId: Snowflake, avatarHash: string) {
  return `https://cdn.discordapp.com/avatars/${discordId}/${avatarHash}.webp?size=256`
}

function getCachedData(): CachedDiscordData | null {
  try {
    const cached = localStorage.getItem(CACHE_KEY)
    if (!cached)
      return null

    const data = JSON.parse(cached) as CachedDiscordData
    if (Date.now() > data.expiresAt) {
      localStorage.removeItem(CACHE_KEY)
      return null
    }

    return data
  }
  catch {
    return null
  }
}

function cacheData(data: Omit<CachedDiscordData, 'expiresAt'>) {
  try {
    const cacheData: CachedDiscordData = {
      ...data,
      expiresAt: Date.now() + CACHE_DURATION,
    }
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData))
  }
  catch {
    // Ignore cache errors
  }
}

export function useDiscordUser(config: Config): DiscordUser {
  const [cachedData, setCachedData] = useState<CachedDiscordData | null>(null)

  // Check cache on mount
  useEffect(() => {
    const cached = getCachedData()
    if (cached) {
      setCachedData(cached)
    }
  }, [])

  const shouldFetch = !!(config?.discordID && !cachedData)
  const { data, error } = useLanyard(config?.discordID as Snowflake, {
    api: {
      hostname: config?.lanyardUrl || 'api.lanyard.rest/',
      secure: true,
    },
  })

  // Skip using Discord data if we shouldn't fetch
  const discordData = shouldFetch ? data : undefined
  const discordError = shouldFetch ? error : null

  return useMemo(() => {
    // Use config values first
    // Use config values if available
    let userName = config?.user?.name
    let avatarUrl = config?.user?.avatar

    // Then try cached data
    if (!userName || !avatarUrl) {
      if (cachedData) {
        userName = cachedData.userName
        avatarUrl = cachedData.avatarUrl
      }
      // Finally try Discord data
      else if (config?.discordID && discordData?.discord_user) {
        userName = discordData.discord_user.global_name ?? undefined
        if (discordData.discord_user.avatar) {
          avatarUrl = getDiscordAvatarUrl(config.discordID, discordData.discord_user.avatar)
        }
        // Cache the new data
        if (userName || avatarUrl) {
          cacheData({ userName, avatarUrl })
        }
      }
    }

    return {
      userName,
      avatarUrl,
      isLoading: shouldFetch && !discordData && !discordError,
      error: discordError ? new Error('Failed to load user data') : null,
    }
  }, [config, discordData, discordError, cachedData, shouldFetch])
}
