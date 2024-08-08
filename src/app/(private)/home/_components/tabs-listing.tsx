import { TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useSession } from "next-auth/react"

export function TabsListing() {
  const { data: currentSession } = useSession()

  return (
    <TabsList className={`grid w-fit grid-cols-4 ${!currentSession?.user.isManager && 'grid-cols-2'}`}>
      <TabsTrigger value="activeClocks">Pontos Ativos</TabsTrigger>
      <TabsTrigger value="allClocks">Pontos Finalizados</TabsTrigger>
      {currentSession?.user.isManager && (
        <>
          <TabsTrigger value="members">Membros</TabsTrigger>
          <TabsTrigger value="signUp">Cadastrar</TabsTrigger>
        </>
      )}
    </TabsList>
  )
}
