import { QueryClient } from "@tanstack/react-query"

export function formatName(event: React.ChangeEvent<HTMLInputElement>) {
  const currentValue = event.target.value
  const currentPos = event.target.selectionStart || 0

  const newVal = currentValue.replace(/[\W_]|[\d]+/g, '').toLocaleLowerCase()
  const formattedValue = newVal.charAt(0).toUpperCase() + newVal.slice(1)
  event.target.value = formattedValue

  if (currentValue !== newVal) {
    event.target.selectionStart = currentPos
    event.target.selectionEnd = currentPos
  }
}

export const revalidateQueryKey = (
  paths: string[],
  queryClient: QueryClient,
) => {
  paths.map((p) => queryClient.invalidateQueries({ queryKey: [p] }))
}
