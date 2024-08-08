'use client'

import { Button } from '@/components/ui/button'
import { useCurrentUserClockInProgress, useMutateToggleClock } from '@/hooks'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import { toast } from 'sonner'

export function StartPauseClock() {
  const { data: session } = useSession()
  const { data: clocksInProgress, isLoading } = useCurrentUserClockInProgress(session)
  const { mutateAsync: onToggleClock, isPending } = useMutateToggleClock(session)

  const isClockInProgress = !!clocksInProgress

  const handleToggleClock = async () => {
    toast.promise(onToggleClock, {
      loading: 'Aguarde...',
      success: 'Ponto batido com sucesso',
      error: 'Erro ao bater ponto'
    })
  }

  return (
    <>
      <Button onClick={handleToggleClock} variant='outline' disabled={isPending || isLoading}>
        {isClockInProgress ? 'Finalizar Ponto' : 'Bater Ponto'}
      </Button>
    </>
  )
}
