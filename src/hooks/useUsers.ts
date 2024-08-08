import { useQuery } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/constants/query-keys'
import { api } from '@/lib/api'
import { Session } from 'next-auth'
import { User } from '@/shared/types'

export const useUsers = (authorization: Session | null) => {
  return useQuery({
    queryFn: async () => {
      const res = await api.get<User[]>('/users', {
        headers: {
          Authorization: `Bearer ${authorization?.token}`,
        }
      })
      return res.data
    },

    queryKey: QUERY_KEYS.GET.USERS(),
  })
}
