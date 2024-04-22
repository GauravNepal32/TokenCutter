import React from 'react'
import { Card } from '../ui/card'
import { cn } from '@/lib/utils'

const HoverCard = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "",
            className
        )}
        {...props}
    />
))
HoverCard.displayName = "HoverCard"

export { HoverCard }