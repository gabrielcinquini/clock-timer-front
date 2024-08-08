import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { toast } from 'sonner'

import { QUERY_KEYS } from '@/constants/query-keys'
import { revalidateQueryKey } from '@/utils/utils'
import { Session } from 'next-auth'
import { api } from '@/lib/api'

export const useMutateToggleClock = (authorization: Session | null) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      return await api.post('/clock/toggle-clock', undefined, {
        headers: {
          Authorization: `Bearer ${authorization?.token}`,
        }
      })
    },
    onSuccess: () => {
      revalidateQueryKey(QUERY_KEYS.MUTATE.CURRENT_USER_CLOCK_IN_PROGRESS(), queryClient)
    },
    onError: (err) => {
      console.error(err)
    },
  })
}
