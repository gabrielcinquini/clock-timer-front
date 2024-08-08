import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

export function SkeletonLoading() {
  return Array.from({ length: 5 }).map((_, index) => (
    <Skeleton key={index} className='w-full h-44' />
  ))
}
