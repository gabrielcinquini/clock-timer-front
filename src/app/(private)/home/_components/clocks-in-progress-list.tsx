import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useClocksInProgress } from '@/hooks'
import { differenceInHours, differenceInMinutes, format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import React from 'react'
import { SkeletonLoading } from './skeleton-loading'

export function ClocksInProgressList() {
  const { data: clocksInProgress, isLoading } = useClocksInProgress()

  if (isLoading) {
    return <SkeletonLoading />
  }

  return (
    <>
      {clocksInProgress?.map((clock, index) => {
        const totalHours = differenceInHours(new Date(), clock.startTime);
        const totalMinutes = differenceInMinutes(new Date(), clock.startTime);

        const remainingMinutes = totalMinutes % 60;
        return (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{clock.user.fullName}</CardTitle>
              <CardDescription>{format(clock.startTime, 'dd/MM/yyyy', { locale: ptBR })}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>Início: {format(clock.startTime, 'HH:mm', { locale: ptBR })}</div>
                <div>Duração: {totalHours}h {remainingMinutes}m</div>
              </div>
            </CardContent>
          </Card>
        )
      } 
      )}
    </>
  )
}
