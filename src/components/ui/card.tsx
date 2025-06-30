import { cn } from '@/lib/utils'
import React from 'react'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Card({ className, ...props }: CardProps) {
  return <div className={cn('rounded-lg border bg-white p-6 shadow-sm dark:bg-zinc-800', className)} {...props} />
}
