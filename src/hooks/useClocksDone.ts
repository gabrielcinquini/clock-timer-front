import { useQuery } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/constants/query-keys'
import { api } from '@/lib/api'

type ClocksDoneProps = {
  id: string
  startTime: Date
  endTime: Date
  user: {
    fullName: string
    phone: string
  }
}[]

export const useClocksDone = (
) => {
  return useQuery({
    queryFn: async () => {
      const res = await api.get<ClocksDoneProps>('/clocks/done')
      return res.data
    },

    queryKey: QUERY_KEYS.GET.DONE_CLOCKS(),
  })
}
