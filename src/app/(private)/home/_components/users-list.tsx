import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useUsers } from '@/hooks'
import { useSession } from 'next-auth/react'
import React from 'react'

export function UsersList() {
  const { data } = useSession()
  const { data: users, isLoading } = useUsers(data)

  if(isLoading) return Array.from({ length: 4 }).map((_, i) => (
    <Skeleton key={i} className='h-20'/>
  ))

  return (
    <>
      {users?.map(user => (
        <Card key={user.id}>
          <CardHeader>
            <CardTitle>
              {user.fullName}
            </CardTitle>
            <CardDescription>{user.isManager ? 'Gerente' : 'Membro'}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-muted-foreground">{user.phone}</div>
          </CardContent>
        </Card>
      ))}    
    </>
  )
}
