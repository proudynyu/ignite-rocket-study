import { useQuery } from "react-query"
import { api } from "../apiClient"

export async function getUsers(page: number): Promise<GetUserResponse> {
  const { data, headers } = await api.get('users', {
    params: {
      page
    }
  })

  const users = data.users.models.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    createAt: new Date(user.createAt).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'narrow',
      year: 'numeric',
    }),
  }))

  const totalCount = Number(headers['x-total-count'])

  return { users, totalCount }
}

export function useUsers(page: number) {
  return useQuery(['users', page], () => getUsers(page), { staleTime: 1000 * 5 })
}