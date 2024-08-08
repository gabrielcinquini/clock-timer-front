"use client"

import ModeToggle from "@/components/ui/mode-toggle"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { ClocksDoneList, ClocksInProgressList, SignUp, StartPauseClock, TabsListing, UsersList } from "./_components"
import { useSession } from "next-auth/react"

export default function HomePage() {
  const { data: currentSession } = useSession()

  return (
    <Tabs defaultValue="activeClocks">
      <div className="bg-primary px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-primary-foreground">Time Tracking</h1>
          <ModeToggle />
        </div>
        <StartPauseClock />
        <TabsListing />
      </div>
      <TabsContent value="activeClocks" className="grid gap-4 px-6">
        <ClocksInProgressList />
      </TabsContent>
      <TabsContent value="allClocks" className="grid gap-4 px-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <ClocksDoneList />
      </TabsContent>
      <TabsContent value="members" className="grid gap-4 px-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <UsersList />
      </TabsContent>
      {currentSession?.user.isManager && (
        <TabsContent value="signUp" className="flex items-center justify-center">
          <SignUp/>
        </TabsContent>
      )}
    </Tabs>
  )
}