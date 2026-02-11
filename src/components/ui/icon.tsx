import { lazy, Suspense } from 'react'

import { cn } from '@/lib/utils'

// Lazy load the Icon component
const IconComponent = lazy(() => import('@iconify/react').then(mod => ({ default: mod.Icon })))

type IconProps = {
  icon: string
  size?: 'sm' | 'md' | 'lg'
  fallbackClassName?: string
} & React.HTMLAttributes<HTMLDivElement>

const sizeClasses = {
  sm: 'size-4',
  md: 'size-5',
  lg: 'size-6',
}

function IconFallback({ className }: { className?: string }) {
  return <div className={cn('animate-pulse rounded-sm bg-muted', className)} />
}

export function Icon({ icon, size = 'md', className, fallbackClassName, ...props }: IconProps) {
  return (
    <div className={cn(sizeClasses[size], className)} {...props}>
      <Suspense fallback={<IconFallback className={fallbackClassName} />}>
        <IconComponent
          icon={`simple-icons:${icon}`}
          className="size-full"
          aria-hidden="true"
        />
      </Suspense>
    </div>
  )
}
