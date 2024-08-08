import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useClocksDone } from '@/hooks'
import React from 'react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { differenceInHours, differenceInMinutes } from 'date-fns';

export function ClocksDoneList() {
  const { data: clocksDone, isLoading } = useClocksDone()

  if (isLoading) {
    return Array.from({ length: 5 }).map((_, index) => (
      <Skeleton key={index} className='w-full h-32' />
    ))
  }

  return (
    <>
      {clocksDone?.map((clock, index) => {
        const totalHours = differenceInHours(clock.endTime, clock.startTime);
        const totalMinutes = differenceInMinutes(clock.endTime, clock.startTime);

        const remainingMinutes = totalMinutes % 60;

        return (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{clock.user.fullName}</CardTitle>
              <CardDescription>
                {format(clock.startTime, 'dd/MM/yyyy', { locale: ptBR })}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col">
                <span>Início: {format(clock.startTime, 'HH:mm', { locale: ptBR })}</span>
                <span>Término: {format(clock.endTime, 'HH:mm', { locale: ptBR })}</span>
                <span>Duração: {totalHours}h {remainingMinutes}m</span>
            </CardContent>
          </Card>
        )
      })}
    </>
  )
}
