import { useQuery } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/constants/query-keys'
import { api } from '@/lib/api'
import { Session } from 'next-auth'

type UseCurrentUserClockInProgress = {
  id: string
  startTime: Date
  user: {
    fullName: string
    phone: string
  }
}[]

export const useCurrentUserClockInProgress = (authorization: Session | null) => {
  return useQuery({
    queryFn: async () => {
      const res = await api.get<UseCurrentUserClockInProgress>('/clock/in-progress', {
        headers: {
          Authorization: `Bearer ${authorization?.token}`,
        }
      })
      return res.data
    },

    queryKey: QUERY_KEYS.GET.CURRENT_USER_CLOCK_IN_PROGRESS(),
  })
}
