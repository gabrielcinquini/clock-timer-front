import { useQuery } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/constants/query-keys'
import { api } from '@/lib/api'

type UseClocksInProgressProps = {
  id: string
  startTime: Date
  user: {
    fullName: string
    phone: string
  }
}[]

export const useClocksInProgress = (
) => {
  return useQuery({
    queryFn: async () => {
      const res = await api.get<UseClocksInProgressProps>('/clocks/in-progress')
      return res.data
    },

    queryKey: QUERY_KEYS.GET.IN_PROGRESS_CLOCKS(),
  })
}
