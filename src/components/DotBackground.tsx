import React from 'react'

export function DotBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[-1] flex size-full items-center  justify-center bg-white bg-dot-black/[0.2] dark:bg-black dark:bg-dot-white/[0.2]">
    </div>
  )
}
