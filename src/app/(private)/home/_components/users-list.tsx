import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useUsers } from '@/hooks'
import { useSession } from 'next-auth/react'
import React from 'react'
import { SkeletonLoading } from './skeleton-loading'

export function UsersList() {
  const { data } = useSession()
  const { data: users, isLoading } = useUsers(data)

  if(isLoading) return <SkeletonLoading />

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
